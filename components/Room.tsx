'use client'

import React, { useState, useEffect } from 'react';
import ChatClient from './ChatClient';
import SlideShow from './SlideShow';

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
      const data = await response.json();
      setSlideshows(data);
    } catch (error) {
      console.error('Error fetching slideshows:', error);
    }
  };

  return (
    <div>
      <h1>Room</h1>
      <select onChange={(e) => setSelectedSlideshow(e.target.value)}>
        <option value="">Select a slideshow</option>
        {slideshows.map((slideshow) => (
          <option key={slideshow._id} value={slideshow._id}>
            {slideshow.name}
          </option>
        ))}
      </select>
      {selectedSlideshow && <SlideShow slideshowId={selectedSlideshow} />}
      <ChatClient />
    </div>
  );
};

export default Room;