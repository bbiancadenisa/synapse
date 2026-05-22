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

import { useEditSubjectForm } from '../../hooks/useEditSubjectForm';
import type { Difficulty, Subject } from '../../types/subjectTypes';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import {
  cancelButtonSx,
  dialogPaperSx,
  helperTextSx,
  saveButtonSx,
  subtitleSx,
  titleSx,
} from './EditSubjectModal.styles';

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
  const form = useEditSubjectForm({
    open,
    subject,
    onClose,
    onUpdated,
  });

  if (!subject) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: dialogPaperSx }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography sx={titleSx}>Edit subject</Typography>

        <Typography sx={subtitleSx}>
          Update the subject details, deadline, difficulty, and color.
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
            value={form.difficulty}
            onChange={(e) => form.setDifficulty(e.target.value as Difficulty)}
            fullWidth
            size="small"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <ColorPicker value={form.color} onChange={form.setColor} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button onClick={onClose} sx={cancelButtonSx}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={form.handleSave}
          disabled={!form.isDirty || !form.isFormValid}
          sx={saveButtonSx(form.isDirty && form.isFormValid)}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
