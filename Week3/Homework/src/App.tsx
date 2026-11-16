import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/layout/Layout'
import { ROUTES } from './constants/routes'
import MovieMainPage from './pages/MovieMain/MovieMainPage'
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage'

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Layout />,
    children: [
      { index: true, element: <MovieMainPage /> },
      { path: ROUTES.MOVIE_DETAIL, element: <MovieDetailPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
