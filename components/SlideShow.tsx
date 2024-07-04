'use client'

import React, { useEffect, useState } from 'react';

interface SlideShowProps {
  slideshowId: string;
}

const SlideShow: React.FC<SlideShowProps> = ({ slideshowId }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchSlideshowImages();
  }, [slideshowId]);

  const fetchSlideshowImages = async () => {
    try {
      const response = await fetch(`https://energetic-tidy-ray.glitch.me/slideshows/${slideshowId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data && data.images) {
        const imageUrls = data.images.map((image: any) => image.url);
        setImages(imageUrls);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error('Error fetching slideshow images:', error);
      setImages([]);
    }
  };

  if (images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div>
      {images.map((url, index) => (
        <img key={index} src={url} alt={`slide ${index}`} />
      ))}
    </div>
  );
};

export default SlideShow;
