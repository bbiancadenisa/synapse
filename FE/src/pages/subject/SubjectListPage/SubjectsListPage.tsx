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
import { useNavigate } from 'react-router-dom';
import { CreateSubjectModal } from '../../../components/CreateSubjectModal/CreateSubjectModal';
import { useSubjectsList } from '../../../hooks/useSubjectList';
import { SORT_OPTIONS } from '../../../utils/constants';
import {
  emptyStateSx,
  emptySubtitleSx,
  emptyTitleSx,
  mutedTextSx,
  pageSx,
  primaryButtonSx,
  selectSx,
  snackbarAlertSx,
  subtitleSx,
  titleSx,
  toolbarSx,
} from './SubjectListPage.styles';
import { SubjectCard } from './components/SubjectCard/SubjectCard';

export const SubjectsListPage = () => {
  const navigate = useNavigate();

  const {
    subjects,
    sort,
    setSort,
    createModalOpen,
    setCreateModalOpen,
    deleteError,
    setDeleteError,
    handleCreate,
    handleDelete,
  } = useSubjectsList();

  return (
    <Box sx={pageSx}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" sx={titleSx}>
                Subjects
              </Typography>

              <Typography sx={subtitleSx}>
                Manage your study areas, tasks, deadlines, and focus plans.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => setCreateModalOpen(true)}
              sx={primaryButtonSx}
            >
              Create subject
            </Button>
          </Stack>

          <CreateSubjectModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onCreate={handleCreate}
          />

          <Paper elevation={0} sx={toolbarSx}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={2}
            >
              <Typography sx={mutedTextSx}>
                {subjects.length}{' '}
                {subjects.length === 1 ? 'subject' : 'subjects'}
              </Typography>

              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Sort by</InputLabel>

                <Select
                  value={sort}
                  label="Sort by"
                  onChange={(e) => setSort(e.target.value)}
                  sx={selectSx}
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
            <Paper elevation={0} sx={emptyStateSx}>
              <Typography sx={emptyTitleSx}>No subjects yet</Typography>

              <Typography sx={emptySubtitleSx}>
                Create your first subject to start organizing your study flow.
              </Typography>

              <Button
                variant="contained"
                onClick={() => setCreateModalOpen(true)}
                sx={primaryButtonSx}
              >
                Create subject
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={2}>
              {subjects.map((subject) => (
                <Grid item key={subject.id} xs={12} sm={6} md={4}>
                  <SubjectCard
                    subject={subject}
                    onView={() => navigate(`/subjects/${subject.id}`)}
                    onDelete={() => handleDelete(subject.id)}
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
          sx={snackbarAlertSx}
        >
          {deleteError}
        </Alert>
      </Snackbar>
    </Box>
  );
};
