import { Request, Response } from 'express';
import {
  endSessionByUser,
  startSessionEngine,
  timeoutSession,
} from '../engine/sessionEngine';
import * as sessionService from '../services/sessionService';
import { DEMO_USER_ID } from '../utils/demoUser';
import {
  isValidSessionEventType,
  isValidStudySessionStatus,
  validateStartSessionConfig,
} from '../validators/sessionValidator';

export const startStudySession = async (req: Request, res: Response) => {
  try {
    const config = validateStartSessionConfig(req.body);

    if (!config) {
      return res.status(400).json({
        error: 'Missing or invalid session configuration',
      });
    }

    const {
      taskId,
      plannedDurationMinutes,
      breakIntervalMinutes,
      breakDurationMinutes,
    } = config;

    const sessionResult = await sessionService.createSession({
      userId: DEMO_USER_ID,
      taskId,
      plannedDurationMinutes,
    });

    const session = sessionResult.rows[0];

    await sessionService.markTaskAsInProgress(taskId);

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
    console.error('Failed to start session:', err);
    return res.status(500).json({ error: 'Failed to start session' });
  }
};

export const getStudySessionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await sessionService.getSessionById(
      Number(id),
      DEMO_USER_ID,
    );

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error('Failed to fetch session:', err);
    return res.status(500).json({ error: 'Failed to fetch session' });
  }
};

export const updateStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidStudySessionStatus(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await sessionService.updateSessionStatus(Number(id), status);

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error('Failed to update session:', err);
    return res.status(500).json({ error: 'Failed to update session' });
  }
};

export const endStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await endSessionByUser(Number(id));

    const result = await sessionService.getSessionById(
      Number(id),
      DEMO_USER_ID,
    );

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error('Failed to end session:', err);
    return res.status(500).json({ error: 'Failed to end session' });
  }
};

export const timeoutStudySession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await timeoutSession(Number(id));

    const result = await sessionService.getSessionById(
      Number(id),
      DEMO_USER_ID,
    );

    return res.json(result.rows[0] || null);
  } catch (err) {
    console.error('Failed to timeout session:', err);
    return res.status(500).json({ error: 'Failed to timeout session' });
  }
};

export const createSessionEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rawType = req.body.type;

    const type = typeof rawType === 'string' ? rawType.toLowerCase() : rawType;

    if (!isValidSessionEventType(type)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    const event = await sessionService.insertEvent(Number(id), type);

    return res.status(201).json(event.rows[0]);
  } catch (err) {
    console.error('Failed to create event:', err);
    return res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getSessionEvents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await sessionService.getSessionEvents(Number(id));

    return res.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getStudySessionsByTaskId = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const result = await sessionService.getSessionsByTaskId(Number(taskId));

    return res.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch task sessions:', err);
    return res.status(500).json({ error: 'Failed to fetch task sessions' });
  }
};
