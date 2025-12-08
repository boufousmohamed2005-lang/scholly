import React, { useMemo } from 'react';
import './header.css';
import { Loader2 } from 'lucide-react';

const COLORS = ["#ff6b6b", "#6b8cff", "#3ddc97", "#f7b32b", "#be4bdb"];

const getAvatar = (name) => {
  const letter = name.charAt(0).toUpperCase();
  const bg = COLORS[Math.floor(Math.random() * COLORS.length)];
  return { letter, bg };
};

const Header = ({ activeItem,role,name }) => {
 
  const avatar = useMemo(() => getAvatar(name), [name]);

  return (
    <div className="header">
      <span>
        <h5>{activeItem}</h5>
        <p>Good evening, Admin User !</p>
      </span>
      <nav className='info'>
        <span style={{ backgroundColor: avatar.bg }} className="avatar">
          {avatar.letter}
        </span>
        <span className='info-1'>
          <p>
            {name}
            <br />
            {role} usr
          </p>
        </span>
      </nav>
    </div>
  );
};

export default Header;