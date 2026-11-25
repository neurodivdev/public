import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withInternalCampaign } from './internalCampaign.ts';

const CAMPAIGN_PAGE = 'https://neurodiv.dev/de/?utm_source=reddit&utm_campaign=launch';

test('it should add utm parameters to relative internal links', () => {
  assert.equal(withInternalCampaign('/de/nalua', CAMPAIGN_PAGE), '/de/nalua?utm_source=reddit&utm_campaign=launch');
});

test('it should add utm parameters to absolute internal links', () => {
  assert.equal(
    withInternalCampaign('https://neurodiv.dev/en/koushi/', CAMPAIGN_PAGE),
    'https://neurodiv.dev/en/koushi/?utm_source=reddit&utm_campaign=launch',
  );
});

test('it should keep existing query parameters and the hash of internal links', () => {
  assert.equal(
    withInternalCampaign('/de/nalua?tab=faq#download', CAMPAIGN_PAGE),
    '/de/nalua?tab=faq&utm_source=reddit&utm_campaign=launch#download',
  );
});

test('it should forward only utm parameters to internal links', () => {
  const page = 'https://neurodiv.dev/de/?utm_campaign=launch&fbclid=abc';

  assert.equal(withInternalCampaign('/de/nalua', page), '/de/nalua?utm_campaign=launch');
});

test('it should leave internal links untouched when the page has no utm parameters', () => {
  assert.equal(withInternalCampaign('/de/nalua', 'https://neurodiv.dev/de/?foo=bar'), '/de/nalua');
});

test('it should leave same page anchors untouched', () => {
  assert.equal(withInternalCampaign('#faq', CAMPAIGN_PAGE), '#faq');
});

test('it should leave external and non http links untouched', () => {
  assert.equal(withInternalCampaign('https://play.google.com/store', CAMPAIGN_PAGE), 'https://play.google.com/store');
  assert.equal(withInternalCampaign('mailto:hi@neurodiv.dev', CAMPAIGN_PAGE), 'mailto:hi@neurodiv.dev');
});

test('it should leave links untouched when they already carry utm parameters', () => {
  assert.equal(withInternalCampaign('/de/nalua?utm_campaign=other', CAMPAIGN_PAGE), '/de/nalua?utm_campaign=other');
});
