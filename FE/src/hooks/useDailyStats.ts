import { useEffect, useState } from 'react';
import {
  getTodayStats,
  updateTodaySleepHours,
  type DailyStats,
} from '../services/dailyStats';

export const useDailyStats = () => {
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [sleepHours, setSleepHours] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const data = await getTodayStats();

      setStats(data);

      setSleepHours(data.sleep_hours !== null ? String(data.sleep_hours) : '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSaveSleep = async () => {
    if (!sleepHours.trim()) return;

    const value = Number(sleepHours);

    if (Number.isNaN(value) || value < 0 || value > 24) {
      return;
    }

    const updated = await updateTodaySleepHours(value);

    setStats(updated);
  };

  return {
    stats,
    sleepHours,
    setSleepHours,
    loading,
    handleSaveSleep,
  };
};
