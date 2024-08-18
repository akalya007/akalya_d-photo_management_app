

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import logo from './images/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const { docs: images, isLoading } = useFirestore('images');

  const handleImageClick = (image) => {
    navigate(`/image/${image.fileId}`, {
      state: { image }, // Passing the whole image object as state
    });
  };

  const handleScroll = () => {
    if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="custom-progress-bar-container">
          <div className="custom-progress-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <img src={logo} alt="Logo" className="gallery-logo" />
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <button className="upload-button" onClick={handleUploadClick}>
        Upload Photos
      </button>

      <div className="grid-container">
        {images.map((image) => (
          <div
            key={image.fileId} // Using fileId as the key
            className="card"
            onClick={() => handleImageClick(image)} // Passing the image object to the handleImageClick function
          >
            <figure className="figure-container">
              <img src={image.imageUrl} alt={image.title} />
            </figure>
            <div className="card-body">
              <p>Title: {image.title}</p>
              <p>Description: {image.description}</p>
              <p>Uploaded by: {image.userEmail}</p>
              <span>Created on: {image.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {showScrollButton && (
        <button className="scroll-button" onClick={scrollToBottom}>
          Scroll Down
        </button>
      )}
    </div>
  );
};

export default GalleryPage;
