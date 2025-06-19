export enum Role {
  User = 'user',
  Admin = 'admin',
};

export interface User {
  id: string;
  email: string;
  password: string;
  token: string;
  role: Role;
};

// POST /login
export type LoginRequest = Pick<User, 'email' | 'password'>;
export type LoginResponse = Pick<User, 'token' | 'role'>;

// GET /users/me
export type GetCurrentUserRequest = null;
export type GetCurrentUserResponse = Pick<User, 'id' | 'role'>;
