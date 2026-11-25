export interface BlogPostLike {
  id: string;
  data: { pubDate: Date; draft: boolean };
}

export function parseBlogEntryId(id: string): { slug: string; lang: string } {
  const separatorIndex = id.lastIndexOf('/');
  if (separatorIndex < 1) {
    throw new Error(`Blog entry "${id}" must live in src/content/blog/<slug>/<lang>.md`);
  }
  return { slug: id.slice(0, separatorIndex), lang: id.slice(separatorIndex + 1) };
}

export function selectVisiblePosts<T extends BlogPostLike>(posts: T[], lang: string, includeDrafts: boolean): T[] {
  return posts
    .filter((post) => parseBlogEntryId(post.id).lang === lang)
    .filter((post) => includeDrafts || !post.data.draft)
    .sort((first, second) => second.data.pubDate.getTime() - first.data.pubDate.getTime());
}

export function findMissingTranslations(posts: BlogPostLike[], langs: string[]): string[] {
  const existingIds = new Set(posts.map((post) => post.id));
  const slugs = new Set(posts.map((post) => parseBlogEntryId(post.id).slug));
  return [...slugs]
    .flatMap((slug) => langs.map((lang) => `${slug}/${lang}`))
    .filter((id) => !existingIds.has(id));
}
