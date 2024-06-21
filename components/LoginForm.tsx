'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Input, Button, Box, Text } from '@chakra-ui/react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, username); // Pass token and username to login
        setSuccessMessage('Login successful. Redirecting to home page...');
        setTimeout(() => {
          router.push('/login');
      }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage('Login failed. Please try again.');
        console.error('Login failed:', errorData);
      }
    } catch (error: any) {
      setErrorMessage('Network error. Please try again later.');
      console.error('Error logging in:', error.message);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Box>
      {errorMessage && <Text color="red">{errorMessage}</Text>}
      <>{successMessage && <Text color="green">{successMessage}</Text>}</>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleLogin();
          }
        }}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleLogin();
          }
        }}
      />
      <Button w="100%" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginForm;
