import { Box, Container, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { CreateSessionModal } from '../../../components/CreateSessionModal/CreateSessionModal';
import { CreateTaskModal } from '../../../components/CreateTaskModal/CreateTaskModal';
import { EditSubjectModal } from '../../../components/EditSubjectModal/EditSubjectModal';
import { EditTaskModal } from '../../../components/EditTaskModal/EditTaskModal';
import { useSubjectDetails } from '../../../hooks/useSubjectDetails';
import { SubjectHeader } from './components/SubjectHeader/SubjectHeader';
import { TaskFilters } from './components/TaskFilters/TaskFilters';
import { TasksSection } from './components/TaskSection/TaskSection';
import { loadingTextSx, pageSx } from './SubjectDetails.styles';

export const SubjectDetailsPage = () => {
  const { id } = useParams();

  const details = useSubjectDetails(id);

  if (!details.subject) {
    return (
      <Box sx={pageSx}>
        <Container maxWidth="lg">
          <Typography sx={loadingTextSx}>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={pageSx}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <SubjectHeader
            subject={details.subject}
            tasksCount={details.tasks.length}
            onEdit={() => details.setEditSubjectOpen(true)}
          />

          <TaskFilters
            sort={details.sort}
            status={details.status}
            onSortChange={details.setSort}
            onStatusChange={details.setStatus}
          />

          <CreateTaskModal
            open={details.createTaskOpen}
            subjectId={details.numericSubjectId}
            onClose={() => details.setCreateTaskOpen(false)}
            onCreated={async () => {
              details.setCreateTaskOpen(false);
              await details.fetchTasks();
            }}
          />

          <CreateSessionModal
            open={details.createSessionOpen}
            taskId={details.selectedTask?.id ?? null}
            onClose={() => details.setCreateSessionOpen(false)}
            onStart={details.handleStartSession}
          />

          <EditSubjectModal
            open={details.editSubjectOpen}
            subject={details.subject}
            onClose={() => details.setEditSubjectOpen(false)}
            onUpdated={details.fetchSubject}
          />

          {details.selectedTask && (
            <EditTaskModal
              open={details.editTaskOpen}
              task={details.selectedTask}
              onClose={() => details.setEditTaskOpen(false)}
              onUpdated={details.fetchTasks}
            />
          )}

          <TasksSection
            tasks={details.tasks}
            onAddTask={() => details.setCreateTaskOpen(true)}
            onEditTask={details.openEditTask}
            onRefreshTasks={details.fetchTasks}
            onCreateSession={details.openCreateSession}
          />
        </Stack>
      </Container>
    </Box>
  );
};
