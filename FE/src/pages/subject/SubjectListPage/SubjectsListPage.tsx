import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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

type Subject = {
  id: number;
  name: string;
  description?: string;
  difficulty: 'low' | 'medium' | 'high';
  estimated_total_hours: number;
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

type CreateSubjectDTO = {
  name: string;
  description: string;
  difficulty: Difficulty;
  color: string;
  overall_deadline: string;
};

type Difficulty = 'low' | 'medium' | 'high';

export const SubjectsListPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sort, setSort] = useState('created_desc');
  const [open, setOpen] = useState(false);

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
      alert(err.response?.data?.error);
    }
  };

  const handleCreate = async (data: CreateSubjectDTO) => {
    await createSubject(data);
    setOpen(false);
    fetchSubjects();
  };

  return (
    <Container>
      <Typography variant="h4" mb={3}>
        Subjects
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }} onClick={() => setOpen(true)}>
        + Create Subject
      </Button>

      <CreateSubjectModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />

      <FormControl size="small" sx={{ mb: 3, minWidth: 220 }}>
        <InputLabel>Sort by</InputLabel>

        <Select
          value={sort}
          label="Sort by"
          onChange={(e) => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
    </Container>
  );
};
