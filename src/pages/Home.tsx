import { Container, Title, Box } from '@mantine/core';
import { Navbar } from '../components/layout/Navbar';

export function Home() {
    return (
        <Box>
            <Navbar />
            <Container mt="xl">
                <Title>Welcome to the Home Page</Title>
            </Container>
        </Box>
    );
} 