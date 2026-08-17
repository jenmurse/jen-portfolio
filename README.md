# jenmurse.com

The personal portfolio site of **Jen Murse** — multidisciplinary designer and creative leader.

**Live:** [jenmurse.com](https://jenmurse.com) · `jennifermurse.com` redirects here

## What it is

A single-page, text-led portfolio. No CMS, no framework, no build step — hand-written HTML, CSS and
a small amount of JavaScript, served as-is. The page is a two-column editorial layout: a bio and a
set of linked lists, with a silent looping sizzle reel and a custom cursor that reacts to links.

## Built with

| | |
|---|---|
| **Markup / styles** | Plain HTML and CSS, all design tokens as custom properties on `html {}` |
| **Scripts** | `main.js` — custom cursor and video playback control. No dependencies. |
| **Type** | Satoshi (Fontshare) and DM Mono (Google Fonts), with local fallbacks in `fonts/` |
| **Hosting** | Vercel — pushes to `main` deploy automatically |
| **DNS** | Name.com → Vercel |

## Layout

```
index.html      # the page
styles.css      # all styles, tokens declared on :root
main.js         # cursor + video
fonts/          # local fallbacks for Satoshi, DM Sans, DM Mono
favicon.svg
OG_image_jen_murse.png   # 1200×630 social card
```

[`DOCS.md`](DOCS.md) carries the full design system — colour tokens, type scale, and the reasoning
behind them.

## Running it

There is nothing to install and nothing to compile. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## Credit

Design and build by Jen Murse. Typefaces are licensed from their foundries and are not covered by
this repository.
