import React from 'react';
import { GraduationCap } from './icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-inner">
              <GraduationCap />
              <strong>Schoolly</strong>
            </div>
            <p>La solution complète pour la gestion de votre établissement scolaire.</p>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Produit</h4>
            <ul className="footer-links">
              <li><a href="#features">Fonctionnalités</a></li>
              <li><a href="##benefits">Avantages</a></li>
                
              
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">App</h4>
            <ul className="footer-links">
              <li><a href="/signup ">Crée account </a></li>
              <li> <a href="/login" >
                 Connexion
            </a></li>

        
            </ul>
          </div>
          
          
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Schoolly. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;