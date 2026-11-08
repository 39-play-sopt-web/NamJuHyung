import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RequireAuth from './components/layout/RequireAuth'
import { ROUTES } from './constants/routes'
import BoardDetailPage from './pages/BoardDetailPage'
import BoardMainPage from './pages/BoardMainPage'
import BoardWritePage from './pages/BoardWritePage'
import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <LoginPage /> },
  {
    element: <Layout />,
    children: [
      { path: ROUTES.BOARD, element: <BoardMainPage /> },
      { path: ROUTES.BOARD_DETAIL, element: <BoardDetailPage /> },
      {
        element: <RequireAuth />,
        children: [{ path: ROUTES.BOARD_WRITE, element: <BoardWritePage /> }],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
