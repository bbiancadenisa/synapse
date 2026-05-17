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

import type { TaskCardProps } from '../../types/taskCardTypes';
import { TaskSessionCard } from '../TaskSessionCard/TaskSessionCard';
import {
  accordionDetailsSx,
  accordionSummarySx,
  accordionSx,
  createSessionButtonSx,
  deleteButtonSx,
  descriptionSx,
  editButtonSx,
  emptySessionsSx,
  getStatusChipSx,
  metaTextSx,
  progressSx,
  progressTextSx,
  sessionsTitleSx,
  taskTitleSx,
} from './TaskCard.styles';
import { formatStatus, getTaskProgress } from './TaskCard.utils';
import { useTaskSessions } from './useTaskSession';

export const TaskCard = ({
  task,
  onDeleted,
  onEdit,
  onCreateSession,
}: TaskCardProps) => {
  const { sessions, loadingSessions, loadSessions } = useTaskSessions(task.id);

  const taskProgress = getTaskProgress(task);
  const isTaskDone = task.status === 'done';

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleted?.();
  };

  return (
    <Accordion
      elevation={0}
      disableGutters
      onChange={(_, expanded) => {
        if (expanded) loadSessions();
      }}
      sx={accordionSx}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined sx={{ color: '#64748b' }} />}
        sx={accordionSummarySx}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', pr: 1 }}
          spacing={2}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={taskTitleSx}>{task.title}</Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Chip
                size="small"
                label={formatStatus(task.status)}
                sx={getStatusChipSx(task.status)}
              />

              <Typography sx={metaTextSx}>
                {task.estimated_hours}h estimated
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mt: 1.25 }}
            >
              <LinearProgress
                variant="determinate"
                value={Math.min(taskProgress, 100)}
                sx={progressSx(taskProgress)}
              />

              <Typography sx={progressTextSx}>{taskProgress}%</Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" onClick={handleEdit} sx={editButtonSx}>
              <EditOutlined fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={handleDelete} sx={deleteButtonSx}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={accordionDetailsSx}>
        <Typography sx={descriptionSx}>
          {task.description || 'No description yet.'}
        </Typography>

        <Button
          variant="contained"
          onClick={onCreateSession}
          disabled={isTaskDone}
          sx={createSessionButtonSx(isTaskDone)}
        >
          {isTaskDone ? 'Task completed' : 'Create Session'}
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography sx={sessionsTitleSx}>Study sessions</Typography>

          {loadingSessions && (
            <Typography sx={{ fontSize: 14, color: '#64748b' }}>
              Loading sessions...
            </Typography>
          )}

          {!loadingSessions && sessions.length === 0 && (
            <Box sx={emptySessionsSx}>
              <Typography sx={{ fontSize: 14, color: '#64748b' }}>
                No sessions yet for this task.
              </Typography>
            </Box>
          )}

          {!loadingSessions && sessions.length > 0 && (
            <Stack spacing={1.25}>
              {sessions.map((session) => (
                <TaskSessionCard key={session.id} session={session} />
              ))}
            </Stack>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
