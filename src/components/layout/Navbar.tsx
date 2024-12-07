// components/layout/Navbar.tsx
import { useState } from 'react';
import { 
  Burger, 
  Group, 
  Drawer, 
  UnstyledButton, 
  Text,
  Container
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NavbarProps } from '../../types/components';

/** Navigation items configuration */
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Profile', path: '/profile' },
  { label: 'Theme Test', path: '/theme-test' },
] as const;

/**
 * Navigation button component used in both mobile and desktop views
 */
interface NavButtonProps {
  label: string;
  path: string;
  onClick: () => void;
}

/**
 * Responsive navigation bar component that provides:
 * - Desktop horizontal navigation
 * - Mobile hamburger menu with drawer
 * - Authentication-aware navigation
 * - Automatic responsive behavior
 * 
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export function Navbar({ className }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const NavButton = ({ label, path }: { label: string; path: string }) => (
    <UnstyledButton
      onClick={() => {
        navigate(path);
        setMobileOpen(false);  // Close mobile menu after navigation
      }}
      px="sm"
      py="xs"
      style={(theme) => ({
        borderRadius: theme.radius.sm
      })}
    >
      <Text>{label}</Text>
    </UnstyledButton>
  );

  const NavContent = () => (
    <>
      {NAV_ITEMS.map((item) => (
        <NavButton key={item.path} {...item} />
      ))}
      <UnstyledButton
        onClick={() => {
          logout();
          setMobileOpen(false);
        }}
        px="sm"
        py="xs"
        style={(theme) => ({
          borderRadius: theme.radius.sm,
          color: theme.colors.red[6]
        })}
      >
        <Text>Logout</Text>
      </UnstyledButton>
    </>
  );

  return (
    <Container size="lg" h="100%" className={className}>
      <Group h="100%" justify="space-between">
        <Text size="lg" fw={700}>My App</Text>
        
        {/* Desktop Navigation */}
        <Group visibleFrom="sm" gap="sm">
          <NavContent />
        </Group>

        {/* Mobile Navigation */}
        <Burger
          hiddenFrom="sm"
          opened={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        />
        
        <Drawer
          opened={mobileOpen}
          onClose={() => setMobileOpen(false)}
          size="100%"
          padding="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <NavContent />
          </div>
        </Drawer>
      </Group>
    </Container>
  );
}