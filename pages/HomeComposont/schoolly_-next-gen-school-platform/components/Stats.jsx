import React from 'react';

const stats = [
  { label: "Établissements", value: "500+" },
  { label: "Étudiants gérés", value: "50K+" },
  { label: "Professeurs actifs", value: "5K+" },
  { label: "Satisfaction", value: "98%" },
];

const Stats  = () => {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-card animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;