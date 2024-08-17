import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getLogin = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new", {
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
};
