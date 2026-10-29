import styled from '@emotion/styled'

interface MovieInfoProps {
  label: string
  value: string
}

function MovieInfo({ label, value }: MovieInfoProps) {
  return (
    <InfoRow>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </InfoRow>
  )
}

export default MovieInfo

const InfoRow = styled.div`
  display: flex;
  gap: 24px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
`

const Label = styled.dt`
  flex-shrink: 0;
  width: 100px;
  font-size: 14px;
  opacity: 0.6;
`

const Value = styled.dd`
  font-size: 14px;
`
