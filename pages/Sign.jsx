// import React from 'react'
//  const Signup = () => {
//   return (
//     <div>signup here </div> 
//   )
// }
// export default Signup


import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./sign.css";
import {GraduationCap } from "lucide-react"
export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
 
  const handleChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // })
    e.preventDefault();
    
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

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
     const form = e.target;
 const formdata = new FormData(form);
 let data = Object.fromEntries(formdata.entries());
 console.log(data);
 setFormData( prev => [...prev, data])


    try {
      if (formData.password !== formData.confirmPassword) {
        alert("❌ Les mots de passe ne correspondent pas.")
        setIsLoading(false)
        return
      }

      if (formData.password.length < 6) {
        alert("⚠️ Le mot de passe doit contenir au moins 6 caractères.")
        setIsLoading(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert("⚠️ Veuillez entrer une adresse email valide.")
        setIsLoading(false)
        return
      }

      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userExists = users.some((u) => u.email === formData.email)

        if (userExists) {
          alert("❌ Un compte avec cet email existe déjà.")
          setIsLoading(false)
          return
        }

        const newUser = {
          id: Date.now().toString(),
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          establishment: formData.establishment.trim(),
          password: formData.password,
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        alert("✅ Compte créé avec succès ! Bienvenue sur EduManage.")
        navigate("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Erreur d'inscription :", error.message)
      alert("❌ Une erreur est survenue lors de l'inscription.")
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <Link to="/" className="back-link">
          ← Retour à l'accueil
        </Link>

        <div className="card">
          <div className="card-header-sin">
            <div className="logo-box"><GraduationCap size={40}/></div>
            <h2>Créer votre compte</h2>
            <br />
            <p>Commencez à gérer votre établissement dès aujourd'hui</p>
          </div>

          <div className="card-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jean Dupont"
                  // value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  // value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="establishment">Nom de l'établissement</label>
                <input
                  id="establishment"
                  name="establishment"
                  type="text"
                  placeholder="Lycée Victor Hugo"
                  // value={formData.establishment}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  // value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  // value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" disabled={isLoading} className="btn">
                {isLoading ? "Création du compte..." : "Créer mon compte"}
              </button>
            </form>

            <div className="register-link">
              <span>Vous avez déjà un compte ? </span>
              <Link to="/login">Se connecter</Link>
            </div>

            <p className="policy-text">
              En créant un compte, vous acceptez nos{" "}
              <Link to="#">conditions d'utilisation</Link> et notre{" "}
              <Link to="#">politique de confidentialité</Link>.
            </p>
          </div>
      
        </div>
      </div>
    </div>
  )
}










// ----------------------------

// import { Search, Bell, User, LogOut } from 'lucide-react';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// import "./Login.css"

// export default function TopBar({ onSearch, onLogout }) {
//   const setLocation= useLocation();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     if (onSearch) {
//       onSearch(value);
//     }
//   };
 

//   const handleLogout = () => {
//     if (confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('isAuthenticated');
//       if (onLogout) {
//         onLogout();
//          setLocation('/');
      
//       }
//       setLocation('/login');
//     }
//   };

//   return (
//     <header className="topbar">
//       <div className="topbar-search">
//         <Search className="search-icon" />
//         <input
//           type="search"
//           placeholder="Search students, courses, professors..."
//           className="search-input"
//           value={searchQuery}
//           onChange={handleSearch}
//           data-testid="input-search"
//         />
//       </div>
      
//       <div className="topbar-actions">
   
        
//         <button className="icon-button" data-testid="button-notifications">
//           <Bell size={20} />
//           <span className="notification-badge">3</span>
//         </button>
        
//         <div className="user-profile" data-testid="button-profile">
//           <div className="user-avatar">
//             <User size={18} />
//           </div>
//           <div className="user-info">
//             <span className="user-name">Admin User</span>
//             <span className="user-role">Administrator</span>
//           </div>
//         </div>

//         <button 
//           className="icon-button" 
//           onClick={handleLogout}
//           data-testid="button-logout"
//           title="Logout"
//         >
//           <LogOut size={20} />
//         </button>
//       </div>
//     </header>
//   );
// }

