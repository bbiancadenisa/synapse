import { SessionRuntimeState } from './types';

const sessions = new Map<number, SessionRuntimeState>();

export const addSession = (state: SessionRuntimeState) => {
  sessions.set(state.sessionId, state);
};

export const getSession = (id: number) => sessions.get(id);

export const updateSession = (id: number, state: SessionRuntimeState) => {
  sessions.set(id, state);
};

export const removeSession = (id: number) => {
  sessions.delete(id);
};
