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
import { createTask } from '../../services/task';

type Props = {
  open: boolean;
  subjectId: number;
  onClose: () => void;
  onCreated: () => void;
};

export const CreateTaskModal = ({
  open,
  subjectId,
  onClose,
  onCreated,
}: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState<number>(1);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    if (!deadline) return;

    await createTask({
      subject_id: subjectId,
      title,
      description,
      estimated_hours: estimatedHours,
      priority,
      deadline: deadline.toISOString(),
    });

    setTitle('');
    setDescription('');
    setEstimatedHours(1);
    setPriority('low');
    setDeadline(null);

    onCreated();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Task</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

          <TextField
            label="Estimated hours"
            type="number"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(Number(e.target.value))}
            fullWidth
          />

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'low' | 'medium' | 'high')
            }
            fullWidth
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <DateTimePicker
            label="Deadline"
            value={deadline}
            onChange={(v) => setDeadline(v)}
            disablePast
            ampm={false}
            format="DD/MM/YYYY HH:mm"
            slots={{ textField: TextField }}
            slotProps={{ textField: { fullWidth: true } }}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Create Task
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
