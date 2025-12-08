import React, { useState, useEffect } from "react";
import useAuthuser from "../../../src/hook/hookuser";
import Api from "../../../src/Api";
import "./info.css";

export default function StudentInfo() {
  const { user } = useAuthuser();

  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        setLoading(true);

        // 1) Charger l’étudiant du user connecté
        const res = await Api.get(`/etudiants`);
        const found = res.data.find((s) => Number(s.user_id) === Number(user.id));

        if (!found) {
          setStudent(null);
          setGrades([]);
          return;
        }

        setStudent(found);

        // 2) Charger les notes
        const resGrades = await Api.get(`/grades`);

        // 3) Filtrer uniquement les notes de CET étudiant
        const filtered = resGrades.data.filter(
          (g) => Number(g.student_id) === Number(found.id)
        );

        setGrades(filtered);

      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const getInitial = () => {
    if (!student) return "?";
    return student.Nom ? student.Nom[0].toUpperCase() : "?";
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-dot" />
        <div className="loader-dot" />
        <div className="loader-dot" />
      </div>
    );
  }

  if (!student) {
    return <h3>Aucun étudiant trouvé pour ce compte.</h3>;
  }

  return (
    <div className="student-container">
      <div className="student-header">
        <div className="student-icon">
          {getInitial()}
          <div className="icon-pulse" />
        </div>

        <div>
          <h2 className="student-name">
            {student.Nom} {student.Prenom}
          </h2>
          <p className="student-id">ID: {student.id}</p>
        </div>
      </div>

      <div className="student-info">
        <p><span>Email :</span> {student.Email}</p>
        <p><span>Classe :</span> {student.Class}</p>
        <p><span>GPA :</span> {student.GPA}</p>
        <p><span>Date inscription :</span> {student.created_at}</p>
      </div>

      <h3 className="notes-title">Notes des Matières</h3>

      {grades.length === 0 ? (
        <p>Aucune note disponible.</p>
      ) : (
        <table className="notes-table">
          <thead>
            <tr>
              <th>Matière</th>
              <th>Professeur</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.id}>
                <td>{g.subject}</td>
                <td>{g.teacher}</td>
                <td className={g.grade < 10 ? "bad-grade" : "good-grade"}>
                  {g.grade}/20
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
