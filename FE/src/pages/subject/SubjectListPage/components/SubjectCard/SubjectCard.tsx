import { DeleteOutline } from '@mui/icons-material';
import { Box, Card, Chip, IconButton, Stack, Typography } from '@mui/material';
import type { Subject } from '../../types/subjectTypes';
import {
  accentSx,
  cardSx,
  contentSx,
  deleteButtonSx,
  descriptionSx,
  footerSx,
  getDifficultyChipSx,
  titleSx,
} from './SubjectCard.styles';

type Props = {
  subject: Subject;
  onView: () => void;
  onDelete: () => void;
};

const truncateText = (text?: string, max = 130) =>
  text
    ? text.length > max
      ? text.slice(0, max) + '...'
      : text
    : 'No description yet.';

export const SubjectCard = ({ subject, onView, onDelete }: Props) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Card onClick={onView} sx={cardSx}>
      <Box sx={accentSx(subject.color)} />

      <Stack spacing={1} sx={contentSx}>
        <Typography sx={titleSx}>{subject.name}</Typography>

        <Typography sx={descriptionSx}>
          {truncateText(subject.description)}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={footerSx}
        >
          <Chip
            label={subject.difficulty}
            size="small"
            sx={getDifficultyChipSx(subject.difficulty)}
          />

          <IconButton
            size="small"
            onClick={handleDelete}
            aria-label="Delete subject"
            sx={deleteButtonSx}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};
