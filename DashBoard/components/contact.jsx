import React, { useState } from "react";
import "./contact.css";
import { MessageCircle } from "lucide-react";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <div className="contact-section">
      <div className="contact-card">
        <h2 className="contact-title">Contactez-nous  < MessageCircle /> </h2>
        <p className="contact-subtitle">
          Une question, une remarque… Je suis là pour vous aider ✅  
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="exemple@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Votre message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="contact-btn">
            Envoyer 
          </button>

          {submitted && (
            <p className="success-msg">✅ Message envoyé avec succès</p>
          )}
        </form>
      </div>

      <div className="contact-info">
        <h3>Nos Coordonnées</h3>
        <p>📍 Adresse: Marrakech, Maroc</p>
        <p>📧 Email: support@monapp.com</p>
        <p>📞 Téléphone: +212 6 00 00 00 00</p>
      </div>
    </div>
  );
}
