
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import GalleryPage from './components/GalleryPage';
import UploadPage from './components/UploadPage';
import ImageDetails from './components/ImageDetails'; 
import { AuthProvider } from './context/auth';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' && <Header />}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>} 
          />
          <Route path="/gallery" element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          } />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/image/:id" element={<ImageDetails />} /> 
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
