import {
  Alert,
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
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import { SUBJECT_COLORS } from '../../utils/constants';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import styles from './CreateSubjectModal.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description: string;
    difficulty: 'low' | 'medium' | 'high';
    color: string;
    overall_deadline: string;
  }) => void;
};

export const CreateSubjectModal = ({ open, onClose, onCreate }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);
  const [color, setColor] = useState(SUBJECT_COLORS[0]);
  const [difficulty, setDifficulty] = useState<'low' | 'medium' | 'high'>(
    'low',
  );
  const [error, setError] = useState<string | null>(null);

  const isFormValid = name.trim().length > 0 && !!deadline;

  const resetForm = () => {
    setName('');
    setDescription('');
    setDifficulty('low');
    setDeadline(null);
    setColor(SUBJECT_COLORS[0]);
    setError(null);
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
      overall_deadline: deadline.toISOString(),
    });

    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          Create subject
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: '#64748b',
          }}
        >
          Add a new study area with a deadline, difficulty, and color.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Stack spacing={2.25} className={styles.container}>
          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: 2,
                fontSize: 14,
              }}
            >
              {error}
            </Alert>
          )}

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
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            fullWidth
            required
            size="small"
          />

          <ColorPicker value={color} onChange={setColor} />

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
            onChange={(newValue) => {
              setDeadline(newValue);
              setError(null);
            }}
            disablePast
            ampm={false}
            format="DD/MM/YYYY HH:mm"
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                required: true,
              },
            }}
          />

          <TextField
            select
            label="Difficulty"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as 'low' | 'medium' | 'high')
            }
            fullWidth
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
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
          onClick={handleSubmit}
          disabled={!isFormValid}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            background: isFormValid ? '#4f46e5' : '#cbd5e1',
            boxShadow: 'none',
            '&:hover': {
              background: isFormValid ? '#4338ca' : '#cbd5e1',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: '#ffffff',
              background: '#cbd5e1',
            },
          }}
        >
          Create subject
        </Button>
      </DialogActions>
    </Dialog>
  );
};
