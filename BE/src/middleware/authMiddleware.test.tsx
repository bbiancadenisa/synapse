import jwt from 'jsonwebtoken';
import { describe, expect, it, vi } from 'vitest';
import { authMiddleware } from './authMiddleware';

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

const createResponse = () => {
  const res: any = {};

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res;
};

describe('authMiddleware', () => {
  it('returns 401 if authorization header is missing', () => {
    const req: any = {
      headers: {},
    };

    const res = createResponse();

    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 if token is invalid', () => {
    const req: any = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    };

    const res = createResponse();

    const next = vi.fn();

    (jwt.verify as any).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid or expired token',
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('attaches user to request and calls next', () => {
    const decodedUser = {
      id: 1,
      email: 'test@test.com',
    };

    const req: any = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    };

    const res = createResponse();

    const next = vi.fn();

    (jwt.verify as any).mockReturnValue(decodedUser);

    authMiddleware(req, res, next);

    expect(req.user).toEqual(decodedUser);

    expect(next).toHaveBeenCalled();
  });
});
