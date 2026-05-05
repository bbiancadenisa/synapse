import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import {
  DeleteOutline,
  EditOutlined,
  ExpandMoreOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import { getSessionsByTaskId, type StudySession } from '../../services/session';

type Props = {
  task: {
    id: number;
    title: string;
    status: string;
    estimated_hours: number;
    description?: string;
  };
  onDeleted?: () => void;
  onEdit: () => void;
  onCreateSession: () => void;
};

const getStatusStyle = (status: string) => {
  if (status === 'done') {
    return {
      background: '#ecfdf5',
      color: '#047857',
    };
  }

  if (status === 'in_progress') {
    return {
      background: '#eef2ff',
      color: '#4f46e5',
    };
  }

  return {
    background: '#f1f5f9',
    color: '#475569',
  };
};

const formatStatus = (status: string) => {
  if (status === 'in_progress') return 'In progress';
  if (status === 'todo') return 'To do';
  if (status === 'done') return 'Done';
  return status;
};

const formatSessionStatus = (status: string) => {
  if (status === 'timed_out') return 'Timed out';
  if (status === 'completed') return 'Completed';
  if (status === 'paused') return 'Paused';
  if (status === 'running') return 'Running';
  return status;
};

const getSessionProgress = (session: StudySession) => {
  if (session.status === 'completed') return 100;
  if (session.status === 'timed_out') return 100;

  return 0;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const TaskCard = ({
  task,
  onDeleted,
  onEdit,
  onCreateSession,
}: Props) => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loadedSessions, setLoadedSessions] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);

  const loadSessions = async () => {
    if (loadedSessions || loadingSessions) return;

    try {
      setLoadingSessions(true);
      const data = await getSessionsByTaskId(task.id);
      setSessions(data);
      setLoadedSessions(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSessions(false);
    }
  };

  return (
    <Accordion
      elevation={0}
      disableGutters
      onChange={(_, expanded) => {
        if (expanded) loadSessions();
      }}
      sx={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px !important',
        background: '#ffffff',
        overflow: 'hidden',
        '&:before': {
          display: 'none',
        },
        '&:hover': {
          borderColor: '#c7d2fe',
          boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined sx={{ color: '#64748b' }} />}
        sx={{
          px: 2,
          py: 0.5,
          '& .MuiAccordionSummary-content': {
            my: 1.25,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', pr: 1 }}
          spacing={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.35,
              }}
            >
              {task.title}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Chip
                size="small"
                label={formatStatus(task.status)}
                sx={{
                  height: 24,
                  borderRadius: 1.5,
                  fontSize: 12,
                  fontWeight: 500,
                  ...getStatusStyle(task.status),
                }}
              />

              <Typography sx={{ fontSize: 13, color: '#64748b' }}>
                {task.estimated_hours}h estimated
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              sx={{
                color: '#64748b',
                '&:hover': {
                  background: '#f1f5f9',
                  color: '#334155',
                },
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDeleted?.();
              }}
              sx={{
                color: '#94a3b8',
                '&:hover': {
                  background: '#fef2f2',
                  color: '#dc2626',
                },
              }}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 2,
          pt: 0,
          pb: 2,
          borderTop: '1px solid #f1f5f9',
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: '#64748b',
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {task.description || 'No description yet.'}
        </Typography>

        <Button
          variant="contained"
          onClick={onCreateSession}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            background: '#4f46e5',
            boxShadow: 'none',
            '&:hover': {
              background: '#4338ca',
              boxShadow: 'none',
            },
          }}
        >
          Create session
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: '#111827',
              mb: 1.5,
            }}
          >
            Study sessions
          </Typography>

          {loadingSessions && (
            <Typography sx={{ fontSize: 14, color: '#64748b' }}>
              Loading sessions...
            </Typography>
          )}

          {!loadingSessions && sessions.length === 0 && (
            <Box
              sx={{
                border: '1px dashed #cbd5e1',
                borderRadius: 2,
                p: 2,
                background: '#f8fafc',
              }}
            >
              <Typography sx={{ fontSize: 14, color: '#64748b' }}>
                No sessions yet for this task.
              </Typography>
            </Box>
          )}

          {!loadingSessions && sessions.length > 0 && (
            <Stack spacing={1.25}>
              {sessions.map((session) => {
                const progress = getSessionProgress(session);

                return (
                  <Box
                    key={session.id}
                    sx={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 2,
                      p: 1.5,
                      background: '#ffffff',
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      spacing={1}
                      sx={{ mb: 1 }}
                    >
                      <Stack spacing={0.25}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#111827',
                          }}
                        >
                          Planned study time: {session.planned_duration_minutes}{' '}
                          min
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 13,
                            color: '#64748b',
                          }}
                        >
                          Breaks taken: {session.break_count} · Started:{' '}
                          {formatDate(session.start_time)}
                        </Typography>
                      </Stack>

                      <Chip
                        size="small"
                        label={formatSessionStatus(session.status)}
                        sx={{
                          height: 24,
                          borderRadius: 1.5,
                          fontSize: 12,
                          background:
                            session.status === 'completed'
                              ? '#ecfdf5'
                              : session.status === 'timed_out'
                                ? '#fef2f2'
                                : '#eef2ff',
                          color:
                            session.status === 'completed'
                              ? '#047857'
                              : session.status === 'timed_out'
                                ? '#dc2626'
                                : '#4f46e5',
                        }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 999,
                          background: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 999,
                            background: '#4f46e5',
                          },
                        }}
                      />

                      <Typography
                        sx={{
                          width: 42,
                          textAlign: 'right',
                          fontSize: 13,
                          color: '#64748b',
                        }}
                      >
                        {progress}%
                      </Typography>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
