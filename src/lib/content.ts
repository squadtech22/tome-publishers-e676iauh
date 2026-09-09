import { getCollection, type CollectionEntry } from 'astro:content';

/** Drafts are visible in `astro dev` but never published. */
const isPublished = (entry: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

export async function getBooks(): Promise<CollectionEntry<'books'>[]> {
  const books = await getCollection('books', isPublished);

  // Newest first; undated titles fall to the end, alphabetically among
  // themselves, so the ordering stays stable as dates are filled in.
  return books.sort((a, b) => {
    const aDate = a.data.pubDate?.valueOf();
    const bDate = b.data.pubDate?.valueOf();
    if (aDate !== undefined && bDate !== undefined) return bDate - aDate;
    if (aDate !== undefined) return -1;
    if (bDate !== undefined) return 1;
    return a.data.title.localeCompare(b.data.title);
  });
}

export async function getPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', isPublished);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Letters that carry no combining mark, so NFD normalisation leaves them
 * intact. Without these, "Ibrahim Køhler" slugs to `ibrahim-k-hler`.
 */
const SPECIAL_LETTERS: Record<string, string> = {
  // Apostrophes are dropped rather than turned into separators, so
  // "Children's" slugs to `childrens`, not `children-s`.
  "'": '',
  '’': '',
  ø: 'o',
  æ: 'ae',
  å: 'a',
  ß: 'ss',
  đ: 'd',
  ð: 'd',
  ł: 'l',
  þ: 'th',
  œ: 'oe',
};

/** URL-safe slug that survives accented and Nordic author names. */
export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’øæåßđðłþœ]/g, (ch) => SPECIAL_LETTERS[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export async function getAuthorProfiles(): Promise<CollectionEntry<'authors'>[]> {
  return getCollection('authors', isPublished);
}

export interface AuthorSummary {
  name: string;
  slug: string;
  books: CollectionEntry<'books'>[];
  profile: CollectionEntry<'authors'> | null;
}

/**
 * Every author who has a book, joined to their profile when one exists.
 * Books are the source of truth — an author with no profile still gets a page,
 * and a profile with no books is ignored rather than producing an empty page.
 */
export async function getAuthors(): Promise<AuthorSummary[]> {
  const [books, profiles] = await Promise.all([getBooks(), getAuthorProfiles()]);

  const byName = new Map<string, CollectionEntry<'books'>[]>();
  for (const book of books) {
    const list = byName.get(book.data.author) ?? [];
    list.push(book);
    byName.set(book.data.author, list);
  }

  const profileByName = new Map(profiles.map((p) => [p.data.name, p]));

  return [...byName.entries()]
    .map(([name, authored]) => ({
      name,
      slug: toSlug(name),
      books: authored,
      profile: profileByName.get(name) ?? null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function groupByGenre(books: CollectionEntry<'books'>[]) {
  const map = new Map<string, CollectionEntry<'books'>[]>();
  for (const book of books) {
    const list = map.get(book.data.genre) ?? [];
    list.push(book);
    map.set(book.data.genre, list);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const formatYear = (date: Date) => date.getFullYear().toString();
