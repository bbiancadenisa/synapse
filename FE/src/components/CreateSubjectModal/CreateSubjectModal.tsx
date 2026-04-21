import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
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

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Name is required');
      return;
    }

    if (!deadline) {
      alert('Deadline is required');
      return;
    }

    onCreate({
      name,
      description,
      difficulty,
      color,
      overall_deadline: deadline.toISOString(), // ❗ garantat existent
    });

    setName('');
    setDescription('');
    setDifficulty('low');
    setDeadline(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Subject</DialogTitle>

      <DialogContent>
        <Stack spacing={2} className={styles.container}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <ColorPicker value={color} onChange={setColor} />

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
            slots={{ textField: TextField }}
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
            onChange={(e) =>
              setDifficulty(e.target.value as 'low' | 'medium' | 'high')
            }
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
