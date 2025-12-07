import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import api from "../../src/Api"; // Ton instance axios
import "./emploideTemps.css";

const EmploideTempDir = () => {
  const [formData, setFormData] = useState({
    jour: "",
    heure_debut: "",
    heure_fin: "",
    class: "",
    professeur: "",
    matiere: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { jour, heure_debut, heure_fin, class: classe, professeur, matiere } = formData;

    if (!jour || !heure_debut || !heure_fin || !classe || !professeur || !matiere) {
      setErrorMsg("Veuillez remplir tous les champs !");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await api.post("/emplois", formData);
      setSuccessMsg("Matière ajoutée avec succès !");
      setFormData({
        jour: "",
        heure_debut: "",
        heure_fin: "",
        class: "",
        professeur: "",
        matiere: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur lors de l'ajout, vérifiez les données !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saisie-wrapper">
      <h2>Saisie Emploi du Temps</h2>
      <p>Seul le directeur peut saisir les cours et horaires</p>

      <form className="saisie-form" onSubmit={handleSubmit}>
        <label>
          Jour :
          <select
            value={formData.jour}
            onChange={(e) => setFormData({ ...formData, jour: e.target.value })}
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="Lundi">Lundi</option>
            <option value="Mardi">Mardi</option>
            <option value="Mercredi">Mercredi</option>
            <option value="Jeudi">Jeudi</option>
            <option value="Vendredi">Vendredi</option>
            <option value="Samedi">Samedi</option>
          </select>
        </label>

        <label>
          Heure début :
          <input
            type="time"
            value={formData.heure_debut}
            onChange={(e) => setFormData({ ...formData, heure_debut: e.target.value })}
            required
          />
        </label>

        <label>
          Heure fin :
          <input
            type="time"
            value={formData.heure_fin}
            onChange={(e) => setFormData({ ...formData, heure_fin: e.target.value })}
            required
          />
        </label>

        {/* ---- SELECT CLASSE (AS1 / AS2 / AS3) ---- */}
        <label>
          Classe :
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="AS1">AS1</option>
            <option value="AS2">AS2</option>
            <option value="AS3">AS3</option>
          </select>
        </label>

        <label>
          Professeur :
          <input
            type="text"
            placeholder="Nom du professeur"
            value={formData.professeur}
            onChange={(e) => setFormData({ ...formData, professeur: e.target.value })}
            required
          />
        </label>

        <label>
          Matière :
          <input
            type="text"
            placeholder="Nom de la matière"
            value={formData.matiere}
            onChange={(e) => setFormData({ ...formData, matiere: e.target.value })}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            <Plus size={16} /> {loading ? "Ajout en cours..." : "Ajouter"}
          </button>
        </div>

        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default EmploideTempDir;
