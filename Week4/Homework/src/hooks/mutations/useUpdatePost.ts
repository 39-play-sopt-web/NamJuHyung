import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '../../api/board'
import { QUERY_KEYS } from '../../constants/queryKeys'
import type { UpdatePostRequest } from '../../types/post'

export const useUpdatePost = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdatePostRequest) => updatePost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS })
    },
  })
}
