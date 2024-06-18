'use client';

import { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Slides from './Slides';
import io from 'socket.io-client';

type SlideShowProps = {
  images: string[];
};

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<string[]>(images);

  useEffect(() => {
    const socket = io({
      path: '/api/socket',
    });

    socket.on('slides', (data: string[]) => {
      setSlides(data);
    });

    socket.on('next', () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    });

    socket.on('prev', () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    });

    return () => {
      socket.disconnect();
    };
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Flex direction="column" align="center" justify="center">
      <Slides imageSrc={slides[currentSlide]} />
      <Flex justify="space-between" width="200px" mt={4}>
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </Flex>
    </Flex>
  );
};

export default SlideShow;
