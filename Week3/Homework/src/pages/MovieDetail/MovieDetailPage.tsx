import { useNavigate, useParams } from 'react-router'
import MovieDetail from './MovieDetail'
import { ROUTES } from '../../constants/routes'
import { useMovieDetail } from '../../hooks/useMovieDetail'

function MovieDetailPage() {
  const navigate = useNavigate()
  const { movieId } = useParams()
  const { movie, isLoading, isError } = useMovieDetail(Number(movieId))

  return (
    <MovieDetail
      movie={movie}
      isLoading={isLoading}
      isError={isError}
      onBack={() => navigate(ROUTES.MAIN)}
    />
  )
}

export default MovieDetailPage
