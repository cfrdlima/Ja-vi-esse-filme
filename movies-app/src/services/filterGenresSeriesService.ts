import axios from 'axios';


export const getFilterGenresSeries = async () => {
  try {
    const response = await axios.get(
      "/api/tmdb/genre/tv/list", {
      params: {
        language: 'pt',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
};