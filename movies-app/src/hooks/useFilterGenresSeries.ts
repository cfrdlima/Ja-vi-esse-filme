import { useState, useEffect } from 'react';
import { getFilterGenresSeries } from '@/services/filterGenresSeriesService';
import { Genre } from '@/types/filterGenre';

export const useFilterGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenresSeries = async () => {
      try {
        const genreData = await getFilterGenresSeries();
        setGenres(genreData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenresSeries();
  }, []);

  return { genres, isLoading };
};
