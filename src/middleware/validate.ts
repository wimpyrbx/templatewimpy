import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from './errors';

export const validateRequest = (schema: z.ZodType<any>) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                next(error);
            } else {
                next(new AppError(400, 'Invalid request data'));
            }
        }
    };
}; 