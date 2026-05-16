import { pool } from '../config/db';

export const findSubjectByName = async (
  userId: number,
  name: string,
  excludeId?: number,
) => {
  if (excludeId) {
    return pool.query(
      `
      SELECT id
      FROM subjects
      WHERE user_id = $1
        AND name = $2
        AND id != $3
      `,
      [userId, name, excludeId],
    );
  }

  return pool.query(
    `
    SELECT id
    FROM subjects
    WHERE user_id = $1
      AND name = $2
    `,
    [userId, name],
  );
};

export const createSubject = async (data: {
  userId: number;
  name: string;
  description?: string | null;
  difficulty: string;
  color?: string | null;
  overallDeadline?: string | null;
}) => {
  return pool.query(
    `
    INSERT INTO subjects (
      user_id,
      name,
      description,
      difficulty,
      color,
      overall_deadline,
      estimated_total_hours,
      actual_hours_spent
    )
    VALUES ($1, $2, $3, $4, $5, $6, 0, 0)
    RETURNING *
    `,
    [
      data.userId,
      data.name,
      data.description || null,
      data.difficulty,
      data.color || null,
      data.overallDeadline || null,
    ],
  );
};

export const getSubjects = async (params: {
  userId: number;
  difficulty?: string;
  archived?: boolean;
  sort?: string;
}) => {
  let query = `
    SELECT *
    FROM subjects
    WHERE user_id = $1
  `;

  const values: any[] = [params.userId];
  let index = 2;

  if (params.difficulty) {
    query += ` AND difficulty = $${index++}`;
    values.push(params.difficulty);
  }

  if (params.archived !== undefined) {
    query += ` AND is_archived = $${index++}`;
    values.push(params.archived);
  } else {
    query += ` AND is_archived = false`;
  }

  const sortMap: Record<string, string> = {
    created_desc: 'created_at DESC',
    created_asc: 'created_at ASC',
    name_asc: 'name ASC',
    name_desc: 'name DESC',
    deadline_asc: 'overall_deadline ASC NULLS LAST',
    deadline_desc: 'overall_deadline DESC NULLS LAST',
    difficulty_asc: `
      CASE difficulty
        WHEN 'low' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'high' THEN 3
      END ASC
    `,
    difficulty_desc: `
      CASE difficulty
        WHEN 'low' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'high' THEN 3
      END DESC
    `,
  };

  const orderBy =
    sortMap[params.sort || 'created_desc'] || sortMap.created_desc;

  query += ` ORDER BY ${orderBy}`;

  return pool.query(query, values);
};

export const getSubjectById = async (id: number, userId: number) => {
  return pool.query(
    `
    SELECT *
    FROM subjects
    WHERE id = $1 AND user_id = $2
    `,
    [id, userId],
  );
};

export const getSubjectTasks = async (subjectId: number) => {
  return pool.query(
    `
    SELECT *
    FROM tasks
    WHERE subject_id = $1
    ORDER BY created_at DESC
    `,
    [subjectId],
  );
};

export const getTasksForDeleteCheck = async (subjectId: number) => {
  return pool.query(
    `
    SELECT status
    FROM tasks
    WHERE subject_id = $1
    `,
    [subjectId],
  );
};

export const deleteTasksBySubjectId = async (subjectId: number) => {
  return pool.query(
    `
    DELETE FROM tasks
    WHERE subject_id = $1
    `,
    [subjectId],
  );
};

export const deleteSubjectById = async (subjectId: number) => {
  return pool.query(
    `
    DELETE FROM subjects
    WHERE id = $1
    `,
    [subjectId],
  );
};

export const updateSubject = async (
  subjectId: number,
  fields: string[],
  values: any[],
  nextIndex: number,
) => {
  values.push(subjectId);

  const query = `
    UPDATE subjects
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${nextIndex}
    RETURNING *
  `;

  return pool.query(query, values);
};
