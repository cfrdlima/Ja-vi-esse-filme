import { useState, useEffect } from 'react';
import { getFilterGenres } from '../services/filterGenresService';
import { Genre } from '@/types/filterGenre';

export const useFilterGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getFilterGenres();
        setGenres(genreData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, isLoading };
};
