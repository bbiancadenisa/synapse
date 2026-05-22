import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useSessionRuntime,
  type SessionConfig,
} from '../../hooks/useSessionRuntime';
import {
  confirmEndButtonSx,
  continueStudyingButtonSx,
  pageSx,
  shortSessionDialogPaperSx,
  shortSessionTextSx,
  shortSessionTitleSx,
  subtitleSx,
  titleSx,
} from './SessionDetailsPage.style';
import { BreakReminderPanel } from './components/BreakReminderPanel';
import { PenaltyPanel } from './components/PenaltyPanel';
import { SessionActions } from './components/SessionActions';
import { SessionDonePanel } from './components/SessionDonePanel';
import { SessionInfoChips } from './components/SessionInfChips';
import { TimerCard } from './components/TimeCard';

export const SessionPage = () => {
  const [shortSessionModalOpen, setShortSessionModalOpen] = useState(false);

  const handleRequestEndSession = () => {
    if (session.studySeconds < 5 * 60) {
      setShortSessionModalOpen(true);
      return;
    }

    void session.handleEndSession();
  };

  const handleConfirmEndShortSession = () => {
    setShortSessionModalOpen(false);
    void session.handleEndSession();
  };
  const location = useLocation();

  const config = location.state as SessionConfig | undefined;

  const session = useSessionRuntime(config);

  return (
    <Box sx={pageSx}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Dialog
            open={shortSessionModalOpen}
            onClose={() => setShortSessionModalOpen(false)}
            fullWidth
            maxWidth="xs"
            PaperProps={{ sx: shortSessionDialogPaperSx }}
          >
            <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
              <Typography sx={shortSessionTitleSx}>
                Session too short
              </Typography>
            </DialogTitle>

            <DialogContent sx={{ px: 3, pt: 1 }}>
              <Typography sx={shortSessionTextSx}>
                This study session is shorter than 5 minutes and will not be
                saved to your statistics. Are you sure you want to end it?
              </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
              <Button
                onClick={() => setShortSessionModalOpen(false)}
                sx={continueStudyingButtonSx}
              >
                Continue studying
              </Button>

              <Button
                variant="contained"
                onClick={handleConfirmEndShortSession}
                sx={confirmEndButtonSx}
              >
                End session
              </Button>
            </DialogActions>
          </Dialog>

          <Box textAlign="center">
            <Typography variant="h4" sx={titleSx}>
              Study Session
            </Typography>

            <Typography sx={subtitleSx}>
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
            onManualBreak={session.handleManualBreak}
            onEndSession={handleRequestEndSession}
          />
        </Stack>
      </Container>
    </Box>
  );
};
