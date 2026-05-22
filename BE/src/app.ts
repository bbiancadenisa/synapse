import cors from 'cors';
import express from 'express';
import { authMiddleware } from './middleware/authMiddleware';
import analyticsRoutes from './routes/analytics';
import authRoutes from './routes/authRoutes';
import dailyStatsRoutes from './routes/dailyStats';
import studySessionRoutes from './routes/studySession';
import subjectRoutes from './routes/subject';
import taskRoutes from './routes/task';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/subjects', authMiddleware, subjectRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/study-sessions', authMiddleware, studySessionRoutes);
app.use('/api/daily-stats', authMiddleware, dailyStatsRoutes);

export default app;
