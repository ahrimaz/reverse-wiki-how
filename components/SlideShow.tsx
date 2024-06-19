'use client'

import { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Slides from './Slides';
import io from 'socket.io-client';

type SlideShowProps = {
    images: string[];
};

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        newSocket.on('slideChange', (slideIndex: number) => {
            setCurrentSlide(slideIndex);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const goToPreviousSlide = () => {
        const newIndex = (currentSlide - 1 + images.length) % images.length;
        setCurrentSlide(newIndex);
        socket?.emit('slideChange', newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = (currentSlide + 1) % images.length;
        setCurrentSlide(newIndex);
        socket?.emit('slideChange', newIndex);
    };

    return (
        <Flex direction="column" align="center" justify="center">
            <Slides imageSrc={images[currentSlide]} />
            <Flex justify="space-between" width="200px">
                <Button onClick={goToPreviousSlide}>Previous</Button>
                <Button onClick={goToNextSlide}>Next</Button>
            </Flex>
        </Flex>
    );
};

export default SlideShow;
