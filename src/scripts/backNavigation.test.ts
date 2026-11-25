import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveBackUrl } from './backNavigation.ts';

test('it should return to the referring blog article from an app page', () => {
  assert.equal(
    resolveBackUrl('/de/', 'https://neurodiv.dev/de/blog/body-doubling-without-zoom/', 'https://neurodiv.dev/de/neben/'),
    '/de/blog/body-doubling-without-zoom/',
  );
});

test('it should preserve query parameters and hash from the referring blog article', () => {
  assert.equal(
    resolveBackUrl(
      '/en/',
      'https://neurodiv.dev/en/blog/visual-silence-low-stimulation-design/?utm_source=reddit#neben',
      'https://neurodiv.dev/en/nalua/',
    ),
    '/en/blog/visual-silence-low-stimulation-design/?utm_source=reddit#neben',
  );
});

test('it should keep the fallback url on blog pages to prevent back loops', () => {
  assert.equal(
    resolveBackUrl('/de/', 'https://neurodiv.dev/de/blog/body-doubling-without-zoom/', 'https://neurodiv.dev/de/blog/'),
    '/de/',
  );
  assert.equal(
    resolveBackUrl(
      '/en/blog/',
      'https://neurodiv.dev/en/blog/zero-guilt-focus-timers/',
      'https://neurodiv.dev/en/blog/sensory-side-of-focus/',
    ),
    '/en/blog/',
  );
});

test('it should keep the fallback url when coming from the homepage or another non-blog page', () => {
  assert.equal(
    resolveBackUrl('/de/', 'https://neurodiv.dev/de/', 'https://neurodiv.dev/de/neben/'),
    '/de/',
  );
  assert.equal(
    resolveBackUrl('/en/', 'https://neurodiv.dev/de/neben/', 'https://neurodiv.dev/en/neben/'),
    '/en/',
  );
});

test('it should ignore external referrers and empty referrers', () => {
  assert.equal(
    resolveBackUrl('/en/', 'https://example.com/en/blog/some-post/', 'https://neurodiv.dev/en/neben/'),
    '/en/',
  );
  assert.equal(
    resolveBackUrl('/en/', '', 'https://neurodiv.dev/en/neben/'),
    '/en/',
  );
});

test('it should leave javascript fallback links untouched', () => {
  assert.equal(
    resolveBackUrl(
      'javascript:history.back()',
      'https://neurodiv.dev/de/blog/body-doubling-without-zoom/',
      'https://neurodiv.dev/de/about/',
    ),
    'javascript:history.back()',
  );
});
