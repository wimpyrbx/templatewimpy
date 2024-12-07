// components/layout/Navbar.tsx
import { Group, Button } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <Group justify="space-between" p="md">
                <div>My App</div>
                <Button onClick={handleLogout}>Logout</Button>
            </Group>
        </nav>
    );
}