import { WatchProviders } from '@/types/watchProviders';
import axios from 'axios';


export const getSeriesProviders = async (serieId: number): Promise<WatchProviders> => {
  try {
    const response = await axios.get(
      `/api/tmdb/tv/${serieId}/watch/providers`,
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