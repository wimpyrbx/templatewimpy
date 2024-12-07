import { Request, Response, NextFunction } from 'express';
import { AppError } from './errors';

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
    if (!req.session.user) {
        next(new AppError(401, 'Authentication required'));
        return;
    }
    next();
}; 