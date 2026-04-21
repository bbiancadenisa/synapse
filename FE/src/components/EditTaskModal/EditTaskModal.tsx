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
import { useEffect, useState } from 'react';
import { updateTask } from '../../services/task';

type Task = {
  id: number;
  title: string;
  description?: string;
  estimated_hours: number;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'done';
  deadline?: string;
};

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

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description || '');
    setEstimatedHours(task.estimated_hours);
    setPriority(task.priority);
    setStatus(task.status);
    setDeadline(task.deadline ? (deadline as any) : null);
  }, [task]);

  const handleSave = async () => {
    await updateTask(task.id, {
      title,
      description,
      estimated_hours: estimatedHours,
      priority,
      status,
      deadline: deadline ? deadline.toISOString() : undefined,
    });

    onUpdated();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>

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

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as 'todo' | 'in_progress' | 'done')
            }
            fullWidth
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
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

          <Button variant="contained" onClick={handleSave}>
            Save changes
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
