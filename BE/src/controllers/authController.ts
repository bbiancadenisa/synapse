import { Request, Response } from 'express';
import * as authService from '../services/authService';

const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters',
      });
    }

    const existing = await authService.findUserByEmail(email);

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: 'Email already exists',
      });
    }

    const created = await authService.createUser(email, password);
    const user = created.rows[0];

    const token = authService.createToken(user);

    return res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    console.error('Register failed:', err);
    return res.status(500).json({
      error: 'Failed to register',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    const result = await authService.findUserByEmail(email);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    const user = result.rows[0];

    const passwordMatches = await authService.comparePassword(
      password,
      user.password_hash,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };

    const token = authService.createToken(safeUser);

    return res.json({
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error('Login failed:', err);
    return res.status(500).json({
      error: 'Failed to login',
    });
  }
};
