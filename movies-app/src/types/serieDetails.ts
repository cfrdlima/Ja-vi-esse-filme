export interface SerieDetails {
  show_id: number;
  original_name: string;
  genres: Genre[];
  overview: string;
  poster_path: string;
  backdrop_path: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  first_air_date: string;
  last_air_date: string;
  status: string;
}

export interface Genre {
  id: number;
  name: string;
}