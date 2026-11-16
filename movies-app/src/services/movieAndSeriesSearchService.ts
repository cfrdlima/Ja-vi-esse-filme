import axios from 'axios';


export const getMoviesAndSeries = async (params: object) => {
  try {
    const response = await axios.get(
      "/api/tmdb/search/multi", {
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
