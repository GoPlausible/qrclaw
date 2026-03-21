---
name: qrclaw
description: "Generate QR codes for any string or URL using the QRClaw service (qrclaw.goplausible.xyz). Use this skill whenever the user asks to create a QR code, generate a scannable code, share a link as a QR, make something scannable, or needs a visual/terminal-friendly QR representation of text or URLs. Also use when the user says 'make a QR', 'QR code for this', 'generate QR', 'scannable link', or wants to share content via QR. Covers both terminal (UTF-8 block characters) and web (image smart link) output formats."
---

# QRClaw — QR Code Generation for Agents

QRClaw is an edge service that generates QR codes from any string and returns both a shareable smart link (with rich social previews) and a UTF-8 text QR code that renders directly in terminals.

## When to Use This

- User asks to generate a QR code for a URL, text, or any string
- User wants a scannable representation of data
- User needs to share a link with a rich preview (social media, messaging)
- User wants a QR code they can paste into a terminal, chat, or document
- An MCP tool or workflow produces a URI that should be made scannable

## API

**Single endpoint — one GET request does everything.**

```
GET https://qrclaw.goplausible.xyz/?q=<url-encoded-string>
```

### For agents and CLI tools (JSON response)

**You must always include the `Accept: application/json` header.** Without it, the service returns a 302 redirect to the HTML page instead of JSON data. Agents cannot parse the redirect — they need the JSON response containing the `qr` and `link` fields.

```bash
curl -H "Accept: application/json" "https://qrclaw.goplausible.xyz/?q=$(python3 -c 'import urllib.parse; print(urllib.parse.quote("YOUR STRING HERE"))')"
```

Response:

```json
{
  "link": "https://qrclaw.goplausible.xyz/q/abc123def456...",
  "qr": "██████████████...\n█ ▄▄▄▄▄ █...",
  "data": "YOUR STRING HERE",
  "expires_in": "24h"
}
```

| Field | Description |
|-------|-------------|
| `link` | Smart link URL — shareable page with image QR, OG/Twitter meta tags, copy buttons |
| `qr` | UTF-8 block-character QR code — paste directly into terminal or code block |
| `data` | The original input string |
| `expires_in` | TTL — always `"24h"` |

### For browsers (redirect)

Without the `Accept: application/json` header, the endpoint redirects (302) to the smart link page.

## How to Display Results

After calling the API, present **both** outputs to the user:

### 1. UTF-8 QR (for terminals and inline display)

Paste the `qr` field inside a code block. The block characters render as a scannable QR in most terminals and monospace-font contexts.

````
```
<paste qr field here>
```
````

### 2. Smart link (for sharing)

Provide the `link` URL. The page includes:
- Scannable QR code image
- UTF-8 toggle view
- Copy buttons (image, UTF-8 text, original data, page link)
- Full Open Graph and Twitter Card metadata for rich previews

### Example agent response format

```
Here's your QR code:

\`\`\`
█████████████████████████████████████████████████████████
██ ▄▄▄▄▄ █  ▀  ▀▀▄ ▄ ██▀ █▄▀█▀█ █▀▄▄▄██▀█ ▀▄ ▀██ ▄▄▄▄▄ ██
██ █   █ █▀▄██▀█▄▄▀█▀█ █▀ ▄▄▀▄▄ ▀ ▀██▄ █▀  ▀▀▄▀█ █   █ ██
██ █▄▄▄█ █ ▄█ ▄▀█  █  ▄▀ ▄ ▄▄▄ ▀▄▄▄ ▄▀▀▀ ▄▀  ███ █▄▄▄█ ██
██▄▄▄▄▄▄▄█▄▀ █▄█▄█▄█ ▀▄█ █ █▄█ ▀▄█ ▀ █ █▄▀▄█▄█▄█▄▄▄▄▄▄▄██
████▀ ▀▀▄▀▀ █▄▄▀▄█▀ █▀██▀     ▄▄██▀▀█ ▀▀▀▀▄ ▀█▄▀█ ▄ █ ▄██
███▄▄ █▄▄▀▀▄█▀▀▄██▄▀██     ▄▄██▄█▀  █▀▄█▀ █▄  ▀ █▀▀▀ ▀▄██
███ █▄▀█▄▄██▀██ ▀▄▀ ▀   ▀█▀███ ▀▀▀ ▄▄▀ ▄▀ █▄█▀█▀▄▀▄ █████
██▀▀▄ ▄▄▄ ▄▄ █▄ ██▄ ▄▄  ▄▀▄  ▄█▀▄█▄██▄█ ▄▄▀▀█ ▄▄▄ ▀▀ ▄▀██
██ ▄ ▄█▀▄█▄ ▀ ▄█▄▄▄ ▀▄▀▀▄█  ▄█▄ ▀▀█▄▄█  ▄█▀▄▄▀ ▄▄██ ▄▀▀██
██▄▄▀▀▀█▄▀█▄▄  ▄▄▀  █   ▀▀▀▀ ▄▀█▄▄█▄ ▄▄▄██▄ ▄█ █▀▄ ██  ██
██ █▀▀█▀▄ ▄▄▀█ ▀▀▄▄▀ ▀█▄▄█ ▀ ▀▄ ▄ ▀▀ ▄▄ █▀▀▀█ █ ▄▄█  ████
████ █ ▄▄ █▀██ ██▀█▀  ▀█▀▀█▄▀▄ ▄▄▄▀▀▀▀ ▀ ▄▀▄▀ ▄▄▀▀▄ ▄▀▀██
██  ▄█ ▄▄▄ ▀█ ▀█▄ ▀█▄ ▀▀█▄ ▄▄▄ ▀▄▄█ ▀██  ▀▄▀▄▄ ▄▄▄   █▀██
██▀ ▄▄ █▄█ █  ▄█  ▀█ ▀ ▀█▄ █▄█ ▀▀█ ▄█▄▀▀▄ ▄▀▄▀ █▄█ ▀ ▀▀██
██▀▄▀▄  ▄▄▄▀▄ ██▀ ▄ ▄ █▀▀▄  ▄  █ ▄ ▄▄▀ █▀ █▄▄▄ ▄▄▄▄    ██
██ ▀▀▄█▀▄ ▄▄▄▀    ▀▀ ▄▀██▄▄▀█▄█ ▄▄▀█▄▄  ▄ ▄▀▄█▄ ▀ ▀ ▄▀███
████ ▀▄▀▄ ▄ ▀ ▀▄▄ ▄█▄█▄██▄█ ▄ ▀▄ ▀▀██ ▀▀█ ▀█▄▀   ▀██▄▄███
██ █ ▀▄▄▄ ▄██ ▄▀█  ▀▄ █ ▀▄ ██▄▀█  █  ▀ █▀ ▀██ ▄▀▀▀▄▀   ██
██  ▄ ▀ ▄ █▀ █ █▄▀ ▄▄ ▀▄█ ▀▀▄▀▀█ █ ▀█▀▄██  ▄█▀█▀████▀ ▄██
███▀▀█▄ ▄▄▄█▄ ▀████▀▄▀▀█▄█▄▄ ▀▀█ ▄▀▄▄   █ ▀ ▀ ▄██▄ █▀ ▄██
██▄██ █ ▄██▀ ▄▀█▀▀█▄█▀█▄ █ █▄ ▀█▄▄█ ▄▀█▀  ▀▀▄▄▄▀ ▄▄ ▀ ▄██
██▄ ▀▄▄▄▄▄█▄█▀▄ ▀ █▀██ ▀▀▀  ▄ ███▄ ▀▀▀█▄▀ ▀▀█ ▀██▀  ▄▄███
█████▄██▄▄▀▄▄▄▄ ▄▀▄█▀▀█▀▀  ▄▄▄ ▀█▀ █ █▄▀ ▀▄ ██ ▄▄▄ █▀█▀██
██ ▄▄▄▄▄ ███ ▀ ▀  ▀█▄ ▀██  █▄█ ▀▀ ▄▀▀▄▀▀███▀▀█ █▄█ ▄▀▄ ██
██ █   █ █▀ ▄▄ ▄▀ ▄    ▄▄▀▄▄ ▄ ▀ ▄▄▄█▄▀▄ ▀  ▀ ▄ ▄▄▄ ▄  ██
██ █▄▄▄█ ██ █▄▄ █▄▀▄▀██▄▀▀▀█▀▀ ██▄ ▄█▀█▄ █▀▀█▄▄▀▄ ▄  ▀▄██
██▄▄▄▄▄▄▄███▄██████▄█▄█▄▄██▄██▄█▄███▄▄█▄██▄█▄██▄█████▄███
█████████████████████████████████████████████████████████
...
\`\`\`

Smart link: https://qrclaw.goplausible.xyz/q/abc123...
(expires in 24 hours)
```

## Implementation Examples

### Using fetch (JavaScript/TypeScript)

```typescript
const input = "https://example.com";
const res = await fetch(
  `https://qrclaw.goplausible.xyz/?q=${encodeURIComponent(input)}`,
  { headers: { Accept: "application/json" } }
);
const { link, qr, data, expires_in } = await res.json();
```

### Using curl (shell)

```bash
INPUT="https://example.com"
RESPONSE=$(curl -s -H "Accept: application/json" \
  "https://qrclaw.goplausible.xyz/?q=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$INPUT'))")")
echo "$RESPONSE" | jq -r '.qr'
echo "Link: $(echo "$RESPONSE" | jq -r '.link')"
```

### Using Python

```python
import requests, urllib.parse

data = "https://example.com"
r = requests.get(
    f"https://qrclaw.goplausible.xyz/?q={urllib.parse.quote(data)}",
    headers={"Accept": "application/json"}
)
result = r.json()
print(result["qr"])
print(f"Link: {result['link']}")
```

### Using WebFetch (Claude Code / MCP agents)

Agents with a `WebFetch` tool can call QRClaw directly:

```
WebFetch("https://qrclaw.goplausible.xyz/?q=https%3A%2F%2Fexample.com", {
  headers: { "Accept": "application/json" }
})
```

Parse the JSON response to extract `qr` (UTF-8 QR code) and `link` (smart link URL), then display both to the user.

### Using WebSearch + WebFetch (discovery)

If an agent doesn't know the QRClaw URL, it can discover it:

```
WebSearch("QRClaw QR code generator goplausible")
```

Then use `WebFetch` with the discovered URL as shown above.

## Important Details

- **Input**: any string up to reasonable length (URLs, text, URIs like `algorand://...`, `bitcoin:...`, etc.)
- **Expiry**: all QR codes and smart links expire after 24 hours
- **No auth required**: the API is open, no API key needed
- **Rate limiting**: the service may rate-limit excessive requests; normal usage is fine
- **URL encoding**: always URL-encode the `q` parameter — special characters, spaces, `://` etc. must be encoded
- **The `qr` field uses inverted UTF-8 half-block characters** (`█`, `▀`, `▄`, ` `) which render best on dark backgrounds or in code blocks with monospace fonts

## Smart Link Page Features

Each generated link (`/q/<uuid>`) serves a full HTML page with:
- Toggle between image and UTF-8 QR views
- Copy buttons for: image (to clipboard), UTF-8 text, original data, and page URL
- Open Graph + Twitter Card meta tags for rich previews when shared
- Mobile-friendly responsive design
- GoPlausible branding and footer

## Combining with Other Tools

QRClaw works well as the final step in workflows:
- Generate an Algorand ARC-26 URI, then pass it to QRClaw for a scannable QR
- Create a payment link, then make it scannable
- Build any deep link or app URI scheme and make it shareable
- Share WiFi credentials, calendar events, or vCards as QR codes

The pattern is always: **produce a string** → **send to QRClaw** → **get back a scannable QR + shareable link**.
