'use client'

import React, { useState, useEffect } from 'react';
import ChatClient from './ChatClient';
import SlideShow from './SlideShow';
import { Box, Flex, Select } from '@chakra-ui/react';

const Room: React.FC = () => {
  const [slideshows, setSlideshows] = useState<any[]>([]);
  const [selectedSlideshow, setSelectedSlideshow] = useState<string | null>(null);

  useEffect(() => {
    fetchSlideshows();
  }, []);

  const fetchSlideshows = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/slideshows', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched slideshows:', data); // Add this line
      setSlideshows(data);
    } catch (error) {
      console.error('Error fetching slideshows:', error);
    }
  };

return (
    <div>
        <h1>Room</h1>
        <Flex>
            <Box flex="1">
                <Select onChange={(e) => setSelectedSlideshow(e.target.value)}>
                    <option value="">Select a slideshow</option>
                    {slideshows.map((slideshow) => (
                        <option key={slideshow._id} value={slideshow._id}>
                            {slideshow.name}
                        </option>
                    ))}
                </Select>
                {selectedSlideshow && <SlideShow slideshowId={selectedSlideshow} />}
            </Box>
            <Box flex="1">
                <ChatClient />
            </Box>
        </Flex>
    </div>
);
};

export default Room;
