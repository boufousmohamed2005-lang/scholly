import React, { useState, useEffect } from "react";
import useAuth from "../../../src/hook/Usehook";
import Api from "../../../src/Api";
import { Pencil, X } from "lucide-react";
import "./infoprof.css";

export default function ProfProfile() {
  const { user, loading: authLoading} = useAuth();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [teacherForm, setTeacherForm] = useState({});

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!user) return setLoading(false);

      try {
        const res = await Api.get(`/professeurs?user_id=${user.id}`);

        if (res.data.length > 0) {
          setTeacher(res.data[0]);
          setTeacherForm(res.data[0]);
        } else {
          setTeacher(null);
        }
      } catch (err) {
        console.error("Erreur chargement profil :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        Name: teacherForm.Name,
        Email: teacherForm.Email,
        Salary: Number(teacherForm.Salary),
        Experience: Number(teacherForm.Experience),
        Department: teacherForm.Department,
        Subject: teacherForm.Subject,
        user_id: user.id,
      };

      const res = await Api.put(`/professeurs/${teacher.id}`, payload);

      setTeacher(res.data);
      setTeacherForm(res.data);

      setShowModal(false);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error("Erreur mise à jour :", err);
      alert("Impossible de sauvegarder le profil.");
    }
  };

  // ---------- LOADER ----------
 

  if (!teacher) return  <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>;
 if (authLoading || loading)
    return (
        <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    );
  return (
    <div className="prof-profile">
      <h2 className="title"> Profil </h2>

      <div className="profile-card">
        <div className="avatar-prof">
          {teacher.Name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <p><span>Nom:</span> {teacher.Name}</p>
          <p><span>Email:</span> {teacher.Email}</p>
          <p><span>Salaire:</span> {teacher.Salary} DH</p>
          <p><span>Expérience:</span> {teacher.Experience} ans</p>
          <p><span>Département:</span> {teacher.Department}</p>
          <p><span>Matière:</span> {teacher.Subject}</p>
        </div>

       
      </div>

      {/* --------------------- MODAL --------------------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Modifier mon profil</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleUpdate}>
              <input type="text" value={teacherForm.Name}
                onChange={(e) => setTeacherForm({ ...teacherForm, Name: e.target.value })}
                placeholder="Nom" required />

              <input type="email" value={teacherForm.Email}
                onChange={(e) => setTeacherForm({ ...teacherForm, Email: e.target.value })}
                placeholder="Email" required />

              <input type="number" value={teacherForm.Salary}
                onChange={(e) => setTeacherForm({ ...teacherForm, Salary: e.target.value })}
                placeholder="Salaire" />

              <input type="number" value={teacherForm.Experience}
                onChange={(e) => setTeacherForm({ ...teacherForm, Experience: e.target.value })}
                placeholder="Expérience" />

              <input type="text" value={teacherForm.Department}
                onChange={(e) => setTeacherForm({ ...teacherForm, Department: e.target.value })}
                placeholder="Département" />

              <input type="text" value={teacherForm.Subject}
                onChange={(e) => setTeacherForm({ ...teacherForm, Subject: e.target.value })}
                placeholder="Matière enseignée" />

              <button className="btn-save" type="submit">Sauvegarder</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
