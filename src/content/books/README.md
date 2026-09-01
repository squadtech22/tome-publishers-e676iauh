# Placeholder catalogue

Every book in this directory is **fictional** — invented titles, authors and
blurbs used to exercise the layout. The ISBNs are deliberately invalid
(`978-1-00000-00X-X`) so they cannot be mistaken for real registrations.

Delete all of them when the real catalogue arrives. Frontmatter must match the
`books` schema in `src/content.config.ts`; the build fails loudly if it does not.

This README is excluded explicitly by the loader pattern in
`src/content.config.ts` (`!**/README.md`). A plain `**/*.md` glob would try to
validate it against the book schema and fail the build.
