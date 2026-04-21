import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SessionPage } from './pages/session/SessionDetailsPage/SessionDetailsPage';
import { SubjectDetailsPage } from './pages/subject/SubjectDetailsPage/SubjectDetailsPage';
import { SubjectsListPage } from './pages/subject/SubjectListPage/SubjectsListPage';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SubjectsListPage />} />
          <Route path="/subjects/:id" element={<SubjectDetailsPage />} />
          <Route path="/session/:sessionId" element={<SessionPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
