import { useEffect, useState } from 'react'
import { getMovies, type Movie, type RatingRange } from '../api/movie'

const MAX_PAGE = 500

export const useMovieList = (range: RatingRange) => {
  const [prevRange, setPrevRange] = useState(range)
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  if (range !== prevRange) {
    setPrevRange(range)
    setMovies([])
    setPage(1)
    setTotalPages(1)
    setIsLoading(true)
    setIsError(false)
  }

  useEffect(() => {
    let ignore = false

    getMovies({ page, ...range })
      .then(({ results, total_pages }) => {
        if (ignore) return
        setMovies((prev) => {
          if (page === 1) return results
          const ids = new Set(prev.map(({ id }) => id))
          return [...prev, ...results.filter(({ id }) => !ids.has(id))]
        })
        setTotalPages(Math.min(total_pages, MAX_PAGE))
      })
      .catch(() => {
        if (!ignore) setIsError(true)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [page, range])

  const hasNextPage = page < totalPages

  const loadMore = () => {
    if (isLoading || isError || !hasNextPage) return
    setIsLoading(true)
    setPage((prev) => prev + 1)
  }

  return {
    movies,
    isLoading,
    isError,
    hasNextPage,
    loadMore,
  }
}
