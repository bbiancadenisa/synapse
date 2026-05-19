import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startStudySession } from '../services/session';
import { getSubjectById } from '../services/subject';
import { getTasks } from '../services/task';
import type { Subject } from '../types/subjectTypes';
import type { Task, TaskStatus } from '../types/taskTypes';

export const useSubjectDetails = (subjectId?: string) => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [editSubjectOpen, setEditSubjectOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);

  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [createSessionOpen, setCreateSessionOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [sort, setSort] = useState('created_desc');
  const [status, setStatus] = useState<TaskStatus | ''>('');

  const numericSubjectId = Number(subjectId);

  const fetchSubject = async () => {
    if (!subjectId) return;

    try {
      const data = await getSubjectById(numericSubjectId);
      setSubject(data.subject);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        navigate(-1);
        return;
      }

      console.error(err);
    }
  };

  const fetchTasks = async () => {
    if (!subjectId) return;

    const data = await getTasks(numericSubjectId, {
      sort,
      status: status || undefined,
    });

    setTasks(data);
  };

  useEffect(() => {
    if (!subjectId) return;

    fetchSubject();
    fetchTasks();
  }, [subjectId]);

  useEffect(() => {
    if (!subjectId) return;

    fetchTasks();
  }, [sort, status, subjectId]);

  const openEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditTaskOpen(true);
  };

  const openCreateSession = (task: Task) => {
    setSelectedTask(task);
    setCreateSessionOpen(true);
  };

  const handleStartSession = async (config: {
    plannedDuration: number;
    breakInterval: number;
    breakDuration: number;
  }) => {
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
        subjectId: numericSubjectId,
        taskId: selectedTask.id,
        plannedDuration: config.plannedDuration,
        breakInterval: config.breakInterval,
        breakDuration: config.breakDuration,
      },
    });
  };

  return {
    subject,
    tasks,
    sort,
    setSort,
    status,
    setStatus,

    editSubjectOpen,
    setEditSubjectOpen,
    createTaskOpen,
    setCreateTaskOpen,
    editTaskOpen,
    setEditTaskOpen,
    createSessionOpen,
    setCreateSessionOpen,

    selectedTask,
    numericSubjectId,

    fetchSubject,
    fetchTasks,
    openEditTask,
    openCreateSession,
    handleStartSession,
  };
};
