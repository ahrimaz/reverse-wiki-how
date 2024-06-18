import Image from "next/image";
import styles from "./page.module.css";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import SlideShow from "@/components/SlideShow";

const images = [
  "https://www.wikihow.com/images/thumb/8/83/Prevent-or-Survive-a-Monkey-Attack-Step-1-Version-4.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-1-Version-4.jpg.webp",
  "https://www.wikihow.com/images/thumb/d/d8/Prevent-or-Survive-a-Monkey-Attack-Step-6-Version-4.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-6-Version-4.jpg.webp",
  "https://www.wikihow.com/images/thumb/0/00/Prevent-or-Survive-a-Monkey-Attack-Step-9-Version-4.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-9-Version-4.jpg.webp",
  "https://www.wikihow.com/images/thumb/a/a9/Prevent-or-Survive-a-Monkey-Attack-Step-11-Version-3.jpg/aid56064-v4-728px-Prevent-or-Survive-a-Monkey-Attack-Step-11-Version-3.jpg.webp",
]

export default function Home() {
  return (
    <>
    <Navbar />
    <Flex align="center" justify="center" p={4} m={4}>
    <SlideShow images={images} />
    </Flex>
    </>
  );
}
