import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { endStudySession } from '../services/session';
import {
  connectSessionSocket,
  disconnectSessionSocket,
  sendSessionAction,
} from '../services/ws/sessionSocket';

export type SessionConfig = {
  subjectId: number;
  taskId: number;
  plannedDuration: number;
  breakInterval: number;
  breakDuration: number;
};

type LiveStats = {
  energy?: number;
  focus?: number;
  stress?: number;
  healthPoints?: number;
  burnoutRisk?: string;
};

export const useSessionRuntime = (config?: SessionConfig) => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const plannedSeconds = (config?.plannedDuration ?? 0) * 60;
  const breakTotalSeconds = (config?.breakDuration ?? 0) * 60;

  const [studySeconds, setStudySeconds] = useState(0);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(breakTotalSeconds);

  const [isStudyRunning, setIsStudyRunning] = useState(true);
  const [breakReminder, setBreakReminder] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [penaltyTriggered, setPenaltyTriggered] = useState(false);
  const [penaltyMessage, setPenaltyMessage] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);

  const studyProgress = useMemo(() => {
    if (!plannedSeconds) return 0;
    return Math.min((studySeconds / plannedSeconds) * 100, 100);
  }, [studySeconds, plannedSeconds]);

  const breakProgress = useMemo(() => {
    if (!breakTotalSeconds) return 0;

    return Math.min(
      ((breakTotalSeconds - breakSecondsLeft) / breakTotalSeconds) * 100,
      100,
    );
  }, [breakSecondsLeft, breakTotalSeconds]);

  useEffect(() => {
    if (!isStudyRunning || isOnBreak || sessionDone) return;

    const interval = setInterval(() => {
      setStudySeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStudyRunning, isOnBreak, sessionDone]);

  useEffect(() => {
    if (!isOnBreak || sessionDone) return;

    setBreakSecondsLeft(breakTotalSeconds);

    const interval = setInterval(() => {
      setBreakSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOnBreak, breakTotalSeconds, sessionDone]);

  useEffect(() => {
    if (!sessionId) return;

    connectSessionSocket(Number(sessionId), (event) => {
      switch (event.type) {
        case 'BREAK_REMINDER':
          setBreakReminder(true);
          break;

        case 'BREAK_STARTED':
          setBreakReminder(false);
          setIsOnBreak(true);
          setIsStudyRunning(false);
          setBreakSecondsLeft(
            Math.floor(
              (event.payload?.breakDurationMs ?? breakTotalSeconds * 1000) /
                1000,
            ),
          );
          break;

        case 'BREAK_ENDED':
          setIsOnBreak(false);
          setIsStudyRunning(true);
          setBreakSecondsLeft(breakTotalSeconds);
          break;

        case 'SESSION_TIME_REACHED':
        case 'SESSION_TIMEOUT':
          setSessionDone(true);
          setBreakReminder(false);
          setIsStudyRunning(false);
          break;

        case 'PENALTY_TRIGGERED':
        case 'penalty_triggered':
          setPenaltyTriggered(true);
          setBreakReminder(false);
          setPenaltyMessage(
            event.payload?.message ||
              'Penalty triggered. Your health stats were affected.',
          );

          if (event.payload?.stats) {
            setLiveStats(event.payload.stats);
          }

          break;

        default:
          break;
      }
    });

    return () => {
      disconnectSessionSocket();
    };
  }, [sessionId, breakTotalSeconds]);

  const handleAcceptBreak = () => {
    sendSessionAction('BREAK_ACCEPTED');
  };

  const handleIgnoreBreak = () => {
    setBreakReminder(false);
    sendSessionAction('BREAK_IGNORED');
  };

  const handleManualBreak = () => {
    sendSessionAction('TAKE_MANUAL_BREAK');
  };

  const handleEndSession = async () => {
    try {
      await endStudySession(Number(sessionId));
      disconnectSessionSocket();

      if (config?.subjectId) {
        navigate(`/subjects/${config.subjectId}`);
        return;
      }

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return {
    plannedSeconds,
    breakTotalSeconds,
    studySeconds,
    breakSecondsLeft,
    studyProgress,
    breakProgress,
    isOnBreak,
    breakReminder,
    sessionDone,
    penaltyTriggered,
    penaltyMessage,
    liveStats,
    handleAcceptBreak,
    handleIgnoreBreak,
    handleManualBreak,
    handleEndSession,
  };
};
