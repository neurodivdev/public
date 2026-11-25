const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export function extractUtmParameters(search: string): URLSearchParams {
  const allParameters = new URLSearchParams(search);
  return new URLSearchParams([...allParameters].filter(([key]) => UTM_KEYS.includes(key)));
}
