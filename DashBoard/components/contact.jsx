import { useState } from "react";
import axios from "axios";
import "./contact.css";

export default function ContactSupport() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    let e = {};

    if (!form.fullname.trim()) e.fullname = "Nom obligatoire";
    if (!form.email.includes("@") || form.email.length < 5)
      e.email = "Email invalide";
    if (form.subject.trim().length < 3)
      e.subject = "Sujet trop court (min. 3 caractères)";
    if (form.message.trim().length < 10)
      e.message = "Message trop court (min. 10 caractères)";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("http://localhost:8000/api/contact", form);

      setSent(true);
      setForm({ fullname: "", email: "", subject: "", message: "" });

      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      alert("Erreur lors de l'envoi !"+  err.message);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">

        <h2 className="title2">Déclarer votre  Problème</h2>
        <p className="subtitle">
          Nous sommes là pour vous aider. Décrivez votre problème.
        </p>

        {sent && <div className="success-msg">✔ Message envoyé avec succès !</div>}

        <form onSubmit={handleSubmit} className="form">

          {/* NOM */}
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className={errors.fullname ? "error-input" : ""}
            />
            {errors.fullname && <small className="error-text">{errors.fullname}</small>}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>

          {/* SUJET */}
          <div className="form-group">
            <label>Sujet</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={errors.subject ? "error-input" : ""}
            />
            {errors.subject && <small className="error-text">{errors.subject}</small>}
          </div>

          {/* MESSAGE */}
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className={errors.message ? "error-input" : ""}
            ></textarea>
            {errors.message && <small className="error-text">{errors.message}</small>}
          </div>

          <button className="btn-submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
