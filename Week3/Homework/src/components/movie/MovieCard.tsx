import styled from '@emotion/styled'
import defaultPoster from '../../asset/poster.svg'
import ScoreBadge from '../common/ScoreBadge'

interface MovieCardProps {
  title: string
  releaseDate: string
  overview: string
  rating: number
  poster?: string
  onClick?: () => void
}

function MovieCard({
  title,
  releaseDate,
  overview,
  rating,
  poster = defaultPoster,
  onClick,
}: MovieCardProps) {
  return (
    <CardWrapper type="button" onClick={onClick}>
      <PosterWrapper>
        <Poster src={poster} alt={`${title} 포스터`} />
        <ScorePosition>
          <ScoreBadge score={rating} />
        </ScorePosition>
      </PosterWrapper>

      <CardBody>
        <Title>{title}</Title>
        <ReleaseDate>{releaseDate}</ReleaseDate>
        <Overview>{overview}</Overview>
      </CardBody>
    </CardWrapper>
  )
}

export default MovieCard

const CardWrapper = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition:
    transform 0.15s,
    filter 0.15s;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`

const PosterWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
`

const Poster = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ScorePosition = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
`

const Title = styled.h3`
  font-size: 15px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ReleaseDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`

const Overview = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.7;
`
