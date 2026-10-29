import styled from '@emotion/styled'

interface MovieSummaryProps {
  overview: string
}

function MovieSummary({ overview }: MovieSummaryProps) {
  if (!overview) {
    return <EmptyText>줄거리 정보가 없어요.</EmptyText>
  }

  return <Overview>{overview}</Overview>
}

export default MovieSummary

const Overview = styled.p`
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.85;
`

const EmptyText = styled.p`
  font-size: 14px;
  opacity: 0.6;
`
