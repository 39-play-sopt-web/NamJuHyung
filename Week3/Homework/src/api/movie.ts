import { instance } from './instance'

export interface Movie {
  id: number
  title: string
  original_title: string
  original_language: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  video: boolean
}

interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface RatingRange {
  voteAverageGte?: number
  voteAverageLte?: number
}

interface GetMoviesParams extends RatingRange {
  page: number
}

export const getMovies = async ({
  page,
  voteAverageGte,
  voteAverageLte,
}: GetMoviesParams) => {
  const { data } = await instance.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      'vote_average.gte': voteAverageGte,
      'vote_average.lte': voteAverageLte,
    },
  })
  return data
}

export interface MovieDetail {
  id: number
  title: string
  original_title: string
  tagline: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  runtime: number
  status: string
  genres: { id: number; name: string }[]
  vote_average: number
  vote_count: number
  original_language: string
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; english_name: string; name: string }[]
  budget: number
  revenue: number
}

export const getMovieDetail = async (movieId: number) => {
  const { data } = await instance.get<MovieDetail>(`/movie/${movieId}`)
  return data
}
