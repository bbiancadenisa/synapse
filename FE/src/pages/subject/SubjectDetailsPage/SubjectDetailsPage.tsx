import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CreateSessionModal } from '../../../components/CreateSessionModal/CreateSessionModal';
import { CreateTaskModal } from '../../../components/CreateTaskModal/CreateTaskModal';
import { EditSubjectModal } from '../../../components/EditSubjectModal/EditSubjectModal';
import { EditTaskModal } from '../../../components/EditTaskModal/EditTaskModal';
import { TaskCard } from '../../../components/TaskCard/TaskCard';

import { startStudySession } from '../../../services/session';
import { getSubjectById } from '../../../services/subject';
import { getTasks, type TaskStatus } from '../../../services/task';

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  estimated_hours: number;
  priority: 'low' | 'medium' | 'high';
  total_study_ms?: number;
};

type Subject = {
  id: number;
  name: string;
  difficulty: 'low' | 'medium' | 'high';
  color: string;
  overall_deadline: string;
};

const formatDeadline = (date?: string) => {
  if (!date) return 'No deadline';

  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const SubjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [createSessionOpen, setCreateSessionOpen] = useState(false);

  const [sort, setSort] = useState('created_desc');
  const [status, setStatus] = useState<TaskStatus | ''>('');

  const fetchSubject = async () => {
    const data = await getSubjectById(Number(id));
    setSubject(data.subject);
  };

  const fetchTasks = async () => {
    const data = await getTasks(Number(id), {
      sort,
      status: status || undefined,
    });

    setTasks(data);
  };

  useEffect(() => {
    if (!id) return;

    fetchSubject();
    fetchTasks();
  }, [id]);

  useEffect(() => {
    if (id) fetchTasks();
  }, [sort, status, id]);

  const handleStartSession = async (config: any) => {
    if (!selectedTask) return;

    const session = await startStudySession({
      taskId: selectedTask.id,
      plannedDurationMinutes: config.plannedDuration,
      breakIntervalMinutes: config.breakInterval,
      breakDurationMinutes: config.breakDuration,
    });

    setCreateSessionOpen(false);

    navigate(`/session/${session.id}`, {
      state: {
        subjectId: Number(id),
        taskId: selectedTask.id,
        plannedDuration: config.plannedDuration,
        breakInterval: config.breakInterval,
        breakDuration: config.breakDuration,
      },
    });
  };

  if (!subject) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 5 }}>
        <Container maxWidth="lg">
          <Typography sx={{ color: '#64748b' }}>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc', py: 5 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                height: 8,
                background: subject.color || '#4f46e5',
              }}
            />

            <Box sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      color: '#111827',
                    }}
                  >
                    {subject.name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 1.5 }}
                  >
                    <Chip
                      label={`Difficulty: ${subject.difficulty}`}
                      size="small"
                      sx={{
                        borderRadius: 1.5,
                        textTransform: 'capitalize',
                        background: '#f1f5f9',
                        color: '#475569',
                      }}
                    />

                    <Chip
                      label={`Deadline: ${formatDeadline(
                        subject.overall_deadline,
                      )}`}
                      size="small"
                      sx={{
                        borderRadius: 1.5,
                        background: '#eef2ff',
                        color: '#4f46e5',
                      }}
                    />

                    <Chip
                      label={`${tasks.length} ${
                        tasks.length === 1 ? 'task' : 'tasks'
                      }`}
                      size="small"
                      sx={{
                        borderRadius: 1.5,
                        background: '#ecfdf5',
                        color: '#047857',
                      }}
                    />
                  </Stack>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => setEditOpen(true)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: '#cbd5e1',
                    color: '#334155',
                    '&:hover': {
                      borderColor: '#94a3b8',
                      background: '#f8fafc',
                    },
                  }}
                >
                  Edit subject
                </Button>
              </Stack>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', md: 'center' }}
              spacing={2}
            >
              <Typography sx={{ fontSize: 14, color: '#64748b' }}>
                Filter and organize tasks
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Sort</InputLabel>
                  <Select
                    value={sort}
                    label="Sort"
                    onChange={(e) => setSort(e.target.value)}
                    sx={{ borderRadius: 2, fontSize: 14 }}
                  >
                    <MenuItem value="created_desc">Newest</MenuItem>
                    <MenuItem value="created_asc">Oldest</MenuItem>
                    <MenuItem value="deadline_asc">Deadline closest</MenuItem>
                    <MenuItem value="deadline_desc">Deadline farthest</MenuItem>
                    <MenuItem value="priority_asc">
                      Priority low → high
                    </MenuItem>
                    <MenuItem value="priority_desc">
                      Priority high → low
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    sx={{ borderRadius: 2, fontSize: 14 }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Paper>

          <CreateTaskModal
            open={taskOpen}
            subjectId={Number(id)}
            onClose={() => setTaskOpen(false)}
            onCreated={async () => {
              setTaskOpen(false);
              await fetchTasks();
            }}
          />

          <CreateSessionModal
            open={createSessionOpen}
            taskId={selectedTask?.id ?? null}
            onClose={() => setCreateSessionOpen(false)}
            onStart={handleStartSession}
          />

          {editOpen && (
            <EditSubjectModal
              open={editOpen}
              subject={subject}
              onClose={() => setEditOpen(false)}
              onUpdated={fetchSubject}
            />
          )}

          {editTaskOpen && selectedTask && (
            <EditTaskModal
              open={editTaskOpen}
              task={selectedTask}
              onClose={() => setEditTaskOpen(false)}
              onUpdated={fetchTasks}
            />
          )}

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#111827',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Tasks
                </Typography>

                <Typography sx={{ mt: 0.5, fontSize: 14, color: '#64748b' }}>
                  Start a session from any task when you are ready to focus.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => setTaskOpen(true)}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
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
                Add task
              </Button>
            </Stack>

            {tasks.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  borderRadius: 2,
                  border: '1px dashed #cbd5e1',
                  textAlign: 'center',
                  background: '#f8fafc',
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                  No tasks yet
                </Typography>
                <Typography sx={{ mt: 0.75, color: '#64748b', fontSize: 14 }}>
                  Add your first task and turn this subject into a study plan.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {tasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onEdit={() => {
                      setSelectedTask(t);
                      setEditTaskOpen(true);
                    }}
                    onDeleted={fetchTasks}
                    onCreateSession={() => {
                      setSelectedTask(t);
                      setCreateSessionOpen(true);
                    }}
                  />
                ))}
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};
