
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png'; 
import './Header.css';

const Header = ({ isBlack }) => {
  return (
    <nav className={`header ${isBlack ? 'header-black' : ''}`}>
      <img className="snapbox-logo" src={logo} alt="snapbox-logo" />
      <ul className='nav-elements'>
        <li><button className="sign-up-button"><Link to="/login" className="login-link">Sign Up</Link></button></li>
      </ul>
    </nav>
  );
};

export default Header;

