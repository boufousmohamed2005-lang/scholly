import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, BookOpen, User, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../../src/Api";
import "./tempdemploi.css";

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const ScheduleCalendar = ({ userid }) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [mode, setMode] = useState("day");
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [etudiant, setEtudiant] = useState([]);
  const [todayCourses, setTodayCourses] = useState([]);
  const [weekCourses, setWeekCourses] = useState({});

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const userClassResponse = await api.get(`/etudiants`);
      const etudiantData = userClassResponse.data.filter((e) => e.user_id == userid);
      setEtudiant(etudiantData);
      const res = await api.get("/emplois", {
        params: { id: userid }
      });
      setTimetable(res.data);
    } catch (err) {
      console.error("Erreur chargement emploi :", err);
      alert("Erreur lors du chargement de l'emploi du temps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  useEffect(() => {
    if (etudiant.length > 0 && timetable.length > 0) {
      const todayCoursesData = timetable.filter(
        (c) => c.jour.toLowerCase() === weekDays[currentDay].toLowerCase() && c.class === etudiant[0].Class
      );
      setTodayCourses(todayCoursesData);

      const weekCoursesData = {};
      weekDays.forEach((day) => {
        weekCoursesData[day] = timetable.filter(
          (c) => c.jour.toLowerCase() === day.toLowerCase() && c.class === etudiant[0].Class
        );
      });
      setWeekCourses(weekCoursesData);
    }
  }, [etudiant, timetable, currentDay]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    );
  }

  return (
    <div className="calendar-card">
      {/* Header */}
      <div className="calendar-header">
        <CalendarDays size={26} />
        {etudiant.length > 0 && etudiant[0].Class}
        <h2>Emploi du Temps</h2>
      </div>
      {/* Mode selector */}
      <div className="mode-switch">
        <button className={mode === "day" ? "active" : ""} onClick={() => setMode("day")}>
          Jour
        </button>
        <button className={mode === "week" ? "active" : ""} onClick={() => setMode("week")}>
          Semaine
        </button>
      </div>
      {/* DAY MODE */}
      {mode === "day" && (
        <>
          <div className="day-selector">
            <button onClick={() => setCurrentDay((p) => (p > 0 ? p - 1 : 5))}>
              <ChevronLeft size={20} />
            </button>
            <span>{weekDays[currentDay]}</span>
            <button onClick={() => setCurrentDay((p) => (p < 5 ? p + 1 : 0))}>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="timeline">
            {todayCourses.length > 0 ? (
              todayCourses.map((item) => (
                <div className="timeline-item" key={item.id}>
                  <div className="time-badge">
                    <Clock size={16} />
                    {(item.heure_debut).slice(0, 5)} - {(item.heure_fin).slice(0, 5)}
                  </div>
                  <div className="timeline-content">
                    <h4>
                      <BookOpen size={16} />
                      {item.matiere || "-"}
                    </h4>
                    <p>
                      <User size={16} />
                      {item.professeur || "-"}
                    </p>
                    <p>
                      <MapPin size={16} />
                      {item.class || "-"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty">Aucun cours ce jour.</p>
            )}
          </div>
        </>
      )}
      {/* WEEK MODE */}
      {mode === "week" && (
        <div className="week-view">
          {Object.keys(weekCourses).map((day) => (
            <div className="week-column" key={day}>
              <h3>{day}</h3>
              {weekCourses[day].length > 0 ? (
                weekCourses[day].map((item) => (
                  <div className="week-item" key={item.id}>
                    <Clock size={16} />
                    {item.heure_debut} - {item.heure_fin}
                    <br />
                    <span className="week-sub">{item.matiere || "-"}</span>
                    <br />
                    <span className="week-prof">{item.professeur || "-"}</span>
                    <br />
                    <span className="week-class">{item.class || "-"}</span>
                  </div>
                ))
              ) : (
                <p className="empty">—</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;