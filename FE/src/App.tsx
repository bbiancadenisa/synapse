import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { UserProfilePage } from './pages/profile/UserProfilePage';
import { SessionPage } from './pages/session/SessionDetailsPage/SessionDetailsPage';
import { SubjectDetailsPage } from './pages/subject/SubjectDetailsPage/SubjectDetailsPage';
import { SubjectsListPage } from './pages/subject/SubjectListPage/SubjectsListPage';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<UserProfilePage />} />
              <Route path="/subjects" element={<SubjectsListPage />} />
              <Route path="/subjects/:id" element={<SubjectDetailsPage />} />
              <Route path="/session/:sessionId" element={<SessionPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
