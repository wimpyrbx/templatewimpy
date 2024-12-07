import { Container, Table, Text, Title, Box, Paper } from '@mantine/core';
import { ResponsiveView } from '../components/ui/ResponsiveView';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/layout/Navbar';
import { useMediaQuery } from '@mantine/hooks';

/** Sample data structure for the test table */
interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

/** Sample data for demonstration */
const TEST_DATA: UserData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

/**
 * Mobile view component that displays user data in a card layout
 */
function MobileView() {
  return (
    <div>
      <Text c="blue" fw={700} mb="md">Mobile View Active</Text>
      {TEST_DATA.map((item) => (
        <Paper
          key={item.id}
          shadow="xs"
          p="md"
          mb="sm"
          withBorder
        >
          <Text fw={500}>{item.name}</Text>
          <Text size="sm" c="dimmed">{item.email}</Text>
          <Text size="sm">{item.role}</Text>
        </Paper>
      ))}
    </div>
  );
}

/**
 * Desktop view component that displays user data in a table layout
 */
function DesktopView() {
  return (
    <div>
      <Text c="green" fw={700} mb="md">Desktop View Active</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {TEST_DATA.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.email}</Table.Td>
              <Table.Td>{item.role}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

/**
 * Home page component that demonstrates:
 * - Responsive layout using ResponsiveView
 * - Authentication-aware content
 * - Different data presentations for mobile and desktop
 * 
 * This page requires authentication and will redirect to login if user is not authenticated.
 */
export function Home() {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      style={{
        minHeight: '100vh',
      }}
    >
      <Box h={60}>
        <Navbar />
      </Box>
      
      <Container size="lg" py="xl">
        <Title order={2} mb="xl">Welcome, {user?.username}!</Title>
        <Text mb="md">Current view: {isMobile ? 'Mobile' : 'Desktop'}</Text>
        <ResponsiveView
          mobile={<MobileView />}
          desktop={<DesktopView />}
          breakpoint="768px"
        />
      </Container>
    </Box>
  );
} 