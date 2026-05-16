import { Request, Response } from 'express';
import { pool } from '../config/db';
import {
  endSessionByUser,
  startSessionEngine,
  timeoutSession,
} from '../engine/sessionEngine';
import * as sessionService from '../services/sessionService';

export const startStudySession = async (req: Request, res: Response) => {
  try {
    const {
      taskId,
      plannedDurationMinutes,
      breakIntervalMinutes,
      breakDurationMinutes,
    } = req.body;

    if (
      !taskId ||
      !plannedDurationMinutes ||
      !breakIntervalMinutes ||
      !breakDurationMinutes
    ) {
      return res.status(400).json({ error: 'Missing session configuration' });
    }

    const sessionResult = await sessionService.createSession({
      userId: 1,
      taskId,
      plannedDurationMinutes,
    });

    const session = sessionResult.rows[0];
    await sessionService.markTaskAsInProgress(Number(taskId));

    await sessionService.createSessionSettings({
      sessionId: session.id,
      breakIntervalMinutes,
      breakDurationMinutes,
    });

    startSessionEngine({
      sessionId: session.id,
      plannedDurationMinutes,
      breakIntervalMinutes,
      breakDurationMinutes,
    });

    return res.status(201).json(session);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to start session' });
  }
};

export const getStudySessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await sessionService.getSessionById(Number(id), 1);

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch session' });
  }
};

export const updateStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['running', 'paused', 'completed', 'timed_out'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await sessionService.updateSessionStatus(Number(id), status);

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update session' });
  }
};

export const endStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await endSessionByUser(Number(id));

    const result = await sessionService.getSessionById(Number(id), 1);

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to end session' });
  }
};

export const timeoutStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await timeoutSession(Number(id));

    const result = await sessionService.getSessionById(Number(id), 1);

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to timeout session' });
  }
};

export const createSessionEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const allowedTypes = [
      'SESSION_STARTED',
      'SESSION_TIME_REACHED',
      'SESSION_ENDED',
      'SESSION_TIMEOUT',
      'BREAK_REMINDER',
      'BREAK_ACCEPTED',
      'BREAK_IGNORED',
      'BREAK_STARTED',
      'BREAK_ENDED',
      'STOP_ACCEPTED',
      'STOP_IGNORED',
      'PENALTY_TRIGGERED',
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    const event = await sessionService.insertEvent(Number(id), type);

    return res.status(201).json(event.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getSessionEvents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await sessionService.getSessionEvents(Number(id));

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getStudySessionsByTaskId = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const result = await pool.query(
      `
  SELECT
    ss.id,
    ss.task_id,
    ss.status,
    ss.start_time,
    ss.end_time,
    ss.planned_duration_minutes,
    ss.study_time_ms,
    ss.created_at,
    COALESCE(COUNT(ssb.id), 0)::int AS break_count
  FROM study_sessions ss
  LEFT JOIN study_session_breaks ssb
    ON ssb.session_id = ss.id
    AND ssb.status = 'ended'
  WHERE ss.task_id = $1
  GROUP BY ss.id
  ORDER BY ss.created_at DESC
  `,
      [Number(taskId)],
    );

    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch task sessions' });
  }
};
