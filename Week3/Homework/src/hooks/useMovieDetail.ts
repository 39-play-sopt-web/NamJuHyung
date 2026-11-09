import { useEffect, useState } from 'react'
import { getMovieDetail, type MovieDetail } from '../api/movie'

interface MovieDetailResult {
  movieId: number
  movie: MovieDetail | null
  isError: boolean
}

const isValidMovieId = (movieId: number) =>
  Number.isInteger(movieId) && movieId > 0

export const useMovieDetail = (movieId: number) => {
  const [result, setResult] = useState<MovieDetailResult | null>(null)

  useEffect(() => {
    if (!isValidMovieId(movieId)) return

    let ignore = false

    getMovieDetail(movieId)
      .then((movie) => {
        if (!ignore) setResult({ movieId, movie, isError: false })
      })
      .catch(() => {
        if (!ignore) setResult({ movieId, movie: null, isError: true })
      })

    return () => {
      ignore = true
    }
  }, [movieId])

  if (!isValidMovieId(movieId)) {
    return { movie: null, isLoading: false, isError: true }
  }

  const isCurrent = result?.movieId === movieId

  return {
    movie: isCurrent ? result.movie : null,
    isLoading: !isCurrent,
    isError: isCurrent && result.isError,
  }
}
