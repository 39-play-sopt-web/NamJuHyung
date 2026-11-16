import { PARTS } from '../constants/parts'
import type { Part } from '../constants/parts'
import { STORAGE_KEYS } from '../constants/storage'

export const saveAuth = (authorizationCode: string, part: Part) => {
  localStorage.setItem(STORAGE_KEYS.AUTHORIZATION_CODE, authorizationCode)
  localStorage.setItem(STORAGE_KEYS.PART, part)
}

export const getAuthorizationCode = () =>
  localStorage.getItem(STORAGE_KEYS.AUTHORIZATION_CODE)

export const getPart = (): Part | undefined => {
  const saved = localStorage.getItem(STORAGE_KEYS.PART)
  return PARTS.find((name) => name === saved)
}

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTHORIZATION_CODE)
  localStorage.removeItem(STORAGE_KEYS.PART)
}

export const hasAuth = () => Boolean(getAuthorizationCode())
