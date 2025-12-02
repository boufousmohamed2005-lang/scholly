import React, { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Signup() {
  const [role, setRole] = useState("directeur");

  // form sections
  const [globalForm, setGlobalForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [studentForm, setstudentForm] = useState({
    classe: "",
    Departement: "",
  });

  const [profForm, setProfForm] = useState({
    telephone: "",
    Departement: "",
    matiere: "",
  });

  const [directeurForm, setDirecteurForm] = useState({
    telephone: "",
    bureau: "",
    Departement: "",
    cartePro: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => password.length >= 8;

  const updateField = (section, name, value) => {
    if (section === "global") setGlobalForm((s) => ({ ...s, [name]: value }));
    else if (section === "student") setstudentForm((s) => ({ ...s, [name]: value }));
    else if (section === "professor") setProfForm((s) => ({ ...s, [name]: value }));
    else if (section === "directeur") setDirecteurForm((s) => ({ ...s, [name]: value }));
  };

  const handleChange = (section) => (e) => {
    const { name, value } = e.target;
    updateField(section, name, value);
    if (errors[name]) setErrors((p) => { const c = { ...p }; delete c[name]; return c; });
  };

  const handleBlur = () => (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (!value || (typeof value === "string" && !value.trim())) newErrors[name] = `Le champ ${name} est requis`;
    else if (name === "email" && !validateEmail(value)) newErrors.email = "Email invalide";
    else if (name === "password" && !validatePassword(value)) newErrors.password = "Le mot de passe doit avoir au moins 8 caractères";
    else if (name === "confirmPassword" && value !== globalForm.password) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    else delete newErrors[name];
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!globalForm.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!globalForm.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!globalForm.email.trim()) newErrors.email = "L'email est requis";
    else if (!validateEmail(globalForm.email)) newErrors.email = "Email invalide";
    if (!globalForm.age || globalForm.age < 13) newErrors.age = "L'âge doit être au moins 13 ans";
    if (!globalForm.password) newErrors.password = "Le mot de passe est requis";
    else if (!validatePassword(globalForm.password)) newErrors.password = "Le mot de passe doit avoir au moins 8 caractères";
    if (globalForm.password !== globalForm.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    if (role === "student") {
      if (!studentForm.classe.trim()) newErrors.classe = "La classe est requise";
      if (!studentForm.Departement.trim()) newErrors.Departement = "L'établissement est requis";
    } else if (role === "professor") {
      if (!profForm.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
      if (!profForm.Departement.trim()) newErrors.Departement = "L'établissement est requis";
      if (!profForm.matiere.trim()) newErrors.matiere = "La matière est requise";
    } else if (role === "directeur") {
      if (!directeurForm.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
      if (!directeurForm.bureau.trim()) newErrors.bureau = "Le bureau est requis";
   
      if (!directeurForm.cartePro.trim()) newErrors.cartePro = "La carte professionnelle est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) return;
    setIsSubmitting(true);
    const payload = { role, ...globalForm };
    if (role === "student") Object.assign(payload, studentForm);
    if (role === "professor") Object.assign(payload, profForm);
    if (role === "directeur") Object.assign(payload, directeurForm);
    console.log("Form ready:", payload);

    // Sauvegarder le rôle et les données utilisateur dans localStorage
    localStorage.setItem("userRole", role);
    // localStorage.setItem("userEmail", globalForm.email);
    // localStorage.setItem("userName", `${globalForm.nom} ${globalForm.prenom}`);
    // localStorage.setItem("isAuthenticated", "true");
    // localStorage.setItem("userData", JSON.stringify(payload));

    setSuccessMessage("✅ Compte créé avec succès !");
    setTimeout(() => {
      setIsSubmitting(false);
      // Rediriger vers le dashboard après 2s
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }, 1200);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <Link to="/" className="back-link">← Retour</Link>
        <div className="create-account-form">
          <div className="card-header-sin">
            <div className="logo-box"><GraduationCap size={40} /></div>
            <h2>Créer votre compte</h2>
            {role === "directeur" && <p style={{ color: "black" }}>Commencez à gérer votre établissement dès aujourd'hui</p>}
          </div>

          <div className="role-selector">
            <button className={role === "directeur" ? "active" : ""} onClick={() => { setRole("directeur"); setErrors({}); }}>Directeur</button>
            <button className={role === "professor" ? "active" : ""} onClick={() => { setRole("professor"); setErrors({}); }}>Professeur</button>
            <button className={role === "student" ? "active" : ""} onClick={() => { setRole("student"); setErrors({}); }}>Étudiant</button>
          </div>

          {successMessage && <div className="success-message">{successMessage}</div>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <InputField label="Nom" name="nom" value={globalForm.nom} onChange={handleChange('global')} onBlur={handleBlur()} error={errors.nom} />
            <InputField label="Prénom" name="prenom" value={globalForm.prenom} onChange={handleChange('global')} onBlur={handleBlur()} error={errors.prenom} />
            <InputField label="Email" name="email" type="email" value={globalForm.email} onChange={handleChange('global')} onBlur={handleBlur()} error={errors.email} />
            <InputField label="Âge" name="age" type="number" value={globalForm.age} onChange={handleChange('global')} onBlur={handleBlur()} error={errors.age} />
            <InputField label="Mot de passe" name="password" type="password" value={globalForm.password} onChange={handleChange('global')} onBlur={handleBlur()} error={errors.password} />
            <InputField label="Confirmer le mot de passe" name="confirmPassword" type="password" value={globalForm.confirmPassword} onChange={handleChange('global')} onBlur={handleBlur()} error={errors.confirmPassword} />

            {role === 'student' && (
              <>
                <InputField label="Classe" name="classe" value={studentForm.classe} onChange={handleChange('student')} onBlur={handleBlur()} error={errors.classe} />
                <InputField label="Établissement" name="Departement" value={studentForm.Departement} onChange={handleChange('student')} onBlur={handleBlur()} error={errors.Departement} />
              </>
            )}

            {role === 'professor' && (
              <>
                <InputField label="Téléphone" name="telephone" type="tel" value={profForm.telephone} onChange={handleChange('professor')} onBlur={handleBlur()} error={errors.telephone} />
                <InputField label="Établissement" name="Departement" value={profForm.Departement} onChange={handleChange('professor')} onBlur={handleBlur()} error={errors.Departement} />
                <InputField label="Matière" name="matiere" value={profForm.matiere} onChange={handleChange('professor')} onBlur={handleBlur()} error={errors.matiere} />
              </>
            )}

            {role === 'directeur' && (
              <>
                <InputField label="Téléphone" name="telephone" value={directeurForm.telephone} onChange={handleChange('directeur')} onBlur={handleBlur()} error={errors.telephone} />
                <InputField label="Bureau" name="bureau" value={directeurForm.bureau} onChange={handleChange('directeur')} onBlur={handleBlur()} error={errors.bureau} />
               
                <InputField label="Carte professionnelle" name="cartePro" value={directeurForm.cartePro} onChange={handleChange('directeur')} onBlur={handleBlur()} error={errors.cartePro} />
              </>
            )}

            <button className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Création en cours...' : 'Créer mon compte'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, type = 'text', value, onChange, onBlur, error }) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required
      className={error ? 'input-error' : ''}
    />
    {error && <span className="error-text">{error}</span>}
  </div>
);
