import React, { useState } from "react";
import {
  Calendar,
  CalendarDays,
  Clock,
  BookOpen,
  User,
  MapPin,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ListTree
} from "lucide-react";

import "./tempdemploi.css";

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

/* ===========================
      COMPONENT
=========================== */
const ScheduleCalendar = ({ timetable }) => {
 
  const [currentDay, setCurrentDay] = useState(0); // 0 = lundi
  const [mode, setMode] = useState("day"); // "day" | "week"

 

  // Filter by selected day
  const todayCourses = timetable.filter((c) => c.dayIndex === currentDay);

  return (
    <div className="calendar-card">

      {/* Header */}
      <div className="calendar-header" >
        <CalendarDays size={26} />
        <h2>Emploi du Temps</h2>

     
      </div>

      {/* Mode selector */}
      <div className="mode-switch">
        <button
          className={mode === "day" ? "active" : ""}
          onClick={() => setMode("day")}
        >
          Jour
        </button>

        <button
          className={mode === "week" ? "active" : ""}
          onClick={() => setMode("week")}
        >
          Semaine
        </button>
      </div>

      {/* DAY MODE ------------------------------------------------- */}
      {mode === "day" && (
        <>
          {/* Day Selector */}
          <div className="day-selector">
            <button
              onClick={() => setCurrentDay((p) => (p > 0 ? p - 1 : 5))}
            >
              <ChevronLeft size={20} />
            </button>

            <span>{weekDays[currentDay]}</span>

            <button
              onClick={() => setCurrentDay((p) => (p < 5 ? p + 1 : 0))}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Timeline (mobile-friendly) */}
          <div className="timeline">
            {todayCourses.length > 0 ? (
              todayCourses.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className="time-badge">
                    <Clock size={16} /> {item.heure}
                  </div>

                  <div className="timeline-content">
                    <h4>
                      <BookOpen size={16} /> {item.matiere}
                    </h4>

                    <p>
                      <User size={16} /> {item.prof}
                    </p>

                    <p>
                      <MapPin size={16} /> {item.salle}
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

      {/* WEEK MODE ------------------------------------------------ */}
      {mode === "week" && (
        <div className="week-view">
          {weekDays.map((day, index) => {
            const courses = timetable.filter((c) => c.dayIndex === index);

            return (
              <div className="week-column" key={index}>
                <h3>{day}</h3>

                {courses.length > 0 ? (
                  courses.map((item, i) => (
                    <div className="week-item" key={i}>
                      <Clock size={16} /> {item.heure}
                      <br />
                      <span className="week-sub">{item.matiere}</span>
                    </div>
                  ))
                ) : (
                  <p className="empty">—</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
