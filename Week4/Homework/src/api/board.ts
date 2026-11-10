import { client } from './client'
import type { ApiResponse } from '../types/api'
import type {
  CreatePostRequest,
  GetPostsParams,
  Post,
  PostSliceResponse,
  UpdatePostRequest,
} from '../types/post'

export const getPosts = async (params: GetPostsParams) => {
  const { data } = await client.get<ApiResponse<PostSliceResponse>>('/posts', {
    params,
  })
  return data.data
}

export const getPost = async (postId: number) => {
  const { data } = await client.get<ApiResponse<Post>>(`/posts/${postId}`)
  return data.data
}

export const createPost = async (body: CreatePostRequest) => {
  const { data } = await client.post<ApiResponse<Post>>('/posts', body)
  return data.data
}

export const updatePost = async (postId: number, body: UpdatePostRequest) => {
  const { data } = await client.put<ApiResponse<Post>>(`/posts/${postId}`, body)
  return data.data
}

export const deletePost = async (postId: number) => {
  await client.delete<ApiResponse<null>>(`/posts/${postId}`)
}
