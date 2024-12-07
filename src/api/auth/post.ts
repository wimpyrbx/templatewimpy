import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { authDb } from '../../db/auth.db';
import { AppError } from '../../middleware/errors';
import { AuthResponse } from '../../types/User';

export async function login(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const user = authDb.getUserByUsername(username);

        if (!user || !bcrypt.compareSync(password, user.password_hash)) {
            throw new AppError(401, 'Invalid username or password');
        }

        // Set user session
        req.session.user = {
            username: user.username,
            created_at: user.created_at
        };

        // Save session before responding
        req.session.save((err) => {
            if (err) {
                next(new AppError(500, 'Failed to save session'));
                return;
            }
            
            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    username: user.username,
                    created_at: user.created_at
                }
            });
        });
    } catch (error) {
        next(error);
    }
}

export async function createTestUser(req: Request, res: Response<AuthResponse>, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        
        authDb.createUser(username, passwordHash);
        
        return res.json({
            success: true,
            message: 'Test user created successfully'
        });
    } catch (error) {
        next(error);
    }
} 