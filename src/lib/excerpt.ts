// Plain-text excerpt of a Markdown body for a meta description: link text kept, URLs and markup dropped.
export function plainText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(markdown: string, max = 155): string {
  const plain = plainText(markdown);
  if (plain.length <= max) return plain;
  return plain.slice(0, max).replace(/\s+\S*$/, '') + '…';
}
