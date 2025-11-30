import React from 'react';
import './header.css';
import {  

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
      
      <span className='info-1'>
   
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

