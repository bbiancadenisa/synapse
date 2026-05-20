import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { createTask } from '../services/task';
import type { CreateTaskPayload, TaskPriority } from '../types/taskTypes';

type Params = {
  subjectId: number;
  onClose: () => void;
  onCreated: () => void;
};

export const useCreateTaskForm = ({
  subjectId,
  onClose,
  onCreated,
}: Params) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState<number>(1);
  const [priority, setPriority] = useState<TaskPriority>('low');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  const isFormValid =
    title.trim().length > 0 && !!deadline && estimatedHours > 0;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEstimatedHours(1);
    setPriority('low');
    setDeadline(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!isFormValid || !deadline) return;

    const payload: CreateTaskPayload = {
      subject_id: subjectId,
      title: title.trim(),
      description,
      estimated_hours: estimatedHours,
      priority,
      deadline: deadline.format('YYYY-MM-DDTHH:mm:ss'),
    };

    await createTask(payload);

    resetForm();

    onCreated();
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
    deadline,
    setDeadline,
    isFormValid,
    handleClose,
    handleSubmit,
  };
};
