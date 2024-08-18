import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './Login.css'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log("email=", email, "password=", password);
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/gallery');
    } catch (error) {
      setError(error.message);
    }
    console.log({ email, password });
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && error }
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    
    </div>
  );
};

export default Login;
