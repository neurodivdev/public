import { getCollection } from 'astro:content';
import { ui } from '../i18n/ui';
import { findMissingTranslations, selectVisiblePosts } from './blogPosts';

const includeDrafts = import.meta.env.DEV;

export async function getBlogPosts(lang: string) {
  const posts = await getCollection('blog');
  const missingTranslations = findMissingTranslations(posts, Object.keys(ui));
  if (missingTranslations.length > 0) {
    throw new Error(`Missing blog translations: src/content/blog/${missingTranslations.join('.md, src/content/blog/')}.md`);
  }
  return selectVisiblePosts(posts, lang, includeDrafts);
}

export function formatPublishDate(date: Date, lang: string) {
  return date.toLocaleDateString(lang, { dateStyle: 'long' });
}
