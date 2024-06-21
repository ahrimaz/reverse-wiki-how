'use client'

import React, { useState, useEffect } from 'react';
import { Button, Flex, Box, Image } from '@chakra-ui/react';
import { io, Socket } from 'socket.io-client';

type SlideShowProps = {
  images: string[];
};

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
    const newSocket = io(socketURL, {
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[Client] Connected to Socket.IO server');
    });

    newSocket.on('slideChange', (slideIndex: number) => {
      console.log(`[Client] Received slideChange event: ${slideIndex}`);
      setCurrentSlide(slideIndex);
    });

    newSocket.on('disconnect', () => {
      console.log('[Client] Disconnected from Socket.IO server');
    });

    newSocket.on('error', (error) => {
      console.error('[Client] Socket.IO Error:', error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const goToPreviousSlide = () => {
    const newIndex = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(newIndex);
    socket?.emit('slideChange', newIndex);
    console.log(`[Client] Emitting slideChange event: ${newIndex}`);
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(newIndex);
    socket?.emit('slideChange', newIndex);
    console.log(`[Client] Emitting slideChange event: ${newIndex}`);
  };

  return (
    <Flex direction="column" align="center" justify="center" p={4} w="100%" maxW="600px" mx="auto">
      <Box width="100%" mb={4}>
        <Image 
          src={images[currentSlide]} 
          alt={`Slide ${currentSlide + 1}`} 
          objectFit="contain" 
          maxH="400px" 
          w="100%" 
          borderRadius="md"
        />
      </Box>
      <Flex justify="space-between" width="100%" maxW="200px">
        <Button onClick={goToPreviousSlide}>Previous</Button>
        <Button onClick={goToNextSlide}>Next</Button>
      </Flex>
    </Flex>
  );
};

export default SlideShow;
