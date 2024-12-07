// components/layout/AppLayout.tsx
import { AppShell, Group, Title, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme.tsx';
import { ThemeCustomizer } from '../ThemeCustomizer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { themeSettings } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      styles={{
        main: {
          background: themeSettings.backgroundColor,
        },
        header: {
          background: themeSettings.headerBg,
          borderBottom: `1px solid ${themeSettings.borderColor}`
        }
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3} c={themeSettings.textColor}>My App</Title>
          <Group>
            <Button 
              variant={themeSettings.buttonVariant}
              onClick={() => navigate('/home')}
              styles={{
                root: {
                  backgroundColor: themeSettings.buttonVariants?.filled.background,
                  color: themeSettings.buttonVariants?.filled.textColor
                }
              }}
            >
              Home
            </Button>
            <Button 
              variant={themeSettings.buttonVariant}
              onClick={() => navigate('/profile')}
              styles={{
                root: {
                  backgroundColor: themeSettings.buttonVariants?.filled.background,
                  color: themeSettings.buttonVariants?.filled.textColor
                }
              }}
            >
              Profile
            </Button>
            <ThemeCustomizer />
            <Button 
              variant={themeSettings.buttonVariant}
              color="red"
              onClick={handleLogout}
              styles={{
                root: {
                  backgroundColor: themeSettings.buttonVariants?.filled.background,
                  color: themeSettings.buttonVariants?.filled.textColor
                }
              }}
            >
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}