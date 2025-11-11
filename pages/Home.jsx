import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Users,
  Calendar,
  BarChart3,
  BookOpen,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sun,
  Moon,
  ArrowRight as IconArrowRight, GraduationCap as IconGraduation,
  
} from "lucide-react";
import { Link } from "react-router-dom";
import "./home.css";
 function Logo({ darkMode = false }) {
  return (
    <div className={`logo-root ${darkMode ? "dark" : "light"}`}>
      <GraduationCap className="logo-icon"  />
      <span className="logo-text">Schoolly</span>
    </div>
  );
}
export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Sauvegarde le mode dans localStorage
  useEffect(() => {
    const mode = localStorage.getItem("darkMode") === "true";
    setDarkMode(mode);
    document.documentElement.classList.toggle("dark", mode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const stats = [
    { label: "Établissements", value: "500+" },
    { label: "Étudiants gérés", value: "50K+" },
    { label: "Professeurs actifs", value: "5K+" },
    { label: "Satisfaction", value: "98%" },
  ];

  const features = [
    { icon: Users, title: "Gestion des étudiants", description: "Suivez toutes les informations de vos étudiants en temps réel." },
    { icon: BookOpen, title: "Gestion des professeurs", description: "Organisez votre corps enseignant facilement." },
    { icon: Calendar, title: "Emploi du temps", description: "Créez et gérez les emplois du temps et examens." },
    { icon: MapPin, title: "Gestion des régions", description: "Organisez votre établissement par régions." },
    { icon: BarChart3, title: "Tableaux de bord", description: "Visualisez toutes vos données avec des stats en temps réel." },
    { icon: GraduationCap, title: "Gestion des classes", description: "Créez et gérez vos classes et effectifs." },
  ];

  const benefits = [
    "Interface intuitive et facile à utiliser",
    "Données sécurisées et sauvegardées",
    "Accès depuis n'importe quel appareil",
    "Support technique réactif",
    "Mises à jour régulières et gratuites",
    "Rapports et statistiques détaillés",
  ];


     const students = 1.247;
  const teachers = 89;
  const classes = 42;
  const chartData = [40, 65, 45, 80, 55, 90, 70]; 


  
  return (
     <div className={`lp-root ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <header className="lp-header">
        <div className="lp-container lp-header-inner">
          <div className="lp-brand">
            {/* <GraduationCap className="lp-icon lp-icon-large" />
            <span className="lp-brand-title">EduManage</span> */}
            <Logo  darkMode={darkMode } />
          </div>

          <nav className="lp-nav">
            <a href="#features">Fonctionnalités</a>
            <a href="#benefits">Avantages</a>
            <a href="#pricing">Tarifs</a>
          </nav>

          <div className="lp-actions">
            <button className="lp-btn-darkmode" onClick={toggleDarkMode}>
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <Link to="/login" className="lp-btn lp-btn-ghost"> Connexion</Link>
            <Link to="/signup" className="lp-btn lp-btn-primary">Commencer <ArrowRight className="lp-icon-inline" /></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="lp-hero">
        <div className="lp-container lp-hero-inner">
          <div className="lp-badge">Plateforme de gestion scolaire moderne Schoolly</div>
          <h1 className="lp-hero-title">Gérez votre établissement avec <span className="lp-highlight">simplicité</span></h1>
          <p className="lp-hero-sub">Une solution complète pour gérer étudiants, professeurs, classes et emplois du temps.</p>
          <div className="lp-hero-ctas">
            <Link to="/signup" className="lp-btn lp-btn-lg">Essai gratuit <ArrowRight className="lp-icon-inline" /></Link>
            <a href="#features" className="lp-btn lp-btn-outline">Découvrir les fonctionnalités</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lp-stats">
        <div className="lp-container lp-stats-grid">
          {stats.map((s) => (
            <div className="lp-card " key={s.label}>
              <div className="lp-stat-value">{s.value}</div>
              <div className="lp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="lp-features">
        <div className="lp-container">
          <div className="lp-section-header">
            <h2>Tout ce dont vous avez besoin</h2>
            <p>Des outils puissants pour simplifier la gestion quotidienne de votre établissement</p>
          </div>

          <div className="lp-features-grid">
            {features.map((f) => (
              <div className="lp-card lp-feature" key={f.title}>
                <div className="lp-feature-icon"><f.icon className="lp-icon" /></div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="lp-benefits">
        <div className="lp-container lp-benefits-inner">
          <div className="lp-benefits-text">
            <h2>Pourquoi choisir Schoolly ?</h2>
            <div className="lp-benefits-list">
              {benefits.map((b) => (
                <div className="lp-benefit" key={b}><CheckCircle2 className="lp-icon-small" /> <span>{b}</span></div>
              ))}
            </div>
          </div>
          {/* <div className="lp-dashboard-chart">
{[40,65,45,80,55,90,70].map((h, i) => (
<div key={i} className="lp-bar" style={{ height: `${h}%` }} />
))}
</div> */}
<div className={`dashboard-card-container ${darkMode ? "dark" : "" }`}>
      <div className="carde">
        <div className="card-header">
          <span className="label">Tableau de bord</span>
          <BarChart3 className="icon"  />
        </div>
        <div className="card-stats">
          <div className="stat">
            <span className="stat-label">Étudiants</span>
            <span className="stat-value primary">{students.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Professeurs</span>
            <span className="stat-value accent">{teachers}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Classes</span>
            <span className="stat-value chart">{classes}</span>
          </div>
        </div>
       

        <div className="card-chart">
          {chartData.map((height, i) => (
            <div
              key={i}
              className="chart-bar"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
        </div>
      </section>
      <section className="lp-cta">
<div className="lp-container">
<div className="lp-card lp-cta-card">
<h2>Prêt à transformer votre gestion scolaire ?</h2>
<p>Rejoignez des centaines d'établissements qui font confiance à EduManage pour gérer leur quotidien.</p>
<Link to="/signup" className="lp-btn lp-btn-primary lp-btn-lg">Créer un compte gratuit <IconArrowRight className="lp-icon-inline" /></Link>
</div>
</div>
</section>


{/* Footer */}
<footer className="lp-footer">
<div className="lp-container lp-footer-grid">
<div>
<div className="lp-brand-small"><IconGraduation className="lp-icon" /> <strong>EduManage</strong></div>
<p>La solution complète pour la gestion de votre établissement scolaire.</p>
</div>
<div>
<h4>Produit</h4>
<a href="#features">Fonctionnalités</a>
<a href="#pricing">Tarifs</a>
<a href="#">Documentation</a>
</div>
<div>
<h4>Entreprise</h4>
<a href="#">À propos</a>
<a href="#">Contact</a>
<a href="#">Blog</a>
</div>
<div>
<h4>Légal</h4>
<a href="#">Confidentialité</a>
<a href="#">Conditions</a>
<a href="#">Cookies</a>
</div>
</div>
</footer>
<div className="lp-footer-copy">&copy;  {new Date().getFullYear()} Schoolly. Tous droits réservés.</div>
</div>

  );
}
