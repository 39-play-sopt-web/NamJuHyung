import { TMDB_IMAGE_BASE_URL } from '../constants/api'

type ImageSize = 'w500' | 'original'

export const getTmdbImageUrl = (path: string, size: ImageSize) =>
  `${TMDB_IMAGE_BASE_URL}/${size}${path}`
