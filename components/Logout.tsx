'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Text } from '@chakra-ui/react';

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setTimeout(() => {
        router.push('/');
    }, 2000);
  }, [router]);

  return <Text>Logging out...</Text>;
};

export default Logout;
