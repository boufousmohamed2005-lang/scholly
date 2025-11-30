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
  BellElectricIcon,
  MoonIcon,
  SunIcon,
  LogOut ,
  Contact2,
User,
Info,
 
CalendarDays,
 FileText,
 UserRound

} from "lucide-react"
import { Link } from "react-router-dom"
import "./sidebar.css"
const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20}/> },
  { name: "Étudiants", icon: <GraduationCap size={20}/> },
  { name: "Professeurs", icon: <Users size={20}/> },
  { name: "Cours", icon: <BookOpen size={20}/> },
  { name: "Regions", icon: <MapPin size={20}/> },
   { name: "Profile", icon: <Info size={20}/> },
  { name: "Reclamation", icon: <BellElectricIcon size={20}/> },
  { name: "Saisie", icon: <Bell size={20}/> },
   { name: "Paramètres", icon: <Settings size={20}/> },
  
]
const navItemsetu = [
   { name: "Class", icon: <UserRound size={20}/> },
  { name: "Emploie", icon: <CalendarDays size={20}/> },
  { name: "Profile", icon: <Info size={20}/> },
   { name: "Cours", icon: <BookOpen size={20}/> },
  { name: "Professeurs", icon: <FileText size={20}/> }, 
   { name: "Saisie", icon: <Bell size={20}/> },
  { name: "Contact", icon: <Contact2 size={20}/> },
   { name: "Paramètres", icon: <Settings size={20}/> },
]

const navItemProf=[
   
  { name: "Étudiants", icon: <GraduationCap size={20}/> },
  { name: "Emploie", icon: <CalendarDays size={20}/> },
 
  { name: "Profile", icon: <Info size={20}/> },
  { name: "Contact", icon: <Contact2 size={20}/> },
  { name: "Saisie", icon: <Bell size={20}/> },
   { name: "Paramètres", icon: <Settings size={20}/> },
]
const Sidebar = ({ activeItem, setActiveItem, toggleDarkMode, darkMode,role }) => {
  const [open, setOpen] = useState(true)
 

  
  return (
    <div className="parent-sidebar">
    

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h1 className="title"> <GraduationCap  size={39}  onClick={() => setOpen(!open)}  />  { open && "Schoolly"}  </h1>

        <nav>
          <ul>
            {

             (role == "student" ? navItemsetu :  role == "professor" ? navItemProf : navItems)
          
            .map((item) => (
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
              {   open && <span>{item.name}</span>  }   
              </li>
            ))}
          </ul>
        </nav>

        <div className="help-box">
           <nav  onClick={toggleDarkMode}>
        {darkMode ? <MoonIcon  color="black"  strokeWidth={3} size={16} /> :  <SunIcon size={20}   color="yellow" strokeWidth={3}  /> }
        { open && "theme" }
      </nav>
      <br />
        
        <Link to="/" style={{color:"red"}} > <LogOut  size={20} color="red" strokeWidth={3} />  { open && "Logout" } </Link> 
        
          
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
