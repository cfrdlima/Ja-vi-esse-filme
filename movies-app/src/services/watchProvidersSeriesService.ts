import { WatchProviders } from '@/types/watchProviders';
import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getSeriesProviders = async (serieId: number): Promise<WatchProviders> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${serieId}/watch/providers`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data.results.BR.flatrate;
  } catch (error) {
    console.error('Error fetching watch providers', error);
    throw error;
  }
};