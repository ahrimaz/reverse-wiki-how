'use client'

import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Heading, Image, Input } from '@chakra-ui/react';

interface image {
    url: string;
    _id: string;
}

const CreateSlideshow = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<image[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/files/images', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/slideshows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, images: selectedImages })
      });

      if (response.ok) {
        alert('Slideshow created successfully');
      } else {
        alert('Error creating slideshow');
      }
    } catch (error) {
      console.error('Error creating slideshow:', error);
    }
  };

return (
    <Box>
        <Heading>Create Slideshow</Heading>
        <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Slideshow Name"
        />
        <Box display="flex" flexDirection="row">
            <Heading as="h3">Select Images</Heading>
            {images.map((image) => (
                <Box
                    key={image._id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    onClick={() => {
                        const imageId = image._id;
                        if (selectedImages.includes(imageId)) {
                            setSelectedImages(selectedImages.filter((id) => id !== imageId));
                        } else {
                            setSelectedImages([...selectedImages, imageId]);
                        }
                    }}
                >
                    <Image src={image.url} alt="uploaded" width="300" height="300" />
                </Box>
            ))}
        </Box>
        <Button onClick={handleSubmit}>Create Slideshow</Button>
    </Box>
);
};

export default CreateSlideshow;