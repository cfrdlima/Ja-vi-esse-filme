export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  budget: number;
  genres: Genre[];
  origin_country: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}