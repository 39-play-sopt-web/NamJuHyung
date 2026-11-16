import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from '../../api/board'
import { POST_PAGE_SIZE } from '../../constants/post'
import { QUERY_KEYS } from '../../constants/queryKeys'
import type { PostSliceResponse } from '../../types/post'

const getNextCursor = (lastPage: PostSliceResponse): number | undefined =>
  lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined

export const usePosts = (keyword: string) =>
  useInfiniteQuery({
    queryKey: QUERY_KEYS.POST_LIST(keyword),
    queryFn: ({ pageParam }) =>
      getPosts({
        keyword: keyword || undefined,
        cursor: pageParam,
        size: POST_PAGE_SIZE,
      }),
    initialPageParam: undefined,
    getNextPageParam: getNextCursor,
    select: (data) => data.pages.flatMap((page) => page.posts),
  })
