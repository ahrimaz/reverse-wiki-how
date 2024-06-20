'use client'

import { Box, Flex, Link, Text, Spinner } from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
    />
  }

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
        {isAuthenticated ? (
          <Text fontSize="xl" fontWeight="bold" cursor="pointer" onClick={logout}>Logout</Text>
        ) : (
          <Link fontSize="xl" fontWeight="bold" href='/login'>Login</Link>
        )}
      </Box>
    </Flex>
  );
}
