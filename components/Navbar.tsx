import { Box, Flex, Text } from '@chakra-ui/react';

export default function Navbar() {
    return (
        <Flex align="center" justify="space-around" borderBottom="2px solid black" p={2}>
            <Box mr={4}>
                <Text fontSize="xl" fontWeight="bold">Home</Text>
            </Box>
            <Box mr={4}>
                <Text fontSize="xl" fontWeight="bold">About</Text>
            </Box>
            <Box mr={4}>
                <Text fontSize="xl" fontWeight="bold">Contact</Text>
            </Box>
        </Flex>
    );
}
