'use client'

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

interface ChatClientProps {
  username: string;
}

const ChatClient: React.FC<ChatClientProps> = ({ username }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/'); // Redirect to login page if user not authenticated
      return;
    }

    setLoading(false);

    // Connect to socket.io server
    socketRef.current = io('https://energetic-tidy-ray.glitch.me/chat'); // Connect to /chat namespace
    socketRef.current.on('chat message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect(); // Clean up socket connection on component unmount
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socketRef.current?.emit('chat message', `${username}: ${inputMessage}`);
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
