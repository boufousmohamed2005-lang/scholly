import React, { useState, useEffect } from "react";
import {
  Trophy,
  CalendarDays,
  Pencil,
  Trash2,
  Plus,
  Search,
  X,
  User2
} from "lucide-react";
import api from "../../src/Api";
import "./teachers.css";

const TeacherPage = ({ darkMode, role, setTeachers }) => {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeacherss] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    salary: "",
    experience: "",
    department: "",
    subject: ""
  });

  // -------------------------------
  // API Load
  // -------------------------------
  useEffect(() => {
    api
      .get("/professeurs")
      .then((response) => {
        setTeacherss(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  setTeachers(teachers);

  // -------------------------------
  // Update filtered list on data load
  // -------------------------------
  useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);

  // -------------------------------
  // Dark mode toggle
  // -------------------------------
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  // -------------------------------
  // SEARCH FILTER
  // -------------------------------
  useEffect(() => {
    const result = teachers.filter((t) =>
      t.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(result);
    setCurrentPage(1); // reset page when searching
  }, [searchTerm, teachers]);

  // -------------------------------
  // DELETE
  // -------------------------------
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await api.delete(`/professeurs/${id}`);
        setTeacherss(teachers.filter((t) => t.id !== id));
      } catch (err) {
        alert("Impossible de supprimer ! " + err.message);
      }
    }
  };

  // -------------------------------
  // ADD / EDIT
  // -------------------------------
  const handleSubmitTeacher = async (e) => {
    e.preventDefault();

    const body = {
      Name: newTeacher.name,
      Email: newTeacher.email,
      Salary: parseFloat(newTeacher.salary),
      Experience: parseInt(newTeacher.experience),
      Department: newTeacher.department,
      Subject: newTeacher.subject
    };

    if (editingTeacher) {
      // UPDATE
      await api.put(`/professeurs/${editingTeacher.id}`, body);

      setTeacherss(
        teachers.map((t) =>
          t.id === editingTeacher.id ? { ...t, ...body } : t
        )
      );
    } else {
      // ADD NEW
      const response = await api.post("/professeurs", body);
      setTeacherss([...teachers, response.data]);
    }

    // Reset
    setNewTeacher({
      name: "",
      email: "",
      salary: "",
      experience: "",
      department: "",
      subject: ""
    });

    setShowModal(false);
  };

  // -------------------------------
  // EDIT LOAD
  // -------------------------------
  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);

    setNewTeacher({
      name: teacher.Name,
      email: teacher.Email,
      salary: teacher.Salary,
      experience: teacher.Experience,
      department: teacher.Department,
      subject: teacher.Subject
    });

    setShowModal(true);
  };

  // -------------------------------
  // Pagination logic
  // -------------------------------
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTeachers = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // -------------------------------
  // STATS
  // -------------------------------
  const avgSalary =
    teachers.length > 0
      ? (teachers.reduce((a, t) => a + t.Salary, 0) / teachers.length).toFixed(0)
      : 0;

  const avgExperience =
    teachers.length > 0
      ? (teachers.reduce((a, t) => a + t.Experience, 0) / teachers.length).toFixed(1)
      : 0;

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className={`teacher-page ${loading ? "loading-active" : ""}`}>
      {loading && (
        <div className="loader-container">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      )}

      {/* HEADER */}
      {role !== "student" && (
        <div className="header">
          <div>
            <h1>Teacher Management</h1>
            <p>Manage teacher records, salary, and experience</p>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setShowModal(true);
              setEditingTeacher(null);
            }}
          >
            <Plus size={18} /> Add Teacher
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <User2 size={26} />
          <div>
            <h3>{teachers.length}</h3>
            <p>Total Teachers</p>
          </div>
        </div>

        {role !== "student" && (
          <>
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
          </>
        )}
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
              {role !== "student" && <th>Salary</th>}
              {role !== "student" && <th>Experience</th>}
              <th>Department</th>
              <th>Subject</th>
              {role !== "student" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {currentTeachers.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.Name}</td>
                <td>{t.Email}</td>

                {role !== "student" && <td>{t.Salary} DH</td>}
                {role !== "student" && <td>{t.Experience} yrs</td>}

                <td>{t.Department}</td>
                <td>{t.Subject}</td>

                {role !== "student" && (
                  <td className="actions">
                    <button className="icon-btn edit" onClick={() => handleEdit(t)}>
                      <Pencil size={16} />
                    </button>

                    <button className="icon-btn delete" onClick={() => handleDelete(t.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h3>
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
                placeholder="Experience"
                value={newTeacher.experience}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, experience: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Department"
                value={newTeacher.department}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, department: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Subject"
                value={newTeacher.subject}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, subject: e.target.value })
                }
              />

              <button type="submit" className="btn-primary full">
                {editingTeacher ? "Save Changes" : "Add Teacher"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPage;
