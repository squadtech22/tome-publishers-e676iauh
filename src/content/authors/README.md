# Placeholder author profiles

All profiles here are **fictional**, matching the placeholder catalogue in
`../books/`. The `name` field must match the `author` string in book frontmatter
**exactly** — that string is how books are joined to profiles.

The filename becomes the URL slug and must equal `toSlug(name)` from
`src/lib/content.ts`. For example `Ibrahim Køhler` → `ibrahim-kohler.md`.

Authors without a profile still get a page, built from their books alone.
