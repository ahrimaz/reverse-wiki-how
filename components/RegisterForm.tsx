'use client'

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { Input, Button, Box, Text } from '@chakra-ui/react';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await fetch('https://energetic-tidy-ray.glitch.me/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                localStorage.setItem('token', data.token);
                setSuccessMessage('Registration successful. Redirecting to login page...');
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else if (response.status === 409) {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setErrorMessage('Username already exists. Please choose a different one.');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setErrorMessage('Registration failed. Please try again later.');
            }
        } catch (error: any) {
            console.error('Error registering user:', error.message);
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
                        handleRegister();
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
                        handleRegister();
                    }
                }}
            />
            <Button justifyContent="center" onClick={handleRegister} w="100%">
                Register
            </Button>
        </Box>
    );
};

export default RegisterForm;
