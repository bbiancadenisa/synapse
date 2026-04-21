import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  DeleteOutline,
  EditOutlined,
  ExpandMoreOutlined,
} from '@mui/icons-material';

type Props = {
  task: {
    id: number;
    title: string;
    status: string;
    estimated_hours: number;
    description?: string;
  };
  onDeleted?: () => void;
  onEdit: () => void;
  onCreateSession: () => void;
};

export const TaskCard = ({
  task,
  onDeleted,
  onEdit,
  onCreateSession,
}: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <div>
            <Typography fontWeight={600}>{task.title}</Typography>
            <Typography variant="caption">{task.status}</Typography>
          </div>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <EditOutlined />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDeleted?.();
              }}
              color="error"
            >
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {task.description || 'No description'}
        </Typography>

        <Typography variant="caption" display="block" sx={{ mb: 2 }}>
          Estimated hours: {task.estimated_hours}
        </Typography>

        <Button variant="contained" onClick={onCreateSession}>
          Create Session
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
