import React, { useState } from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import {GraduationCap} from "lucide-react"
export default function Signup() {
  const [role, setRole] = useState("directeur"); // student / teacher / director
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    age: "",
    password: "",
    telephone: "",
    classe: "",
    etablissement: "",
    matiere: "",
    bureau: "",
    cartePro: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATA READY :", { role, ...form });
  };

  return (
    // <div className="signup-container">
    //   <div className="signup-box">
     <div className="register-page">
      <div className="register-container">
        <Link to="/" className="back-link">← Retour</Link>
        <div className="create-account-form" >
        <div className="card-header-sin">
            <div className="logo-box"><GraduationCap size={40} /></div>
            <h2>Créer votre compte</h2>
        { role === "directeur"  &&  <p style={{color:"black" ,fontSize:"100"}}>Commencez à gérer votre établissement dès aujourd'hui</p>}
         
          </div>
        {/* <h2>Créer un compte</h2>
        <p>Sélectionnez votre rôle pour continuer</p> */}

        {/* SELECT ROLE */}
        <div className="role-selector">
             <button
            className={role === "directeur" ? "active" : ""}
            onClick={() => setRole("directeur")}
          >
            Directeur
          </button>
           <button
            className={role === "prof" ? "active" : ""}
            onClick={() => setRole("prof")}
          >
            Professeur
          </button>
          <button
            className={role === "etudiant" ? "active" : ""}
            onClick={() => setRole("etudiant")}
          >
            Étudiant
          </button>

         

       
        </div>

        {/* {role === "" && <p className="info">Choisissez un rôle pour afficher le formulaire.</p>} */}

        {/* FORM */}
        {role !== "" && (
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Champ global */}
         <Input label="Nom" name="nom" onChange={handleChange} />
            <Input label="Prénom" name="prenom" onChange={handleChange} />
            <Input label="Email" name="email" type="email" onChange={handleChange} />
            <Input label="Âge" name="age" type="number" onChange={handleChange} />
            <Input label="Mot de passe" name="password" type="password" onChange={handleChange} />

            {/* RÔLES SPÉCIFIQUES */}
            {role === "etudiant" && (
              <>
                <Input label="Classe" name="classe" onChange={handleChange} />
                <Input label="Établissement" name="etablissement" onChange={handleChange} />
              </>
            )}

            {role === "prof" && (
              <>
                <Input label="Téléphone" type="tel" name="telephone" onChange={handleChange} />
                <Input label="Âge" name="age" type="number" onChange={handleChange} />
                <Input label="Établissement" name="etablissement" onChange={handleChange} />
                <Input label="Matière" name="matiere" onChange={handleChange} />
              </>
            )}

            {role === "directeur" && (
              <>
                <Input label="Téléphone" name="telephone" onChange={handleChange} />
                <Input label="Bureau" name="bureau" onChange={handleChange} />
                <Input label="Établissement" name="etablissement" onChange={handleChange} />
                <Input label="Carte professionnelle" name="cartePro" onChange={handleChange} />
              </>
            )}

            <button className="submit-btn">Créer mon compte</button>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}

const Input = ({ label, name, type = "text", onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} name={name} onChange={onChange} required />
  </div>
);
