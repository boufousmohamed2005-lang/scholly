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
              <li><a href="#pricing">Tarifs</a></li>
              <li><a href="#">Documentation</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Entreprise</h4>
            <ul className="footer-links">
              <li><a href="#">À propos</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Légal</h4>
            <ul className="footer-links">
              <li><a href="#">Confidentialité</a></li>
              <li><a href="#">Conditions</a></li>
              <li><a href="#">Cookies</a></li>
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