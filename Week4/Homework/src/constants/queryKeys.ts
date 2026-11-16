export const QUERY_KEYS = {
  POSTS: ['posts'] as const,
  POST_LISTS: ['posts', 'list'] as const,
  POST_LIST: (keyword: string) => ['posts', 'list', keyword] as const,
  POST_DETAIL: (postId: number) => ['posts', 'detail', postId] as const,
}
