import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getMovies = async (params: object) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: API_KEY,
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
