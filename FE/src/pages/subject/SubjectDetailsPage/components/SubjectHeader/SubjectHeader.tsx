import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import type { Subject } from '../../../../../types/subjectTypes';
import { formatDeadline } from '../../../../../utils/subjectDetailsPageUtils';
import {
  deadlineChipSx,
  getDifficultyChipSx,
  headerCardSx,
  outlinedButtonSx,
  subjectAccentSx,
  subjectContentSx,
  tasksCountChipSx,
  titleSx,
} from '../../SubjectDetails.styles';

type Props = {
  subject: Subject;
  tasksCount: number;
  onEdit: () => void;
};

export const SubjectHeader = ({ subject, tasksCount, onEdit }: Props) => {
  return (
    <Paper elevation={0} sx={headerCardSx}>
      <Box sx={subjectAccentSx(subject.color)} />

      <Box sx={subjectContentSx}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4" sx={titleSx}>
              {subject.name}
            </Typography>

            {subject.description && (
              <Typography
                sx={{
                  mt: 1,
                  maxWidth: 760,
                  color: '#64748b',
                  fontSize: 15,
                  lineHeight: 1.7,
                }}
              >
                {subject.description}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ mt: 1.5 }}
            >
              <Chip
                label={`Difficulty: ${subject.difficulty}`}
                size="small"
                sx={getDifficultyChipSx(subject.difficulty)}
              />

              <Chip
                label={`Deadline: ${formatDeadline(subject.overall_deadline)}`}
                size="small"
                sx={deadlineChipSx}
              />

              <Chip
                label={`${tasksCount} ${tasksCount === 1 ? 'task' : 'tasks'}`}
                size="small"
                sx={tasksCountChipSx}
              />
            </Stack>
          </Box>

          <Button variant="outlined" onClick={onEdit} sx={outlinedButtonSx}>
            Edit subject
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
