import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Trophy,
  CalendarDays,
  Star,
} from "lucide-react";
import "./studentsClassmet.css";

const getAvatar = (name) => {
  const letter = name.charAt(0).toUpperCase();
  const colors = ["#ff6b6b", "#6b8cff", "#3ddc97", "#f7b32b", "#be4bdb"];
  const bg = colors[Math.floor(Math.random() * colors.length)];
  return { letter, bg };
};

const ClassMatesTable = ({ className, students,darkMode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
 

  const perPage = 5;

  //       STATISTICS

  //       SEARCH

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      `${s.nom} ${s.prenom} ${s.email} ${s.id}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }, [students, searchValue]);

 
  //       PAGINATION

  const totalPages = Math.ceil(filteredStudents.length / perPage);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className={darkMode ? "dark-mode-container" : "light-mode-container"}>
     

      <div className="glass-card wide">
        {/* HEADER */}
        <div className="glass-header">
          <Users size={26} />
          <h2>Classe : {className}</h2>
        </div>

        {/* STAT CARDS */}
        <div className="stats-grid">
          <div className="stat-card-etu blue">
            <GraduationCap  color="white"  size={30} />
            <div>
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>
          </div>

         


          
</div>
        {/* SEARCH */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => {
                  const avatar = getAvatar(student.nom);
                  return (
                    <tr key={student.id}>
                      <td>
                        <div
                          className="avatar small"
                          style={{ background: avatar.bg }}
                        >
                          {avatar.letter}
                        </div>
                      </td>
                      <td>{student.id}</td>
                      <td>
                        {student.nom} {student.prenom}
                      </td>
                      <td>{student.email}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="empty">
                    Aucun résultat trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="page-btn"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="page-info">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="page-btn"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>

  );
};

export default ClassMatesTable;
