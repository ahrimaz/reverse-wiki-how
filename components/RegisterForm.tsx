'use client'

import { useState, ChangeEvent } from 'react';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        // successful registration
      } else if (response.status === 409) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // failed registration
        setErrorMessage('Username already exists. Plesae choose a different one.')
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error: any) {
      console.error('Error registering user:', error.message);
      // handle network or other errors
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
        <>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;