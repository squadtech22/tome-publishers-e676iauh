# Author profiles

This directory is currently **empty of profiles**. Author pages are still
generated for every author who has a book — `getAuthors()` treats books as the
source of truth and joins a profile only when one exists.

To add a profile, create `<slug>.md` where the slug equals `toSlug(name)` from
`src/lib/content.ts`, and set `name` to match the `author` string in book
frontmatter **exactly**. For example `Judy Shank Cyg` → `judy-shank-cyg.md`.

Do not write biographies for real authors from guesswork — use only details
they or their publisher have made public.

This README is excluded by the loader pattern (`!**/README.md`).
