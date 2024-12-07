import { ZodError } from 'zod';

export interface User {
    username: string;
    created_at: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: User;
    validationErrors?: ZodError['errors'];
} 