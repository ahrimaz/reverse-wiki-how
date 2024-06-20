import LoginForm from '@/components/LoginForm';
import { Flex } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <>
      <Flex align="center" justify="center" p={4}>
      <LoginForm />
      </Flex>
    </>
  );
}
