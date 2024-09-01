import { useState, useEffect } from 'react';
import { SerieDetails } from '@/types/serieDetails';
import { getSeriesDetails } from '@/services/serieDetailsService';

export const useSeriesDetails = (params: number) => {
  const [serie, setSerie] = useState<SerieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const movieData = await getSeriesDetails(params);
        setSerie(movieData);
      } catch (error) {
        console.error('Error fetching serie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [params]);

  return { serie, isLoading }; // Retorne um único objeto
};
