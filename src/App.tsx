import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, createTheme, MantineTheme } from '@mantine/core';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider, useTheme } from './hooks/useTheme.tsx';
import { AppLayout } from './components/layout/AppLayout';
import '@mantine/core/styles.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1
        }
    }
});

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // or a loading spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// MantineThemeWrapper component to apply our theme settings to Mantine
function MantineThemeWrapper({ children }: { children: React.ReactNode }) {
    const { themeSettings } = useTheme();
    
    // Create Mantine theme from our settings
    const theme = createTheme({
        colors: {
            // Define the primary color palette
            primary: [
                '#e3f2fd',
                '#bbdefb',
                '#90caf9',
                '#64b5f6',
                '#42a5f5',
                '#2196f3',
                '#1e88e5',
                '#1976d2',
                '#1565c0',
                '#0d47a1',
            ],
        },
        primaryColor: 'primary',
        fontFamily: typeof themeSettings.fontFamily === 'string' ? themeSettings.fontFamily : 'Roboto, sans-serif',
        fontSizes: {
            xs: '12px',
            sm: '14px',
            md: `${themeSettings.fontSize}px`,
            lg: '18px',
            xl: '20px',
        },
        lineHeights: {
            xs: '1.2',
            sm: '1.4',
            md: String(themeSettings.lineHeight),
            lg: '1.8',
            xl: '2.0',
        },
        radius: {
            xs: '0.125rem',
            sm: '0.25rem',
            md: '0.5rem',
            lg: '1rem',
            xl: '1.5rem',
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: `${themeSettings.spacing}px`,
            lg: '1.5rem',
            xl: '2rem',
        },
        defaultRadius: themeSettings.radius,
        components: {
            Button: {
                defaultProps: {
                    variant: themeSettings.buttonVariant,
                },
                styles: (theme: MantineTheme) => ({
                    root: {
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                            transform: `scale(${themeSettings.buttonStyles.hover.scale})`,
                            boxShadow: theme.shadows[themeSettings.buttonStyles.hover.shadow || 'md'],
                        },
                        '&:active': {
                            transform: `scale(${themeSettings.buttonStyles.active.scale})`,
                            boxShadow: theme.shadows[themeSettings.buttonStyles.active.shadow || 'sm'],
                        },
                        '&:disabled': {
                            opacity: themeSettings.buttonStyles.disabled.opacity,
                        },
                    },
                }),
            },
            Input: {
                defaultProps: {
                    variant: themeSettings.inputVariant,
                },
                styles: (theme: MantineTheme) => ({
                    input: {
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                            transform: `scale(${themeSettings.inputStyles.hover.scale})`,
                            boxShadow: theme.shadows[themeSettings.inputStyles.hover.shadow || 'sm'],
                        },
                        '&:focus': {
                            transform: `scale(${themeSettings.inputStyles.active.scale})`,
                            boxShadow: theme.shadows[themeSettings.inputStyles.active.shadow || 'md'],
                        },
                        '&:disabled': {
                            opacity: themeSettings.inputStyles.disabled.opacity,
                        },
                    },
                }),
            },
            Card: {
                styles: (theme: MantineTheme) => ({
                    root: {
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                            transform: `scale(${themeSettings.cardStyles.hover.scale})`,
                            boxShadow: theme.shadows[themeSettings.cardStyles.hover.shadow || 'md'],
                        },
                        '&:active': {
                            transform: `scale(${themeSettings.cardStyles.active.scale})`,
                            boxShadow: theme.shadows[themeSettings.cardStyles.active.shadow || 'sm'],
                        },
                    },
                }),
            },
        },
    });

    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    );
}

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <MantineThemeWrapper>
                    <BrowserRouter>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/login" element={<Login />} />
                            
                            {/* Protected routes */}
                            <Route path="/home" element={
                                <ProtectedRoute>
                                    <AppLayout>
                                        <Home />
                                    </AppLayout>
                                </ProtectedRoute>
                            } />
                            <Route path="/" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </BrowserRouter>
                </MantineThemeWrapper>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
