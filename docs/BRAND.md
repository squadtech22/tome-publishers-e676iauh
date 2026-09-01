# TOME Publishers — Brand Implementation Notes

All tokens live in `src/styles/tokens.css`. That file is the single source of
truth: **never hardcode a hex value or font stack anywhere else.**

## Colour

| Token | Hex | Use |
|---|---|---|
| `--color-burgundy` | `#2B0F14` | Primary dark ground (header, hero) |
| `--color-charcoal` | `#201C1D` | Neutral dark (footer) |
| `--color-ivory` | `#F5F0E6` | Light ground, text on dark |
| `--color-gold` | `#E8C77A` | Antique Gold — accent, **text-safe on dark** |
| `--color-rule-gold` | `#C9A45E` | Muted Gold — **decorative only** |

### The one hard rule

Muted Gold on Warm Ivory is roughly **2:1** contrast and fails WCAG AA for text
at any size. On ivory it is valid for rules, dividers and oversized decorative
numerals only. Body copy and labels on ivory must use Charcoal or Burgundy.

This is why the token is named `--color-rule-gold` rather than
`--color-gold-muted` — the name is meant to make the wrong choice feel wrong.

Verified pairings: gold-on-burgundy ~9:1, ivory-on-burgundy ~15:1,
charcoal-on-ivory ~15:1. All pass.

## Type

| Role | Family | Token |
|---|---|---|
| Logo / wordmark | Rockwell Extra Bold | `--font-wordmark` |
| Display / headlines | Cormorant Garamond 600/700 | `--font-display` |
| Editorial / book titles / quotes | EB Garamond 400/500 | `--font-editorial` |
| Body, UI, labels, numerals | Inter | `--font-body` |

Cormorant Garamond, EB Garamond and Inter are self-hosted via Fontsource
(imported in `src/layouts/Base.astro`) — no external font CDN, so no third-party
request and no CSP exception needed.

### ⚠️ Rockwell is not shipped

Rockwell is a licensed Monotype face and is **not** loaded as a webfont.
`src/components/Wordmark.astro` is a **placeholder** that renders SVG `<text>`
against a fallback slab stack (Zilla Slab → Georgia).

**Before launch:** export the wordmark from the brand file as outlined SVG paths
and replace the `<text>` elements. Outlined paths need no font licence and
render identically everywhere.

### Scale

Fluid `clamp()` values covering the brand board's ranges:

`h1` 52→80 · `h2` 36→56 · `h3` 28→36 · `h4` 20→26 · body 17→19 · small 13→15 · label 11→13

## Custom utilities

- `.label` — Inter 600, uppercase, `0.16em` tracking. Eyebrows and nav.
- `.editorial` — EB Garamond, 1.6 line-height. Long-form and pull quotes.
- `.metadata` — Inter 500, tabular numerals. Dates, prices, ISBNs.
