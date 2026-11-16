import { SerieDetails } from '@/types/serieDetails';
import axios from 'axios';


export const getSeriesDetails = async (serieId: number): Promise<SerieDetails> => {
  try {
    const response = await axios.get(
      `/api/tmdb/tv/${serieId}`, // Corrigida a interpolação da URL
      {
        params: {
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