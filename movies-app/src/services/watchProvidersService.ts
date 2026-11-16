import { WatchProviders } from '@/types/watchProviders';
import axios from 'axios';


export const getMoviesProviders = async (movieId: number): Promise<WatchProviders> => {
  try {
    const response = await axios.get(
      `/api/tmdb/movie/${movieId}/watch/providers`,
      {
        params: {
        },
      }
    );
    return response.data.results.BR.flatrate;
  } catch (error) {
    console.error('Error fetching watch providers', error);
    throw error;
  }
};