'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { Flex, Spinner, Box, Text, Input, Button } from '@chakra-ui/react';

const ChatClient: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token || !username) {
      router.push('/'); // Redirect to login page if token or username is not found
      return;
    }

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

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const message = `${inputMessage}`;
      socketRef.current?.emit('chat message', message); // Include username in the message
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
    <Flex direction="column" alignItems="center" p={4} w="100%" maxW="600px" mx="auto">
      <Box
        height="300px"
        overflowY="scroll"
        border="1px solid #ccc"
        p={4}
        mb={4}
        w="100%"
        whiteSpace="pre-wrap"
        overflowWrap="break-word"
        wordBreak="break-word"
      >
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </Box>
      <Input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        mb={4}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
        w="100%"
      />
      <Button w="100%" onClick={sendMessage}>Send</Button>
    </Flex>
  );
};

export default ChatClient;
