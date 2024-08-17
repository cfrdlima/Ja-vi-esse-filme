import { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { Movie } from '@/types/movie';

export const useMovies = (params: object) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovies(params);
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
