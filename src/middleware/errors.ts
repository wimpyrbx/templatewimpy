import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AuthResponse } from '../types/User';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response<AuthResponse>,
    _next: NextFunction
) => {
    if (
        err instanceof AppError && 
        ![401, 403, 404].includes(err.statusCode)
    ) {
        console.error('Error:', {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    } else if (!(err instanceof AppError) && !(err instanceof ZodError)) {
        console.error('Unexpected Error:', {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            validationErrors: err.errors
        });
    }

    // Default error
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
}; 