import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*/{en,de}.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((data) => !data.cover || data.coverAlt, {
        message: 'coverAlt is required when a cover image is set',
        path: ['coverAlt'],
      }),
});

export const collections = { blog };
