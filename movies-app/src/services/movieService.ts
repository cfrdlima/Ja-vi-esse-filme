import axios from 'axios';


export const getMovies = async (params: object) => {
  try {
    const response = await axios.get(
      "/api/tmdb/discover/movie", {
      params: {
        language: 'pt-br',
        ...params,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
