import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    featuredImage: z.string().optional(),
    featuredImageDescription: z.string().optional(),
    photographerName: z.string().optional(),
    photographerLink: z.string().optional(),
  }),
});

export const collections = { blog };