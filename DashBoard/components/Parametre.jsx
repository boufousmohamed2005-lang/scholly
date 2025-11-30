import "./parametre.css";
import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

export default function AccountSettings() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <form  className="acc-container">

      <h2 className="acc-title">
        <User size={24} /> Paramètres du compte
      </h2>

      {/* --- Infos personnelles --- */}
      <div className="acc-section">
        <h3><User size={18}/> Informations personnelles</h3>

        <div className="acc-input">
          <label>Nom</label>
          <input
            type="text"
            name="lastname"
            placeholder="Votre nom"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>

        <div className="acc-input">
          <label>Prénom</label>
          <input
            type="text"
            name="firstname"
            placeholder="Votre prénom"
            value={form.firstname}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* --- Email --- */}
      <div className="acc-section">
        <h3><Mail size={18}/> Email</h3>

        <div className="acc-input">
          <label>Adresse email</label>
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- Mot de passe --- */}
      <div className="acc-section">
        <h3><Lock size={18}/> Sécurité</h3>

        <div className="acc-input">
          <label>Ancien mot de passe</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="********"
            onChange={handleChange}
          />
        </div>

        <div className="acc-input">
          <label>Nouveau mot de passe</label>
          <input
            type="password"
            name="newPassword"
            placeholder="********"
            onChange={handleChange}
          />
        </div>

        <div className="acc-input">
          <label>Confirmer nouveau mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="********"
            onChange={handleChange}
          />
        </div>

      </div>

      <button className="acc-btn" >
        Enregistrer les modifications
      </button>

    </form>
  );
}
