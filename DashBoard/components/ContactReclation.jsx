import React, { useEffect, useState } from "react";
import { MessageSquare, Send, ChevronDown } from "lucide-react";
import api from "../../src/Api";
import "./contactReclamation.css";

export default function ReclamationList() {
  const [contacts, setContacts] = useState([]);
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const [open, setOpen] = useState(null);

  // Charger réclamations
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  // Charger réponses d’une réclamation
  const loadReplies = async (id) => {
    const res = await api.get(`/contacts/${id}/replies`);
    setReplies((prev) => ({ ...prev, [id]: res.data }));
  };

  const sendReply = async (id) => {
    if (!replyText[id]) return;

    await api.post(`/contacts/${id}/reply`, {
      message: replyText[id],
    });

    setReplyText({ ...replyText, [id]: "" });

    loadReplies(id);
  };

  const toggle = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
      loadReplies(id); // charge les réponses
    }
  };

  return (
    <div className="reclam-wrapper">
      <h2>Réclamations des Étudiants & Profs</h2>

      {contacts.map((c) => (
        <div key={c.id} className="reclam-card">
          <div className="reclam-header" onClick={() => toggle(c.id)}>
            <div>
              <h3>{c.sujet}</h3>
              <p className="email">{c.email}</p>
            </div>
            <ChevronDown className={open === c.id ? "rotate" : ""} />
          </div>

          {open === c.id && (
            <div className="reclam-body">
              <p className="message">{c.message}</p>

              <h4>Réponses :</h4>

              <div className="replies">
                {replies[c.id]?.length > 0 ? (
                  replies[c.id].map((r) => (
                    <div key={r.id} className="reply-item">
                      <strong>{r.replied_by}</strong>
                      <p>{r.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-reply">Aucune réponse pour l'instant.</p>
                )}
              </div>

              <div className="reply-box">
                <input
                  type="text"
                  placeholder="Envoyer une réponse..."
                  value={replyText[c.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [c.id]: e.target.value })
                  }
                />
                <button onClick={() => sendReply(c.id)}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
