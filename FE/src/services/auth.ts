import type { AuthPayload, AuthResponse } from '../types/authTypes';
import { api } from './api';

export const login = async (data: AuthPayload) => {
  const res = await api.post('/auth/login', data);
  return res.data as AuthResponse;
};

export const register = async (data: AuthPayload) => {
  const res = await api.post('/auth/register', data);
  return res.data as AuthResponse;
};
