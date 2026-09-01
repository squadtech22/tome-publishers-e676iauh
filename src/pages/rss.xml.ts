import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts } from '~/lib/content';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();

  return rss({
    title: 'TOME Publishers — Journal',
    description:
      'Essays on craft, publishing, design and marketing from the editorial team at TOME Publishers.',
    // `context.site` comes from the `site` value in astro.config.mjs.
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/journal/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: '<language>en-us</language>',
  });
};
