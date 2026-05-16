import cors from 'cors';
import express from 'express';
import dailyStatsRoutes from './routes/dailyStats';
import studySessionRoutes from './routes/studySession';
import subjectRoutes from './routes/subject';
import taskRoutes from './routes/task';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/subjects', subjectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/study-sessions', studySessionRoutes);
app.use('/api/daily-stats', dailyStatsRoutes);

export default app;
