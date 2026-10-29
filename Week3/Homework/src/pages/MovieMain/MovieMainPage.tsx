import { generatePath, useNavigate, useSearchParams } from 'react-router'
import MovieMain from './MovieMain'
import { ROUTES } from '../../constants/routes'
import { useMovieList } from '../../hooks/useMovieList'
import type { RatingRange } from '../../api/movie'

const RATING_PARAM = 'rating'

interface RatingFilter {
  value: string
  label: string
  range: RatingRange
}

const RATING_FILTERS: RatingFilter[] = [
  { value: 'all', label: '전체', range: {} },
  { value: '9plus', label: '9점 이상', range: { voteAverageGte: 9 } },
  {
    value: '8to9',
    label: '8 ~ 9점',
    range: { voteAverageGte: 8, voteAverageLte: 9 },
  },
  {
    value: '7to8',
    label: '7 ~ 8점',
    range: { voteAverageGte: 7, voteAverageLte: 8 },
  },
  {
    value: '6to7',
    label: '6 ~ 7점',
    range: { voteAverageGte: 6, voteAverageLte: 7 },
  },
  { value: 'under6', label: '6점 미만', range: { voteAverageLte: 6 } },
]

const DEFAULT_FILTER = RATING_FILTERS[0]

function MovieMainPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedFilter =
    RATING_FILTERS.find(
      (filter) => filter.value === searchParams.get(RATING_PARAM),
    ) ?? DEFAULT_FILTER

  const { movies, isLoading, isError, hasNextPage, loadMore } =
    useMovieList(selectedFilter.range)

  const handleFilterSelect = (label: string) => {
    const filter = RATING_FILTERS.find((filter) => filter.label === label)
    if (!filter || filter === selectedFilter) return
    setSearchParams(
      filter === DEFAULT_FILTER ? {} : { [RATING_PARAM]: filter.value },
    )
  }

  const handleMovieClick = (id: number) => {
    navigate(generatePath(ROUTES.MOVIE_DETAIL, { movieId: String(id) }))
  }

  return (
    <MovieMain
      filters={RATING_FILTERS.map(({ label }) => label)}
      selectedFilter={selectedFilter.label}
      onFilterSelect={handleFilterSelect}
      movies={movies}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      onLoadMore={loadMore}
      onMovieClick={handleMovieClick}
    />
  )
}

export default MovieMainPage
