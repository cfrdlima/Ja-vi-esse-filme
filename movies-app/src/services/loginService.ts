import axios from 'axios';


export const getLogin = async () => {
  try {
    const response = await axios.get(
      "/api/tmdb/authentication/token/new", {
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
};
