import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import { Flex } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" p={4}>
      <LoginForm />
      </Flex>
    </>
  );
}
