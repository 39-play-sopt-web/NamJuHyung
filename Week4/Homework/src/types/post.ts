export interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface PostSliceResponse {
  posts: Post[]
  nextCursor: number | null
  hasNext: boolean
}

export interface GetPostsParams {
  keyword?: string
  cursor?: number
  size?: number
}

export type CreatePostRequest = Pick<Post, 'title' | 'content' | 'author'>

export type UpdatePostRequest = Pick<Post, 'title' | 'content'>
