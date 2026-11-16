import axios from 'axios';


export const getMovies = async () => {
  try {
    const response = await axios.get(
      "/api/tmdb/movie/popular", {
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