import { Box, Flex } from "@chakra-ui/react";
import SlideShow from "@/components/SlideShow";
import ChatClient from "@/components/ChatClient";

const images = [
  "https://www.wikihow.com/images/thumb/8/83/Prevent-or-Survive-a-Monkey-Attack-Step-1-Version-4.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-1-Version-4.jpg.webp",
  "https://www.wikihow.com/images/thumb/d/d8/Prevent-or-Survive-a-Monkey-Attack-Step-6-Version-4.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-6-Version-4.jpg.webp",
  "https://www.wikihow.com/images/thumb/0/00/Prevent-or-Survive-a-Monkey-Attack-Step-9-Version-4.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-9-Version-4.jpg.webp",
  "https://www.wikihow.com/images/thumb/a/a9/Prevent-or-Survive-a-Monkey-Attack-Step-11-Version-3.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-11-Version-3.jpg.webp",
]

export default function Home() {

  return (
    <>
      <Flex align="center" justify="center">
        <Box mr={4}>
          <SlideShow images={images} />
        </Box>
        <Box ml={4}>
          <ChatClient />
        </Box>
      </Flex>
    </>
  );
}