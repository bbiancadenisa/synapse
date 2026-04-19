import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SubjectsPage } from './pages/SubjectsPage/SubjectsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
