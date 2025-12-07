import React from 'react';
import './header.css';
import {  

Loader2
} from 'lucide-react';

// const getAvatar = (name) => {
//   const letter = name.charAt(0).toUpperCase();
//   const colors = ["#ff6b6b", "#6b8cff", "#3ddc97", "#f7b32b", "#be4bdb"];
//   const bg = colors[Math.floor(Math.random() * colors.length)];
//   return { letter, bg };
// };

const Header = ({ activeItem,role,name }) => {
  
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
       {name} <br />
        {role}  usr
      </p>
      </span>
     </nav>
    </div>
  );
};

export default Header;

