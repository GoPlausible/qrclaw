# 🦞 QRClaw

**Instant QR code smart links with rich previews — powered by Cloudflare Workers.**

QRClaw generates shareable QR code pages from any string or URL. Each QR code gets a smart link with full Open Graph and Twitter Card metadata for rich previews when shared on social media, messaging apps, or embedded anywhere.

Built to solve the QR code rendering problem in agentic tools like [OpenClaw](https://github.com/nicepkg/openclaw), Claude Code, Copilot, and other CLI/UI agents.

## Features

- **Instant edge generation** — QR codes created in milliseconds on Cloudflare Workers
- **Smart links** — each QR gets a unique URL with rich social previews (OG + Twitter Cards)
- **UTF-8 + Image** — dual rendering: scannable image for web, UTF-8 block characters for terminals
- **24h TTL** — links auto-expire, keeping things clean and ephemeral
- **Copy everything** — one-click copy for image, UTF-8 text, source data, and smart link
- **Content negotiation** — returns JSON for API clients (`Accept: application/json`), redirects browsers to the QR page

## Quick Start

### Browser

Visit [`https://qrclaw.goplausible.xyz`](https://qrclaw.goplausible.xyz), paste any text or URL, and hit Generate.

### API / CLI

```bash
# Browser or curl — redirects to the smart link page
curl -L "https://qrclaw.goplausible.xyz/?q=https://example.com"

# JSON response for programmatic use
curl -H "Accept: application/json" "https://qrclaw.goplausible.xyz/?q=https://example.com"
```

JSON response:

```json
{
  "link": "https://qrclaw.goplausible.xyz/q/abc123...",
  "qr": "█▀▀▀▀▀█ ...",
  "data": "https://example.com",
  "expires_in": "24h"
}
```

### MCP / Agentic Tools

Any MCP-compatible agent can call QRClaw via HTTP:

```
GET https://qrclaw.goplausible.xyz/?q=<your-string>
Accept: application/json
```

The response includes a `qr` field with UTF-8 block characters that render directly in terminal-based agents, plus a `link` field for the full smart link page.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/?q=<string>` | Generate QR code. Redirects browsers to smart link; returns JSON for API clients. |
| `GET` | `/q/:uuid` | Smart link page with image/UTF-8 toggle, copy buttons, and social preview metadata. |
| `GET` | `/image/:uuid.jpeg` | Raw QR code JPEG image. |
| `GET` | `/` | Landing page (when no `q` parameter). |

## Smart Link Page

Each generated QR code gets a dedicated page with:

- **Image view** — high-quality scannable JPEG QR code
- **UTF-8 view** — terminal-friendly block character rendering
- **Copy buttons** — copy image, UTF-8 text, original data, or page link
- **Rich previews** — Open Graph and Twitter Card meta tags for social sharing
- **24h expiry** — auto-cleanup via Cloudflare KV TTL

## Architecture

```
┌─────────┐     GET /?q=hello     ┌──────────────────┐
│  Client  │ ──────────────────▶  │  Cloudflare Worker │
└─────────┘                       │                    │
                                  │  1. Generate QR    │
                                  │     @juit/qrcode   │
                                  │     + @cf-wasm/    │
                                  │       photon       │
                                  │                    │
                                  │  2. Build HTML     │
                                  │     with OG meta   │
                                  │                    │
                                  │  3. Store in KV    │
                                  │     (24h TTL)      │
                                  │                    │
                                  │  4. Return link    │
                                  │     or redirect    │
                                  └────────┬───────────┘
                                           │
                                  ┌────────▼───────────┐
                                  │   Cloudflare KV     │
                                  │                     │
                                  │  page--<uuid>  HTML │
                                  │  image--<uuid> JPEG │
                                  │       (base64)      │
                                  └─────────────────────┘
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm i -g wrangler`)
- A Cloudflare account with Workers and KV enabled

### Setup

```bash
git clone https://github.com/GoPlausible/qrclaw.git
cd qrclaw
npm install
```

### Local Development

```bash
npm run dev
# → http://localhost:8787
```

### Deploy

```bash
npm run deploy
```

### Configuration

**`wrangler.toml`**:

```toml
name = "qrclaw"
main = "src/index.ts"
compatibility_date = "2025-03-18"
compatibility_flags = ["nodejs_compat"]

[route]
pattern = "qrclaw.yourdomain.com/*"
zone_id = "your-zone-id"

[[kv_namespaces]]
binding = "QRCLAW_KV"
id = "your-kv-namespace-id"
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Public base URL for generated links | Auto-detected from request origin |

## Dependencies

| Package | Purpose |
|---------|---------|
| [`@juit/qrcode`](https://www.npmjs.com/package/@juit/qrcode) | QR code generation (PNG) — zero-dependency, Workers-compatible |
| [`qrcode`](https://www.npmjs.com/package/qrcode) | QR matrix generation for UTF-8 rendering via `QRCode.create()` |
| [`@cf-wasm/photon`](https://www.npmjs.com/package/@cf-wasm/photon) | Image processing (PNG → JPEG conversion) on Workers |

## Rate Limiting

- **5 QR codes per minute** per IP address
- Configured via Cloudflare Dashboard → Security → WAF → Rate limiting rules
- Blocks at the edge before the Worker runs — no code changes needed
- Exceeding the limit returns HTTP 429 (Too Many Requests)

## Input Validation

- Input is trimmed of leading/trailing whitespace
- Empty input returns 400 with a JSON error
- Maximum input length: **2048 characters** (QR codes with high error correction can't encode more)

## Install the QRClaw Skill

QRClaw includes an agent skill that teaches AI assistants (Claude Code, OpenClaw, Copilot, etc.) how to use the QRClaw API. There are several ways to install it:

### Via ClawHub (OpenClaw)

```bash
npx clawhub install qrclaw
```

The skill will be available immediately for your OpenClaw agent to use.

### Via skills.sh

```bash
npx skills add GoPlausible/qrclaw
```

This downloads and installs the QRClaw skill into your agent's skill directory.

### Manual Installation

Copy the `skill/` directory from this repo into your agent's skills folder:

```bash
# Claude Code
cp -r skill/SKILL.md ~/.claude/skills/qrclaw/SKILL.md

# Or clone and symlink
git clone https://github.com/GoPlausible/qrclaw.git
ln -s "$(pwd)/qrclaw/skill" ~/.claude/skills/qrclaw
```

## License

MIT — built by [GoPlausible](https://goplausible.com)
