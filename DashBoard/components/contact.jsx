import React, { useState, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import Api from "../../src/Api";
import "./contactReclamation.css";
// import useAuthuser  from "../../src/hook/hookuser";
export default function Reclamation({ userId, role ,email }) {
  const [reclamations, setReclamations] = useState([]);
  const [newSujet, setNewSujet] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  // ---------------- FETCH RECLAMATIONS ----------------
  const loadReclamations = async () => {
    try {
      const res = await Api.get("/contacts");
      // Si rôle étudiant/professeur, filtrer seulement ses réclamations
      if (role === "student" || role === "professeur") {
        setReclamations(res.data.filter((r) => r.user_id === userId));
      } else {
        setReclamations(res.data); // Directeur voit tout
      }
    } catch (err) {
      console.error("Erreur lors du chargement des réclamations :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReclamations();
  }, []);

  // ---------------- ADD RECLAMATION ----------------

const handleAddReclamation = async () => {
  if (!newSujet || !newMessage) return alert("Veuillez remplir tous les champs");
  try {
    console.log('Données envoyées :', {
      name: role,
      user_id: userId,
      email: email,
      sujet: newSujet,
      message: newMessage,
    });
    const { data } = await Api.post("/contacts", {
      name: role,
      user_id: 1,
      email: email,
      sujet: newSujet,
      message: newMessage,
    });
    console.log('Réponse de l\'API :', data);
    setReclamations((prev) => [...prev, data]);
    setNewSujet("");
    setNewMessage("");
  } catch (err) {
    console.error("Erreur lors de l'ajout de la réclamation :", err.response?.data || err.message);
    alert("Impossible d'ajouter la réclamation");
  }
};

  // const handleAddReclamation = async () => {
  //   if (!newSujet || !newMessage) return alert("Veuillez remplir tous les champs");

  //   try {
  //     //id	name	user_id	email	sujet	message	created_at	updated_at	
  //     const { data } = await Api.post("/contacts", {
  //       name: role, // peut être le nom de l'utilisateur
  //       user_id: 1,
  //       email: email, // optionnel si disponible
  //       sujet: newSujet,
  //       message: newMessage,
        
  //     });

  //     setReclamations((prev) => [...prev, data]);
  //     setNewSujet("");
  //     setNewMessage("");
  //   } catch (err) {
  //     console.error("Erreur lors de l'ajout de la réclamation :", err.response?.data || err.message);
  //     alert("Impossible d'ajouter la réclamation");
  //   }
  // };

  // ---------------- DELETE RECLAMATION ----------------
  const handleDeleteReclamation = async (id) => {
    if (!window.confirm("Supprimer cette réclamation ?")) return;

    try {
      await Api.delete(`/contacts/${id}`);
      setReclamations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Impossible de supprimer la réclamation");
    }
  };

  return (
    <div className="reclamation-container">
      <h3>Réclamations</h3>
     {role}  -  
     {email}   -  
     {userId
     }
      {/* Ajout de réclamation pour étudiants/professeurs */}
      {(role === "student" || role === "professeur") && (
        <div className="add-reclamation">
          <input
            type="text"
            placeholder="Sujet"
            value={newSujet}
            onChange={(e) => setNewSujet(e.target.value)}
          />
          <textarea
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn-send" onClick={handleAddReclamation}>
            <Send size={16} /> Envoyer
          </button>
        </div>
      )}

      {/* Liste des réclamations */}
      {loading ? (
        <p className="loading-text">Chargement des réclamations...</p>
      ) : reclamations.length > 0 ? (
        <ul className="reclamation-list">
          {reclamations.map((r) => (
            <li key={r.id} className="reclamation-item">
              <div className="reclamation-header">
                <strong>{r.name}</strong> - <span className="reclamation-sujet">{r.sujet}</span>
                <span className="reclamation-date">{new Date(r.created_at).toLocaleString("fr-FR")}</span>
              </div>
              <p className="reclamation-message">{r.message}</p>
              {/* Supprimer uniquement pour admin/directeur */}
              {role !== "student" && role !== "professeur" && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteReclamation(r.id)}
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-reclamation">Aucune réclamation pour le moment.</p>
      )}
    </div>
  );
}
