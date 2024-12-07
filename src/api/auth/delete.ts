import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../middleware/errors';
import { AuthResponse } from '../../types/User';

export function logout(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    req.session.destroy((err) => {
        if (err) {
            next(new AppError(500, 'Failed to logout'));
            return;
        }
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    });
} 