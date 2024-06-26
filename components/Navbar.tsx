'use client'

import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Flex align="center" justify="space-around" borderBottom="2px solid black" p={2}>
      <Box mr={4}>
        <Link href='/' fontSize="xl" fontWeight="bold">Home</Link>
      </Box>
      <Box mr={4}>
        <Link href='/about' fontSize="xl" fontWeight="bold">About</Link>
      </Box>
      <Box mr={4}>
        <Link href='/contact' fontSize="xl" fontWeight="bold">Contact</Link>
      </Box>
      <Box mr={4}>
        <Link fontSize="xl" fontWeight="bold" href='/register'>Register</Link>
      </Box>
      <Box mr={4}>
        <Link fontSize="xl" fontWeight="bold" href='/upload'>Upload</Link>
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
