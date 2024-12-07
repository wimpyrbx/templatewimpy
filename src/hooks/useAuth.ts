import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, LoginCredentials, AuthResponse } from '../types/User';
import { apiFetch } from '../utils/api';

export function useAuth() {
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    // Auth check query
    const { data: authData, isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            const { data } = await apiFetch<AuthResponse>('/api/auth/check', {
                suppressErrors: true
            });
            return data;
        },
        enabled: location.pathname !== '/login', // Don't run on login page
        retry: false
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { data, error: fetchError } = await apiFetch<AuthResponse>('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            if (!data?.success || fetchError) {
                throw new Error(data?.message || fetchError || 'Login failed');
            }

            return data;
        },
        onSuccess: (data) => {
            if (data.user) {
                queryClient.setQueryData(['auth'], data);
                navigate('/home');
            }
        },
        onError: (err) => {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            const { data } = await apiFetch<AuthResponse>('/api/auth/logout', {
                method: 'POST',
                suppressErrors: true
            });
            return data;
        },
        onSuccess: () => {
            queryClient.setQueryData(['auth'], null);
            navigate('/login');
        }
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (location.pathname !== '/login' && !isLoading && !authData?.success) {
            navigate('/login');
        }
    }, [authData, isLoading, location.pathname, navigate]);

    return {
        user: authData?.user || null,
        error,
        loading: isLoading || loginMutation.isPending || logoutMutation.isPending,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate
    };
}