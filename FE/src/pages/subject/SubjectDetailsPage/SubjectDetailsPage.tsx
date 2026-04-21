import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CreateTaskModal } from '../../../components/CreateTaskModal/CreateTaskModal';
import { EditSubjectModal } from '../../../components/EditSubjectModal/EditSubjectModal';
import { TaskCard } from '../../../components/TaskCard/TaskCard';

import { getSubjectById } from '../../../services/subject';
import { getTasks, type TaskStatus } from '../../../services/task';

import { useNavigate } from 'react-router-dom';
import { CreateSessionModal } from '../../../components/CreateSessionModal/CreateSessionModal';
import { EditTaskModal } from '../../../components/EditTaskModal/EditTaskModal';
import { startStudySession } from '../../../services/session';
import styles from './SubjectDetailsPage.module.css';

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  estimated_hours: number;
  priority: 'low' | 'medium' | 'high';
};

type Subject = {
  id: number;
  name: string;
  difficulty: 'low' | 'medium' | 'high';
  color: string;
  overall_deadline: string;
};

export const SubjectDetailsPage = () => {
  const { id } = useParams();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [createSessionOpen, setCreateSessionOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleOpenTaskModal = () => setTaskOpen(true);
  const handleOpenEdit = () => setEditOpen(true);

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
        taskId: selectedTask.id,
        plannedDuration: config.plannedDuration,
        breakInterval: config.breakInterval,
        breakDuration: config.breakDuration,
      },
    });
  };

  if (!subject) return <div>Loading...</div>;

  return (
    <div>
      <div
        className={styles.header}
        style={{ backgroundColor: subject.color || '#A5B4FC' }}
      >
        <Container>
          <Typography variant="h4">{subject.name}</Typography>

          <Typography variant="subtitle1">
            Difficulty: {subject.difficulty}
          </Typography>
        </Container>
      </div>

      <Container sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleOpenEdit}>
          Edit Subject
        </Button>
      </Container>

      {editTaskOpen && selectedTask && (
        <EditTaskModal
          open={editTaskOpen}
          task={selectedTask}
          onClose={() => setEditTaskOpen(false)}
          onUpdated={fetchTasks}
        />
      )}

      <Container sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort</InputLabel>
            <Select
              value={sort}
              label="Sort"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="created_desc">Newest</MenuItem>
              <MenuItem value="created_asc">Oldest</MenuItem>
              <MenuItem value="deadline_asc">Deadline closest</MenuItem>
              <MenuItem value="deadline_desc">Deadline farthest</MenuItem>
              <MenuItem value="priority_asc">Priority low → high</MenuItem>
              <MenuItem value="priority_desc">Priority high → low</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Container>

      {editOpen && subject && (
        <EditSubjectModal
          open={editOpen}
          subject={subject}
          onClose={() => setEditOpen(false)}
          onUpdated={fetchSubject}
        />
      )}

      {taskOpen && (
        <CreateTaskModal
          open={taskOpen}
          subjectId={Number(id)}
          onClose={() => setTaskOpen(false)}
          onCreated={async () => {
            setTaskOpen(false);
            await fetchTasks();
          }}
        />
      )}

      <CreateSessionModal
        open={createSessionOpen}
        taskId={selectedTask?.id ?? null}
        onClose={() => setCreateSessionOpen(false)}
        onStart={handleStartSession}
      />

      <Container sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Tasks</Typography>

          <Button variant="contained" onClick={handleOpenTaskModal}>
            + Add Task
          </Button>
        </Stack>

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
      </Container>
    </div>
  );
};
