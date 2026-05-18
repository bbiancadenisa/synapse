export type AuthUser = {
  id: number;
  email: string;
  created_at?: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type AuthPayload = {
  email: string;
  password: string;
};
