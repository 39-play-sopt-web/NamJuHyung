import { useQuery } from '@tanstack/react-query'
import { getPost } from '../../api/board'
import { QUERY_KEYS } from '../../constants/queryKeys'

export const usePost = (postId: number) =>
  useQuery({
    queryKey: QUERY_KEYS.POST_DETAIL(postId),
    queryFn: () => getPost(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  })
