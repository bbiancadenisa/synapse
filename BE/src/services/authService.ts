import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export const findUserByEmail = async (email: string) => {
  return pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email],
  );
};

export const createUser = async (email: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);

  return pool.query(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at
    `,
    [email, passwordHash],
  );
};

export const comparePassword = async (
  password: string,
  passwordHash: string,
) => {
  return bcrypt.compare(password, passwordHash);
};

export const createToken = (user: { id: number; email: string }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
};
