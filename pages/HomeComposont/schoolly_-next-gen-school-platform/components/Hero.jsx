import React from 'react';
import { ArrowRight, BarChart3, Users, BookOpen } from './icons';

const Hero = () => {
  return (
    <div className="HeroCopmlet" >
    <section className="hero">
      {/* <div className="hero-background-effects">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
      </div> */}
      <div className="container">
        <div className="animate-fade-in-up hero-badge">
          Plateforme de gestion scolaire nouvelle génération
        </div>
        <h1 className="animate-fade-in-up hero-title">
          Gérez votre établissement avec <span className="highlight">simplicité</span>
        </h1>
        <p className="animate-fade-in-up hero-subtitle">
          Une solution complète pour gérer étudiants, professeurs, classes et emplois du temps, conçue pour l'efficacité.
        </p>
        <div className="animate-fade-in-up hero-ctas">
          <a href="/signup" className="btn btn-primary">
            Essai maintenent <ArrowRight height={20} width={20} />
          </a>
          <a href="#features" onClick={()=>{
            document.querySelector(".header_home").style.position = "relative";
          } }  className="btn btn-secondary">
            Découvrir les fonctionnalités
          </a>
        </div>
      </div>
      </section>
      
        <div className="hero-visual animate-fade-in-up">
          <div className="mockup-window">
            <div className="mockup-header">
              <div className="dot"></div>
        
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="mockup-content">
                <div className="mockup-sidebar">
                    <div className="mockup-sidebar-item active">
                        <BarChart3 height={18} width={18}/> <span>Dashboard</span>
                    </div>
                    <div className="mockup-sidebar-item">
                        <Users height={18} width={18}/> <span>Étudiants</span>
                    </div>
                     <div className="mockup-sidebar-item">
                        <Users height={18} width={18}/> <span>Professeurs</span>
                    </div>
                    <div className="mockup-sidebar-item">
                        <BookOpen height={18} width={18}/> <span>Cours</span>
                    </div>
                </div>
                <div className="mockup-main">
                    <div className="mockup-card"></div>
                    <div className="mockup-card-small"></div>
                    <div className="mockup-card-small"></div>
                    <div className="mockup-chart">
                        <div className="mockup-chart-bar" style={{height: '40%'}}></div>
                        <div className="mockup-chart-bar" style={{height: '65%'}}></div>
                        <div className="mockup-chart-bar" style={{height: '50%'}}></div>
                        <div className="mockup-chart-bar" style={{height: '80%'}}></div>
                        <div className="mockup-chart-bar" style={{height: '60%'}}></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
</div>
   

   
  );
};

export default Hero;
