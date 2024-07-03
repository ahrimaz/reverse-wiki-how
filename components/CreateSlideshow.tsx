'use client'

import React, { useState, useEffect } from 'react';

interface Image {
  _id: string;
  url: string;
}

const CreateSlideshow: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/images', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data: Image[] = await response.json();
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
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Slideshow Name"
      />
      <div>
        <h3>Select Images</h3>
        {images.map((image) => (
          <div key={image._id}>
            <input
              type="checkbox"
              value={image._id}
              onChange={(e) => {
                const imageId = e.target.value;
                if (selectedImages.includes(imageId)) {
                  setSelectedImages(selectedImages.filter((id) => id !== imageId));
                } else {
                  setSelectedImages([...selectedImages, imageId]);
                }
              }}
            />
            <img src={image.url} alt="uploaded" width="100" />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Create Slideshow</button>
    </div>
  );
};

export default CreateSlideshow;
