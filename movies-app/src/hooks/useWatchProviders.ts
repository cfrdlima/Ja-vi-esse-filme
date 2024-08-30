import { useState, useEffect } from 'react';
import { WatchProviders } from '@/types/watchProviders';
import { getMoviesProviders } from '@/services/watchProvidersService';

export const useWatchProviders = (params: number) => {
  const [movie, setMovie] = useState<WatchProviders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMoviesProviders = async () => {
      try {
        const movieData = await getMoviesProviders(params);
        setMovie([movieData]);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesProviders();
  }, [params]);

  return { movie, isLoading }; // Retorne um único objeto
};