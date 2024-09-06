import { useState, useEffect } from 'react';
import { getRecommendationSeries } from '@/services/recomendedSeriesService';
import { Series } from '@/types/series';

export const useRecommendationsSeries = (params: number) => {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendationsSeries = async () => {
      try {
        const serieData = await getRecommendationSeries(params);
        setSeries(serieData);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendationsSeries();
  }, [params]);

  return { series, isLoading };
};
