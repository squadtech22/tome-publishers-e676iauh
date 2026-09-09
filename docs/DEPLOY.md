# Deploying tomepublishers.com

Astro 7 static output with one on-demand route, deployed to Vercel, with
transactional email through Resend.

## 1. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** for
Production, Preview and Development:

| Variable | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | From <https://resend.com/api-keys>. Never commit it. |
| `INQUIRY_TO_EMAIL` | `hello@tomepublishers.com` | Where author inquiries land. |
| `INQUIRY_FROM_EMAIL` | `noreply@tomepublishers.com` | Must be on a Resend-verified domain. |

Pull them locally with:

```bash
vercel env pull .env
```

`.env` is gitignored. Without `RESEND_API_KEY` the inquiry endpoint returns a
friendly 500 telling the author to email directly — it never fails silently.

## 2. Verify the domain in Resend

Resend will refuse to send `from:` an unverified domain. In the Resend
dashboard add `tomepublishers.com`, then create the DNS records it shows —
typically a DKIM `TXT` record and an `MX` record on the `send.` subdomain.

That subdomain `MX` **does not conflict** with the root `MX` records that serve
the existing `hello@` mailbox. They coexist.

## 3. DNS cutover — read this before touching nameservers

The domain currently resolves through Namecheap, and `hello@tomepublishers.com`
is a live mailbox. As captured on 2026-08-25:

**Nameservers:** `dns1.namecheaphosting.com`, `dns2.namecheaphosting.com`

**MX records:**

| Priority | Host |
|---|---|
| 5 | `mx1-hosting.jellyfish.systems` |
| 10 | `mx2-hosting.jellyfish.systems` |
| 20 | `mx3-hosting.jellyfish.systems` |

**Preferred route:** keep Namecheap as the DNS host and point only the `A` /
`CNAME` records at Vercel. Mail is untouched.

**If you move nameservers to Vercel:** recreate all three `MX` rows above at
the new provider *first*. Miss them and inbound mail to `hello@` stops
arriving, with no bounce and no error — you simply stop receiving leads.

Re-check the live values before cutover, since they may have changed:

```bash
nslookup -type=MX tomepublishers.com
```

## 3a. Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 4330 |
| `npm run build` | Production build into `.vercel/output/` |
| `npm run check` | Type + template diagnostics. **`astro build` does not typecheck** — run this in CI. |
| `npm run links` | Crawls the built output for broken internal links (run after `build`) |
| `npm run og` | Regenerates `public/og-default.png` |
| `npm run art` | Regenerates the illustrations in `src/assets/generated/` |

### Artwork

The bookshelf, manuscript and grain images are **drawn programmatically** by
`scripts/generate-art.mjs` in the brand palette — no stock photography, so no
licensing questions. The generator is seeded, so output is reproducible and does
not churn in git. Replace them with real photography whenever it exists; the
`<Image>` calls need no changes beyond the import path.

## 4. Node version

`package.json` pins `engines.node` to `22.x`. Vercel Serverless Functions do
not support Node 26, which is what this machine runs locally; without the pin
the build warns and Vercel picks its own default.

## 5. What actually gets deployed

- Every page is prerendered to static HTML at build time.
- `src/pages/api/inquiry.ts` is the **only** route with `prerender = false`, so
  it becomes the single serverless function.
- Astro's CSRF origin check is on by default and rejects cross-site form POSTs
  with a 403. This is intended. Any external client posting to the endpoint must
  send a matching `Origin` header.

## 6. Pre-launch checklist

- [ ] Replace the placeholder wordmark with outlined SVG paths (see `BRAND.md`)
- [ ] **Confirm TOME actually published the 12 catalogue titles.** They were
      taken from amazopublishers.com on 2026-09-02. Every book detail page
      emits `Book` structured data naming TOME as the `publisher`, so this is
      asserted to search engines in machine-readable form. If TOME did not
      publish them, either remove them or change the `publisher` field in
      `src/pages/books/[slug].astro`.
- [ ] Add `blurb` and `pubDate` to book frontmatter once real values are known
      (both are optional, and deliberately left empty rather than invented)
- [ ] **Confirm rights to the cover artwork.** The 12 jackets in
      `src/assets/covers/` were downloaded from amazopublishers.com on
      2026-09-02. They are the work of the books' publisher and illustrators.
      Removing any image is safe — `BookCover.astro` falls back to a generated
      cover for titles without a `cover:` field.
- [ ] Add `src/content/authors/` profiles — each `name` must match the
      `author` string in book frontmatter **exactly**, and the filename must
      equal `toSlug(name)`. Use only publicly stated biography details.
- [ ] Decide how co-authored titles should be modelled. `Simple as Time` is
      credited to "Judy Shank Cyg & William Horn", which currently produces a
      single combined author page separate from Judy Shank Cyg's own.
- [ ] Replace `src/content/posts/` with real editorial articles
- [ ] Review the marketing copy on `/about`, `/services`, `/process` and `/faq` —
      it is written to be plausible, but the pricing, timeline and rights claims
      must be confirmed as true before publication
- [ ] Replace the two testimonials on the home page with real, attributable
      quotes, or remove the section
- [x] ~~Add `public/og-default.png`~~ — generated; run `npm run og` to regenerate
- [ ] Regenerate the OG card once outlined brand artwork exists (it currently
      falls back to Georgia, not Rockwell/Cormorant)
- [ ] Verify `tomepublishers.com` in Resend and send one real test inquiry
- [ ] Confirm the autoresponder does not land in spam (check SPF/DKIM alignment)
- [ ] Capture live MX records, then cut DNS over
- [ ] Confirm `hello@tomepublishers.com` still receives mail after propagation

## Known issues

`npm audit` reports a high-severity ReDoS in `path-to-regexp`, pulled in
transitively by `@astrojs/vercel`. Do **not** run `npm audit fix --force`: it
downgrades the adapter from v11 to v8 — three majors back — and the advisory
lists v8.0.5+ as vulnerable anyway, so it does not resolve the finding. The
affected code runs at build time against our own route config, not against user
input at runtime. Tracked upstream.
