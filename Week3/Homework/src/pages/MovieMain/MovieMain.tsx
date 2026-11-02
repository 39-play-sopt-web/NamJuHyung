import styled from '@emotion/styled'
import Badge from '../../components/common/GlobalBadge'
import MovieCardSection from '../../components/movie/MovieCardSection'
import type { Movie } from '../../api/movie'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

interface MovieMainProps {
  filters: string[]
  selectedFilter: string
  onFilterSelect: (filter: string) => void
  movies: Movie[]
  isLoading: boolean
  isError: boolean
  hasNextPage: boolean
  onLoadMore: () => void
  onMovieClick: (id: number) => void
}

function MovieMain({
  filters,
  selectedFilter,
  onFilterSelect,
  movies,
  isLoading,
  isError,
  hasNextPage,
  onLoadMore,
  onMovieClick,
}: MovieMainProps) {
  const sentinelRef = useInfiniteScroll(onLoadMore)

  const showList = movies.length > 0 || (!isLoading && !isError)

  return (
    <MainWrapper>
      <SectionTitle>영화 둘러보기</SectionTitle>

      <BadgeList>
        {filters.map((filter) => (
          <Badge
            key={filter}
            isSelected={selectedFilter === filter}
            onClick={() => onFilterSelect(filter)}
          >
            {filter}
          </Badge>
        ))}
      </BadgeList>

      {showList && (
        <MovieCardSection movies={movies} onMovieClick={onMovieClick} />
      )}
      {isLoading && <StatusText>영화를 불러오는 중이에요.</StatusText>}
      {isError && <StatusText>영화를 불러오지 못했어요.</StatusText>}
      {hasNextPage && !isLoading && !isError && <Sentinel ref={sentinelRef} />}
    </MainWrapper>
  )
}

export default MovieMain

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 0;
`

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
`

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const StatusText = styled.p`
  width: 100%;
  padding: 48px 0;
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
`

const Sentinel = styled.div`
  width: 100%;
  height: 1px;
`
