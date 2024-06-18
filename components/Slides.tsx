'use client'

import { Box, Image } from '@chakra-ui/react';

interface slideProps {
    imageSrc: string;
}

const slide = ({imageSrc}: slideProps) => (
    <Box boxSize="md">
        <Image src={imageSrc} alt="slide image" />
    </Box>
)

export default slide;