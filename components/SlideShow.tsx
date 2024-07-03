import React, { useState, useEffect } from 'react';

interface SlideShowProps {
  slideshowId: string;
}

const SlideShow: React.FC<SlideShowProps> = ({ slideshowId }) => {
  const [images, setImages] = useState<string[]>([]);

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
      console.error('Error fetching slideshow:', error);
    }
  };

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Slide ${index}`} />
      ))}
    </div>
  );
};

export default SlideShow;
