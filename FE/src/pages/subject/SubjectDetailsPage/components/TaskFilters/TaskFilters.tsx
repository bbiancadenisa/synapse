import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import type { TaskStatus } from '../../../../../types/taskTypes';
import {
  TASK_SORT_OPTIONS,
  TASK_STATUS_OPTIONS,
} from '../../../../../utils/constants';
import {
  filterCardSx,
  mutedTextSx,
  selectSx,
} from '../../SubjectDetails.styles';

type Props = {
  sort: string;
  status: TaskStatus | '';
  onSortChange: (value: string) => void;
  onStatusChange: (value: TaskStatus | '') => void;
};

export const TaskFilters = ({
  sort,
  status,
  onSortChange,
  onStatusChange,
}: Props) => {
  return (
    <Paper elevation={0} sx={filterCardSx}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        spacing={2}
      >
        <Typography sx={mutedTextSx}>Filter and organize tasks</Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort</InputLabel>

            <Select
              value={sort}
              label="Sort"
              onChange={(e) => onSortChange(e.target.value)}
              sx={selectSx}
            >
              {TASK_SORT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                onStatusChange(e.target.value as TaskStatus | '')
              }
              sx={selectSx}
            >
              {TASK_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Paper>
  );
};
