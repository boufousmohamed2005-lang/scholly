import React, { useState, useEffect } from "react";
import {
  Trophy,
  CalendarDays,
  Pencil,
  Trash2,
  Plus,
  Search,
  X,
 
} from "lucide-react";
import "./teachers.css";

const TeacherPage = ({darkMode}) => {
  const [teachers, setTeachers] = useState([
    { id: "TEA001", name: "John Smith", email: "john.smith@school.edu", salary: 3500, experience: 5, department: "Math", subject: "Algebra" },
    { id: "TEA002", name: "Linda Brown", email: "linda.brown@school.edu", salary: 4000, experience: 8, department: "Science", subject: "Physics" },
    { id: "TEA003", name: "Mark Taylor", email: "mark.taylor@school.edu", salary: 3200, experience: 3, department: "English", subject: "Literature" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    id: "", name: "", email: "", salary: "", experience: "", department: "", subject: ""
  });


  // -------------------------------
  // Dark mode toggle
  // -------------------------------
  useEffect(() => {
    if(darkMode){
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // -------------------------------
  // Search filter
  // -------------------------------
  useEffect(() => {
    const result = teachers.filter((t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(result);
  }, [searchTerm, teachers]);

  // -------------------------------
  // Delete
  // -------------------------------
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  // -------------------------------
  // Add or Edit Teacher
  // -------------------------------
  const handleSubmitTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingTeacher) {
      // Editing existing teacher
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...newTeacher, id: editingTeacher.id, salary: parseFloat(newTeacher.salary), experience: parseInt(newTeacher.experience) } : t));
    } else {
      // Adding new teacher
      const id = "TEA" + String(teachers.length + 1).padStart(3, "0");
      const teacher = { ...newTeacher, id, salary: parseFloat(newTeacher.salary), experience: parseInt(newTeacher.experience) };
      setTeachers([...teachers, teacher]);
    }

    setNewTeacher({ id: "", name: "", email: "", salary: "", experience: "", department: "", subject: "" });
    setEditingTeacher(null);
    setShowModal(false);
  };

  // -------------------------------
  // Edit teacher
  // -------------------------------
  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      name: teacher.name,
      email: teacher.email,
      salary: teacher.salary,
      experience: teacher.experience,
      department: teacher.department,
      subject: teacher.subject,
    });
    setShowModal(true);
  };

  // -------------------------------
  // Stats
  // -------------------------------
  const avgSalary = (teachers.reduce((a, t) => a + t.salary, 0) / teachers.length).toFixed(0);
  const avgExperience = (teachers.reduce((a, t) => a + t.experience, 0) / teachers.length).toFixed(1);

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="teacher-page">
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Teacher Management</h1>
          <p>Manage teacher records, salary, and experience</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button className="btn-primary" onClick={() => {setShowModal(true); setEditingTeacher(null);}}>
            <Plus size={18} /> Add Teacher
          </button>
        
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <Trophy size={26} />
          <div>
            <h3>{teachers.length}</h3>
            <p>Total Teachers</p>
          </div>
        </div>

        <div className="stat-card green">
          <Trophy size={26} />
          <div>
            <h3>${avgSalary}</h3>
            <p>Average Salary</p>
          </div>
        </div>

        <div className="stat-card purple">
          <CalendarDays size={26} />
          <div>
            <h3>{avgExperience} yrs</h3>
            <p>Avg Experience</p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-section">
        <div className="table-header">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="teacher-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Department</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>${t.salary}</td>
                <td>{t.experience} yrs</td>
                <td>{t.department}</td>
                <td>{t.subject}</td>
                <td className="actions">
                  <button className="icon-btn edit" onClick={() => handleEdit(t)}>
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(t.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">
                <X size={18} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmitTeacher}>
              <input
                type="text"
                placeholder="Full Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Salary"
                value={newTeacher.salary}
                onChange={(e) => setNewTeacher({ ...newTeacher, salary: e.target.value })}
              />
              <input
                type="number"
                placeholder="Experience (yrs)"
                value={newTeacher.experience}
                onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
              />
              <input
                type="text"
                placeholder="Department"
                value={newTeacher.department}
                onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
              />
              <input
                type="text"
                placeholder="Subject"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
              />
              <button type="submit" className="btn-primary full">{editingTeacher ? "Save Changes" : "Add Teacher"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPage;
