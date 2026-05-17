import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { TaskCard } from '../../../../../components/TaskCard/TaskCard';
import type { Task } from '../../../../../types/taskTypes';
import {
  emptySubtitleSx,
  emptyTasksSx,
  emptyTitleSx,
  primaryButtonSx,
  sectionSubtitleSx,
  sectionTitleSx,
  tasksCardSx,
} from '../../SubjectDetails.styles';

type Props = {
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onRefreshTasks: () => void;
  onCreateSession: (task: Task) => void;
};

export const TasksSection = ({
  tasks,
  onAddTask,
  onEditTask,
  onRefreshTasks,
  onCreateSession,
}: Props) => {
  return (
    <Paper elevation={0} sx={tasksCardSx}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography sx={sectionTitleSx}>Tasks</Typography>

          <Typography sx={sectionSubtitleSx}>
            Start a session from any task when you are ready to focus.
          </Typography>
        </Box>

        <Button variant="contained" onClick={onAddTask} sx={primaryButtonSx}>
          Add task
        </Button>
      </Stack>

      {tasks.length === 0 ? (
        <Box sx={emptyTasksSx}>
          <Typography sx={emptyTitleSx}>No tasks yet</Typography>

          <Typography sx={emptySubtitleSx}>
            Add your first task and turn this subject into a study plan.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDeleted={onRefreshTasks}
              onCreateSession={() => onCreateSession(task)}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
};
