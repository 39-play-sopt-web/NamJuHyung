import { Outlet, ScrollRestoration } from 'react-router'
import Header from '../header/Header'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

export default Layout
