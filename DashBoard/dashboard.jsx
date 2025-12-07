import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import Info from "./components/Etudiant/Info";
import Contact from "./components/contact";
import Tempdemploi from "./components/Etudiant/Tempdemploi";
import Analytics from "./components/analytics";
import Students from "./components/Students";
import Profileprof from "./components/prof/InfoProf";
import Parametre from './components/Parametre';
import LineChart from "./components/LineChart";
import Teachers from "./components/Teachers";
import Courses from "./components/Courses";
import StudentsClassmet from "./components/Etudiant/StudentClassmet";
import Regions from "./components/regions";
import Payments from "./components/Payments";
import CustomerReviews from "./components/CustomerReviews";
import NewestBooking from "./components/NewestBooking";
import Saisie from "./components/Saisie";
import ContactReclation from "./components/ContactReclation";
import EmploideTempDir from "./components/EmploiDeTempDir";

import "./dashboard.css";
import { GraduationCap, Users, BookOpen, BellDot } from "lucide-react";
import useAuth from "../src/hook/Usehook";


const Dashboard = () => {
  const { user, loading } = useAuth();

  const [role, setRole] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const [stats, setStats] = useState({ etu: 0, cour: 0, prof: 0, notif: 0 });
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState([]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Initialise role et activeItem une seule fois après que user soit chargé
  useEffect(() => {
    if (!user) return;
    setRole(user.role);

    if (user.role === "etudiant") {setActiveItem("Class")
      setRole("student");
    }
    else if (user.role === "professeur") setActiveItem("Étudiants");
    else setActiveItem("Dashboard");
  }, [role,user]);

  // Fetch API : données des étudiants, profs, cours et notifications
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {

       

        setStats({
          etu: students.length,
          prof: teachers.length,
          cour:courses.length,
        
        });
     
    };

    fetchData();
  }, [user,role,students,teachers,courses]);

  if(loading) return  
        <div className="loader-container">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      
  if (!user) return <p>Vous n’êtes pas connecté.</p>;

  const statsCards = [
    { id:"Cours", title: "Cours", value: stats.cour, color: "violet", icon: <BookOpen /> },
    {id:"Étudiants", title: "Étudiants", value: stats.etu, color: "blue", icon: <GraduationCap /> },
    {id:"Professeurs", title: "Professeurs", value: stats.prof, color: "green", icon: <Users /> },
    {id:"Reclamation", title: "Notifications", value: stats.notif, color: "orange", icon: <BellDot /> },
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
    { text: "New student registered", time: "2 min ago" },
    { text: "Professor updated course materials", time: "25 min ago" },
    { text: "Exam schedule published", time: "1 hour ago" },
  ];

  return (

    <div className={`dashboard ${darkMode ? "dark-mode" : ""}  `}  >
      
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        role={role}
      />

      <div className="main-content">
        <Header activeItem={activeItem} role={role} name={user.name} />

        <div className="dashboard-content">
          {activeItem === "Dashboard" && (
            <>
              <div className="bienvunue">
                <h1>Good afternoon, {user.name} !</h1>
                <p>Monitor school operations and track key metrics.</p>
              </div>

              <div className="stats-grid">
                {statsCards.map((stat, index) => (
                  <StatCard key={index} {...stat} setActiveItem={setActiveItem} />
                ))}
              </div>

              <Analytics activities={activities} isDark={darkMode} barData={barData} lineData={lineData}>
                <div className="linecahart">
                  <LineChart data={chartData} title="Etudiant vs Profs" />
                  <LineChart data={chartData2} title="Additional Chart" />
                </div>
              </Analytics>

              <div className="bottom-section">
                <CustomerReviews />
              </div>
              <NewestBooking />
            </>
          )}

          {activeItem === "Étudiants" && <Students  loading={loading}   setetu={setStudents}   />} 
           {/*setetu={(val) => setStats(s => ({ ...s, etu: val }))} */} 
          {activeItem === "Professeurs" && <Teachers  setTeachers={setTeachers}  role={role} />}
          {activeItem === "Cours" && <Courses setcour={setCourses}  role={role} />}
          {activeItem === "Class" && <StudentsClassmet className="mrhba" students={students} />}
          {activeItem === "Info" && <Profileprof />}
          {activeItem === "Profile" && <Info />}
          { activeItem === "Emploi" && <EmploideTempDir/> }
          {activeItem === "Saisie" && <Saisie role={role} />}
          {activeItem === "Reclamation" && <ContactReclation />}
          {activeItem === "Contact" && <Contact role={role} />}
          {activeItem === "Paramètres" && <Parametre />}
           {activeItem === "Emploie" && <Tempdemploi timetable={[]} />} {/* etudiant and prof  */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
