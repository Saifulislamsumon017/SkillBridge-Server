import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(req.body);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Registration failed',
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.login(req.body);
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: user,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Login failed',
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.logout(req.headers as any);
    return res.status(200).json({
      success: true,
      message: 'User logged out successfully',
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Logout failed',
    });
  }
};

export const AuthController = {
  register,
  login,
  logout,
};
