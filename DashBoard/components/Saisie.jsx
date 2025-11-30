import React, { useState } from "react";
import { Bell, Edit, Trash2, PlusCircle } from "lucide-react";
import "./saisie.css";

export default function RecentActivity({ isDark,role }) {
  const [activities, setActivities] = useState([
    { id: 1, text: "Cours de React", datetime: "2025-10-29T18:00" },
    { id: 2, text: "Réunion professeurs", datetime: "2025-10-30T09:30" },
  ]);
  const [newText, setNewText] = useState("");
  const [newDateTime, setNewDateTime] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = () => {
    if (!newText || !newDateTime) return;

    if (editId) {
      setActivities(
        activities.map((a) =>
          a.id === editId ? { ...a, text: newText, datetime: newDateTime } : a
        )
      );
      setEditId(null);
    } else {
      setActivities([
        ...activities,
        { id: Date.now(), text: newText, datetime: newDateTime },
      ]);
    }
    setNewText("");
    setNewDateTime("");
  };

  const handleDelete = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleEdit = (activity) => {
    setEditId(activity.id);
    setNewText(activity.text);
    setNewDateTime(activity.datetime);
  };

  const formatDateTime = (datetime) => {
    const options = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(datetime).toLocaleString("fr-FR", options);
  };

  return (
   
    <div className={`recent-activity ${isDark ? "dark" : ""}`}>
       { 
      role !== "student" && role !== "professor"  && <>
      <div className="recent-header">
        <h2>
          <Bell size={20} /> Recent Activity
        </h2>
      </div>
     
     
      <div className="add-activity">
        <input
          type="text"
          placeholder="Nouvelle activité..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <input
          type="datetime-local"
          value={newDateTime}
          min={new Date().toISOString().slice(0,16)}
          onChange={(e) => setNewDateTime(e.target.value)}
        />
    
      <button onClick={handleAddOrEdit}>
          <PlusCircle size={18} /> {editId ?  "Modifier" : "Ajouter"}
        </button>
      </div>
      </>}

      <ul className="activity-list">
        {activities.length > 0 ? (
          activities.map((a) => (
            <li key={a.id} className="activity-item">
              <div className="activity-icon">
                <Bell size={16} />
              </div>
              <div className="activity-content">
                <p className="activity-text">{a.text}</p>
                <span className="activity-time">📅 {formatDateTime(a.datetime)}</span>
              </div>

              <div className="activity-actions">
          {  role != "student" && role != "professor" && <>
                <button onClick={() => handleEdit(a)} title="Modifier">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(a.id)} title="Supprimer">
                  <Trash2 size={16} />
                </button></>
                }
              </div>
            </li>
          ))
        ) : (
          <p className="no-activity">Aucune activité pour le moment.</p>
        )}
      </ul>
      

    </div>
  
  );
}
