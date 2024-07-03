'use client'

import React, { useState, useEffect } from 'react';

interface SlideShowProps {
  slideshowId: string;
}

interface Image {
  _id: string;
  url: string;
}

const SlideShow: React.FC<SlideShowProps> = ({ slideshowId }) => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetchSlideshow();
  }, [slideshowId]);

  const fetchSlideshow = async () => {
    try {
      const response = await fetch(`https://energetic-tidy-ray.glitch.me/slideshows/${slideshowId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching slideshow images:', error);
    }
  };

  return (
    <div>
      {images.length > 0 ? (
        <div>
          {images.map((image) => (
            <img key={image._id} src={image.url} alt="Slideshow" width="200" />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default SlideShow;
