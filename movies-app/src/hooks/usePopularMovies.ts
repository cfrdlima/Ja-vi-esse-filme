import { useState, useEffect } from 'react';
import { getMovies } from '@/services/popularMoviesService';
import { Movie } from '@/types/movie';

export const useMoviesPopular = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingPopular, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovies();
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  });

  return { movies, isLoadingPopular };
};
