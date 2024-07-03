import React, { useEffect, useState } from 'react';

interface SlideshowProps {
  slideshowId: string;
}

const Slideshow: React.FC<SlideshowProps> = ({ slideshowId }) => {
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

      if (!response.ok) {
        throw new Error('Failed to fetch slideshow images');
      }

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
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} />
          ))}
        </div>
      ) : (
        <p>No images in this slideshow.</p>
      )}
    </div>
  );
};

export default Slideshow;
