import React from 'react';
import { ArrowRight } from './icons';

const CTA = () => {
  return (
    <section id="pricing" className="cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-grid-bg"></div>
          <div className="cta-content">
            <h2>Prêt à transformer votre gestion scolaire ?</h2>
            <p>Rejoignez des centaines d'établissements qui font confiance à Schoolly pour gérer leur quotidien.</p>
            <div className="btn-wrapper">
              <a href="/signup" className="btn">
                Créer un compte gratuit <ArrowRight height={20} width={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;