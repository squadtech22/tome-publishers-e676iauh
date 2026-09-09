import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Placeholder content lives in src/content/. Swapping in the real catalogue
 * is a content-file operation — no code changes — as long as frontmatter
 * matches these schemas. Build fails loudly if it does not.
 */

const books = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      author: z.string(),
      genre: z.string(),
      /**
       * Optional: real catalogue entries often arrive without a confirmed
       * publication date, and inventing one would be worse than omitting it.
       * Undated books sort after dated ones.
       */
      pubDate: z.coerce.date().optional(),
      /** Optional for the same reason — better blank than fabricated. */
      blurb: z.string().optional(),
      /** Optional until real jackets arrive; falls back to a generated cover. */
      cover: image().optional(),
      isbn: z.string().optional(),
      pages: z.number().optional(),
      formats: z.array(z.enum(['Hardcover', 'Paperback', 'eBook', 'Audiobook'])).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('TOME Publishers'),
    category: z.string(),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      /** Must match the `author` string used in book frontmatter exactly. */
      name: z.string(),
      role: z.string().optional(),
      location: z.string().optional(),
      bio: z.string(),
      portrait: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { books, posts, authors };
