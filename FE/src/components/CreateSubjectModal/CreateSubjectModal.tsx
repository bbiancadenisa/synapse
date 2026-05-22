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

import { useCreateSubjectForm } from '../../hooks/useCreateSubjectForm';
import type {
  CreateSubjectPayload,
  Difficulty,
} from '../../types/subjectTypes';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import {
  cancelButtonSx,
  createButtonSx,
  dialogPaperSx,
  helperTextSx,
  subtitleSx,
  titleSx,
} from './CreateSubjectModal.styles';

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateSubjectPayload) => void;
};

export const CreateSubjectModal = ({ open, onClose, onCreate }: Props) => {
  const form = useCreateSubjectForm(onCreate, onClose);

  return (
    <Dialog
      open={open}
      onClose={form.handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: dialogPaperSx }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography sx={titleSx}>Create subject</Typography>

        <Typography sx={subtitleSx}>
          Add a new study area with a deadline, difficulty, and color.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2 }}>
        <Stack spacing={2.25} sx={{ pt: 1 }}>
          <Typography sx={helperTextSx}>
            Fields marked with <strong>*</strong> are required.
          </Typography>

          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => form.setName(e.target.value)}
            fullWidth
            required
            size="small"
          />

          <ColorPicker value={form.color} onChange={form.setColor} />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            size="small"
          />

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
                size: 'small',
                required: true,
              },
            }}
          />

          <TextField
            select
            label="Difficulty"
            value={form.difficulty}
            onChange={(e) => form.setDifficulty(e.target.value as Difficulty)}
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
        <Button onClick={form.handleClose} sx={cancelButtonSx}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={form.handleSubmit}
          disabled={!form.isFormValid}
          sx={createButtonSx(form.isFormValid)}
        >
          Create subject
        </Button>
      </DialogActions>
    </Dialog>
  );
};
