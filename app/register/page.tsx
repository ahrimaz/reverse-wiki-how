import RegisterForm from '../../components/RegisterForm';
import Navbar from '@/components/Navbar';
import { Flex } from '@chakra-ui/react';

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <Flex align="center" justify="center" p={4}>
      <RegisterForm />
      </Flex>
    </>
  );
}
