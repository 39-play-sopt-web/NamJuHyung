import { client } from './client'
import type { ApiResponse } from '../types/api'
import type {
  AuthorizationCodeResponse,
  IssueAuthorizationCodeRequest,
} from '../types/auth'

export const postAuthorizationCode = async (
  body: IssueAuthorizationCodeRequest,
) => {
  const { data } = await client.post<ApiResponse<AuthorizationCodeResponse>>(
    '/members/authorization-code',
    body,
  )
  return data.data
}
