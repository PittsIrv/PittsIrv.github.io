// Anchor id for a project name; /projects uses it for row ids and other pages for links to those rows.
export const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
