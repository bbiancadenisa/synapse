import { Dayjs } from 'dayjs';
import { useState } from 'react';
import type { CreateSubjectPayload, Difficulty } from '../types/subjectTypes';
import { SUBJECT_COLORS } from '../utils/constants';

export const useCreateSubjectForm = (
  onCreate: (data: CreateSubjectPayload) => void,
  onClose: () => void,
) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [color, setColor] = useState(SUBJECT_COLORS[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>('low');

  const isFormValid = name.trim().length > 0 && !!deadline;

  const resetForm = () => {
    setName('');
    setDescription('');
    setDeadline(null);
    setColor(SUBJECT_COLORS[0]);
    setDifficulty('low');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!isFormValid || !deadline) return;

    onCreate({
      name: name.trim(),
      description,
      difficulty,
      color,
      overall_deadline: deadline.format('YYYY-MM-DDTHH:mm:ss'),
    });

    resetForm();
    onClose();
  };

  return {
    name,
    setName,
    description,
    setDescription,
    deadline,
    setDeadline,
    color,
    setColor,
    difficulty,
    setDifficulty,
    isFormValid,
    handleClose,
    handleSubmit,
  };
};
