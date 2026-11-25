import { extractUtmParameters } from './utmParameters.ts';

const APP_STORE_CAMPAIGN_MAX_LENGTH = 40;

export function withStoreCampaign(href: string, pageSearch: string, appStoreProviderToken: string): string {
  const utmParameters = extractUtmParameters(pageSearch);
  const storeUrl = parseAbsoluteUrl(href);
  if (!storeUrl || utmParameters.size === 0) return href;
  if (storeUrl.hostname === 'play.google.com') return withPlayStoreReferrer(storeUrl, utmParameters);
  if (storeUrl.hostname === 'apps.apple.com') return withAppStoreCampaign(storeUrl, utmParameters, appStoreProviderToken) ?? href;
  return href;
}

function parseAbsoluteUrl(href: string): URL | null {
  return URL.canParse(href) ? new URL(href) : null;
}

function withPlayStoreReferrer(storeUrl: URL, utmParameters: URLSearchParams): string {
  storeUrl.searchParams.set('referrer', utmParameters.toString());
  return storeUrl.toString();
}

function withAppStoreCampaign(storeUrl: URL, utmParameters: URLSearchParams, providerToken: string): string | null {
  const campaign = utmParameters.get('utm_campaign') ?? utmParameters.get('utm_source');
  if (!providerToken || !campaign) return null;
  storeUrl.searchParams.set('pt', providerToken);
  storeUrl.searchParams.set('ct', campaign.slice(0, APP_STORE_CAMPAIGN_MAX_LENGTH));
  storeUrl.searchParams.set('mt', '8');
  return storeUrl.toString();
}
