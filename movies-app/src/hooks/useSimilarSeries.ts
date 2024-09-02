import { useState, useEffect } from 'react';
import { Series } from '@/types/series';
import { getSimilarSeries } from '@/services/similarSeriesService';

export const useSimilarSeries = (params: number) => {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSimilarSeries = async () => {
      try {
        const serieData = await getSimilarSeries(params);
        setSeries(serieData);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarSeries();
  }, [params]);

  return { series, isLoading };
};
