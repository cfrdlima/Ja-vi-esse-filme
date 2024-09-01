import { SerieDetails } from '@/types/serieDetails';
import axios from 'axios';

const API_KEY = 'eabdfc6fc4fac646d5b41dc98dd4414e';

export const getSeriesDetails = async (serieId: number): Promise<SerieDetails> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${serieId}`, // Corrigida a interpolação da URL
      {
        params: {
          api_key: API_KEY,
          language: 'pt-BR', // Idioma no formato correto
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching serie details:', error);
    throw error; // Lança o erro para tratamento no hook
  }
};