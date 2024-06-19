'use client'

import { Box, Image } from '@chakra-ui/react';

interface SlideProps {
    imageSrc: string;
}

const Slide: React.FC<SlideProps> = ({ imageSrc }) => (
    <Box boxSize="md">
        <Image src={imageSrc} alt="slide image" />
    </Box>
);

export default Slide;
