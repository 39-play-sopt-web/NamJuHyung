import styled from '@emotion/styled'
import MovieInfo from './MovieInfo'
import type { MovieDetail } from '../../api/movie'
import { formatMoney, toLanguageName, toRegionName } from '../../utils/format'

interface MovieInfoSectionProps {
  movie: MovieDetail
}

const EMPTY_TEXT = '정보 없음'

const joinOrEmpty = (items: string[]) =>
  items.length > 0 ? items.join(', ') : EMPTY_TEXT

function MovieInfoSection({ movie }: MovieInfoSectionProps) {
  const {
    original_title,
    original_language,
    production_countries,
    spoken_languages,
    budget,
    revenue,
  } = movie

  const infos = [
    { label: '원제', value: original_title },
    { label: '원어', value: toLanguageName(original_language) },
    {
      label: '제작 국가',
      value: joinOrEmpty(
        production_countries.map(({ iso_3166_1 }) => toRegionName(iso_3166_1)),
      ),
    },
    {
      label: '사용 언어',
      value: joinOrEmpty(
        spoken_languages.map(({ iso_639_1 }) => toLanguageName(iso_639_1)),
      ),
    },
    { label: '예산', value: formatMoney(budget) ?? EMPTY_TEXT },
    { label: '수익', value: formatMoney(revenue) ?? EMPTY_TEXT },
  ]

  return (
    <InfoList>
      {infos.map(({ label, value }) => (
        <MovieInfo key={label} label={label} value={value} />
      ))}
    </InfoList>
  )
}

export default MovieInfoSection

const InfoList = styled.dl`
  width: 100%;
`
