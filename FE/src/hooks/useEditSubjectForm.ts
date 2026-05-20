import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { updateSubject } from '../services/subject';
import type { Difficulty, Subject } from '../types/subjectTypes';

type Params = {
  open: boolean;
  subject: Subject;
  onClose: () => void;
  onUpdated: () => void;
};

export const useEditSubjectForm = ({
  open,
  subject,
  onClose,
  onUpdated,
}: Params) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('low');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [color, setColor] = useState('');

  useEffect(() => {
    if (!open || !subject) return;

    setName(subject.name);
    setDescription(subject.description || '');
    setDifficulty(subject.difficulty);
    setColor(subject.color || '#A5B4FC');
    setDeadline(
      subject.overall_deadline ? dayjs(subject.overall_deadline) : null,
    );
  }, [open, subject]);

  const originalDeadline = useMemo(() => {
    return subject?.overall_deadline
      ? dayjs(subject.overall_deadline).toISOString()
      : '';
  }, [subject]);

  const isDirty =
    name !== subject.name ||
    description !== (subject.description || '') ||
    difficulty !== subject.difficulty ||
    color !== (subject.color || '#A5B4FC') ||
    (deadline ? deadline.format('YYYY-MM-DDTHH:mm:ss') : '') !==
      originalDeadline;

  const isFormValid = name.trim().length > 0 && !!deadline;

  const handleSave = async () => {
    if (!isFormValid || !deadline) return;

    await updateSubject(subject.id, {
      name: name.trim(),
      description,
      difficulty,
      color,
      overall_deadline: deadline.format('YYYY-MM-DDTHH:mm:ss'),
    });

    onUpdated();
    onClose();
  };

  return {
    name,
    setName,
    description,
    setDescription,
    difficulty,
    setDifficulty,
    deadline,
    setDeadline,
    color,
    setColor,
    isDirty,
    isFormValid,
    handleSave,
  };
};
