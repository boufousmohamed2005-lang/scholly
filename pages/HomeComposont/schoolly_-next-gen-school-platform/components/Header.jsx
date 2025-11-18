import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, Menu, X } from './icons';
import Logo from './Logo';



const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="header_home">
      <div className="container">
        <div className="header-inner">
          <Logo darkMode={darkMode} />

          <nav className="header-nav">
            <a href="#features">Fonctionnalités</a>
            <a href="#benefits">Avantages</a>
            
          </nav>

          <div className="header-actions">
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun height={20} width={20} /> : <Moon height={20} width={20} />}
            </button>
            <a href="/signup " className="btn btn-ghost">Connexion</a>
            <a href="/login" className="btn btn-primary">
              Commencer <ArrowRight height={16} width={16} />
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X height={32} width={32} /> : <Menu height={32} width={32} />}
            </button>
          </div>
        </div>
      </div>
      
      <div
        className={`mobile-nav-backdrop ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <nav>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Fonctionnalités</a>
          <a href="#benefits" onClick={() => setIsMenuOpen(false)}>Avantages</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Tarifs</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Menu</a>
        </nav>
        <div className="mobile-nav-actions">
           <a href="#" className="btn btn-ghost">Connexion</a>
           <a href="#" className="btn btn-primary">
              Commencer <ArrowRight height={16} width={16} />
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;