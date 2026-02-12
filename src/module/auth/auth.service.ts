// services/auth.service.ts

import { UserRole } from '../../constants/role';
import { auth } from '../../lib/auth';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const register = async (data: RegisterInput) => {
  return await auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || UserRole.USER,
      phone: data.phone,
    },
  });
};

const login = async (data: LoginInput) => {
  return await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    },
  });
};

const logout = async (headers: Record<string, string>) => {
  return await auth.api.signOut({ headers });
};

export const AuthService = {
  register,
  login,
  logout,
};
