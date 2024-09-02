import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getSimilarSeries = async (serieId: number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${serieId}/similar`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
};