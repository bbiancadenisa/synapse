import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { endStudySession } from '../../../services/session';
import {
  connectSessionSocket,
  disconnectSessionSocket,
  sendSessionAction,
} from '../../../services/ws/sessionSocket';

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const SessionPage = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const config = location.state as
    | {
        subjectId: number;
        taskId: number;
        plannedDuration: number;
        breakInterval: number;
        breakDuration: number;
      }
    | undefined;

  const plannedSeconds = (config?.plannedDuration ?? 0) * 60;
  const breakTotalSeconds = (config?.breakDuration ?? 0) * 60;

  const [studySeconds, setStudySeconds] = useState(0);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(breakTotalSeconds);

  const [isStudyRunning, setIsStudyRunning] = useState(true);
  const [breakReminder, setBreakReminder] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [penaltyTriggered, setPenaltyTriggered] = useState(false);

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
          setSessionDone(true);
          setBreakReminder(false);
          setIsStudyRunning(false);
          break;

        case 'SESSION_TIMEOUT':
          setSessionDone(true);
          setBreakReminder(false);
          setIsStudyRunning(false);
          break;

        case 'PENALTY_TRIGGERED':
          setPenaltyTriggered(true);
          setBreakReminder(false);
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f7f7ff 0%, #eef2ff 50%, #f8fafc 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={800}>
              Study Session
            </Typography>
            <Typography color="text.secondary">
              Stay focused, take smart breaks, finish strong.
            </Typography>
          </Box>

          <Paper
            sx={{
              p: 3,
              borderRadius: 5,
              boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
            }}
          >
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={`Task ID: ${config?.taskId}`} />
              <Chip label={`Study: ${config?.plannedDuration} min`} />
              <Chip label={`Break every: ${config?.breakInterval} min`} />
              <Chip label={`Break duration: ${config?.breakDuration} min`} />
            </Stack>
          </Paper>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            justifyContent="center"
          >
            <Paper
              sx={{
                p: 4,
                flex: 1,
                borderRadius: 6,
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(59, 130, 246, 0.12)',
              }}
            >
              <Typography fontWeight={700} color="text.secondary" mb={2}>
                STUDY TIMER
              </Typography>

              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={210}
                  thickness={4}
                  sx={{ color: '#e0e7ff' }}
                />
                <CircularProgress
                  variant="determinate"
                  value={studyProgress}
                  size={210}
                  thickness={4}
                  sx={{
                    color: '#4f46e5',
                    position: 'absolute',
                    left: 0,
                  }}
                />
                <Box
                  sx={{
                    inset: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h3" fontWeight={900}>
                    {formatTime(studySeconds)}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={800}
                    color="text.secondary"
                  >
                    FOCUS
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              sx={{
                p: 4,
                flex: 1,
                borderRadius: 6,
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(16, 185, 129, 0.12)',
                opacity: isOnBreak ? 1 : 0.75,
              }}
            >
              <Typography fontWeight={700} color="text.secondary" mb={2}>
                BREAK TIMER
              </Typography>

              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={210}
                  thickness={4}
                  sx={{ color: '#dcfce7' }}
                />
                <CircularProgress
                  variant="determinate"
                  value={isOnBreak ? breakProgress : 0}
                  size={210}
                  thickness={4}
                  sx={{
                    color: '#10b981',
                    position: 'absolute',
                    left: 0,
                  }}
                />
                <Box
                  sx={{
                    inset: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h3" fontWeight={900}>
                    {isOnBreak
                      ? formatTime(breakSecondsLeft)
                      : formatTime(breakTotalSeconds)}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={800}
                    color="text.secondary"
                  >
                    BREAK
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Stack>

          {breakReminder && (
            <Paper sx={{ p: 3, borderRadius: 5, background: '#fff7ed' }}>
              <Stack spacing={2}>
                <Typography fontWeight={800}>Time for a break</Typography>
                <Typography color="text.secondary">
                  Your focus cycle is complete. Take a short break to recharge.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={handleAcceptBreak}>
                    Accept break
                  </Button>
                  <Button variant="outlined" onClick={handleIgnoreBreak}>
                    Ignore
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}

          {sessionDone && (
            <Paper sx={{ p: 3, borderRadius: 5, background: '#eff6ff' }}>
              <Typography fontWeight={800}>
                Study time reached. You can end the session now.
              </Typography>
            </Paper>
          )}

          {penaltyTriggered && (
            <Paper sx={{ p: 3, borderRadius: 5, background: '#fef2f2' }}>
              <Typography fontWeight={800}>
                You ignored too many break reminders. Penalty triggered.
              </Typography>
            </Paper>
          )}

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              disabled={isOnBreak || sessionDone}
              onClick={handleManualBreak}
              sx={{ borderRadius: 999, px: 4 }}
            >
              Take a break
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleEndSession}
              sx={{ borderRadius: 999, px: 4 }}
            >
              End Session
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
