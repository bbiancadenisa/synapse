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
import { useCreateTaskForm } from '../../hooks/useCreateTaskForm';
import type { TaskPriority } from '../../types/taskTypes';
import {
  cancelButtonSx,
  createButtonSx,
  dialogPaperSx,
  helperTextSx,
  subtitleSx,
  titleSx,
} from './CreateTaskModal.styles';

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
  const form = useCreateTaskForm({
    subjectId,
    onClose,
    onCreated,
  });

  return (
    <Dialog
      open={open}
      onClose={form.handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: dialogPaperSx,
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography sx={titleSx}>Create task</Typography>

        <Typography sx={subtitleSx}>
          Add a task with priority, estimated time, and a deadline.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Stack spacing={2.25} sx={{ pt: 1 }}>
          <Typography sx={helperTextSx}>
            Fields marked with <strong>*</strong> are required.
          </Typography>

          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => form.setTitle(e.target.value)}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            size="small"
          />

          <TextField
            label="Estimated hours"
            type="number"
            value={form.estimatedHours}
            onChange={(e) => form.setEstimatedHours(Number(e.target.value))}
            fullWidth
            required
            size="small"
            inputProps={{ min: 1 }}
          />

          <TextField
            select
            label="Priority"
            value={form.priority}
            onChange={(e) => form.setPriority(e.target.value as TaskPriority)}
            fullWidth
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <DateTimePicker
            label="Deadline"
            value={form.deadline}
            onChange={form.setDeadline}
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
        <Button onClick={form.handleClose} sx={cancelButtonSx}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={form.handleSubmit}
          disabled={!form.isFormValid}
          sx={createButtonSx(form.isFormValid)}
        >
          Create task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
