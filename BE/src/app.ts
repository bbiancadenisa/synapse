import cors from 'cors';
import express from 'express';
import subjectRoutes from './routes/subject';
import taskRoutes from './routes/task';

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/subjects', subjectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
