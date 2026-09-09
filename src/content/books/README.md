# Catalogue

Titles, authors and genres were taken from the portfolio at
amazopublishers.com on 2026-09-02. Both sites are owned by the same company
and the rights to the catalogue and its artwork are held in common, so this
is reuse of internal assets.

**Two fields are deliberately absent, and should stay absent until real
values are known:**

- `blurb` — no descriptions were published for these titles. Writing our own
  would mean inventing descriptions of books we have not read.
- `pubDate` — no publication dates were published either. Undated titles sort
  after dated ones (see `getBooks` in `src/lib/content.ts`).

Jacket images live in `src/assets/covers/` and are referenced by the `cover:`
field. `BookCover.astro` falls back to a generated cover for any title without
one, so removing an image degrades gracefully rather than breaking the page.

This README is excluded by the loader pattern (`!**/README.md`).
