import React, { useState, useEffect, useMemo } from "react";
import Api from "../../src/Api";
import {
  GraduationCap,
  Trophy,
  CalendarDays,
  Star,
  Pencil,
  User2,
  Trash2,
  Plus,
  Search,
  X,
} from "lucide-react";

import "./students.css";

const INITIAL_STUDENT = {
  Nom: "",
  Prenom: "",
  Email: "",
  Class: "",
  GPA: "",
  Attendance: "",
};

const INITIAL_GRADE = {
  id: null,
  student_id: null,
  subject: "",
  teacher: "",
  grade: "",
};

const ITEMS_PER_PAGE = 5;

const StudentPage = ({ setetu }) => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentLoading, setStudentLoading] = useState(false);
  const [gradeLoading, setGradeLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState(INITIAL_STUDENT);

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(INITIAL_GRADE);

  const [popoverVisible, setPopoverVisible] = useState(null);
  const togglePopover = (studentId) => {
    setPopoverVisible((prev) => (prev === studentId ? null : studentId));
  };

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const loadData = async () => {
      try {
        const [resStudents, resGrades] = await Promise.all([
          Api.get("/etudiants"),
          Api.get("/grades"),
        ]);
        setStudents(resStudents.data);
        setetu(resStudents.data);
        setGrades(resGrades.data);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setetu]);

  // ---------------- SEARCH FILTER ----------------
  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      `${s.Nom ?? ""} ${s.Prenom ?? ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredStudents.slice(start, end);
  }, [filteredStudents, currentPage]);

  // ---------------- DELETE STUDENT ----------------
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await Api.delete(`/etudiants/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setGrades((prev) => prev.filter((g) => g.student_id !== id));
    } catch (error) {
      alert("Error deleting student: " + error.message);
    }
  };

  // ---------------- ADD / EDIT STUDENT ----------------
  

  const handleStudentSubmit = async (e) => {
  e.preventDefault();

  // Vérification des champs obligatoires
  if (!studentForm.Nom || !studentForm.Prenom || !studentForm.Email) {
    return alert("Remplissez tous les champs obligatoires !");
  }

  if (isNaN(studentForm.GPA) || isNaN(studentForm.Attendance)) {
    return alert("Les champs GPA et Attendance doivent être des nombres !");
  }

  // Vérification de l'unicité de l'email
  if (!editingStudent) {
    // Ajout
    const emailExists = students.some(
      (s) => s.Email.toLowerCase() === studentForm.Email.toLowerCase()
    );
    if (emailExists) {
      return alert("Cet email est déjà utilisé par un autre étudiant !");
    }
  } else {
    // Modification
    const emailExists = students.some(
      (s) =>
        s.Email.toLowerCase() === studentForm.Email.toLowerCase() &&
        s.id !== editingStudent.id
    );
    if (emailExists) {
      return alert("Cet email est déjà utilisé par un autre étudiant !");
    }
  }

  // Préparer le payload
  const payload = {
    Nom: studentForm.Nom,
    Prenom: studentForm.Prenom,
    Email: studentForm.Email,
    Class: studentForm.Class,
    GPA: Number(studentForm.GPA),
    Attendance: Number(studentForm.Attendance),
  };

  console.table(payload); // Vérifier le payload dans la console

  setStudentLoading(true);

  try {
    let responseData;

    if (editingStudent) {
      console.log("Mise à jour de l'étudiant ID :", editingStudent.id);
      const res = await Api.put(`/etudiants/${editingStudent.id}`, payload);
      responseData = res.data;
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? responseData : s))
      );
      alert("Étudiant mis à jour avec succès !");
    } else {
      console.log("Ajout d'un nouvel étudiant");
      const res = await Api.post("/etudiants", payload);
      responseData = res.data;
      setStudents((prev) => [...prev, responseData]);
      alert("Étudiant ajouté avec succès !");
    }

    console.log("Réponse API :", responseData);

    // Reset modal
    setShowStudentModal(false);
    setEditingStudent(null);
    setStudentForm(INITIAL_STUDENT);

  } catch (err) {
    console.error("Erreur lors de la sauvegarde de l'étudiant :", err);

    // Afficher message précis de l'API si disponible
    if (err.response && err.response.data) {
      console.error("Détails de l'erreur API :", err.response.data);
      alert("Erreur API : " + JSON.stringify(err.response.data));
    } else {
      alert("Erreur : " + err.message);
    }

  } finally {
    setStudentLoading(false);
  }
};




  const openEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({ ...student });
    setShowStudentModal(true);
  };

  // ---------------- ADD / EDIT GRADE ----------------
  const openEditGrade = (g) => {
    setCurrentGrade(g);
    setShowGradeModal(true);
  };

  const openAddGrade = (studentId) => {
    setCurrentGrade({ ...INITIAL_GRADE, student_id: studentId });
    setShowGradeModal(true);
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    if (!currentGrade.subject || !currentGrade.teacher || currentGrade.grade === "") {
      return alert("Remplissez tous les champs du grade !");
    }

    const payload = {
      student_id: currentGrade.student_id,
      subject: currentGrade.subject.trim(),
      teacher: currentGrade.teacher.trim(),
      grade: Number(currentGrade.grade),
    };

    const exists = grades.some(
      (g) =>
        g.student_id === payload.student_id &&
        g.teacher.toLowerCase() === payload.teacher.toLowerCase() &&
        g.id !== currentGrade.id
    );
    if (exists) {
      alert("Ce professeur a déjà ajouté une note pour cet étudiant !");
      return;
    }

    setGradeLoading(true);
    try {
      if (currentGrade.id) {
        const { data } = await Api.put(`/grades/${currentGrade.id}`, payload);
        setGrades((prev) =>
          prev.map((g) => (g.id === currentGrade.id ? data : g))
        );
        alert("Grade mis à jour avec succès !");
      } else {
        const { data } = await Api.post("/grades", payload);
        setGrades((prev) => [...prev, data]);
        alert("Grade ajouté avec succès !");
      }
      setShowGradeModal(false);
      setCurrentGrade(INITIAL_GRADE);
    } catch (error) {
      console.error("Grade payload:", payload);
      alert("Erreur lors de la sauvegarde du grade.",error);
    } finally {
      setGradeLoading(false);
    }
  };

  const handleDeleteGrade = async (id) => {
    if (!window.confirm("Delete this grade?")) return;
    try {
      await Api.delete(`/grades/${id}`);
      setGrades((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert("Error deleting grade: " + err.message);
    }
  };

  // ---------------- STATS ----------------
  const avgGPA = useMemo(() => {
    return students.length
      ? (students.reduce((a, s) => a + s.GPA, 0) / students.length).toFixed(2)
      : 0;
  }, [students]);

  const avgAttendance = useMemo(() => {
    return students.length
      ? (students.reduce((a, s) => a + s.Attendance, 0) / students.length).toFixed(0)
      : 0;
  }, [students]);

  // ---------------- RENDER ----------------
  return (
    <div className={`student-page-wrapper ${loading ? "loading-active" : ""}`}>
      {loading && (
        <div className="loader-container">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      )}

      <div className="student-page">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Student Management</h1>
            <p>Manage student records, grades, and attendance</p>
          </div>
          <button className="btn-primary" onClick={() => setShowStudentModal(true)}>
            <Plus size={18} /> Add Student
          </button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card-etu blue">
            <GraduationCap size={26} color="white" />
            <div>
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card-etu green">
            <Trophy size={26} color="white" />
            <div>
              <h3>{avgGPA}</h3>
              <p>Average GPA</p>
            </div>
          </div>
          <div className="stat-card-etu purple">
            <CalendarDays size={26} color="white" />
            <div>
              <h3>{avgAttendance}%</h3>
              <p>Avg Attendance</p>
            </div>
          </div>
          <div className="stat-card-etu orange">
            <Star size={26} color="white" />
            <div>
              <h3>{students.filter((s) => s.GPA >= 3).length}</h3>
              <p>Honor Students</p>
            </div>
          </div>
        </div>

        {/* SEARCH + TABLE */}
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>GPA</th>
                <th>Attendance</th>
                <th>Actions</th>
                <th>Grades</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.Nom} {s.Prenom}</td>
                  <td>{s.Email}</td>
                  <td>{s.Class}</td>
                  <td><span className="badge green">{s.GPA}</span></td>
                  <td><span className={`badge ${s.Attendance >= 90 ? "green" : "yellow"}`}>{s.Attendance}%</span></td>
                  <td className="actions">
                    <button className="icon-btn edit" onClick={() => openEditStudent(s)}>
                      <Pencil size={16} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDeleteStudent(s.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                  <td>
                    <div className="grade-popover-wrapper">
                      <button className="icon-btn grade" onClick={() => togglePopover(s.id)}>
                        <Star size={16} /> Grades
                      </button>
                      {popoverVisible === s.id && (
                        <div className="grades-popover">
                          <div className="grades-header">
                            <strong>Grades</strong>
                            <button className="close-popover" onClick={() => setPopoverVisible(null)}>
                              <X size={14} />
                            </button>
                          </div>
                          <div className="grades-list">
                            {grades.filter((g) => g.student_id === s.id).map((g) => (
                              <div key={g.id} className="grade-item">
                                <span className="grade-subject">{g.subject}</span>
                                <span className="grade-value">{g.grade}/20</span>
                                <span className="grade-teacher"><User2 size={12} /> {g.teacher}</span>
                                <div className="grade-actions">
                                  <button onClick={() => openEditGrade(g)}><Pencil size={14} /></button>
                                  <button onClick={() => handleDeleteGrade(g.id)}><Trash2 size={14} /></button>
                                </div>
                              </div>
                            ))}
                            {grades.filter((g) => g.student_id === s.id).length === 0 && (
                              <div className="no-grade">Aucune note</div>
                            )}
                          </div>
                          <button className="btn-add-grade" onClick={() => openAddGrade(s.id)}>
                            <Plus size={12} /> Add Grade
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="btn-page"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-indicator">Page {currentPage} / {totalPages}</span>
            <button
              className="btn-page"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* STUDENT MODAL */}
        {showStudentModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{editingStudent ? "Edit Student" : "Add Student"}</h3>
                <button onClick={() => setShowStudentModal(false)} className="close-btn">
                  <X size={18} />
                </button>
              </div>
              <form className="modal-form" onSubmit={handleStudentSubmit}>
                <input type="text" placeholder="First Name" value={studentForm.Nom} required
                  onChange={(e) => setStudentForm({ ...studentForm, Nom: e.target.value })} />
                <input type="text" placeholder="Last Name" value={studentForm.Prenom} required
                  onChange={(e) => setStudentForm({ ...studentForm, Prenom: e.target.value })} />
                <input type="email" placeholder="Email" value={studentForm.Email} required
                  onChange={(e) => setStudentForm({ ...studentForm, Email: e.target.value })} />
                <input type="text" placeholder="Class" value={studentForm.Class}
                  onChange={(e) => setStudentForm({ ...studentForm, Class: e.target.value })} />
                <input type="number" step="0.01" placeholder="GPA" value={studentForm.GPA}
                  onChange={(e) => setStudentForm({ ...studentForm, GPA: e.target.value })} />
                <input type="number" placeholder="Attendance (%)" value={studentForm.Attendance}
                  onChange={(e) => setStudentForm({ ...studentForm, Attendance: e.target.value })} />
                <button type="submit" className="btn-primary full" disabled={studentLoading}>
                  {studentLoading ? "Saving..." : editingStudent ? "Update Student" : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* GRADE MODAL */}
        {showGradeModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{currentGrade.id ? "Edit Grade" : "Add Grade"}</h3>
                <button onClick={() => setShowGradeModal(false)} className="close-btn">
                  <X size={18} />
                </button>
              </div>
              <form className="modal-form" onSubmit={handleGradeSubmit}>
                <input type="text" placeholder="Subject" value={currentGrade.subject} required
                  onChange={(e) => setCurrentGrade({ ...currentGrade, subject: e.target.value })} />
                <input type="text" placeholder="Teacher" value={currentGrade.teacher} required
                  onChange={(e) => setCurrentGrade({ ...currentGrade, teacher: e.target.value })} />
                <input type="number" placeholder="Grade" value={currentGrade.grade} required
                  onChange={(e) => setCurrentGrade({ ...currentGrade, grade: e.target.value })} />
                <button type="submit" className="btn-primary full" disabled={gradeLoading}>
                  {gradeLoading ? "Saving..." : currentGrade.id ? "Update Grade" : "Save Grade"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
