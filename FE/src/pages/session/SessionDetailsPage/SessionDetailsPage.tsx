import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { endStudySession } from '../../../services/session';
import {
  connectSessionSocket,
  disconnectSessionSocket,
} from '../../../services/ws/sessionSocket';

export const SessionPage = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const config = location.state as {
    taskId: number;
    plannedDuration: number;
    breakInterval: number;
    breakDuration: number;
  };

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const [breakAlert, setBreakAlert] = useState(false);

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!sessionId) return;

    connectSessionSocket(Number(sessionId), (event) => {
      if (event.type === 'BREAK_REMINDER') {
        setBreakAlert(true);
      }
    });

    return () => {
      disconnectSessionSocket();
    };
  }, [sessionId]);

  useEffect(() => {
    if (!breakAlert) return;

    const t = setTimeout(() => {
      setBreakAlert(false);
    }, 5000);

    return () => clearTimeout(t);
  }, [breakAlert]);

  const handleEndSession = async () => {
    try {
      await endStudySession(Number(sessionId));

      disconnectSessionSocket();

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {breakAlert && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: '#ffcc00',
            padding: 16,
            borderRadius: 8,
            fontWeight: 'bold',
            zIndex: 9999,
          }}
        >
          Time for a break!
        </div>
      )}

      <Stack spacing={3}>
        <Typography variant="h4">Session #{sessionId}</Typography>

        <Typography>Task ID: {config?.taskId}</Typography>

        <Typography>Planned Duration: {config?.plannedDuration} min</Typography>

        <Typography variant="h3">Timer: {seconds}s</Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => setIsRunning(false)}>
            Pause
          </Button>

          <Button variant="outlined" onClick={() => setIsRunning(true)}>
            Resume
          </Button>

          <Button variant="contained" color="error" onClick={handleEndSession}>
            End Session
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
