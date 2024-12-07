import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { checkSession, login, logout, createTestUser } from '../api/auth';

const router = Router();

const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
});

// Public routes
router.post('/login', validateRequest(loginSchema), login);

// Protected routes
router.get('/check', requireAuth, checkSession);
router.post('/logout', requireAuth, logout);

// Helper endpoint to create a test user (development only)
if (process.env.NODE_ENV !== 'production') {
    router.post('/create-test-user', validateRequest(loginSchema), createTestUser);
}

export default router; 