import { useState, useEffect } from 'react';
import { WatchProviders } from '@/types/watchProviders';
import { getSeriesProviders } from '@/services/watchProvidersSeriesService';

export const useSeriesWatchProviders = (params: number) => {
  const [serie, setSerie] = useState<WatchProviders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeriesProviders = async () => {
      try {
        const serieData = await getSeriesProviders(params);
        setSerie([serieData]);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeriesProviders();
  }, [params]);

  return { serie, isLoading }; // Retorne um único objeto
};