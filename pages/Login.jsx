
// import React from 'react'
// import Header from '../DashBoard/components/Header';
// const Login = () => {
//  const [da,setda] = React.useState([]);
 
//    const handleSubmit = (e) => {
//      e.preventDefault();
 
//      const form = e.target;
//      const formData = new FormData(form);

//      // Convertir en objet JS simple
//        let data = Object.fromEntries(formData.entries());
 
//      // Récupérer les checkbox (qui peuvent avoir plusieurs valeurs)
//      const roles = formData.getAll('roles');
//      data.roles = roles;
//    const radio = formData.getAll('radio');
//      data.radio = radio;
   
//         setda((prev) => [...prev, data]);
//      // setUsers((prevUsers) => [...prevUsers, newUser]);
     

    
//    };
 
//    return (
//     <>
//     <Header />
//      <form onSubmit={handleSubmit} method='POST' style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto' }}>
//        <h2>Formulaire Utilisateur</h2>
//        {da.length > 0 && da.map((item, index) => (
//          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//            <p><strong>Nom:</strong> {item.nom}</p>
//            <p><strong>Prénom:</strong> {item.prenom}</p>
//            <p><strong>Ville:</strong> {item.city}</p>
//            <p><strong>Rôles:</strong> {item.roles.join(', ')}</p>
//            <p><strong>Radio:</strong> {item.radio.join(', ')}</p>
//          </div>
//        ))}
 
//        <hr />
//      {new Date().toString()}
//        <label>
//          Nom :
//          <input type="text" name="nom" required />
//        </label>

//        <label>
//          Prénom :
//          <input type="text" name="prenom" required />
//        </label>
 
//        <label>
//          Ville :
//          <input type="text" name="city" />
//        </label>
 
//        <fieldset>
//          <legend>Rôles :</legend>
        
//            <input type="checkbox" name="roles"  id='rol' value="Étudiant" />
//           <label  htmlFor='rol' >  Étudiant
//          </label>
 
//          <label>
//            <input type="checkbox" name="roles" value="Professeur" />
//            Professeur
//          </label>
 
//          <label>
//            <input type="checkbox" name="roles" value="Admin" />
//            Admin
//          </label>
//        </fieldset>
//  <input type="radio" id='rdio' name='radio' value="hamid"/> 
//  <label htmlFor="rdio"> hamid </label>
//  <input type="radio" id='radio' value="said" name='radio'/> 
//  <label htmlFor="radio"> said </label>
//  <input type="radio" id='redio' value="brahim" name='radio'/> 
//  <label htmlFor="redio"> brahim </label>
//        <button type="submit">Envoyer</button>
    
//      </form>
//      </>
//    );
//  };
 


// export default Login


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { useLocation } from 'wouter';
// import { GraduationCap, Lock, User } from 'lucide-react';
// import "./login.css"
// export default function Login({ onLogin }) {
//   // const [location, setLocation] = useLocation();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const nav = useNavigate();
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (formData.username === 'admin' && formData.password === 'admin') {
     
//       onLogin();
//       nav('/');
      
//     } else {
//       setError('Invalid username or password. Use admin/admin to login.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-card">
//           <div className="login-header">
//             <div className="login-logo">
//               <GraduationCap size={48} />
//             </div>
//             <h1 className="login-title">UniManager</h1>
//             <p className="login-subtitle">University Management System</p>
//           </div>

//           <form onSubmit={handleSubmit} className="login-form">
//             {error && (
//               <div className="login-error" data-testid="text-error">
//                 {error}
//               </div>
//             )}

//             <div className="form-group">
//               <label htmlFor="username">
//                 <User size={18} />
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 required
//                 className="form-input"
//                 value={formData.username}
//                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 data-testid="input-username"
//                 placeholder="Enter your username"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">
//                 <Lock size={18} />
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 className="form-input"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 data-testid="input-password"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn-login"
//               data-testid="button-login"
//             >
//               Sign In
//             </button>

//             <div className="login-hint">
//               <p>Demo credentials: admin / admin</p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

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
        <div className="card">
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

