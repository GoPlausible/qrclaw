import { PhotonImage } from "@cf-wasm/photon";
import { generate } from "@juit/qrcode";

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

// ─── HTML smart-link page ────────────────────────────────────────────────────

function buildHTMLPage({
  data,
  uuid,
  qrImageUrl,
  baseUrl,
}: {
  data: string;
  uuid: string;
  qrImageUrl: string;
  baseUrl: string;
}): string {
  const truncated = data.length > 80 ? data.slice(0, 77) + "..." : data;
  const title = `QR Code — ${truncated}`;
  const description = `Scan or click to open: ${truncated}`;
  const pageUrl = `${baseUrl}/q/${uuid}`;

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
      max-width: 500px;
      margin: 0 auto;
    }
    h1 { font-size: 1.4rem; margin-bottom: 1rem; }
    .qr { margin-bottom: 1.5rem; }
    .qr img {
      width: 100%;
      max-width: 360px;
      box-shadow: 0 4px 14px #607D8B;
      border-radius: 16px;
    }
    .data {
      font-size: 0.85rem;
      font-family: monospace;
      word-break: break-all;
      background: #f1f5f9;
      padding: 0.75rem;
      border-radius: 6px;
      margin-top: 1rem;
    }
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
    <div class="qr">
      <img src="${qrImageUrl}" alt="QR Code" />
    </div>
    <div class="data">${escapeHtml(data)}</div>
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
    <div class="logo">QRClaw</div>
    <div class="tagline">Instant QR code smart links with rich previews</div>
    <form class="input-group" id="form">
      <input type="text" id="q" placeholder="Paste any URL or text..." autocomplete="off" required />
      <button type="submit" id="btn">Generate</button>
    </form>
  </div>

  <div class="features">
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
      const qrImageUrl = `${baseUrl}/image/${uuid}.jpeg`;
      const smartLink = `${baseUrl}/q/${uuid}`;

      const html = buildHTMLPage({ data: q, uuid, qrImageUrl, baseUrl });

      await Promise.all([
        env.QRCLAW_KV.put(`image--${uuid}`, qrBase64, { expirationTtl: 86400 }),
        env.QRCLAW_KV.put(`page--${uuid}`, html, { expirationTtl: 86400 }),
      ]);

      return Response.redirect(smartLink, 302);
    }

    return new Response("Not found", { status: 404 });
  },
};
