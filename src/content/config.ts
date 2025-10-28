import { defineCollection, z } from 'astro:content';

const poems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    date: z.string(),
    category: z.string(),
    draft: z.boolean().optional(),
    bilingual: z.boolean().optional(),
    contentEn: z.string().optional(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    date: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    bilingual: z.boolean().optional(),
    contentEn: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    demo: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

const pokerGames = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['learned', 'created']),
    description: z.string(),
    quote: z.string(),
    rules: z.array(z.string()),
  }),
});

const quotes = defineCollection({
  type: 'content',
  schema: z.object({
    text: z.string(),
    author: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  poems,
  articles,
  projects,
  'poker-games': pokerGames,
  quotes,
};
