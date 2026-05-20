import { useEffect, useState } from 'react';
import { getAnalyticsSummary } from '../services/analytics';
import type { AnalyticsSummary } from '../types/analyticsTypes';

export const useAnalytics = () => {
  const [range, setRange] = useState<1 | 7 | 30>(7);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const data = await getAnalyticsSummary(range);

      setAnalytics(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  return {
    range,
    setRange,
    analytics,
    loading,
  };
};
