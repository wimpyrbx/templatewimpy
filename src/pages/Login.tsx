import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials } from '../types/User';
import { TextInput, Button, Alert, Container, Paper, Title, Stack, Box } from '@mantine/core';
import { Navigate } from 'react-router-dom';

export function Login() {
    const { login, error: authError, loading, user } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // If already authenticated, redirect to home
    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ username, password });
    };

    return (
        <Box
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container size={420}>
                <Title ta="center" mb={30}>Welcome Back</Title>

                <Paper withBorder shadow="md" p={30} radius="md">
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <TextInput
                                label="Username"
                                placeholder="Your username"
                                value={username}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                                required
                            />

                            <TextInput
                                label="Password"
                                type="password"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                required
                            />

                            {authError && (
                                <Alert color="red" title="Error">
                                    {authError}
                                </Alert>
                            )}

                            <Button type="submit" loading={loading} fullWidth mt="xl">
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
} 