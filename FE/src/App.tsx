import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SubjectsListPage />} />
            <Route path="/subjects/:id" element={<SubjectDetailsPage />} />
            <Route path="/session/:sessionId" element={<SessionPage />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
