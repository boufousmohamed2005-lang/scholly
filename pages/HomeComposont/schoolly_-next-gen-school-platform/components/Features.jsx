import React from 'react';
import { Users, BookOpen, Calendar, MapPin, BarChart3, GraduationCap } from './icons';

const features = [
  { icon: Users, title: "Gestion des étudiants", description: "Suivez toutes les informations de vos étudiants en temps réel." },
  { icon: BookOpen, title: "Gestion des professeurs", description: "Organisez votre corps enseignant facilement." },
  { icon: Calendar, title: "Emploi du temps", description: "Créez et gérez les emplois du temps et examens." },
  { icon: MapPin, title: "Gestion des régions", description: "Organisez votre établissement par régions." },
  { icon: BarChart3, title: "Tableaux de bord", description: "Visualisez toutes vos données avec des stats en temps réel." },
  { icon: GraduationCap, title: "Gestion des classes", description: "Créez et gérez vos classes et effectifs." },
];

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Tout ce dont vous avez besoin</h2>
          <p>Des outils puissants pour simplifier la gestion quotidienne de votre établissement</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon-wrapper">
                <feature.icon height={24} width={24} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;