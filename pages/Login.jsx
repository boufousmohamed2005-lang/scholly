

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { GraduationCap } from "lucide-react";
import {Link} from "react-router-dom"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate()
const location = useLocation()
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
 navigate("/dashboard"); 
 alert("Connexion réussie !",location.pathname);
    // Simuler une requête d'authentification

  }

  return (
    <div className="login-container">
      <div className="login-box">
        <a href="/" className="back-link">
          &larr; Retour à l'accueil
        </a>
        <div className="card1">
          <div className="card-header-lo">
            <div className="icon-circle"><GraduationCap size={40}/></div>
            <h2 className="card-title">Connexion</h2>
          <br />
            <p className="card-description">Connectez-vous à votre compte Schoolly</p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
            <div className="signup-link">
              Pas encore de compte ? <Link to="/signup" >Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

