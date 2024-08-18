
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css'; 
import useStorage from '../hooks/useStorage';

const UploadPage = () => {
  const [formData, setFormData] = useState({
    photo: null,
    title: '',
    description: '',
  });

  const { startUpload, progress } = useStorage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { photo, title, description } = formData;
    if (photo) {
      await startUpload(photo, title, description); // Passing title and description
      navigate('/gallery');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button
          type="submit"
          className={`submit-button ${progress > 0 ? 'loading' : ''}`}
          disabled={!formData.photo}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
