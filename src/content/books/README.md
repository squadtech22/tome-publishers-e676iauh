# Catalogue

Titles, authors and genres in this directory were taken from the portfolio
published at amazopublishers.com on 2026-09-02.

**Three fields are deliberately absent, and should stay absent until real
values are known:**

- `blurb` — no descriptions were published for these titles. Writing our own
  would mean inventing descriptions of real books we have not read.
- `pubDate` — no publication dates were published either. Undated titles sort
  after dated ones (see `getBooks` in `src/lib/content.ts`).
Jacket images in `src/assets/covers/` were downloaded from the same source on
2026-09-02 at the site owner's instruction. **This artwork belongs to the
books' publisher and illustrators** — confirm the right to use it on this
domain before launch. `BookCover.astro` falls back to a generated cover for
any title without a `cover:` field, so removing an image degrades gracefully
rather than breaking the page.

**Before this catalogue goes live**, confirm that TOME actually published these
titles. Each detail page emits `Book` structured data naming TOME as the
`publisher`, which asserts that claim to search engines in machine-readable
form. See `docs/DEPLOY.md`.

This README is excluded by the loader pattern (`!**/README.md`).
