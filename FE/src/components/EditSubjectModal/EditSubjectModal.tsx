import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
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

  const originalDeadline = subject?.overall_deadline
    ? dayjs(subject.overall_deadline).toISOString()
    : '';

  const isDirty =
    name !== subject.name ||
    description !== (subject.description || '') ||
    difficulty !== subject.difficulty ||
    color !== (subject.color || '#A5B4FC') ||
    (deadline ? deadline.toISOString() : '') !== originalDeadline;

  const isFormValid = name.trim().length > 0 && !!deadline;

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
    if (!isFormValid || !deadline) return;

    await updateSubject(subject.id, {
      name: name.trim(),
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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: '1px solid #e5e7eb',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)',
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            color: '#111827',
            letterSpacing: '-0.02em',
          }}
        >
          Edit subject
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: '#64748b',
          }}
        >
          Update the subject details, deadline, difficulty, and color.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Stack spacing={2.25} className={styles.wrapper}>
          <Typography
            sx={{
              fontSize: 13,
              color: '#64748b',
            }}
          >
            Fields marked with <strong>*</strong> are required.
          </Typography>

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            size="small"
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
                required: true,
                size: 'small',
              },
            }}
          />

          <TextField
            select
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            fullWidth
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <ColorPicker value={color} onChange={setColor} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            color: '#64748b',
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isDirty || !isFormValid}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            background: isDirty && isFormValid ? '#4f46e5' : '#cbd5e1',
            boxShadow: 'none',
            '&:hover': {
              background: isDirty && isFormValid ? '#4338ca' : '#cbd5e1',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: '#ffffff',
              background: '#cbd5e1',
            },
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
