import axios from 'axios'
import { getAuthorizationCode } from '../utils/auth'

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
})

client.interceptors.request.use((config) => {
  const authorizationCode = getAuthorizationCode()
  if (authorizationCode) {
    config.headers.Authorization = authorizationCode
  }
  return config
})
