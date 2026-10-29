import { useEffect, useState } from 'react'
import { getMovieDetail, type MovieDetail } from '../api/movie'

interface MovieDetailResult {
  movieId: number
  movie: MovieDetail | null
  isError: boolean
}

export const useMovieDetail = (movieId: number) => {
  const [result, setResult] = useState<MovieDetailResult | null>(null)

  useEffect(() => {
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

  const isCurrent = result?.movieId === movieId

  return {
    movie: isCurrent ? result.movie : null,
    isLoading: !isCurrent,
    isError: isCurrent && result.isError,
  }
}
