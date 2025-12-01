import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import Info from "./components/Etudiant/Info"
import Contact from "./components/contact"; 
import Tempdemploi from "./components/Etudiant/Tempdemploi"
import Analytics from "./components/analytics";
import Students from "./components/Students";
import Parametre from './components/Parametre'
import LineChart from "./components/LineChart";
import Teachers from "./components/Teachers";
import Courses from "./components/Courses";
import StudentsClassmet from "./components/Etudiant/StudentClassmet"
import Regions from "./components/regions";
import Payments from "./components/Payments";
import CustomerReviews from "./components/CustomerReviews";
import NewestBooking from "./components/NewestBooking";
import Saisie from "./components/Saisie";
import ContactReclation from "./components/ContactReclation";
// import TopBar from '../pages/Sign';
import "./dashboard.css";
import {
    GraduationCap,
    LayoutDashboard,
    Users,
    BookOpen,
    MapPin,
  
    Settings,
    Menu,
    X,
    BellDot,
  
    
} from "lucide-react";



const Dashboard = () => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    // const [searchQuery, setSearchQuery] = useState('');
    const [etu, setetu] = useState(0);

   
    const stats = [
        {
            id: "Cours",
            color: "violet",
            title: "All Courses ",
            value: "872",
            icon: <BookOpen />,
        },
        {
            id: "Étudiants",
            color: "blue",
            title: "Total Student",
            value: etu,
            icon: <GraduationCap />,
        },
        {
            id: "Professeurs",
            color: "green",
            title: "Total Prof",
            value: "53",
            icon: <Users />,
        },
        {
            id: "Saisie",
            color: "orange",
            title: "All Notification",
            value: "78",
            icon: <BellDot />,
        },
    ];

    const chartData = [
        { name: "Jan", inscriptions: 400, visiteurs: 240 },
        { name: "Fév", inscriptions: 300, visiteurs: 139 },
        { name: "Mar", inscriptions: 200, visiteurs: 980 },
        { name: "Avr", inscriptions: 278, visiteurs: 390 },
        { name: "Mai", inscriptions: 189, visiteurs: 480 },
        { name: "Juin", inscriptions: 239, visiteurs: 380 },
        { name: "Juil", inscriptions: 349, visiteurs: 430 },
    ];
     const chartData2 = [
        { name: "Sun", inscriptions: 100, visiteurs: 240 },
        { name: "Mon", inscriptions: 90, visiteurs: 139 },
        { name: "Thu", inscriptions: 300, visiteurs: 980 },
        { name: "Thd", inscriptions: 80, visiteurs: 980 },
        { name: "Wen", inscriptions: 78, visiteurs: 390 },
        { name: "Fri", inscriptions: 109, visiteurs: 480 },
        { name: "Sat", inscriptions: 209, visiteurs: 380 },
        
    ];

     const lineData = [
    { month: "Jan", students: 1080 },
    { month: "Feb", students: 1120 },
    { month: "Mar", students: 1170 },
    { month: "Apr", students: 1185 },
    { month: "May", students: 1200 },
  ];

  const barData = [
    { dept: "CS", value: 320 },
    { dept: "Math", value: 270 },
    { dept: "Physics", value: 230 },
    { dept: "Arts", value: 50 },
  ];

      const activities = [
    { text: "New student registered: Sarah Johnson", time: "2 min ago" },
    { text: "Professor Smith updated course materials", time: "25 min ago" },
    { text: "Exam schedule published", time: "1 hour ago" },
  ];
const [role,setrole]=useState();
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    useEffect(()=>{
        
       const rolee = localStorage.getItem("userRole");
     
      setrole(rolee);
      if ( role == "student" ) setActiveItem("Class") 
        if( role == "professor"  ) setActiveItem("Étudiants")
    },[role]);


    const [teachers, setTeachers] = useState([
        { id: "TEA001", name: "John Smith", email: "john.smith@school.edu", salary: 3500, experience: 5, department: "Math", subject: "Algebra" },
        { id: "TEA002", name: "Linda Brown", email: "linda.brown@school.edu", salary: 4000, experience: 8, department: "Science", subject: "Physics" },
        { id: "TEA003", name: "Mark Taylor", email: "mark.taylor@school.edu", salary: 3200, experience: 3, department: "English", subject: "Literature" },
      ]);
  
    return (
        <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
            <Sidebar
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
                role={role}
            />
            <div className="main-content">
                <Header activeItem={activeItem} />

                <div className="dashboard-content">
                    {activeItem === "Dashboard" && (
                        <>
                            <div className="bienvunue">
                                <h1>Good afternoon, Admin User ! </h1> <br />
                                Monitor school operations and track key metrics.
                            </div>

                            <div className="stats-grid">
                                {stats.map((stat, index) => (
                                    <StatCard
                                        key={index}
                                        {...stat}
                                        setActiveItem={setActiveItem}
                                    />
                                ))}
                            </div>
                            <Analytics activities={activities} isDark={darkMode} barData={barData} lineData={lineData} >
                            <div className="linecahart"> 
                            <LineChart  data={chartData} title="Etudiant vs Profs" />
                          
                            <LineChart data={chartData2}  title="mohaemme"/></div>
                            </Analytics>
                            <div className="bottom-section">
                    
                                   
                                <CustomerReviews />
                            </div>
                            <NewestBooking />
                        </>
                    )}

                    {activeItem === "Étudiants" && <Students setetu={setetu}  />}
                    {activeItem === "Professeurs" && <Teachers darkMode={darkMode}  role={role} teachers={teachers} setTeachers={setTeachers} />}
                    {activeItem === "Cours" && <Courses  />}
                    {activeItem === "Regions" && <Regions />}
                    {activeItem === "payments" && <Payments />}
                    {activeItem === "Saisie" && <Saisie role={role} />}
                    {activeItem === "Reclamation" && <ContactReclation />}
                    {activeItem === "Contact" && <Contact role={role} />}
                    {activeItem === "Paramètres" && <Parametre />}
                    {activeItem === "Emploie" && <Tempdemploi  timetable={ [
  { dayIndex: 0, heure: "08:30 - 10:00", matiere: "Maths", prof: "Mr. Karim", salle: "A12" },
  { dayIndex: 0, heure: "10:00 - 11:30", matiere: "Physique", prof: "Mme Salma", salle: "B02" },

  { dayIndex: 1, heure: "14:00 - 15:30", matiere: "Informatique", prof: "Mr Yassine", salle: "Lab 1" },

  { dayIndex: 3, heure: "09:00 - 10:30", matiere: "Anglais", prof: "Mme Sarah", salle: "C01" },
]
} />}

                    {activeItem === "Profile" && <Info  student={ {
    firstname: "Youssef",
    lastname: "Benhima",
    email: "youssef@example.com",
    studentId: "ST202560",
    major: "Développement Web",
    level: "2ème année",
    enrollDate: "2023-09-15",
  

    grades: [
      { subject: "Programmation", coeff: 3, grade: 15 },
      { subject: "Base de données", coeff: 2, grade: 14 },
      { subject: "Réseaux", coeff: 2, grade: 9 },
      { subject: "Mathématiques", coeff: 2, grade: 11 },
      { subject: "Anglais", coeff: 1, grade: 16 },
    ],
  }} />}

                    {activeItem === "Class" && <StudentsClassmet className="mrhba" students={  [
    { id: 1, nom: "El Idrissi", prenom: "Sara", email: "sara@gmail.com" },
    { id: 2, nom: "Boulhyan", prenom: "Youssef", email: "youssef@gmail.com" },
    { id: 3, nom: "Hachimi", prenom: "Amine", email: "amine@gmail.com" },
    { id: 4, nom: "Hachimi", prenom: "Amine", email: "amine@gmail.com" },
    { id: 5, nom: "Hachimi", prenom: "Amine", email: "amine@gmail.com" },
    { id: 6, nom: "Hachimi", prenom: "Amine", email: "amine@gmail.com" },
    { id: 7, nom: "Hachimi", prenom: "Amine", email: "amine@gmail.com" },
  ]} />}
                   
                </div>
            </div>

            
        </div>
    );
};

export default Dashboard;
