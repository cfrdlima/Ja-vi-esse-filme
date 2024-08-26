import { useState, useEffect } from 'react';
import { getMovies } from '@/services/topRatedMoviesService';
import { Movie } from '@/types/movie';

export const useMoviesTopRated = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  return { movies, isLoading };
};
