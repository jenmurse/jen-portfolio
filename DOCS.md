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
├── index-with-work.html    # Alt layout with Select Work 3rd column
├── styles.css              # All global styles (shared across pages)
├── main.js                 # Cursor + video controls (shared across pages)
├── favicon.svg             # Orange circle
├── OG_image_jen_murse.png  # 1200×630 social share image
├── jen-sizzle-2026.mp4     # Sizzle reel (1920×1080, 16:9, ~1min, silent loop)
├── fonts/                  # Local font fallbacks
│   ├── Satoshi/
│   ├── DM_Sans/
│   └── DM_Mono/
└── .gitignore              # Ignores: work/, mockups/, .DS_Store, OG_image.ai
```

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#fff6f5` | Page background |
| `--text` | `#111111` | Body text, wordmark |
| `--accent` | `#ff4f00` | Labels, numbers, arrows, cursor hover |
| `--sub` | `rgba(17,17,17,0.4)` | Dimmed/unlinked list items |
| `--border` | `rgba(17,17,17,0.12)` | Dividers |

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
```

### Layout
- Max content width: **1200px**
- Desktop padding: `56px 40px 32px`
- Mobile breakpoint: **680px**
- Mobile padding: `28px 28px 48px`
- Hero grid: `240px left column | 1fr right column`, `80px gap`
- List grid: `1fr 1fr` (2 col) or `1fr 1fr 1fr` (3 col with Select Work)

### Cursor
Custom cursor replaces system cursor sitewide.
- **Default:** 11px black dot
- **On hover (links, video):** 32px accent-colored dot, `mix-blend-mode: multiply` — creates see-through effect over page content
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
