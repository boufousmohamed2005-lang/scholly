

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [userRole, setUserRole] = useState("directeur");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Validation basique
    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs" });
      setIsLoading(false);
      return;
    }

    // Simuler une requête d'authentification
    

    // Sauvegarder le rôle dans localStorage
    localStorage.setItem("userRole", userRole);
    

    // Simuler délai API
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ type: "success", text: "Connexion réussie !" });
      
      // Rediriger vers le dashboard après 1.5s
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <a href="/" className="back-link">
          &larr; Retour à l'accueil
        </a>
        <div className="card1">
          <div className="card-header-lo">
            <div className="icon-circle"><GraduationCap size={40} /></div>
            <h2 className="card-title">Connexion</h2>
            <br />
            <p className="card-description">Connectez-vous à votre compte Schoolly</p>
          </div>

          {/* Sélecteur de rôle pour test */}
          <div className="role-test-selector">
            <label>Rôle de test:</label>
            <div className="role-buttons">
              {["student", "professor", "directeur"].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`role-btn ${userRole === role ? "active" : ""}`}
                  onClick={() => setUserRole(role)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="card-content">
            {message && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <div className="password-label">
                  <label htmlFor="password">Mot de passe</label>
                  <a href="#" className="forgot-link">Mot de passe oublié ?</a>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
            <div className="signup-link">
              Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

