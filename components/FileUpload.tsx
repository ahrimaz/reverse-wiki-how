'use client'

import React, { useState, ChangeEvent } from 'react';

interface UploadedFile {
  filePath: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://energetic-tidy-ray.glitch.me/files/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add authentication token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('error authenticating user', );
      }

      const data = await response.json();
      setUploadedFiles((prevFiles) => [...prevFiles, { filePath: data.filePath }]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <div>
        {uploadedFiles.map((file, index) => (
          <img key={index} src={`https://energetic-tidy-ray.glitch.me/${file.filePath}`} alt={`Uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
