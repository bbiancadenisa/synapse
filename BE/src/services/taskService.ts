import { pool } from '../config/db';

export const createTask = async (data: {
  subjectId: number;
  title: string;
  description?: string | null;
  estimatedHours: number;
  priority: string;
  deadline?: string | null;
}) => {
  return pool.query(
    `
    INSERT INTO tasks (
      subject_id,
      title,
      description,
      estimated_hours,
      priority,
      deadline,
      status,
      actual_hours_spent
    )
    VALUES ($1, $2, $3, $4, $5, $6, 'todo', 0)
    RETURNING *
    `,
    [
      data.subjectId,
      data.title,
      data.description || null,
      data.estimatedHours,
      data.priority,
      data.deadline || null,
    ],
  );
};

export const getTasksBySubject = async (params: {
  subjectId: number;
  userId: number;
  sort?: string;
  status?: string;
}) => {
  let orderBy = 't.created_at DESC';

  switch (params.sort) {
    case 'created_asc':
      orderBy = 't.created_at ASC';
      break;
    case 'deadline_asc':
      orderBy = 't.deadline ASC NULLS LAST';
      break;
    case 'deadline_desc':
      orderBy = 't.deadline DESC NULLS LAST';
      break;
    case 'priority_asc':
      orderBy = 't.priority ASC';
      break;
    case 'priority_desc':
      orderBy = 't.priority DESC';
      break;
  }

  const values: any[] = [params.subjectId, params.userId];

  let query = `
    SELECT
      t.*,
      COALESCE(SUM(ss.study_time_ms), 0)::int AS total_study_ms
    FROM tasks t
    JOIN subjects s
      ON s.id = t.subject_id
    LEFT JOIN study_sessions ss
      ON ss.task_id = t.id
    WHERE t.subject_id = $1
      AND s.user_id = $2
  `;

  if (params.status) {
    query += ` AND t.status = $3`;
    values.push(params.status);
  }

  query += `
    GROUP BY t.id
    ORDER BY ${orderBy}
  `;

  return pool.query(query, values);
};

export const getTaskById = async (id: number, userId: number) => {
  return pool.query(
    `
    SELECT t.*
    FROM tasks t
    JOIN subjects s
      ON s.id = t.subject_id
    WHERE t.id = $1
      AND s.user_id = $2
    `,
    [id, userId],
  );
};

export const updateTask = async (
  id: number,
  data: {
    title?: string;
    description?: string | null;
    estimatedHours?: number;
    deadline?: string | null;
    status?: string;
    priority?: string;
  },
) => {
  return pool.query(
    `
    UPDATE tasks
    SET title = $1,
        description = $2,
        estimated_hours = $3,
        deadline = $4,
        status = $5,
        priority = $6,
        updated_at = NOW()
    WHERE id = $7
    RETURNING *
    `,
    [
      data.title,
      data.description,
      data.estimatedHours,
      data.deadline,
      data.status,
      data.priority,
      id,
    ],
  );
};

export const getActiveSessionForTask = async (
  taskId: number,
  userId: number,
) => {
  return pool.query(
    `
    SELECT 1
    FROM study_sessions
    WHERE task_id = $1
      AND user_id = $2
      AND end_time IS NULL
    LIMIT 1
    `,
    [taskId, userId],
  );
};

export const getStudySessionsForTask = async (
  taskId: number,
  userId: number,
) => {
  return pool.query(
    `
    SELECT 1
    FROM study_sessions
    WHERE task_id = $1
      AND user_id = $2
    LIMIT 1
    `,
    [taskId, userId],
  );
};

export const deleteTaskById = async (taskId: number) => {
  return pool.query(
    `
    DELETE FROM tasks
    WHERE id = $1
    `,
    [taskId],
  );
};
