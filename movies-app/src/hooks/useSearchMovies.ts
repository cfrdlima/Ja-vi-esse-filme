import { useState, useEffect } from 'react';
import { getMoviesAndSeries } from '../services/movieAndSeriesSearchService';
import { Multi } from '@/types/multi';

export const useMoviesAndSeries = (params: object) => {
  const [movies, setMovies] = useState<Multi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMoviesAndSeries(params);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [params]);

  return { movies, isLoading };
};
