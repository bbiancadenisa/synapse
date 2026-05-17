import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { updateTask } from '../../services/task';
import type {
  Task,
  TaskPriority,
  TaskStatus,
  UpdateTaskPayload,
} from '../../types/taskTypes';

type Params = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onUpdated: () => void;
};

export const useEditTaskForm = ({ open, task, onClose, onUpdated }: Params) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [priority, setPriority] = useState<TaskPriority>('low');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  const isFormValid =
    title.trim().length > 0 && estimatedHours > 0 && !!deadline;

  useEffect(() => {
    if (!open || !task) return;

    setTitle(task.title);
    setDescription(task.description || '');
    setEstimatedHours(task.estimated_hours);
    setPriority(task.priority);
    setStatus(task.status);
    setDeadline(task.deadline ? dayjs(task.deadline) : null);
  }, [open, task]);

  const handleSave = async () => {
    if (!isFormValid || !deadline) return;

    const payload: UpdateTaskPayload = {
      title: title.trim(),
      description,
      estimated_hours: estimatedHours,
      priority,
      status,
      deadline: deadline.toISOString(),
    };

    await updateTask(task.id, payload);

    onUpdated();
    onClose();
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    estimatedHours,
    setEstimatedHours,
    priority,
    setPriority,
    status,
    setStatus,
    deadline,
    setDeadline,
    isFormValid,
    handleSave,
  };
};
