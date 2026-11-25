import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withStoreCampaign } from './storeCampaign.ts';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=dev.neurodiv.nalua';
const APP_STORE_URL = 'https://apps.apple.com/de/app/nalua-calming-breathwork/id6777740916';
const PROVIDER_TOKEN = '123456';

test('it should leave links untouched when the page has no utm parameters', () => {
  assert.equal(withStoreCampaign(PLAY_URL, '', PROVIDER_TOKEN), PLAY_URL);
  assert.equal(withStoreCampaign(APP_STORE_URL, '?foo=bar', PROVIDER_TOKEN), APP_STORE_URL);
});

test('it should add utm parameters as encoded referrer to play store links', () => {
  const result = new URL(withStoreCampaign(PLAY_URL, '?utm_source=reddit&utm_medium=social&utm_campaign=launch', PROVIDER_TOKEN));

  assert.equal(result.searchParams.get('id'), 'dev.neurodiv.nalua');
  assert.equal(result.searchParams.get('referrer'), 'utm_source=reddit&utm_medium=social&utm_campaign=launch');
});

test('it should forward only utm parameters to the play store', () => {
  const result = new URL(withStoreCampaign(PLAY_URL, '?utm_campaign=launch&fbclid=abc&utm_content=banner', PROVIDER_TOKEN));

  assert.equal(result.searchParams.get('referrer'), 'utm_campaign=launch&utm_content=banner');
});

test('it should keep existing query parameters of play store links', () => {
  const result = new URL(withStoreCampaign(`${PLAY_URL}&hl=de`, '?utm_campaign=launch', PROVIDER_TOKEN));

  assert.equal(result.searchParams.get('hl'), 'de');
  assert.equal(result.searchParams.get('id'), 'dev.neurodiv.nalua');
});

test('it should add campaign and provider token to app store links', () => {
  const result = new URL(withStoreCampaign(APP_STORE_URL, '?utm_source=reddit&utm_campaign=launch', PROVIDER_TOKEN));

  assert.equal(result.pathname, '/de/app/nalua-calming-breathwork/id6777740916');
  assert.equal(result.searchParams.get('ct'), 'launch');
  assert.equal(result.searchParams.get('pt'), PROVIDER_TOKEN);
  assert.equal(result.searchParams.get('mt'), '8');
});

test('it should use utm_source as app store campaign when utm_campaign is missing', () => {
  const result = new URL(withStoreCampaign(APP_STORE_URL, '?utm_source=newsletter', PROVIDER_TOKEN));

  assert.equal(result.searchParams.get('ct'), 'newsletter');
});

test('it should truncate the app store campaign token to 40 characters', () => {
  const longCampaign = 'a'.repeat(50);
  const result = new URL(withStoreCampaign(APP_STORE_URL, `?utm_campaign=${longCampaign}`, PROVIDER_TOKEN));

  assert.equal(result.searchParams.get('ct'), 'a'.repeat(40));
});

test('it should leave app store links untouched without provider token', () => {
  assert.equal(withStoreCampaign(APP_STORE_URL, '?utm_campaign=launch', ''), APP_STORE_URL);
});

test('it should leave app store links untouched when only unrelated utm parameters exist', () => {
  assert.equal(withStoreCampaign(APP_STORE_URL, '?utm_medium=social', PROVIDER_TOKEN), APP_STORE_URL);
});

test('it should leave testflight and other links untouched', () => {
  const testflight = 'https://testflight.apple.com/join/A7yhqQpk';
  const linkedIn = 'https://www.linkedin.com/in/someone';

  assert.equal(withStoreCampaign(testflight, '?utm_campaign=launch', PROVIDER_TOKEN), testflight);
  assert.equal(withStoreCampaign(linkedIn, '?utm_campaign=launch', PROVIDER_TOKEN), linkedIn);
});

test('it should leave relative and invalid links untouched', () => {
  assert.equal(withStoreCampaign('/de/nalua', '?utm_campaign=launch', PROVIDER_TOKEN), '/de/nalua');
  assert.equal(withStoreCampaign('mailto:hi@neurodiv.dev', '?utm_campaign=launch', PROVIDER_TOKEN), 'mailto:hi@neurodiv.dev');
});
