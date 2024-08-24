import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getFilterGenres = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: API_KEY,
        language: 'pt',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};