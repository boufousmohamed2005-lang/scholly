import React, { useEffect, useState } from "react";
import axios from "axios";

const VoituresList = () => {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    axios
      .get("http://localhost:8000/voitures") 
      .then((res) => {
       // Affiche les données dans la console
        setVoitures(res.data); // Met à jour l'état
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return  <div className="loader"> </div>   ;

  return (
    <div>
      <h2>Liste des voitures</h2>

      {voitures.length === 0 ? (
        <p>Aucune voiture trouvée.</p>
      ) : (
        <ul>
          {voitures.map((v) => (
            <li >
                {v.marque} - {v.modele} ({v.annee})
                 </li>
          ))}
        </ul>
      )}
     
    </div>
  );
};

export default VoituresList;
