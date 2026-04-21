import { DeleteOutline, VisibilityOutlined } from '@mui/icons-material';
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

const truncate = (text?: string, max = 150) =>
  text ? (text.length > max ? text.slice(0, max) + '...' : text) : '';

const getColor = (difficulty: string) => {
  if (difficulty === 'high') return 'error';
  if (difficulty === 'medium') return 'warning';
  return 'success';
};

export const SubjectCard = ({ subject, onView, onDelete }: Props) => {
  return (
    <Card className={styles.card}>
      <div
        style={{
          height: 40,
          background: subject.color || '#6C63FF',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      <div className={styles.content}>
        <Typography className={styles.title}>{subject.name}</Typography>

        <Typography className={styles.description}>
          {truncate(subject.description)}
        </Typography>

        <div className={styles.footer}>
          <Chip
            label={subject.difficulty}
            size="small"
            color={getColor(subject.difficulty) as any}
          />

          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={onView}>
              <VisibilityOutlined fontSize="small" />
            </IconButton>

            <IconButton size="small" onClick={onDelete}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Stack>
        </div>
      </div>
    </Card>
  );
};
