import { Link, NavLink, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { ROUTES } from '../../constants/routes'
import { clearAuth, getPart } from '../../utils/auth'

export default function Header() {
  const navigate = useNavigate()
  const part = getPart()

  const handleLogout = () => {
    clearAuth()
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <Wrapper>
      <Brand>
        <Logo to={ROUTES.BOARD}>PLAY SOPT BOARD</Logo>
        <Part>{part}</Part>
      </Brand>
      <Nav aria-label="주요 메뉴">
        <TabList>
          <li>
            <Tab to={ROUTES.BOARD} end>
              게시글 목록
            </Tab>
          </li>
          <li>
            <Tab to={ROUTES.BOARD_WRITE}>글쓰기</Tab>
          </li>
          <li>
            <LogoutButton type="button" onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          </li>
        </TabList>
      </Nav>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 16px;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.background};
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Logo = styled(Link)`
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 28px;
  font-weight: 800;
  white-space: nowrap;
  text-shadow: 0 0 12px ${({ theme }) => theme.colors.primary};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }
`

const Part = styled.p`
  line-height: 1;
  margin-top: 5px;
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`

const Nav = styled.nav`
  flex-shrink: 0;
`

const TabList = styled.ul`
  display: flex;
  gap: 4px;
  list-style: none;
`

const menuItem = ({ theme }: { theme: Theme }) => css`
  display: block;
  padding: 8px 12px;
  color: ${theme.colors.text};
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: 8px;
  }
`

const Tab = styled(NavLink)`
  ${menuItem}

  /* 현재 페이지 탭 (NavLink가 active 클래스를 붙여줌) */
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const LogoutButton = styled.button`
  ${menuItem}
`
