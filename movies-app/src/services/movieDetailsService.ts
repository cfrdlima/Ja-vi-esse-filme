import { MovieDetails } from '@/types/movieDetails';
import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getMoviesDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`, // Corrigida a interpolação da URL
      {
        params: {
          api_key: API_KEY,
          language: 'pt-BR', // Idioma no formato correto
        },
      }
    );

    // Retorne o objeto completo de MovieDetails
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; // Lança o erro para tratamento no hook
  }
};
