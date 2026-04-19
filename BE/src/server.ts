import dotenv from 'dotenv';
import app from './app';
import { pool } from './config/db';
dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');

    app.listen(PORT, () => {
      console.log(`Synapse backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
};

startServer();
