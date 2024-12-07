import { User } from './User';

declare module 'express-session' {
    interface SessionData {
        user: {
            username: string;
            created_at: string;
        };
    }
} 