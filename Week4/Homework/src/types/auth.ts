import type { Part } from '../constants/parts'

export interface IssueAuthorizationCodeRequest {
  part: Part
}

export interface AuthorizationCodeResponse {
  authorizationCode: string
}
