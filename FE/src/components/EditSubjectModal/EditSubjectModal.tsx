import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { updateSubject } from '../../services/subject';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import styles from './EditSubjectModal.module.css';

type Difficulty = 'low' | 'medium' | 'high';

type Subject = {
  id: number;
  name: string;
  description?: string;
  difficulty: Difficulty;
  color?: string;
  overall_deadline: string;
};

type Props = {
  open: boolean;
  subject: Subject;
  onClose: () => void;
  onUpdated: () => void;
};

export const EditSubjectModal = ({
  open,
  subject,
  onClose,
  onUpdated,
}: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('low');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [color, setColor] = useState<string>('');

  const isDirty =
    name !== subject.name ||
    description !== (subject.description || '') ||
    difficulty !== subject.difficulty ||
    color !== (subject.color || '#A5B4FC') ||
    deadline?.toISOString() !== subject.overall_deadline;

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

  const handleSave = async () => {
    if (!name.trim()) return;
    if (!deadline) return;

    await updateSubject(subject.id, {
      name,
      description,
      difficulty,
      color,
      overall_deadline: deadline.toISOString(),
    });

    onUpdated();
    onClose();
  };

  if (!subject) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Subject</DialogTitle>

      <DialogContent>
        <Stack spacing={2} className={styles.wrapper}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <DateTimePicker
            label="Deadline"
            value={deadline}
            onChange={(newValue) => setDeadline(newValue)}
            disablePast
            ampm={false}
            format="DD/MM/YYYY HH:mm"
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />

          <TextField
            select
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <ColorPicker value={color} onChange={setColor} />

          <Button variant="contained" onClick={handleSave} disabled={!isDirty}>
            Save changes
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
