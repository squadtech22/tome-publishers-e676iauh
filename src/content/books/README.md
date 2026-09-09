# Catalogue

Titles, authors and genres in this directory were taken from the portfolio
published at amazopublishers.com on 2026-09-02.

**Three fields are deliberately absent, and should stay absent until real
values are known:**

- `blurb` — no descriptions were published for these titles. Writing our own
  would mean inventing descriptions of real books we have not read.
- `pubDate` — no publication dates were published either. Undated titles sort
  after dated ones (see `getBooks` in `src/lib/content.ts`).
- `cover` — the real jacket artwork belongs to its publisher and illustrators.
  Until licensed copies are supplied, `BookCover.astro` draws a generated
  cover instead. Add `cover:` to frontmatter and it switches automatically.

**Before this catalogue goes live**, confirm that TOME actually published these
titles. Each detail page emits `Book` structured data naming TOME as the
`publisher`, which asserts that claim to search engines in machine-readable
form. See `docs/DEPLOY.md`.

This README is excluded by the loader pattern (`!**/README.md`).
