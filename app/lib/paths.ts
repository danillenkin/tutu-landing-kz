/** Prefix for GitHub Pages project site; empty for local/dev. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Absolute site path that respects basePath (e.g. /assets/x → /tutu-landing-kz/assets/x). */
export function asset(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
