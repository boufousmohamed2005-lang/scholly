import React, { useState, useEffect } from "react";
import { Send, Trash2, Edit, X } from "lucide-react";
import Api from "../../src/Api";
import useAuthuser from "../../src/hook/hookuser";
import "./contactReclamation.css";

export default function Reclamation({ role }) {
  const { user } = useAuthuser();

  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newSujet, setNewSujet] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Modal édition
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReclamation, setEditReclamation] = useState(null);

  // ---------------- FETCH RECLAMATIONS ----------------
  const loadReclamations = async () => {
    setLoading(true);
    try {
      const res = await Api.get("/contacts");
      const data =
       ( role === "student" || role === "professeur")
          ? res.data.filter((r) => r.user_id === user.id)
          : res.data;
      setReclamations(data);
     
      setError(null);
      
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les réclamations");
    } finally {
      setLoading(false);
      
    }
   
  };

  useEffect(() => {
    loadReclamations();
  }, []);

  // ---------------- ADD RECLAMATION ----------------
  const handleAddReclamation = async () => {
    if (!name.trim() || !email.trim() || !newSujet.trim() || !newMessage.trim()) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      await Api.post("/contacts", {
        name,
        email,
        user_id: user.id,
        sujet: newSujet,
        message: newMessage,
      });

      loadReclamations();
      setName("");
      setEmail("");
      setNewSujet("");
      setNewMessage("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Impossible d'ajouter la réclamation");
    }
  };

  // ---------------- DELETE ----------------
  // const handel = async (id) => {
  //   if (!window.confirm("Supprimer cette réclamation ?")) return;
  //   try {
  //     await Api.delete(`/contacts/${id}`);
  //     loadReclamations();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Impossible de supprimer la réclamation");
  //   }
  // };

  // ---------------- EDIT ----------------
  // const openEditModal = (rec) => {
  //   setEditReclamation(rec);
  //   setShowEditModal(true);
  // };

  const handleUpdate = async () => {
    try {
      await Api.patch(`/contacts/${editReclamation.id}`, {
        name: editReclamation.name,
        email: editReclamation.email,
        sujet: editReclamation.sujet,
        message: editReclamation.message,
      });
      loadReclamations();
      setShowEditModal(false);
      setEditReclamation(null);
    } catch (err) {
      console.error(err);
      alert("Impossible de modifier la réclamation");
    }
  };

  // Pagination
  const paginated = reclamations.slice((page - 1) * pageSize, page * pageSize);

 if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    );
  }

  return (
    <div className="reclamation-container">
      <h3 className="title">Réclamations</h3>

      {/* Formulaire ajout */}
      {(role === "student" || role === "professeur") && (
        <div className="add-reclamation">
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Sujet"
            value={newSujet}
            onChange={(e) => setNewSujet(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="textarea-field"
          />
          <button className="btn-send" onClick={handleAddReclamation}>
            <Send size={16} /> Envoyer
          </button>
        </div>
      )}

      {/* Liste */}
      { error ? (
        <p className="error-text">{error}</p>
      ) : paginated.length > 0 ? (
        <>
          <ul className="reclamation-list">
            {paginated.map((r) => (
              <li key={r.id} className="reclamation-item">
                <div className="reclamation-header">
                  <strong className="reclamation-name">{r.name}</strong>
                  <span className="reclamation-email">&lt;{r.email}&gt;</span>
                  <span className="reclamation-sujet">{r.sujet}</span>
                  <span className="reclamation-date">
                    {new Date(r.created_at).toLocaleString("fr-FR")}
                  </span>
                </div>
                <p className="reclamation-message">{r.message}</p>

                {/* Actions pour directeur/admin */}
                {role !== "student" && role !== "professeur" && (
                  <div className="reclamation-actions">
                   
                   
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ◀
            </button>
            <span>Page {page}</span>
            <button
              disabled={page * pageSize >= reclamations.length}
              onClick={() => setPage(page + 1)}
            >
              ▶
            </button>
          </div>
        </>
      ) : (
        <p className="no-reclamation">Aucune réclamation pour le moment.</p>
      )}

      {/* Modal Edition */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Modifier Réclamation</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              value={editReclamation.name}
              onChange={(e) =>
                setEditReclamation({ ...editReclamation, name: e.target.value })
              }
            />
            <input
              type="email"
              value={editReclamation.email}
              onChange={(e) =>
                setEditReclamation({ ...editReclamation, email: e.target.value })
              }
            />
            <input
              type="text"
              value={editReclamation.sujet}
              onChange={(e) =>
                setEditReclamation({ ...editReclamation, sujet: e.target.value })
              }
            />
            <textarea
              value={editReclamation.message}
              onChange={(e) =>
                setEditReclamation({ ...editReclamation, message: e.target.value })
              }
            />

            <button className="btn-save" onClick={handleUpdate}>
              Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
