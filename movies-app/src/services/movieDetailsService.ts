import { MovieDetails } from '@/types/movieDetails';
import axios from 'axios';


export const getMoviesDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await axios.get(
      `/api/tmdb/movie/${movieId}`, // Corrigida a interpolação da URL
      {
        params: {
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
