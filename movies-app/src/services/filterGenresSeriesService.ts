import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getFilterGenresSeries = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/genre/tv/list", {
      params: {
        api_key: API_KEY,
        language: 'pt',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
};