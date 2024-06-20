'use client'

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Box, Text } from '@chakra-ui/react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
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
                console.log('login successful:', data);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else if (response.status === 401) {
                const errorData = await response.json();
                console.error('login failed:', errorData);
                setErrorMessage('Username or password is incorrect');
            } else {
                const errorData = await response.json();
                console.error('login failed:', errorData);
                setErrorMessage('login failed. Please try again later.');
            }
        } catch (error: any) {
            console.error('Error logging in:', error.message);
            setErrorMessage('Network error. Please try again later.');
        }
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <Box>
            {errorMessage && <Text color="red">{errorMessage}</Text>}
            <>{successMessage && <Text color="green">{successMessage}</Text>}</>
            <Input
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
            />
            <Input
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
            />
            <Button onClick={handleLogin}>Login</Button>
        </Box>
    );
};

export default LoginForm;