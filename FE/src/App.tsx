import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { UserProfilePage } from './pages/profile/UserProfilePage';
import { SessionPage } from './pages/session/SessionDetailsPage/SessionDetailsPage';
import { SubjectDetailsPage } from './pages/subject/SubjectDetailsPage/SubjectDetailsPage';
import { SubjectsListPage } from './pages/subject/SubjectListPage/SubjectsListPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<UserProfilePage />} />
                <Route path="/subjects" element={<SubjectsListPage />} />
                <Route path="/subjects/:id" element={<SubjectDetailsPage />} />
                <Route path="/session/:sessionId" element={<SessionPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
