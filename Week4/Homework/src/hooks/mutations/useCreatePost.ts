import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../../api/board'
import { QUERY_KEYS } from '../../constants/queryKeys'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST_LISTS })
    },
  })
}
