import { useState, useEffect } from "react";
import api from "../../src/Api";
import { Send, MessageSquare, Reply, PlusCircle } from "lucide-react";

import "./contact.css";

export default function Reclamations({user}) {
 // ⭐ utilisateur connecté
  const [contacts, setContacts] = useState([]);
  const [replyMsg, setReplyMsg] = useState({});
  const [loadingReplies, setLoadingReplies] = useState({});
  const [newRec, setNewRec] = useState({
    sujet: "",
    message: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🔵 GET — Récupérer réclamations de l’utilisateur connecté uniquement
  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts");

      // ⭐ Filtrer seulement ce qui appartient à l'utilisateur
      const filtered = res.data.filter((c) => c.user_id === user.id);
      setContacts(filtered);

    } catch (err) {
      console.error(err);
      alert("Erreur lors de la récupération des réclamations");
    }
  };

  // 🔵 GET — réponses pour une réclamation
  const fetchReplies = async (contactId) => {
    setLoadingReplies((prev) => ({ ...prev, [contactId]: true }));

    try {
      const res = await api.get(`/contacts/${contactId}/replies`);
      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? { ...c, responses: res.data } : c))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [contactId]: false }));
    }
  };

  // 🔵 POST — envoyer une réponse
  const sendReply = async (contactId) => {
    if (!replyMsg[contactId]) return alert("Écrivez votre réponse !");
    try {
      await api.post(`/contacts/${contactId}/reply`, {
        replied_by: user.role || "Utilisateur",
        message: replyMsg[contactId],
      });

      setReplyMsg((prev) => ({ ...prev, [contactId]: "" }));
      fetchReplies(contactId);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi");
    }
  };

  // 🔵 POST — nouvelle réclamation
  const sendNewReclamation = async () => {
    if (!newRec.sujet || !newRec.message)
      return alert("Veuillez remplir tous les champs.");

    try {
      await api.post("/contacts", {
        ...newRec,
        user_id: user.id,         // ⭐ association à l'utilisateur
        name: user.name,
        email: user.email,
      });

      setNewRec({ sujet: "", message: "" });
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi de la réclamation");
    }
  };

  return (
    <div className="reclamations-wrapper">

      {/* 📌 Formulaire nouvelle réclamation */}
      <div className="new-rec-card">
        <h3><PlusCircle size={18}/> Nouvelle réclamation</h3>

        <input
          type="text"
          placeholder="Sujet"
          value={newRec.sujet}
          onChange={(e) => setNewRec({ ...newRec, sujet: e.target.value })}
        />

        <textarea
          placeholder="Votre message..."
          value={newRec.message}
          onChange={(e) => setNewRec({ ...newRec, message: e.target.value })}
        />

        <button className="send-btn" onClick={sendNewReclamation}>
          <Send size={16} /> Envoyer
        </button>
      </div>

      <hr />

      {/* 📌 Liste des réclamations */}
      {contacts.length === 0 && (
        <p style={{ opacity: 0.6 }}>
          Aucune réclamation pour le moment.
        </p>
      )}

      {contacts.map((c) => (
        <div key={c.id} className="contact-card">
          <h4><MessageSquare size={16}/> {c.sujet}</h4>
          <p><strong>Message :</strong> {c.message}</p>

          <button
            onClick={() => fetchReplies(c.id)}
            disabled={loadingReplies[c.id]}
          >
            {loadingReplies[c.id] ? "Chargement..." : "Voir les réponses"}
          </button>

          <div className="responses">
            {c.responses?.length > 0 ? (
              c.responses.map((r) => (
                <div key={r.id} className="response-card">
                  <strong><Reply size={14}/> {r.replied_by} :</strong> {r.message}
                  <small>
                    {new Date(r.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <small>Aucune réponse</small>
            )}
          </div>

          <div className="reply-box">
            <textarea
              placeholder="Répondre..."
              value={replyMsg[c.id] || ""}
              onChange={(e) =>
                setReplyMsg((prev) => ({ ...prev, [c.id]: e.target.value }))
              }
            />
            <button onClick={() => sendReply(c.id)}>
              <Send size={14}/> Répondre
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
