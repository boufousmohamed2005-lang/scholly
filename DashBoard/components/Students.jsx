import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Trophy,
  CalendarDays,
  Star,
  Pencil,
  Trash2,
  Plus,
  Search,
  X,
} from "lucide-react";
import "./students.css";

const StudentPage = ({setetu}) => {
  // -------------------------------
  // 🔹 État des étudiants
  // -------------------------------
  const [students, setStudents] = useState([
    { id: "STU001", name: "Alice Johnson", email: "alice.johnson@student.edu", grade: 12, class: "A", gpa: 3.8, attendance: 95 },
    { id: "STU002", name: "Bob Wilson", email: "bob.wilson@student.edu", grade: 11, class: "B", gpa: 3.6, attendance: 88 },
    { id: "STU003", name: "Carol Davis", email: "carol.davis@student.edu", grade: 10, class: "A", gpa: 3.9, attendance: 97 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  // -------------------------------
  // 🔹 Modal & Formulaire
  // -------------------------------
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null); // Pour l'édition
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    grade: "",
    class: "",
    gpa: "",
    attendance: "",
  });


  setetu(students.length);
  // -------------------------------
  // 🔹 Recherche automatique
  // -------------------------------
  useEffect(() => {
    const result = students.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(result);
  }, [searchTerm, students]);

  // -------------------------------
  // 🔹 Supprimer un étudiant
  // -------------------------------
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // -------------------------------
  // 🔹 Ajouter un étudiant
  // -------------------------------
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (currentStudent) {
      // 🔹 Mode édition
      setStudents((prev) =>
        prev.map((s) => (s.id === currentStudent.id ? { ...formData, gpa: parseFloat(formData.gpa), attendance: parseInt(formData.attendance) } : s))
      );
    } else {
      // 🔹 Mode ajout
      const id = "STU" + String(students.length + 1).padStart(3, "0");
      const student = { ...formData, id, gpa: parseFloat(formData.gpa), attendance: parseInt(formData.attendance) };
      setStudents([...students, student]);
    }

    setFormData({ id: "", name: "", email: "", grade: "", class: "", gpa: "", attendance: "" });
    setCurrentStudent(null);
    setShowModal(false);
  };

  // -------------------------------
  // 🔹 Éditer un étudiant
  // -------------------------------
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      grade: student.grade,
      class: student.class,
      gpa: student.gpa,
      attendance: student.attendance,
    });
    setShowModal(true);
  };

  // -------------------------------
  // 🔹 Statistiques
  // -------------------------------
  const avgGPA = (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(1);
  const avgAttendance = (
    students.reduce((a, s) => a + s.attendance, 0) / students.length
  ).toFixed(0);

  // -------------------------------
  // 🔹 Rendu principal
  // -------------------------------
  return (
    <div className="student-page">
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Student Management</h1>
          <p>Manage student records, grades, and attendance</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card-etu blue">
          <GraduationCap size={26} />
          <div>
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card-etu green">
          <Trophy size={26} />
          <div>
            <h3>{avgGPA}</h3>
            <p>Average GPA</p>
          </div>
        </div>

        <div className="stat-card-etu purple">
          <CalendarDays size={26} />
          <div>
            <h3>{avgAttendance}%</h3>
            <p>Avg Attendance</p>
          </div>
        </div>

        <div className="stat-card-etu orange">
          <Star size={26} />
          <div>
            <h3>{students.filter((s) => s.gpa >= 3.7).length}</h3>
            <p>Honor Students</p>
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Class</th>
              <th>GPA</th>
              <th>Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.grade}</td>
                <td>{s.class}</td>
                <td>
                  <span className="badge green">{s.gpa}</span>
                </td>
                <td>
                  <span className={`badge ${s.attendance >= 90 ? "green" : "yellow"}`}>
                    {s.attendance}%
                  </span>
                </td>
                <td className="actions">
                  <button className="icon-btn edit" onClick={() => handleEdit(s)}>
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL AJOUT / ÉDITION */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{currentStudent ? "Edit Student" : "Add New Student"}</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">
                <X size={18} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleAddStudent}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
              <input
                type="text"
                placeholder="Class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              />
              <input
                type="number"
                step="0.1"
                placeholder="GPA"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              />
              <input
                type="number"
                placeholder="Attendance (%)"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
              />
              <button type="submit" className="btn-primary full">
                {currentStudent ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
