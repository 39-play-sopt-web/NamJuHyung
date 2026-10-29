import styled from '@emotion/styled'
import BackButton from '../../components/common/BackButton'
import MovieHero from '../../components/movie/MovieHero'
import MovieInfoSection from '../../components/movie/MovieInfoSection'
import MovieSummary from '../../components/movie/MovieSummary'
import type { MovieDetail as MovieDetailData } from '../../api/movie'
import { getTmdbImageUrl } from '../../utils/image'

interface MovieDetailProps {
  movie: MovieDetailData | null
  isLoading: boolean
  isError: boolean
  onBack: () => void
}

function MovieDetail({ movie, isLoading, isError, onBack }: MovieDetailProps) {
  if (!movie) {
    return (
      <DetailWrapper>
        <Content>
          <BackButton onClick={onBack}>목록으로 돌아가기</BackButton>
          {isLoading && <StatusText>영화 정보를 불러오는 중이에요.</StatusText>}
          {isError && <StatusText>영화 정보를 불러오지 못했어요.</StatusText>}
        </Content>
      </DetailWrapper>
    )
  }

  return (
    <DetailWrapper>
      {movie.backdrop_path && (
        <Backdrop>
          <BackdropImage
            src={getTmdbImageUrl(movie.backdrop_path, 'original')}
            alt=""
          />
        </Backdrop>
      )}

      <Content>
        <BackButton onClick={onBack}>목록으로 돌아가기</BackButton>

        <MovieHero movie={movie} />

        <DetailSection>
          <SectionTitle>줄거리</SectionTitle>
          <MovieSummary overview={movie.overview} />
        </DetailSection>

        <DetailSection>
          <SectionTitle>기본 정보</SectionTitle>
          <MovieInfoSection movie={movie} />
        </DetailSection>
      </Content>
    </DetailWrapper>
  )
}

export default MovieDetail

const DetailWrapper = styled.main`
  position: relative;
  width: 100%;
`

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 520px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.background}66 0%, ${theme.colors.background} 100%)`};
  }
`

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
`

const StatusText = styled.p`
  width: 100%;
  padding: 48px 0;
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
`
