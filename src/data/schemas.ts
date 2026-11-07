import { z } from 'astro/zod';

const text = z.string().min(1);

export const workSchema = z.object({
  intro: text,
  meetwo: text,
  education: z.array(z.object({
    degree: text,
    school: text,
    dates: text,
    notes: z.array(text),
    courseLabel: text,
    courses: text,
  })),
  experience: z.array(z.object({
    role: text,
    org: text,
    id: z.string().optional(),
    compact: z.boolean().optional(),
    dates: text,
    lead: text,
    bullets: z.array(text),
    tags: z.array(text),
  })),
  publications: z.array(z.object({
    title: text,
    id: z.string().optional(),
    meta: text,
    lead: text,
    body: text,
    link: z.object({ href: text, label: text }).optional(),
  })),
  skills: z.array(z.object({ group: text, items: z.array(text) })),
  selfNote: text,
});

export const personalSchema = z.object({
  intro: text,
  nowUpdated: text,
  now: z.array(z.object({ label: text, text: text })),
  interests: z.array(text),
  sports: z.array(z.object({ name: text, level: text })),
  terminology: z.array(z.object({ term: text, text: text })),
  selfNote: text,
});

export const aboutSchema = z.object({
  opening: z.array(text),
  interests: z.array(z.object({
    title: text,
    text: text,
    href: z.string().optional(),
    link: z.string().optional(),
  })),
  contact: text,
  selfNote: text,
});

// Optional text an editor may leave blank: a blank value counts as absent.
const optional = z.string().optional().transform(v => (v && v.trim() ? v : undefined));
const dropAbsent = <T extends Record<string, unknown>>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;
const period = z.string().regex(/^(\d{4}-(0[1-9]|1[0-2])|now|unknown)$/, 'Use YYYY-MM, now or unknown');

export const projectsSchema = z.array(z.object({
  name: text,
  oneLine: text,
  intuition: optional,
  status: z.enum(['active', 'shipped', 'paused', 'archived']),
  period: z.object({ start: period, end: period }),
  did: z.array(text).default([]),
  links: z.object({ site: optional, repo: optional, paper: optional, page: optional }).default({}).transform(dropAbsent),
  comingSoon: optional,
  tags: z.array(text).default([]),
  visibility: z.enum(['public', 'title']),
}).transform(dropAbsent));

export const homeSchema = z.object({
  affiliation: text,
  currently: text,
  previously: text,
  selectedWork: z.array(z.object({ kind: text, title: text, text: text, detail: text, href: text })),
});
