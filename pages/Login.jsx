import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../src/Api"; // ton axios configuré
import useAuth from "../src/hook/Usehook";

export default function Login() {
  const { setUser } = useAuth(); // hook global pour mettre l'user
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userRole, setUserRole] = useState("directeur");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs" });
      return;
    }

    setIsLoading(true);

    try {
      // Appel API login
      const res = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      // Stocker token dans sessionStorage
      sessionStorage.setItem("token", res.data.access_token);

      // Mettre token dans axios par défaut
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;

      // Mettre l'utilisateur dans le hook global
      setUser(res.data.user);

      // Stocker le rôle choisi (optionnel)
      sessionStorage.setItem("userRole", userRole);

      setMessage({ type: "success", text: "Connexion réussie !" });

      // Redirection vers le dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Identifiants invalides" });
    } finally {
      setIsLoading(false);
    }
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
            <p className="card-description">Connectez-vous à votre compte Schoolly</p>
          </div>

          {/* Sélecteur de rôle pour test */}
          <div className="role-test-selector">
            <label>Rôle de test :</label>
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
