import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import Header from './Header'

export default function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  )
}

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 80px;
`
