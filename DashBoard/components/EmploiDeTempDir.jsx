import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import api from "../../src/Api";
import "./emploideTemps.css";

export default function EmploideTempDir() {
  const [formData, setFormData] = useState({
    jour: "",
    heure_debut: "",
    heure_fin: "",
    class: "",
    professeur: "",
    matiere: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [classes, setClasses] = useState([]);
  const [teachers,setteachers] = useState([]);
  const [subjects,setSubjects] = useState([]);

  // -----------------------------
  // Charger la liste des classes
  // -----------------------------
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/etudiants");
        const rest = await api.get("/professeurs");
        setClasses(res.data);
        setteachers(rest.data);
        setSubjects(rest.data)
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setErrorMsg("Impossible de charger les classes !");
      }
    };

    fetchClasses();
  }, []);

  // ----------------------------
  // Submit Formulaire
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => v === "")) {
      setErrorMsg("Veuillez remplir tous les champs !");
      return;
    }

    setLoading(false);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await api.post("/emplois", formData);

      setSuccessMsg("Cours ajouté avec succès !");
      setFormData({
        jour: "",
        heure_debut: "",
        heure_fin: "",
        class: "",
        professeur: "",
        matiere: "",
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur lors de l'ajout, vérifiez les données !");
    } finally {
      setLoading(false);
    }
  };

   if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    );
  }

  // ----------------------------
  // Rendu UI
  // ----------------------------

  return (
    <div className="saisie-wrapper">
      <h2>Saisie Emploi du Temps</h2>
      <p>Seul le directeur peut saisir les cours et horaires</p>

      <form className="saisie-form" onSubmit={handleSubmit}>

        {/* ------------------ JOURS ------------------ */}
        <label>
          Jour :
          <select
            value={formData.jour}
            onChange={(e) => setFormData({ ...formData, jour: e.target.value })}
            required
          >
            <option value="">-- Sélectionner --</option>
            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map(
              (day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              )
            )}
          </select>
        </label>

        {/* ------------------ HEURE DEBUT ------------------ */}
        <label>
          Heure début :
          <input
            type="time"
            value={formData.heure_debut}
            onChange={(e) =>
              setFormData({ ...formData, heure_debut: e.target.value })
            }
            required
          />
        </label>

        {/* ------------------ HEURE FIN ------------------ */}
        <label>
          Heure fin :
          <input
            type="time"
            value={formData.heure_fin}
            onChange={(e) =>
              setFormData({ ...formData, heure_fin: e.target.value })
            }
            required
          />
        </label>

        {/* ------------------ CLASSE ------------------ */}
        <label>
          Classe :
          <select
            value={formData.class}
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
            required
          >
            <option value="">-- Sélectionner --</option>

            {classes.map((c) => (
              <option key={c.id} value={c.Class}>
                {c.Class}
              </option>
            ))}
          </select>
        </label>

        {/* ------------------ PROFESSEUR ------------------ */}
        <label>
          Professeur :
         
           <select
              value={formData.professeur}
            onChange={(e) =>
              setFormData({ ...formData, professeur: e.target.value })
            }
            required
          >
            <option value="">-- Sélectionner --</option>

            {teachers.map((c) => (
              <option key={c.id} value={c.Name}>
                {c.Name}
              </option>
            ))}
          </select>
        </label>

        {/* ------------------ MATIÈRE ------------------ */}
        <label>
          Matière :
          {/* <input
            type="text"
            placeholder="Nom de la matière"
            value={formData.matiere}
            onChange={(e) =>
              setFormData({ ...formData, matiere: e.target.value })
            }
            required
          /> */}
           <select
              value={formData.matiere}
            onChange={(e) =>
              setFormData({ ...formData, matiere: e.target.value })
            }
            required
          >
            <option value="">-- Sélectionner --</option>

            {subjects.map((c) => (
              <option key={c.id} value={c.Subject}>
                {c.Subject}
              </option>
            ))}
          </select>
        </label>

        {/* ------------------ BOUTON ------------------ */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            <Plus size={16} />
            {loading ? "Ajout..." : "Ajouter"}
          </button>
        </div>

        {/* Messages */}
        {successMsg && <p className="success"  style={{color:'green'}} >{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
}
