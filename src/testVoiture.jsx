import React, { useEffect, useState } from "react";
import Api from "./Api"

const VoituresList = () => {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(()=>{
 Api
      .get("/etudiants")
     
      .then((res) => {
        setVoitures(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  },[voitures])

  if (loading) return <div className="loader">Chargement...  </div>;
  if (error) return <div className="error">Erreur : {error}</div>;

  return (
    <div>
      <h2>Liste des voitures</h2>
      {voitures.length === 0 ? (
        <p>Aucune voiture trouvée.

          </p>

      ) : (
        <ul>
          {voitures.map((v) => (
            <li key={v.id}>
              {v.id}
              {v.Nom}
              {v.Prenom}
              {v.Class}
              
              </li>
          ))}
         
       
        </ul>
      )}
    </div>
  );
};

export default VoituresList;