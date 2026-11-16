import axios from 'axios';


export const getSimilarSeries = async (serieId: number) => {
  try {
    const response = await axios.get(
      `/api/tmdb/tv/${serieId}/similar`, {
      params: {
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