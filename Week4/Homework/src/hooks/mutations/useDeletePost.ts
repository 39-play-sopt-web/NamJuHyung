import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { InfiniteData } from '@tanstack/react-query'
import { deletePost } from '../../api/board'
import { QUERY_KEYS } from '../../constants/queryKeys'
import type { PostSliceResponse } from '../../types/post'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  // 상세 페이지를 떠난 뒤 호출
  const removeDetail = (postId: number) =>
    queryClient.removeQueries({ queryKey: QUERY_KEYS.POST_DETAIL(postId) })

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      // 삭제 성공 후 목록 캐시에서 바로 빼서, 목록으로 이동했을 때 깜박이지 않게 함
      queryClient.setQueriesData<InfiniteData<PostSliceResponse>>(
        { queryKey: QUERY_KEYS.POST_LISTS },
        (old) =>
          old && {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.filter(({ id }) => id !== postId),
            })),
          },
      )
      // 서버와 최종 동기화는 백그라운드에서
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST_LISTS })
    },
  })

  return { ...mutation, removeDetail }
}
