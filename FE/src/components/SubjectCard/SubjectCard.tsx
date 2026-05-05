import { DeleteOutline } from '@mui/icons-material';
import { Card, Chip, IconButton, Stack, Typography } from '@mui/material';
import styles from './SubjectCard.module.css';

type Subject = {
  id: number;
  name: string;
  description?: string;
  difficulty: 'low' | 'medium' | 'high';
  color?: string;
};

type Props = {
  subject: Subject;
  onView: () => void;
  onDelete: () => void;
};

const truncate = (text?: string, max = 130) =>
  text
    ? text.length > max
      ? text.slice(0, max) + '...'
      : text
    : 'No description yet.';

const getDifficultyClass = (difficulty: Subject['difficulty']) => {
  if (difficulty === 'high') return styles.high;
  if (difficulty === 'medium') return styles.medium;
  return styles.low;
};

export const SubjectCard = ({ subject, onView, onDelete }: Props) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Card className={styles.card} onClick={onView}>
      <div
        className={styles.accent}
        style={{ background: subject.color || '#4f46e5' }}
      />

      <div className={styles.content}>
        <Stack spacing={1}>
          <Typography className={styles.title}>{subject.name}</Typography>

          <Typography className={styles.description}>
            {truncate(subject.description)}
          </Typography>
        </Stack>

        <div className={styles.footer}>
          <Chip
            label={subject.difficulty}
            size="small"
            className={`${styles.chip} ${getDifficultyClass(subject.difficulty)}`}
          />

          <IconButton
            size="small"
            onClick={handleDelete}
            className={styles.deleteButton}
            aria-label="Delete subject"
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};
