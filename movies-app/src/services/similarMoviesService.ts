import axios from 'axios';


export const getSimilarMovies = async (movieId: number) => {
  try {
    const response = await axios.get(
      `/api/tmdb/movie/${movieId}/similar`, {
      params: {
        language: 'pt-br',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};