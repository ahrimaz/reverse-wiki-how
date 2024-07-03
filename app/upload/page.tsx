import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import FileUpload from '@/components/FileUpload';
import CreateSlideshow from '@/components/CreateSlideshow';

const AboutPage: React.FC = () => {
    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                Upload images here
            </Heading>
            <FileUpload />
            <CreateSlideshow />
        </Box>
    );
};

export default AboutPage;