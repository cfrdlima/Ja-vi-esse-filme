import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { getSimilarMovies } from '@/services/similarMoviesService';

export const useSimilarMovies = (params: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const movieData = await getSimilarMovies(params);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [params]);

  return { movies, isLoading };
};
