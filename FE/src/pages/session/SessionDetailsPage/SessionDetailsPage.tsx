import { Box, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  useSessionRuntime,
  type SessionConfig,
} from '../../../hooks/useSessionRuntime';
import { pageSx, titleSx } from './SessionDetailsPage.style';
import { BreakReminderPanel } from './components/BreakReminderPanel';
import { PenaltyPanel } from './components/PenaltyPanel';
import { SessionActions } from './components/SessionActions';
import { SessionDonePanel } from './components/SessionDonePanel';
import { SessionInfoChips } from './components/SessionInfChips';
import { TimerCard } from './components/TimeCard';

export const SessionPage = () => {
  const location = useLocation();

  const config = location.state as SessionConfig | undefined;

  const session = useSessionRuntime(config);

  return (
    <Box sx={pageSx}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box textAlign="center">
            <Typography variant="h4" sx={titleSx}>
              Study Session
            </Typography>

            <Typography color="text.secondary">
              Stay focused, take smart breaks, finish strong.
            </Typography>
          </Box>

          <SessionInfoChips config={config} />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            justifyContent="center"
          >
            <TimerCard
              title="STUDY TIMER"
              label="FOCUS"
              seconds={session.studySeconds}
              progress={session.studyProgress}
              baseColor="#e0e7ff"
              progressColor="#4f46e5"
              shadowColor="rgba(59, 130, 246, 0.12)"
            />

            <TimerCard
              title="BREAK TIMER"
              label="BREAK"
              seconds={
                session.isOnBreak
                  ? session.breakSecondsLeft
                  : session.breakTotalSeconds
              }
              progress={session.isOnBreak ? session.breakProgress : 0}
              baseColor="#dcfce7"
              progressColor="#10b981"
              shadowColor="rgba(16, 185, 129, 0.12)"
              isDimmed={!session.isOnBreak}
            />
          </Stack>

          {session.breakReminder && (
            <BreakReminderPanel
              onAccept={session.handleAcceptBreak}
              onIgnore={session.handleIgnoreBreak}
            />
          )}

          {session.sessionDone && <SessionDonePanel />}

          {session.penaltyTriggered && (
            <PenaltyPanel
              message={session.penaltyMessage}
              liveStats={session.liveStats}
            />
          )}

          <SessionActions
            isOnBreak={session.isOnBreak}
            sessionDone={session.sessionDone}
            onManualBreak={session.handleManualBreak}
            onEndSession={session.handleEndSession}
          />
        </Stack>
      </Container>
    </Box>
  );
};
