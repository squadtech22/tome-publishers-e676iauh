---
name: "Example Author"
role: "Novelist"
location: "City, Country"
bio: "One or two sentences, drawn only from what the author or their publisher has already made public."
draft: true
---

Template profile. `draft: true` keeps it out of the production build, and it is
ignored regardless because no book lists "Example Author" — `getAuthors()`
joins profiles to books, never the other way round.

It exists so the `authors` collection is never empty, which otherwise makes
Astro warn on every page that calls `getCollection('authors')`.

Copy it to `<slug>.md`, where the slug equals `toSlug(name)`.
