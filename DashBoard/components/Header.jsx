import React from 'react';
import './header.css';
import {  
BellIcon,
Loader2
} from 'lucide-react';
const Header = ({ activeItem }) => {
  
//     const [darkMode, setDarkMode] = React.useState(false);
//  const toggleDarkMode = () => {

//     setDarkMode(!darkMode);
//   };
  return (
    <div className="header">
     
     <span>
      <h5>
        
         {activeItem}
         </h5>
      <p>Good evening, Admin User !</p>
     </span>
     <nav className='info'>
      <BellIcon color='blue' fill='blue' size={18}/>  <p className='notification' style={{ color: 'white'}}>2</p>
      <span className='info-1'>
     <Loader2 />
      <p>
        Name <br />
        Admin User
      </p>
      </span>
     </nav>
    </div>
  );
};

export default Header;

