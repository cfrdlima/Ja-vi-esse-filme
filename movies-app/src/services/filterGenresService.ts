import axios from 'axios';


export const getFilterGenres = async () => {
  try {
    const response = await axios.get(
      "/api/tmdb/genre/movie/list", {
      params: {
        language: 'pt',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};