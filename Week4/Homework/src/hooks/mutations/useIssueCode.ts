import { useMutation } from '@tanstack/react-query'
import { postAuthorizationCode } from '../../api/auth'
import type { Part } from '../../constants/parts'
import { saveAuth } from '../../utils/auth'

export const useIssueCode = () =>
  useMutation({
    mutationFn: (part: Part) => postAuthorizationCode({ part }),
    onSuccess: ({ authorizationCode }, part) => {
      saveAuth(authorizationCode, part)
    },
  })
