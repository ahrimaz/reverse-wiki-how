'use client'

import { Box, Flex, Link, Text } from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';

export default function Navbar() {
    const isAuthenticated = useAuth();

    return (
        <Flex align="center" justify="space-around" borderBottom="2px solid black" p={2}>
            <Box mr={4}>
                <Link href='/' fontSize="xl" fontWeight="bold">Home</Link>
            </Box>
            <Box mr={4}>
                <Text fontSize="xl" fontWeight="bold">About</Text>
            </Box>
            <Box mr={4}>
                <Text fontSize="xl" fontWeight="bold">Contact</Text>
            </Box>
            <Box mr={4}>
                <Link fontSize="xl" fontWeight="bold" href='/register'>Register</Link>
            </Box>
            <Box mr={4}>
                <Text fontSize="xl" fontWeight="bold">Login</Text>
            </Box>
        </Flex>
    );
}
