import React from 'react';
import { GraduationCap } from './icons';



const Logo = () => {
  return (
    <a href="/" className="logo">
      <div className="logo-icon-wrapper">
        <GraduationCap />
      </div>
      <span className="logo-text">Schoolly</span>
    </a>
  );
};

export default Logo;