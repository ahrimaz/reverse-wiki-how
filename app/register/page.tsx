import RegisterForm from '@/components/RegisterForm';
import { Flex } from '@chakra-ui/react';

export default function RegisterPage() {
  return (
    <>
      <Flex align="center" justify="center" p={4}>
      <RegisterForm />
      </Flex>
    </>
  );
}
