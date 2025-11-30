import "./info.css";

export default function StudentInfo({ student }) {
  if (!student) {
    return (
      <div className="student-empty">
        ⚠️ Aucune information disponible.
      </div>
    );
  }

  const getInitial = () => {
    if (student.firstname) return student.firstname[0].toUpperCase();
    if (student.lastname) return student.lastname[0].toUpperCase();
    return "?";
  };

  return (
    <div className="student-container">

      <div className="student-header">
        <div className="student-icon">
          {getInitial()}
          <div className="icon-pulse"></div>
        </div>

        <div>
          <h2 className="student-name">{student.firstname} {student.lastname}</h2>
          <p className="student-id">ID : {student.studentId}</p>
        </div>
      </div>

      <div className="student-info">
        <p><span>Email :</span> {student.email}</p>
        <p><span>Filière :</span> {student.major}</p>
        <p><span>Niveau :</span> {student.level}</p>
        <p><span>Date d'inscription :</span> {student.enrollDate}</p>
      </div>

      <h3 className="notes-title">Notes des Matières</h3>

      <table className="notes-table">
        <thead>
          <tr>
            <th>Matière</th>
            <th>Coeff</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {student.grades?.map((g, i) => (
            <tr key={i}>
              <td>{g.subject}</td>
              <td>{g.coeff}</td>
              <td className={g.grade < 10 ? "bad-grade" : "good-grade"}>
                {g.grade}/20
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
