import { PhotonImage } from "@cf-wasm/photon";
import { generate } from "@juit/qrcode";
import * as QRCode from "qrcode";

export interface Env {
  QRCLAW_KV: KVNamespace;
  BASE_URL?: string; // e.g. "https://qrclaw.yourdomain.com" — defaults to request origin
}

// ─── QR generation ───────────────────────────────────────────────────────────

async function generateQrJpegBase64(data: string): Promise<string> {
  const pngBuffer = await generate(data, "png", {
    ecLevel: "H",
    scale: 8,
    margin: 2,
  });
  const img = PhotonImage.new_from_byteslice(new Uint8Array(pngBuffer));
  const jpegBytes = img.get_bytes_jpeg(100);
  img.free();
  return btoa(String.fromCharCode(...new Uint8Array(jpegBytes)));
}

function generateQrUtf8(data: string): string {
  // Use QRCode.create() which works in all environments (no browser field issue)
  const qr = QRCode.create(data, { errorCorrectionLevel: "H" });
  const size = qr.modules.size;
  const modules = qr.modules.data;
  const margin = 2;

  // Inverted block chars for terminal contrast (light-on-dark)
  const BB = " ";  // both black → space (background shows)
  const BW = "▄";  // top black, bottom white
  const WW = "█";  // both white → full block
  const WB = "▀";  // top white, bottom black

  function get(row: number, col: number): boolean {
    if (row < 0 || row >= size || col < 0 || col >= size) return false;
    return Boolean(modules[row * size + col]);
  }

  let output = "";
  const hBlank = WW.repeat(size + margin * 2);
  // Top margin
  for (let i = 0; i < Math.ceil(margin / 2); i++) output += hBlank + "\n";
  const vPad = WW.repeat(margin);

  for (let y = 0; y < size; y += 2) {
    output += vPad;
    for (let x = 0; x < size; x++) {
      const top = get(y, x);
      const bot = get(y + 1, x);
      if (top && bot) output += BB;
      else if (top && !bot) output += BW;
      else if (!top && bot) output += WB;
      else output += WW;
    }
    output += vPad + "\n";
  }
  // Bottom margin
  for (let i = 0; i < Math.floor(margin / 2); i++) output += hBlank + "\n";

  return output.trimEnd();
}

// ─── HTML smart-link page ────────────────────────────────────────────────────

function buildHTMLPage({
  data,
  uuid,
  qrImageUrl,
  qrUtf8,
  baseUrl,
}: {
  data: string;
  uuid: string;
  qrImageUrl: string;
  qrUtf8: string;
  baseUrl: string;
}): string {
  const truncated = data.length > 80 ? data.slice(0, 77) + "..." : data;
  const title = `QR Code — ${truncated}`;
  const description = `Scan or click to open: ${truncated}`;
  const pageUrl = `${baseUrl}/q/${uuid}`;

  // Safe embedding in JS string literals
  const jsData = JSON.stringify(data);
  const jsUtf8 = JSON.stringify(qrUtf8);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="https://goplausible.com/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${qrImageUrl}" />
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${qrImageUrl}" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
      background: #f9f9f9;
      padding: 2rem;
      text-align: center;
      color: #2d3748;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      max-width: 540px;
      margin: 0 auto;
    }
    h1 { font-size: 1.4rem; margin-bottom: 1rem; }
    .qr-image { margin-bottom: 1rem; }
    .qr-image img {
      width: 100%;
      max-width: 360px;
      box-shadow: 0 4px 14px #607D8B;
      border-radius: 16px;
    }
    .qr-utf8 {
      display: none;
      background: #1a1a2e;
      color: #e0e0e0;
      font-family: "Menlo", "DejaVu Sans Mono", "Courier New", monospace;
      font-size: clamp(0.25rem, 1.2vw, 0.5rem);
      line-height: 1.15;
      letter-spacing: 0;
      padding: 0.5rem;
      border-radius: 12px;
      overflow-x: auto;
      white-space: pre;
      text-align: center;
      margin: 0 auto 1rem;
      box-shadow: 0 4px 14px #607D8B;
    }
    .toggle-group {
      display: inline-flex;
      background: #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    .toggle-btn {
      padding: 0.45rem 1.1rem;
      font-size: 0.8rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      background: transparent;
      color: #64748b;
      transition: all 0.2s;
    }
    .toggle-btn.active {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
    }
    .data-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }
    .data {
      flex: 1;
      font-size: 0.85rem;
      font-family: monospace;
      word-break: break-all;
      background: #f1f5f9;
      padding: 0.75rem;
      border-radius: 6px;
      text-align: left;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1rem;
    }
    .copy-btn {
      padding: 0.45rem 0.85rem;
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #fff;
      color: #475569;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .copy-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
    .copy-btn.copied { background: #dcfce7; border-color: #86efac; color: #166534; }
    .back {
      display: inline-block;
      margin-bottom: 1.25rem;
      padding: 0.5rem 1.25rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none;
      border-radius: 8px;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .back:hover { opacity: 0.85; }
    .footer {
      margin-top: 1.5rem;
      font-size: 0.5rem;
      color: #718096;
    }
    .footer a { color: #718096; text-decoration: none; }
    .footer a:hover { color: #4a5568; }
  </style>
</head>
<body>
  <div class="card">
    <a class="back" href="${baseUrl}/">&larr; New QR Code</a>
    <h1>QR Code</h1>

    <div class="toggle-group">
      <button class="toggle-btn active" id="btn-image" onclick="showView('image')">Image</button>
      <button class="toggle-btn" id="btn-utf8" onclick="showView('utf8')">UTF-8</button>
    </div>

    <div class="qr-image" id="view-image">
      <img src="${qrImageUrl}" alt="QR Code" id="qr-img" crossorigin="anonymous" />
    </div>
    <pre class="qr-utf8" id="view-utf8">${escapeHtml(qrUtf8)}</pre>

    <div class="actions">
      <button class="copy-btn" onclick="copyImage(this)">Copy Image</button>
      <button class="copy-btn" onclick="copyText('utf8', this)">Copy UTF-8</button>
      <button class="copy-btn" onclick="copyText('data', this)">Copy QR Data</button>
      <button class="copy-btn" onclick="copyText('link', this)">Copy QR Link</button>
    </div>

    <div class="data-row">
      <div class="data">${escapeHtml(data)}</div>
    </div>

    <div class="footer">
      <a href="https://goplausible.com" target="_blank" rel="noopener noreferrer">
        <img style="width:120px; height:40px;" src="https://goplausible.mypinata.cloud/ipfs/QmWjvCGPyL9zmA5B84WPqLYF27dL2nFgr1Lw6rMd7CpQPV/images/goPlausible-logo-type-h.png" alt="GoPlausible" />
      </a>
      <br />
      <a href="https://goplausible.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> &nbsp;|&nbsp;
      <a href="https://goplausible.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
      <br />&copy; GoPlausible 2025
    </div>
  </div>

  <script>
    const utf8Text = ${jsUtf8};
    const dataText = ${jsData};
    const linkUrl = "${pageUrl}";

    function showView(view) {
      document.getElementById('view-image').style.display = view === 'image' ? 'block' : 'none';
      document.getElementById('view-utf8').style.display = view === 'utf8' ? 'block' : 'none';
      document.getElementById('btn-image').classList.toggle('active', view === 'image');
      document.getElementById('btn-utf8').classList.toggle('active', view === 'utf8');
    }

    async function copyImage(btn) {
      try {
        const img = document.getElementById('qr-img');
        const c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        c.getContext('2d').drawImage(img, 0, 0);
        const blob = await new Promise(r => c.toBlob(r, 'image/png'));
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        flash(btn);
      } catch { flash(btn, 'Failed'); }
    }

    async function copyText(which, btn) {
      const text = which === 'utf8' ? utf8Text : which === 'data' ? dataText : linkUrl;
      try {
        await navigator.clipboard.writeText(text);
        flash(btn);
      } catch { flash(btn, 'Failed'); }
    }

    function flash(btn, msg) {
      const orig = btn.textContent;
      btn.textContent = msg || 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
    }
  </script>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── Landing page ────────────────────────────────────────────────────────────

function landingPage(baseUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>QRClaw — Instant QR Code Smart Links</title>
  <link rel="icon" href="https://goplausible.com/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Generate shareable QR code smart links with rich previews — instantly, for any text or URL." />
  <meta property="og:title" content="QRClaw — Instant QR Code Smart Links" />
  <meta property="og:description" content="Generate shareable QR code smart links with rich previews." />
  <meta property="og:type" content="website" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      color: #e2e8f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .hero {
      text-align: center;
      max-width: 600px;
      width: 100%;
    }
    .logo {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #38bdf8, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }
    .tagline {
      font-size: 1.1rem;
      color: #94a3b8;
      margin-bottom: 2.5rem;
    }
    .input-group {
      display: flex;
      gap: 0;
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(148,163,184,0.1);
    }
    input[type="text"] {
      flex: 1;
      padding: 1rem 1.25rem;
      font-size: 1rem;
      border: none;
      outline: none;
      background: #1e293b;
      color: #f1f5f9;
      font-family: inherit;
    }
    input[type="text"]::placeholder { color: #64748b; }
    button {
      padding: 1rem 1.75rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      transition: opacity 0.2s;
      white-space: nowrap;
    }
    button:hover { opacity: 0.9; }
    button:disabled { opacity: 0.5; cursor: wait; }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1.25rem;
      margin-top: 3rem;
      max-width: 600px;
      width: 100%;
    }
    .feature {
      text-align: center;
      padding: 1.25rem 1rem;
      background: rgba(30,41,59,0.6);
      border-radius: 12px;
      border: 1px solid #334155;
    }
    .feature-icon { font-size: 1.75rem; margin-bottom: 0.5rem; }
    .feature-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem; }
    .feature-desc { font-size: 0.78rem; color: #94a3b8; }
    .api-hint {
      margin-top: 2.5rem;
      padding: 1rem 1.25rem;
      background: rgba(30,41,59,0.6);
      border-radius: 10px;
      border: 1px solid #334155;
      font-size: 0.82rem;
      color: #94a3b8;
      max-width: 600px;
      width: 100%;
    }
    .api-hint code {
      background: #0f172a;
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.85em;
      color: #38bdf8;
    }
    .footer {
      margin-top: 3rem;
      font-size: 0.7rem;
      color: #475569;
    }
    .footer a { color: #64748b; text-decoration: none; }
    .footer a:hover { color: #94a3b8; }
  </style>
</head>
<body>
  <div class="hero">
    <div class="logo">&#x1F99E; QRClaw</div>
    <div class="tagline">Instant QR code smart links with rich previews</div>
    <form class="input-group" id="form">
      <input type="text" id="q" placeholder="Paste any URL or text..." autocomplete="off" required />
      <button type="submit" id="btn">Generate</button>
    </form>
  </div>

  <div class="features">
    <div class="feature">
      <div class="feature-icon">&#x1F99E;</div>
      <div class="feature-title">Solves OpenClaw QRCode</div>
      <div class="feature-desc">Finally, QR codes that work with OpenClaw</div>
    </div>
    <div class="feature">
      <div class="feature-icon">&#x1F916;</div>
      <div class="feature-title">Agentic Ready</div>
      <div class="feature-desc">Claude Code, Open Code, Copilot &mdash; any agentic CLI and UI</div>
    </div>
    <div class="feature">
      <div class="feature-icon">&#x1F5BC;</div>
      <div class="feature-title">UTF-8 &amp; Image</div>
      <div class="feature-desc">Supports both terminal (UTF-8) and web (image) QR codes</div>
    </div>
    <div class="feature">
      <div class="feature-icon">&#x26A1;</div>
      <div class="feature-title">Instant</div>
      <div class="feature-desc">QR generated in milliseconds at the edge</div>
    </div>
    <div class="feature">
      <div class="feature-icon">&#x1F517;</div>
      <div class="feature-title">Smart Links</div>
      <div class="feature-desc">Rich previews on social media &amp; messaging</div>
    </div>
    <div class="feature">
      <div class="feature-icon">&#x23F3;</div>
      <div class="feature-title">24h TTL</div>
      <div class="feature-desc">Links auto-expire — clean &amp; ephemeral</div>
    </div>
  </div>

  <div class="api-hint">
    <strong>Usage:</strong> <code>GET ${escapeHtml(baseUrl)}/?q=your-text</code> &rarr; redirects to the QR code smart link page
  </div>

  <div class="footer">Powered by <a href="https://goplausible.com" target="_blank">GoPlausible</a></div>

  <script>
    document.getElementById('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('q').value.trim();
      if (!val) return;
      window.location.href = '/?q=' + encodeURIComponent(val);
    });
  </script>
</body>
</html>`;
}

// ─── Worker ──────────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const baseUrl = env.BASE_URL || url.origin;

    // GET /q/:uuid — serve smart-link HTML page
    const pageMatch = url.pathname.match(/^\/q\/([a-f0-9]{32})$/);
    if (pageMatch) {
      const uuid = pageMatch[1];
      const html = await env.QRCLAW_KV.get(`page--${uuid}`);
      if (!html) return new Response("Not found", { status: 404 });
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" },
      });
    }

    // GET /image/:uuid.jpeg — serve QR image
    const imgMatch = url.pathname.match(/^\/image\/([a-f0-9]{32})\.jpeg$/);
    if (imgMatch) {
      const uuid = imgMatch[1];
      const b64 = await env.QRCLAW_KV.get(`image--${uuid}`);
      if (!b64) return new Response("Not found", { status: 404 });
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      return new Response(bytes, {
        headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600" },
      });
    }

    // GET /?q=<string> — generate QR + smart link
    if (url.pathname === "/" || url.pathname === "") {
      const q = url.searchParams.get("q");
      if (!q) {
        return new Response(landingPage(baseUrl), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      const uuid = crypto.randomUUID().replaceAll("-", "");
      const qrBase64 = await generateQrJpegBase64(q);
      const qrUtf8 = generateQrUtf8(q);
      const qrImageUrl = `${baseUrl}/image/${uuid}.jpeg`;
      const smartLink = `${baseUrl}/q/${uuid}`;

      const html = buildHTMLPage({ data: q, uuid, qrImageUrl, qrUtf8, baseUrl });

      await Promise.all([
        env.QRCLAW_KV.put(`image--${uuid}`, qrBase64, { expirationTtl: 86400 }),
        env.QRCLAW_KV.put(`page--${uuid}`, html, { expirationTtl: 86400 }),
      ]);

      // Content negotiation: JSON for terminal/API clients, redirect for browsers
      const accept = request.headers.get("Accept") || "";
      if (accept.includes("application/json")) {
        return new Response(
          JSON.stringify({ link: smartLink, qr: qrUtf8, data: q, expires_in: "24h" }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      return Response.redirect(smartLink, 302);
    }

    return new Response("Not found", { status: 404 });
  },
};
