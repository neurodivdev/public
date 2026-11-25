const BLOG_POST_PATH = /^\/[a-z]{2}\/blog\/[^/]+\/?$/;
const BLOG_AREA_PATH = /^\/[a-z]{2}\/blog(?:\/.*)?$/;

export function resolveBackUrl(fallbackUrl: string, referrer: string, currentUrl: string): string {
  if (!referrer || fallbackUrl.startsWith('javascript:')) return fallbackUrl;

  let current: URL;
  let ref: URL;
  try {
    current = new URL(currentUrl);
    ref = new URL(referrer);
  } catch {
    return fallbackUrl;
  }

  if (ref.origin !== current.origin) return fallbackUrl;
  if (BLOG_AREA_PATH.test(current.pathname)) return fallbackUrl;
  if (!BLOG_POST_PATH.test(ref.pathname)) return fallbackUrl;

  return ref.pathname + ref.search + ref.hash;
}
