import React, { useState, useEffect } from 'react';
import useAuthuser from '../../../src/hook/hookuser';
import Api from '../../../src/Api';
import "./info.css";

export default function StudentInfo() {
  const { user } = useAuthuser();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);

  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return setLoading(false);
      try {
        const resStudent = await Api.get(`/etudiants`);
        setStudent(resStudent.data .find((s) => s.user_id  === user.id));
              
        const resGrades = await Api.get(`/grades?student_id=${student.id}`);
        setGrades(resGrades.data);
          setLoading(false)


      } catch (err) {
        console.error(err);
       
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user, student]);



  if (!student) {
    return   <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>;
  }

  const getInitial = () => {
    if (student.Nom) return student.Nom[0].toUpperCase();
    if (student.Prenom) return student.Prenom[0].toUpperCase();
    return "?";
  };

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
    <div className="student-container">
      

      <div className="student-header">
        <div className="student-icon">{getInitial()}<div className="icon-pulse"></div></div>
        <div>
          <h2 className="student-name">{student.Nom} {student.Prenom}</h2>
          <p className="student-id">ID : {student.id}</p>
        </div>
      </div>

      <div className="student-info">
        <p><span>Email :</span> {student.Email}</p>
        <p><span>Classe :</span> {student.Class}</p>
        <p><span>GPA  :</span> {student.GPA}</p>
        <p><span>Date d'inscription :</span> {student.created_at}</p>
      </div>

      {grades?.length > 0 && (
        <>
          <h3 className="notes-title">Notes des Matières</h3>
          <table className="notes-table">
            <thead>
              <tr>
                <th>Matière</th>
                <th>Professeur</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{grade.subject}</td>
                  <td>{grade.teacher}</td>
                  <td className={grade.grade < 10 ? "bad-grade" : "good-grade"}>
                    {grade.grade}/20
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
