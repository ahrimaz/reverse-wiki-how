import { Box, Heading, Text } from '@chakra-ui/react';

const AboutPage: React.FC = () => {
    return (
        <Box p={4}>
            <Heading as="h1" size="xl" mb={4}>
                About
            </Heading>
            <Text fontSize="lg">
                Welcome!
            </Text>
            <Text fontSize="lg" mt={4}>
            This is a simple application inspired by Griffin McElroy&apos;s reverse wiki how game.
            </Text>
        </Box>
    );
};

export default AboutPage;