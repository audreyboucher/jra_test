import Users from '../../api/users.json';

import { LoginRequest, LoginResponse, User } from '../../types/api';

export const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    if (!email || !email.trim().length) reject({ message: "Email is required" });
    if (!password || !password.trim().length) reject({ message: "Password is required" });

    const match = (Users as User[]).find((user) => user.email === email.trim().toLowerCase() && user.password === password.trim());

    if (match) resolve({ token: match.token, role: match.role });
    else reject({ message: "Wrong email or password" });
  });
};
