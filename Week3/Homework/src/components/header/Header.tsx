import styled from '@emotion/styled'
import { Link } from 'react-router'
import { ROUTES } from '../../constants/routes'

function Header() {
  return (
    <HeaderWrapper>
      <Title>
        <TitleLink to={ROUTES.MAIN}>PLAY SOPT MOVIE</TitleLink>
      </Title>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 30px;
  background-color: ${({ theme }) => theme.colors.background};
`

const Title = styled.h1`
  font-size: 24px;
`

const TitleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
`
