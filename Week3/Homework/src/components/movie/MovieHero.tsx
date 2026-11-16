import styled from '@emotion/styled'
import Badge from '../common/GlobalBadge'
import defaultPoster from '../../asset/poster.svg'
import type { MovieDetail } from '../../api/movie'
import { formatDate, formatRuntime } from '../../utils/format'
import { getTmdbImageUrl } from '../../utils/image'

interface MovieHeroProps {
  movie: MovieDetail
}

function MovieHero({ movie }: MovieHeroProps) {
  const {
    title,
    original_title,
    poster_path,
    release_date,
    runtime,
    status,
    genres,
    vote_average,
    vote_count,
  } = movie

  const meta = [
    release_date && formatDate(release_date),
    runtime > 0 && formatRuntime(runtime),
    status,
  ].filter(Boolean)

  const poster = poster_path
    ? getTmdbImageUrl(poster_path, 'w500')
    : defaultPoster

  return (
    <HeroWrapper>
      <Poster src={poster} alt={`${title} 포스터`} />

      <InfoBody>
        <Title>{title}</Title>
        {original_title !== title && (
          <OriginalTitle>{original_title}</OriginalTitle>
        )}

        {meta.length > 0 && <Meta>{meta.join(' · ')}</Meta>}

        <GenreList>
          {genres.map(({ id, name }) => (
            <Badge key={id} size="small">
              {name}
            </Badge>
          ))}
        </GenreList>

        <Rating>
          ★ {vote_average.toFixed(1)}
          <VoteCount>({vote_count.toLocaleString()}명)</VoteCount>
        </Rating>
      </InfoBody>
    </HeroWrapper>
  )
}

export default MovieHero

const HeroWrapper = styled.section`
  display: flex;
  align-items: flex-end;
  gap: 40px;
  width: 100%;
`

const Poster = styled.img`
  flex-shrink: 0;
  width: 260px;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
`

const InfoBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
`

const OriginalTitle = styled.span`
  font-size: 16px;
  opacity: 0.7;
`

const Meta = styled.span`
  font-size: 14px;
`

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Rating = styled.span`
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
`

const VoteCount = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`
