'use client'

import { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Slide from './Slides';
import io from 'socket.io-client';

type SlideShowProps = {
  images: string[];
};

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL || '';
    if (socketURL) {
      const newSocket = io(socketURL);
      setSocket(newSocket);

      newSocket.on('slideChange', (slideIndex: number) => {
        console.log(`Received slideChange event: ${slideIndex}`);
        setCurrentSlide(slideIndex);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      console.error('Socket URL is not set');
    }
  }, []);

  const goToPreviousSlide = () => {
    const newIndex = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(newIndex);
    console.log(`Emitting slideChange event: ${newIndex}`);
    socket?.emit('slideChange', newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(newIndex);
    console.log(`Emitting slideChange event: ${newIndex}`);
    socket?.emit('slideChange', newIndex);
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Slide imageSrc={images[currentSlide]} /> {/* Correctly use Slide component */}
      <Flex justify="space-between" width="200px">
        <Button onClick={goToPreviousSlide}>Previous</Button>
        <Button onClick={goToNextSlide}>Next</Button>
      </Flex>
    </Flex>
  );
};

export default SlideShow;
