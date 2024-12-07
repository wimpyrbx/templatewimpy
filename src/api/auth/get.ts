import { Request, Response } from 'express';
import { AuthResponse } from '../../types/User';

export function checkSession(req: Request, res: Response<AuthResponse>) {
    res.json({
        success: true,
        message: 'User is logged in',
        user: req.session.user
    });
} 