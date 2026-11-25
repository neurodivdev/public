import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseBlogEntryId, selectVisiblePosts, findMissingTranslations } from './blogPosts.ts';

function post(id: string, pubDate: string, draft = false) {
  return { id, data: { pubDate: new Date(pubDate), draft } };
}

test('it should split the entry id into slug and language', () => {
  assert.deepEqual(parseBlogEntryId('first-article/de'), { slug: 'first-article', lang: 'de' });
});

test('it should fail when the entry id has no language part', () => {
  assert.throws(() => parseBlogEntryId('first-article'), /first-article/);
});

test('it should select only posts of the requested language', () => {
  const posts = [post('a/en', '2026-01-01'), post('a/de', '2026-01-01')];

  assert.deepEqual(selectVisiblePosts(posts, 'de', false).map((entry) => entry.id), ['a/de']);
});

test('it should sort posts from newest to oldest', () => {
  const posts = [post('old/en', '2025-03-01'), post('new/en', '2026-05-01'), post('middle/en', '2025-12-24')];

  assert.deepEqual(
    selectVisiblePosts(posts, 'en', false).map((entry) => entry.id),
    ['new/en', 'middle/en', 'old/en'],
  );
});

test('it should hide drafts when drafts are not included', () => {
  const posts = [post('ready/en', '2026-01-01'), post('wip/en', '2026-02-01', true)];

  assert.deepEqual(selectVisiblePosts(posts, 'en', false).map((entry) => entry.id), ['ready/en']);
});

test('it should show drafts when drafts are included', () => {
  const posts = [post('ready/en', '2026-01-01'), post('wip/en', '2026-02-01', true)];

  assert.deepEqual(selectVisiblePosts(posts, 'en', true).map((entry) => entry.id), ['wip/en', 'ready/en']);
});

test('it should not change the order of the given posts', () => {
  const posts = [post('old/en', '2025-03-01'), post('new/en', '2026-05-01')];

  selectVisiblePosts(posts, 'en', false);

  assert.deepEqual(posts.map((entry) => entry.id), ['old/en', 'new/en']);
});

test('it should report articles that miss a language', () => {
  const posts = [post('complete/en', '2026-01-01'), post('complete/de', '2026-01-01'), post('half/en', '2026-01-01')];

  assert.deepEqual(findMissingTranslations(posts, ['en', 'de']), ['half/de']);
});

test('it should report nothing when every article exists in every language', () => {
  const posts = [post('complete/en', '2026-01-01'), post('complete/de', '2026-01-01')];

  assert.deepEqual(findMissingTranslations(posts, ['en', 'de']), []);
});
