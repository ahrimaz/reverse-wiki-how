import React, { useState, useEffect } from 'react';

const SlideshowManager: React.FC = () => {
  const [slideshows, setSlideshows] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [images, setImages] = useState<string[]>([]);

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
      const data = await response.json();
      setSlideshows(data);
    } catch (error) {
      console.error('Error fetching slideshows:', error);
    }
  };

  const createSlideshow = async () => {
    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/slideshows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, images })
      });
      const data = await response.json();
      setSlideshows([...slideshows, data]);
      setName('');
      setImages([]);
    } catch (error) {
      console.error('Error creating slideshow:', error);
    }
  };

  return (
    <div>
      <h1>Manage Slideshows</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Slideshow Name"
      />
      {/* Add UI to select images */}
      <button onClick={createSlideshow}>Create Slideshow</button>
      <ul>
        {slideshows.map((slideshow) => (
          <li key={slideshow._id}>{slideshow.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SlideshowManager;
