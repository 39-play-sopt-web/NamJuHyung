import styled from '@emotion/styled'
import { generatePath } from 'react-router'
import MovieCard from './MovieCard'
import type { Movie } from '../../api/movie'
import { ROUTES } from '../../constants/routes'
import { formatDate } from '../../utils/format'
import { getTmdbImageUrl } from '../../utils/image'

const CARD_MIN_WIDTH = '180px'

interface MovieCardSectionProps {
  movies: Movie[]
  listPath: string
}

function MovieCardSection({ movies, listPath }: MovieCardSectionProps) {
  if (movies.length === 0) {
    return <EmptyMovie>해당하는 영화가 없어요.</EmptyMovie>
  }

  return (
    <CardGrid>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          releaseDate={
            movie.release_date ? formatDate(movie.release_date) : '개봉일 미정'
          }
          overview={movie.overview}
          rating={movie.vote_average}
          poster={
            movie.poster_path
              ? getTmdbImageUrl(movie.poster_path, 'w500')
              : undefined
          }
          to={generatePath(ROUTES.MOVIE_DETAIL, { movieId: String(movie.id) })}
          listPath={listPath}
        />
      ))}
    </CardGrid>
  )
}

export default MovieCardSection

const CardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${CARD_MIN_WIDTH}, 1fr));
  gap: 30px;
  width: 100%;
  padding-bottom: 48px;
`

const EmptyMovie = styled.p`
  width: 100%;
  padding: 48px 0;
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
`
