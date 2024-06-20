'use client'

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Input, Button } from "@chakra-ui/react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error: any) {
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
    <div>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
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
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <Button onClick={handleLogin} w="100%">
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
