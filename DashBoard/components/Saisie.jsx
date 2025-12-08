import React, { useState, useEffect } from "react";
import Api from "../../src/Api";
import { PlusCircle, Trash2, Edit, Bell, X, User2 } from "lucide-react";
import "./saisie.css";

export default function Saisie({ userId, role }) {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // Modal édition
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  // Charger les annonces
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("/announcements?_expand=user");
        setAnnouncements(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des annonces", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Ajouter une annonce
  const handleAdd = async () => {
    if (!newTitle || !newMessage) return alert("Remplissez tous les champs !");
    try {
      const res = await Api.post("/announcements", {
        title: newTitle,
        message: newMessage,
        created_by: userId,
      });

      setAnnouncements([res.data, ...announcements]);
      setNewTitle("");
      setNewMessage("");
    } catch (err) {
      console.error("Erreur ajout annonce", err);
      alert("Impossible d'ajouter l'annonce.");
    }
  };

  // Supprimer une annonce
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer cette annonce ?")) return;
    try {
      await Api.delete(`/announcements/${id}`);
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
      alert("Impossible de supprimer l'annonce.");
    }
  };

  // Ouvrir modal d'édition
  // const openEditModal = (announcement) => {
  //   setEditAnnouncement({ ...announcement }); // Cloner pour éviter mutation directe
  //   setShowEditModal(true);
  // };

  // Modifier annonce
  const handleUpdate = async () => {
    if (!editAnnouncement.title || !editAnnouncement.message) {
      return alert("Veuillez remplir tous les champs !");
    }

    setUpdateLoading(true);
    try {
      const res = await Api.patch(`/announcements/${editAnnouncement.id}`, {
        title: editAnnouncement.title,
        message: editAnnouncement.message,
      });

      setAnnouncements((prev) =>
        prev.map((a) => (a.id === res.data.id ? res.data : a))
      );

      setShowEditModal(false);
      setEditAnnouncement(null);
    } catch (err) {
      console.error("Erreur lors de la modification", err);
      alert("Impossible de modifier l'annonce. Veuillez réessayer.");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Pagination
  const paginated = announcements.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) {
    return (
      <div className="acc-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }

  return (
    <div className="announcement-wrapper">
      <h2 className="announcement-header">
        <Bell size={24} /> Annonces
      </h2>

      {/* Formulaire (directeur uniquement) */}
      {role === "directeur" && (
        <div className="announcement-add">
          <input
            type="text"
            placeholder="Titre de l'annonce"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <textarea
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>

          <button onClick={handleAdd} className="btn-add">
            <PlusCircle size={16} /> Ajouter
          </button>
        </div>
      )}

      {/* Liste des annonces */}
      {paginated.length === 0 ? (
        <p className="no-announcements">Aucune annonce disponible.</p>
      ) : (
        <div className="announcement-list">
          {paginated.map((a) => (
            <div key={a.id} className="announcement-card">
              <div className="announcement-info">
                <h3>{a.title}</h3>
                <p>{a.message}</p>

                <span className="author">
                  <User2 size={15} color="blue" /> Directeur
                </span>

                <span className="announcement-date">
                  {new Date(a.created_at).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {role === "directeur" && (
                <div className="announcement-actions">
                 

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="btn-delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀
        </button>

        <span>Page {page}</span>

        <button
          disabled={page * pageSize >= announcements.length}
          onClick={() => setPage(page + 1)}
        >
          ▶
        </button>
      </div>

      {/* MODAL EDIT */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Modifier l'annonce</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              value={editAnnouncement.title}
              onChange={(e) =>
                setEditAnnouncement({
                  ...editAnnouncement,
                  title: e.target.value,
                })
              }
            />

            <textarea
              value={editAnnouncement.message}
              onChange={(e) =>
                setEditAnnouncement({
                  ...editAnnouncement,
                  message: e.target.value,
                })
              }
            />

            <button
              className="btn-save"
              onClick={handleUpdate}
              disabled={updateLoading}
            >
              {updateLoading ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
