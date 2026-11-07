// Content-Security-Policy for every layout page: only this site's own scripts, styles and fonts;
// network calls also to the MeeTwo API when it is configured. Used by the layout and by scripts/check-csp.mjs.
export function buildCsp(standinUrl, pageUrl) {
  const meetwoOrigin = standinUrl ? new URL(standinUrl, pageUrl).origin : '';
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    `connect-src 'self'${meetwoOrigin ? ` ${meetwoOrigin}` : ''}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}
