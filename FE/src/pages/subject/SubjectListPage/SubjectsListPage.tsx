import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateSubjectModal } from '../../../components/CreateSubjectModal/CreateSubjectModal';
import { SubjectCard } from '../../../components/SubjectCard/SubjectCard';
import {
  createSubject,
  deleteSubject,
  getSubjects,
} from '../../../services/subject';

type Difficulty = 'low' | 'medium' | 'high';

type Subject = {
  id: number;
  name: string;
  description?: string;
  difficulty: Difficulty;
  estimated_total_hours: number;
  overall_deadline: string;
};

type CreateSubjectDTO = {
  name: string;
  description: string;
  difficulty: Difficulty;
  color: string;
  overall_deadline: string;
};

const SORT_OPTIONS = [
  { label: 'Newest', value: 'created_desc' },
  { label: 'Oldest', value: 'created_asc' },
  { label: 'Name A-Z', value: 'name_asc' },
  { label: 'Name Z-A', value: 'name_desc' },
  { label: 'Deadline closest', value: 'deadline_asc' },
  { label: 'Deadline farthest', value: 'deadline_desc' },
  { label: 'Difficulty low → high', value: 'difficulty_asc' },
  { label: 'Difficulty high → low', value: 'difficulty_desc' },
];

export const SubjectsListPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sort, setSort] = useState('created_desc');
  const [open, setOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchSubjects = async () => {
    const data = await getSubjects({ sort });
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, [sort]);

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        'This subject cannot be deleted right now.';

      setDeleteError(message);
    }
  };

  const handleCreate = async (data: CreateSubjectDTO) => {
    await createSubject(data);
    setOpen(false);
    fetchSubjects();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 5,
        background: '#f8fafc',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: '#111827',
                  }}
                >
                  Subjects
                </Typography>

                <Typography
                  sx={{
                    mt: 0.75,
                    color: '#64748b',
                    fontSize: 15,
                    maxWidth: 520,
                  }}
                >
                  Manage your study areas, tasks, deadlines, and focus plans.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                  background: '#4f46e5',
                  boxShadow: 'none',
                  '&:hover': {
                    background: '#4338ca',
                    boxShadow: 'none',
                  },
                }}
              >
                Create subject
              </Button>
            </Stack>
          </Box>

          <CreateSubjectModal
            open={open}
            onClose={() => setOpen(false)}
            onCreate={handleCreate}
          />

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={2}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  color: '#64748b',
                }}
              >
                {subjects.length}{' '}
                {subjects.length === 1 ? 'subject' : 'subjects'}
              </Typography>

              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sort}
                  label="Sort by"
                  onChange={(e) => setSort(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    fontSize: 14,
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Paper>

          {subjects.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                background: '#ffffff',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: '#111827',
                }}
              >
                No subjects yet
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  mb: 3,
                  color: '#64748b',
                  fontSize: 15,
                }}
              >
                Create your first subject to start organizing your study flow.
              </Typography>

              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  background: '#4f46e5',
                  boxShadow: 'none',
                  '&:hover': {
                    background: '#4338ca',
                    boxShadow: 'none',
                  },
                }}
              >
                Create subject
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={2}>
              {subjects.map((s) => (
                <Grid item key={s.id} xs={12} sm={6} md={4}>
                  <SubjectCard
                    subject={s}
                    onView={() => navigate(`/subjects/${s.id}`)}
                    onDelete={() => handleDelete(s.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>

      <Snackbar
        open={!!deleteError}
        autoHideDuration={4500}
        onClose={() => setDeleteError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setDeleteError(null)}
          sx={{
            width: '100%',
            borderRadius: 2,
          }}
        >
          {deleteError}
        </Alert>
      </Snackbar>
    </Box>
  );
};
