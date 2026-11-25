import { extractUtmParameters } from './utmParameters.ts';

export function withInternalCampaign(href: string, pageUrl: string): string {
  const page = new URL(pageUrl);
  const utmParameters = extractUtmParameters(page.search);
  const target = new URL(href, page);
  if (href.startsWith('#') || utmParameters.size === 0 || !isUntaggedInternalLink(target, page)) return href;
  utmParameters.forEach((value, key) => target.searchParams.append(key, value));
  return URL.canParse(href) ? target.toString() : target.pathname + target.search + target.hash;
}

function isUntaggedInternalLink(target: URL, page: URL): boolean {
  return target.origin === page.origin && extractUtmParameters(target.search).size === 0;
}
