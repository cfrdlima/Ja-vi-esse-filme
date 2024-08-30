import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { getRecommendationsMovies } from '@/services/recomendedMoviesService';

export const useRecommendationsMovies = (params: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendationsMovies = async () => {
      try {
        const movieData = await getRecommendationsMovies(params);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendationsMovies();
  }, [params]);

  return { movies, isLoading };
};
