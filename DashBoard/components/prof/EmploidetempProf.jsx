import React, { useState, useEffect } from "react";
import Api from "../../../src/Api";
import "./emploiprof.css";
import useAuth from "../../../src/hook/Usehook";

export default function EmploiProf() {
  const [emplois, setEmplois] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmplois = async () => {
      if (!user) return;

      try {
        const res = await Api.get("/emplois");
        const filtered = res.data.filter(
          (e) => e.professeur?.toLowerCase() === user.name?.toLowerCase()
        );
        setEmplois(filtered);
      } catch (err) {
        console.error("Erreur chargement emploi :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmplois();
  }, [user]);

  // Loader pro
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    );
  }

  if (emplois.length === 0) {
    return <p className="empty-message">Aucun cours assigné pour {user.name}</p>;
  }

  return (
    <div className="emploi-wrapper fade-in">
      <h2 className="emploi-title">Emploi du temps de {user.name}</h2>

      <div className="table-container">
        <table className="emploi-table">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Heure début</th>
              <th>Heure fin</th>
              <th>Classe</th>
              <th>Matière</th>
            </tr>
          </thead>

          <tbody>
            {emplois.map((e) => (
              <tr key={e.id}>
                <td>{e.jour}</td>
                <td>{e.heure_debut}</td>
                <td>{e.heure_fin}</td>
                <td>{e.class ?? "Non défini"}</td>
                <td>{e.matiere}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
