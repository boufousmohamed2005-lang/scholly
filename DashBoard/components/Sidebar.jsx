import React, { useState } from "react"
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  MapPin,
  Settings,
  Menu,
  X,
  Bell,
  MoonIcon,
  SunIcon,
  LogOut ,
  Contact2,
 

} from "lucide-react"
import { Link } from "react-router-dom"
import "./sidebar.css"
const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={18}/> },
  { name: "Étudiants", icon: <GraduationCap size={18}/> },
  { name: "Professeurs", icon: <Users size={18}/> },
  { name: "Cours", icon: <BookOpen size={18}/> },
  { name: "Regions", icon: <MapPin size={18}/> },
  { name: "Contact", icon: <Contact2 size={18}/> },
  { name: "Saisie", icon: <Bell size={18}/> },
   { name: "Paramètres", icon: <Settings size={18}/> },
  
]

const Sidebar = ({ activeItem, setActiveItem, toggleDarkMode, darkMode }) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="parent-sidebar">
    

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h1 className="title"> <GraduationCap  size={39}  onClick={() => setOpen(!open)}  />  { open && "Schoolly"}  </h1>

        <nav>
          <ul>
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`sidebar-item ${
                  activeItem === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveItem(item.name)
                 
                }}
              >
                {item.icon}
              { open && <span>{item.name}</span>  }   
              </li>
            ))}
          </ul>
        </nav>

        <div className="help-box">
           <nav  onClick={toggleDarkMode}>
        {darkMode ? <MoonIcon  color="black"  strokeWidth={3} size={16} /> :  <SunIcon size={18}   color="yellow" strokeWidth={3}  /> }
        { open && "theme" }
      </nav>
      <br />
        
        <Link to="/" style={{color:"red"}} > <LogOut  size={18} color="red" strokeWidth={3} />  { open && "Logout" } </Link> 
        
          
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
