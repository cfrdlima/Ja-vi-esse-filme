import { useState, useEffect } from 'react';
import { getMoviesDetails } from '@/services/movieDetailsService';
import { MovieDetails } from '@/types/movieDetails';

export const useMoviesDetails = (params: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null); // Ajuste para um único objeto ou null
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const movieData = await getMoviesDetails(params);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesDetails();
  }, [params]);

  return { movie, isLoading }; // Retorne um único objeto
};
