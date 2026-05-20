Synapse

Synapse is a full-stack productivity and study management application focused on helping students manage tasks, track study sessions, and monitor productivity and wellbeing.

ALL CHANGES ARE ON DEVELOP BRANCH

Tech Stack

Frontend
React
TypeScript
Vite
Material UI

Backend
Node.js
Express.js
TypeScript
WebSockets
JWT Authentication

Database
PostgreSQL

Features
User authentication
Subject and task management
Real-time study sessions
Break reminders
Productivity analytics
Burnout and health tracking

Project Setup

1. Clone Repository
   git clone https://github.com/bbiancadenisa/synapse.git
   cd synapse
   git checkout develop

2. Setup Backend
   cd backend
   npm install

Create .env file:

PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

Start backend server:
npm run dev
Backend runs on:
http://localhost:3000

3. Setup Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

4. Database

The application uses PostgreSQL.
Main tables:

users
subjects
tasks
study_sessions
study_session_settings
study_session_breaks
session_events
daily_stats

Database Setup

Install PostgreSQL and pgAdmin
Create a database:

sql
CREATE DATABASE synapse;

copy paste and execute schema.sql in PGAdmin query tool

Running Tests

Frontend:
npm run test

Backend:
npm run test

Future Improvements

Push notifications
AI productivity assistant
Achievement system
Social study features

```

```
