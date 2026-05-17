import { useState } from 'react';
import { getSessionsByTaskId, type StudySession } from '../../services/session';

export const useTaskSessions = (taskId: number) => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loadedSessions, setLoadedSessions] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);

  const loadSessions = async () => {
    if (loadedSessions || loadingSessions) return;

    try {
      setLoadingSessions(true);

      const data = await getSessionsByTaskId(taskId);

      setSessions(data);
      setLoadedSessions(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSessions(false);
    }
  };

  return {
    sessions,
    loadingSessions,
    loadSessions,
  };
};
