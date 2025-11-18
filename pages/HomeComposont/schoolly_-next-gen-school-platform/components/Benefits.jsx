import React from 'react';
import { CheckCircle2, BarChart3 } from './icons';

const benefits = [
  "Interface intuitive et facile à utiliser",
  "Données sécurisées et sauvegardées",
  "Accès depuis n'importe quel appareil",
  "Support technique réactif",
  "Mises à jour régulières et gratuites",
  "Rapports et statistiques détaillés",
];

const chartData = [40, 65, 45, 80, 55, 90, 70];
const students = 1247;
const teachers = 89;
const classes = 42;



const DashboardCard = () => (
    <div className="dashboard-card">
        <div className="dashboard-header">
            <span className="label">Tableau de bord</span>
            <BarChart3 className="icon" />
        </div>
        <div className="dashboard-stats">
            <div className="stat">
                <span className="stat-label">Étudiants</span>
                <p className="stat-value primary">{students.toLocaleString()}</p>
            </div>
            <div className="stat">
                <span className="stat-label">Professeurs</span>
                <p className="stat-value accent">{teachers}</p>
            </div>
            <div className="stat">
                <span className="stat-label">Classes</span>
                <p className="stat-value amber">{classes}</p>
            </div>
        </div>
        <div className="dashboard-chart">
            {chartData.map((height, i) => (
                <div key={i} className="chart-bar" style={{ height: `${height}%` }} />
            ))}
        </div>
    </div>
);



const Benefits  = ({darkMode}) => {
  return (
    <section id="benefits" className="benefits">
      <div className="container">
        <div className="benefits-inner">
          <div className="benefits-content">
            <div className="section-header" style={{textAlign: 'left', margin: 0, maxWidth: 'none'}}>
                <h2>Pourquoi choisir Schoolly ?</h2>
                <p>Nous nous concentrons sur les fonctionnalités qui comptent vraiment, pour vous faire gagner du temps et de l'énergie.</p>
            </div>
            <ul className="benefits-list">
              {benefits.map((benefit) => (
                <li key={benefit} className="benefit-item">
                  <CheckCircle2 />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-container">
            <DashboardCard darkMode={darkMode} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;