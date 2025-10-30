import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import "./region.css";

export default function Regions() {
  const [regions, setRegions] = useState([]);
  const [stats, setStats] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const regionsData = JSON.parse(localStorage.getItem("regions") || "[]");
    const studentsData = JSON.parse(localStorage.getItem("students") || "[]");
    const professorsData = JSON.parse(localStorage.getItem("professors") || "[]");

    setRegions(regionsData);

    const regionStats = {};
    regionsData.forEach((region) => {
      regionStats[region.name] = {
        students: studentsData.filter((s) => s.region === region.name).length,
        professors: professorsData.filter((p) => p.region === region.name).length,
      };
    });
    setStats(regionStats);
  };

  const handleOpenDialog = (region = null) => {
    if (region) {
      setEditingRegion(region);
      setFormData({ name: region.name, description: region.description });
    } else {
      setEditingRegion(null);
      setFormData({ name: "", description: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedRegions;

    if (editingRegion) {
      updatedRegions = regions.map((r) =>
        r.id === editingRegion.id ? { ...editingRegion, ...formData } : r
      );
    } else {
      const newRegion = { id: Date.now().toString(), ...formData };
      updatedRegions = [...regions, newRegion];
    }

    setRegions(updatedRegions);
    localStorage.setItem("regions", JSON.stringify(updatedRegions));
    setIsDialogOpen(false);
    loadData();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette région ?")) return;
    const updatedRegions = regions.filter((r) => r.id !== id);
    setRegions(updatedRegions);
    localStorage.setItem("regions", JSON.stringify(updatedRegions));
    loadData();
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Gestion des régions</h1>
        <button className="add-btn" onClick={() => handleOpenDialog()}>
          <Plus /> Ajouter
        </button>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Étudiants</th>
              <th>Professeurs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.length > 0 ? (
              regions.map((region) => (
                <tr key={region.id}>
                  <td>{region.name}</td>
                  <td>{region.description}</td>
                  <td>{stats[region.name]?.students || 0}</td>
                  <td>{stats[region.name]?.professors || 0}</td>
                  <td>
                    <button onClick={() => handleOpenDialog(region)} className="icon-btn">
                      <Pencil />
                    </button>
                    <button onClick={() => handleDelete(region.id)} className="icon-btn red">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  Aucune région trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="modal-bg" onClick={() => setIsDialogOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingRegion ? "Modifier la région" : "Ajouter une région"}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Nom de la région
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Description
                <input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </button>
                <button type="submit">{editingRegion ? "Modifier" : "Ajouter"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
