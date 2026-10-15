# jenmurse.com — Project Documentation

## Overview
Single-page portfolio site. Text-led, no CMS. Hosted on Vercel, auto-deploys from GitHub on push.

**Live:** jenmurse.com
**Redirect:** jennifermurse.com → jenmurse.com
**Domains:** Name.com → Vercel DNS

---

## File Structure

```
/
├── index.html              # Main page
├── README.md               # Public-facing: what this is, stack, how to run
├── styles.css              # All global styles (shared across pages)
├── main.js                 # Cursor + video controls (shared across pages)
├── favicon.svg             # Blue circle (the Mer So blue)
├── OG_image_jen_murse.png  # 1200×630 social share image
├── jen-sizzle-2026.mp4     # Sizzle reel (1920×1080, 16:9, ~1min, silent loop)
├── playground.css          # Playground theme: black background, breadcrumb, footer at the foot of short pages
├── playground/
│   ├── index.html          # Playground index
│   └── cobo-visuals/       # Case study: index.html, 16 clips (NN.mp4 + NN.jpg), night.mp4 + night.jpg (phone triptych), set.js (the whole-set player's
│                           #   shaders, written by tools/site_player.py in the Cobo Visuals project)
├── fonts/                  # Local font fallbacks
│   ├── Satoshi/
│   ├── DM_Sans/
│   └── DM_Mono/
└── .gitignore              # Ignores: work/, mockups/, Portfolio - OLD/, .DS_Store, *.ai
```

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#f4f4f2` | Page background (stone, shared with mersostudio.com) |
| `--text` | `#111111` | Body text, wordmark |
| `--accent` | `#2961F6` | Labels, numbers, arrows, cursor hover (the Mer So blue, shared with mersostudio.com) |
| `--sub` | `rgba(17,17,17,0.4)` | Dimmed/unlinked list items (Playground sets it to `--text`: no grey text there) |
| `--media-bg` | `#000` | Behind videos and canvases while they load |
| `--border` | `rgba(17,17,17,0.12)` | Dividers |
| `--hairline` | `transparent` | Edge around media frames; off on stone, kept as one token to turn back on |

### Typography
All type is controlled via CSS custom properties on `html {}`.

**Fonts:**
- Sans: **Satoshi** (primary) — loaded from Fontshare CDN, local fallback at `/fonts/Satoshi/`
- Mono: **DM Mono** — loaded from Google Fonts CDN, local fallback at `/fonts/DM_Mono/`
- DM Sans is available as a fallback sans if needed (`/fonts/DM_Sans/`)

**Type tokens:**
```css
/* Wordmark */
--w-scale: 0.75       /* font-size multiplier against 0.85rem base */
--w-tracking: 0.04em
--w-weight: 700
--w-lh: 1.2

/* Hero header (large bio text) */
--h-scale: 0.95       /* multiplier against clamp(1.5rem, 2.6vw, 3rem) */
--h-tracking: -0.02em
--h-weight: 450
--h-lh: 1.15

/* Hero subhead (personal bio) */
--s-scale: 1.2        /* multiplier against 1.05rem base */
--s-tracking: -0.01em
--s-weight: 400
--s-lh: 1.5

/* List items */
--list-scale: 0.9     /* multiplier against 0.85rem base */
--list-weight: 500

/* Labels (section headers, numbers) */
--label-scale: 1
--label-weight: 500

/* Copyright */
--copy-weight: 300

/* Sizes: every piece of text uses one of these */
--fs-label      /* mono labels, numbers, footer */
--fs-mono       /* mono controls and arrows */
--fs-list       /* list items, captions, small copy */
--fs-secondary  /* subheads and prose */
--fs-primary    /* hero and page titles */
--mono-tracking: 0.12em
```

### Spacing
One scale on `:root`, used by every page. Never a loose px value: pick the nearest step.
`--space-4 · 8 · 12 · 16 · 20 · 28 · 40 · 56 · 80 · 120` (each step about 1.4× the last)

### Layout
- Max content width: **1200px**
- Desktop padding: `56 40 28`
- Mobile breakpoint: **680px**
- Mobile padding: `28 28 40`
- Grid: **12 columns** (`--grid`), `--gutter` 28px. Labels take columns 1–3, content 4–12. Everything is placed on these lines (`grid-column: 1 / 4`, `4 / -1`, …), never by a loose width. Below 680px every grid collapses to one column
- Hero and Playground sections use the grid directly; the landing lists split the content 4 + 5 (`4 / 8`, `8 / -1`)
- Inside a section's nine content columns, a phone moment takes 3 for the screen and 3 for its text; the Playground index takes 5 for the tile and 4 for its name
- Playground pages load `playground.css` on top: breadcrumb, sections, facts row, media grid

### Cursor
Custom cursor replaces system cursor sitewide.
- **Default:** 11px black dot
- **On hover (links, video, Playground pieces):** 32px accent-colored dot, `mix-blend-mode: multiply` — creates see-through effect over page content
- No system cursor anywhere on desktop, links and buttons included (`cursor: inherit`); the lightbox carries the dot into its top layer while open
- On mobile: system cursor, `cursor: none` not applied

### Video
Full-bleed 16:9 sizzle reel. Autoplay, muted, looping, no controls UI by default.
- Click to pause/play (brief label flashes to confirm)
- Hover to reveal restart + pause buttons (bottom right)
- On mobile: video reorders above the links list (CSS `order: -1`)

---

## Video Hosting Options

Currently the video is committed to the GitHub repo (82MB, under GitHub's 100MB per-file limit) and served directly by Vercel.

### Current approach: GitHub + Vercel
- ✅ Simple, free, no extra tooling
- ✅ Auto-deploys with the rest of the site
- ⚠️ 82MB is close to the 100MB GitHub file limit
- ⚠️ If the video is replaced/updated with a larger file, this could break

### Git LFS (Large File Storage)
- Stores large files outside the repo, tracked via a pointer
- Free up to 1GB storage / 1GB bandwidth per month on GitHub
- Requires `git lfs install` and tracking setup
- Best if video changes frequently or grows in size

### Cloudinary
- Third-party media hosting with on-the-fly resizing, format conversion, and a CDN
- Video is referenced via URL, not in the repo
- Free tier available
- Overkill for a single video, but good if you later add many images/videos

### Recommendation
Keep as-is unless the file exceeds 100MB or you start adding more videos. At that point, Git LFS is the lowest-friction upgrade.

---

## Playground Pages
Load `styles.css` then `playground.css`. Header: `.hero-left` holds the wordmark and `<a class="crumb" href="/playground/">Playground</a>`;
the title is an `h1.hero-primary` with a `p.hero-secondary.subtitle` under it. Rows of label + text use `.pg-row` so each label
lines up with the top of its text. The 16 Cobo clips are about 110 MB in the repo; Git LFS is the next step if more video lands.

### iPhone frame (`iphone-frame.css`)
A phone around a screen recording or a hand-built screen: bezel, Apple's continuous (squircle) corners, the Dynamic Island, and optional status bar and home indicator. Drawn to iPhone 16 Pro Max geometry so it fits the 1320 x 2868 recordings (Uniform's). Not used by any page yet. Load it after `playground.css` and wrap the existing media:

```html
<figure class="iphone"><div class="iphone__screen"><video …></video></div></figure>
```

It sizes by width (inside `.moment` it fills the column; `--frame-radius` is no longer needed there). `.iphone--no-island` drops the island for media that already shows one. A local demo is `mockups/iphone-frame.html` (ignored by git). It came from the Quiet Surface landing page, 2026-10-13.

The corners are SVG paths, not `border-radius`: a circular arc at a phone's radius reads as blobby. To redraw for another device (different screen size, radius or bezel), generate new paths with this (figma-squircle, smoothing 0.6) and replace the `mask` and `background` data URIs:

```python
import math, sys
def f(x): return f"{x:.2f}".rstrip('0').rstrip('.')
def squircle(w, h, r, s=0.6, x0=0, y0=0):
    m = min(w, h) / 2
    r = min(r, m)
    p = min((1 + s) * r, m)
    s = min(s, p / r - 1)
    arc_m = 90 * (1 - s)
    arc = math.sin(math.radians(arc_m / 2)) * r * math.sqrt(2)
    alpha = (90 - arc_m) / 2
    p34 = r * math.tan(math.radians(alpha / 2))
    beta = 45 * s
    c = p34 * math.cos(math.radians(beta))
    d = c * math.tan(math.radians(beta))
    b = (p - arc - c - d) / 3
    a = 2 * b
    A, B, C, D, R, L = map(f, (a, a + b, a + b + c, d, r, arc))
    bc = f(b + c)
    return (f"M{f(x0 + w - p)} {f(y0)}"
            f"c{A} 0 {B} 0 {C} {D}a{R} {R} 0 0 1 {L} {L}c{D} {f(c)} {D} {bc} {D} {C}"
            f"L{f(x0 + w)} {f(y0 + h - p)}"
            f"c0 {A} 0 {B} -{D} {C}a{R} {R} 0 0 1 -{L} {L}c-{f(c)} {D} -{bc} {D} -{C} {D}"
            f"L{f(x0 + p)} {f(y0 + h)}"
            f"c-{A} 0 -{B} 0 -{C} -{D}a{R} {R} 0 0 1 -{L} -{L}c-{D} -{f(c)} -{D} -{bc} -{D} -{C}"
            f"L{f(x0)} {f(y0 + p)}"
            f"c0 -{A} 0 -{B} {D} -{C}a{R} {R} 0 0 1 {L} -{L}c{f(c)} -{D} {bc} -{D} {C} -{D}Z")
```

iPhone 16 Pro Max: screen 440 x 956pt, display corner 62, bezel 11 (body path: 462 x 978, corner 73).

**Known risk: black flash in Chrome.** On quietsurface.app (fixed 2026-10-13), Chrome blanked the phone screen to black for the length of each fade, because the screen was clipped by a squircle `mask`. This frame uses the same mask. If a page ever fades the phone, or swaps what's inside it (poster to video counts), rebuild it the way the Quiet Surface landing page now does: no mask on the screen (a plain `border-radius` + `overflow: hidden`, sized just inside the squircle hole, about 15% of the screen width); one static `::after` on `.iphone` that draws the shadow, the bezel (body path with the screen squircle as an `evenodd` hole, drawn once only) and a faint rim; no `will-change` inside the frame. Check at Retina density with headless Chrome at 2x (`--force-device-scale-factor=2`), not in a preview pane. Reference: `Mer So/quiet-surface/design/site/quiet-surface-landing-snap.html`, the `.sc-stage::after` and `.sc-screen` rules (commit 8a27b8a).

## Adding a New Page
1. Create `pagename.html` in root
2. Link `styles.css` and `main.js` in the `<head>` / before `</body>`
3. Add a `<div id="cursor">` at the top of `<body>`
4. Page-specific styles can go in a `<style>` block in that file

---

## Updating Content

| What | Where |
|---|---|
| Bio copy | `index.html` — `.hero-primary` and `.hero-secondary` |
| Project links | `index.html` — `.list-grid` |
| Video file | `index.html` line ~61 — `<source src="...">` |
| Background color | `styles.css` — `--bg` |
| Accent color | `styles.css` — `--accent` |
| OG image | Root folder + `index.html` og:image meta tag |
