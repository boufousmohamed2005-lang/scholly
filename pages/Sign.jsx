import React, { useState } from "react";
import "./sign.css";
import { Link ,useNavigate} from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../src/Api";
import useAuth from "../src/hook/Usehook";

export default function Signup() {
  const [role, setRole] = useState("directeur");
  const { setUser } = useAuth();
const nav = useNavigate();
  // GLOBAL FORM
  const [globalForm, setGlobalForm] = useState({
    name: "",
    prenom: "", // ajouté pour etudiant et directeur
    email: "",
    password: "",
  });

  // Specific forms
  const [studentForm, setStudentForm] = useState({ Class: "" });
  const [profForm, setProfForm] = useState({ Departement: "", Subject: "",});
  const [directeurForm, setDirecteurForm] = useState({ Telephone: "", Bureau: "", CartePro: "" });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (section) => (e) => {
    const { name, value } = e.target;

    if (section === "global") setGlobalForm({ ...globalForm, [name]: value });
    if (section === "etudiant") setStudentForm({ ...studentForm, [name]: value });
    if (section === "professeur") setProfForm({ ...profForm, [name]: value });
    if (section === "directeur") setDirecteurForm({ ...directeurForm, [name]: value });

    if (errors[name]) {
      const copy = { ...errors };
      delete copy[name];
      setErrors(copy);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!globalForm.name) newErrors.name = "Le nom est requis";
    if ((role === "etudiant" || role === "directeur") && !globalForm.prenom) newErrors.prenom = "Le prénom est requis";
    if (!globalForm.email) newErrors.email = "Email requis";
    if (!globalForm.password || globalForm.password.length < 6)
      newErrors.password = "Mot de passe min 6 caractères";

    if (role === "etudiant" && !studentForm.Class) newErrors.Class = "Classe requise";
    if (role === "professeur") {
      
      if (!profForm.Departement) newErrors.Departement = "Département requis";
      if (!profForm.Subject) newErrors.Subject = "Matière requise";
    }
    if (role === "directeur") {
      if (!directeurForm.Telephone) newErrors.Telephone = "Téléphone requis";
      if (!directeurForm.Bureau) newErrors.Bureau = "Bureau requis";
      if (!directeurForm.CartePro) newErrors.CartePro = "Carte professionnelle requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      role: role,
      name: globalForm.name,
      prenom: globalForm.prenom, // pour directeur et etudiant
      email: globalForm.email,
      password: globalForm.password,
    };

    if (role === "etudiant") {
      Object.assign(payload, {
        Nom: globalForm.name,
        Prenom: globalForm.prenom,
        Email: globalForm.email,
        Class: studentForm.Class,
      });
    }

    if (role === "professeur") {
      Object.assign(payload, {
        Name: globalForm.name,
        Email: globalForm.email,
        
        Department: profForm.Departement,
        Subject: profForm.Subject,
      });
    }

    if (role === "directeur") {
      Object.assign(payload, {
        Nom: globalForm.name,
        Prenom: globalForm.prenom,
        Telephone: directeurForm.Telephone,
        Bureau: directeurForm.Bureau,
        CartePro: directeurForm.CartePro,
      });
    }

    try {
      const res = await api.post("/signup", payload);
      sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.user?.role || role); 
      setUser(res.data.user);
      alert("Compte créé avec succès !");
      nav("/dashboard");
    } catch (err) {
      if (err.response) {
        console.log("Erreur :", err.response.data);
        alert(JSON.stringify(err.response.data, null, 2));
      } else {
        alert("Erreur réseau");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <Link to="/" className="back-link">← Retour</Link>

        <div className="create-account-form">
          <div className="card-header-sin">
            <div className="logo-box"><GraduationCap size={40} /></div>
            <h2>Créer votre compte</h2>
          </div>

          <div className="role-selector">
            {["directeur", "professeur", "etudiant"].map(r => (
              <button key={r} className={role === r ? "active" : ""} onClick={() => { setRole(r); setErrors({}); }}>
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <InputField label="Nom" name="name" value={globalForm.name} onChange={handleChange("global")} error={errors.name} />

            {(role === "etudiant" || role === "directeur") && (
              <InputField label="Prénom" name="prenom" value={globalForm.prenom} onChange={handleChange("global")} error={errors.prenom} />
            )}

            <InputField label="Email" name="email" type="email" value={globalForm.email} onChange={handleChange("global")} error={errors.email} />
            <InputField label="Mot de passe" name="password" type="password" value={globalForm.password} onChange={handleChange("global")} error={errors.password} />

            {role === "etudiant" && (
              <InputField label="Class" name="Class" value={studentForm.Class} onChange={handleChange("etudiant")} error={errors.Class} />
            )}

            {role === "professeur" && (
              <>
               <InputField label="Département" name="Departement" value={profForm.Departement} onChange={handleChange("professeur")} error={errors.Departement} />
                <InputField label="Matière" name="Subject" value={profForm.Subject} onChange={handleChange("professeur")} error={errors.Subject} />
              </>
            )}

            {role === "directeur" && (
              <>
                <InputField label="Téléphone" name="Telephone" value={directeurForm.Telephone} onChange={handleChange("directeur")} error={errors.Telephone} />
                <InputField label="Bureau" name="Bureau" value={directeurForm.Bureau} onChange={handleChange("directeur")} error={errors.Bureau} />
                <InputField label="Carte Professionnelle" name="CartePro" value={directeurForm.CartePro} onChange={handleChange("directeur")} error={errors.CartePro} />
              </>
            )}

            <button disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer mon compte"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className={error ? "input-error" : ""} />
    {error && <span className="error-text">{error}</span>}
  </div>
);
