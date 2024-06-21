'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

const ChatClient: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>(''); // State to store authenticated username
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Redirect to login page if token is not found
      return;
    }

    // Fetch authenticated user data including username from server
    fetchUserData(token);

    setLoading(false);

    // Connect to socket.io server with token
    socketRef.current = io('https://energetic-tidy-ray.glitch.me/chat', {
      auth: { token }
    });

    socketRef.current.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect(); // Clean up socket connection on component unmount
      }
    };
  }, [router]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username); // Set authenticated username to state
      } else {
        console.error('Failed to fetch user data:', response.status);
        // Handle error fetching user data
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching user data:', error.message);
        // Handle fetch error
      } else {
        console.error('An unexpected error occurred:', error);
        // Handle the case where the error is not an instance of Error
      }
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const message = `: ${inputMessage}`;
      socketRef.current?.emit('chat message', message); // Include authenticated username in the message
      setInputMessage('');
    }
  };

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatClient;
