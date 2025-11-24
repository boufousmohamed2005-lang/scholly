import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";

import Analytics from "./components/analytics";
import Students from "./components/Students";
import LineChart from "./components/LineChart";
import Teachers from "./components/Teachers";
import Courses from "./components/Courses";

import Regions from "./components/regions";
import Payments from "./components/Payments";
import CustomerReviews from "./components/CustomerReviews";
import NewestBooking from "./components/NewestBooking";
import Saisie from "./components/Saisie";
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
} from "lucide-react";


const Dashboard = () => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    // const [searchQuery, setSearchQuery] = useState('');
    const [etu, setetu] = useState(0);

    console.log("Number of students:", etu);
    // Hardcoded data
    //   Dashboard
    // Étudiants
    // Professeurs
    // Cours
    // Regions
    // Paramètres
    // Contact
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
            id: "Regions",
            color: "orange",
            title: "All Regions",
            value: "78",
            icon: <MapPin />,
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

    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
            <Sidebar
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
            />
            <div className="main-content">
                <Header activeItem={activeItem} />

                <div className="dashboard-content">
                    {activeItem === "Dashboard" && (
                        <>
                            <div className="bienvunue">
                                <h1>Good afternoon, Admin User ! 
                                      </h1> <br />
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
                            <LineChart data={chartData} title="Etudiant vs Profs" />
                            <LineChart data={chartData2}  title=" mohaemme "/></div>
                            </Analytics>
                            <div className="bottom-section">
                    
                                     <Saisie />
                                <CustomerReviews />
                            </div>
                            <NewestBooking />
                        </>
                    )}

                    {activeItem === "Étudiants" && <Students setetu={setetu} />}
                    {activeItem === "Professeurs" && <Teachers darkMode={darkMode}  />}
                    {activeItem === "Cours" && <Courses />}
                    {activeItem === "Regions" && <Regions />}
                    {activeItem === "payments" && <Payments />}
                    {activeItem === "Saisie" && <Saisie/>}
                   
                </div>
            </div>

            <p></p>
        </div>
    );
};

export default Dashboard;
