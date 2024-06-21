import { Box, Heading, Input, Textarea, Button } from "@chakra-ui/react";

const ContactPage: React.FC = () => {
    return (
        <Box maxW="500px" mx="auto" mt={8} p={4}>
            <Heading as="h1" mb={4}>Contact Us</Heading>
            <Input placeholder="Your Name" mb={4} />
            <Input placeholder="Your Email" mb={4} />
            <Textarea placeholder="Your Message" mb={4} />
            <Button width="100%">Submit</Button>
        </Box>
    );
};

export default ContactPage;