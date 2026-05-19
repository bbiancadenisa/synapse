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
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { updateTask } from '../../services/task';
import type { Task } from '../../types/taskTypes';

type Props = {
  open: boolean;
  task: Task;
  onClose: () => void;
  onUpdated: () => void;
};

export const EditTaskModal = ({ open, task, onClose, onUpdated }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [deadline, setDeadline] = useState<Dayjs | null>(null);

  const isFormValid =
    title.trim().length > 0 && estimatedHours > 0 && !!deadline;

  const originalDeadline = task.deadline
    ? dayjs(task.deadline).format('YYYY-MM-DDTHH:mm:ss')
    : '';

  const currentDeadline = deadline
    ? deadline.format('YYYY-MM-DDTHH:mm:ss')
    : '';

  const isDirty =
    title !== task.title ||
    description !== (task.description || '') ||
    estimatedHours !== task.estimated_hours ||
    priority !== task.priority ||
    status !== task.status ||
    currentDeadline !== originalDeadline;

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description || '');
    setEstimatedHours(task.estimated_hours);
    setPriority(task.priority);
    setStatus(task.status);
    setDeadline(task.deadline ? dayjs(task.deadline) : null);
  }, [task]);

  const handleSave = async () => {
    if (!isFormValid || !deadline) return;

    await updateTask(task.id, {
      title: title.trim(),
      description,
      estimated_hours: estimatedHours,
      priority,
      status,
      deadline: deadline.format('YYYY-MM-DDTHH:mm:ss'),
    });

    onUpdated();
    onClose();
  };

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
          Edit task
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: '#64748b',
          }}
        >
          Update task details, priority, status, and deadline.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Stack spacing={2.25} sx={{ pt: 1 }}>
          <Typography
            sx={{
              fontSize: 13,
              color: '#64748b',
            }}
          >
            Fields marked with <strong>*</strong> are required.
          </Typography>

          <TextField
            label="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

          <TextField
            label="Estimated hours *"
            type="number"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(Number(e.target.value))}
            fullWidth
            required
            size="small"
            inputProps={{ min: 1 }}
          />

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'low' | 'medium' | 'high')
            }
            fullWidth
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as 'todo' | 'in_progress' | 'done')
            }
            fullWidth
            size="small"
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <DateTimePicker
            label="Deadline *"
            value={deadline}
            onChange={(v) => setDeadline(v)}
            disablePast
            ampm={false}
            format="DD/MM/YYYY HH:mm"
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                size: 'small',
              },
            }}
          />
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
          disabled={!isFormValid || !isDirty}
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
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
