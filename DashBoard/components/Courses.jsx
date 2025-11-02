import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, School, ChevronDown } from "lucide-react";
import "./courses.css";

const defaultSubjects = [
  { id: "1", code: "MATH101", name: "Mathématiques", description: "Cours de maths de base" },
  { id: "2", code: "PHYS101", name: "Physique", description: "Cours de physique" },
  { id: "3", code: "CHEM101", name: "Chimie", description: "Cours de chimie" },
];

export default function CoursesPage() {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({ name: "", code: "", description: "" });
 
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    setSubjects(storedSubjects.length ? storedSubjects : defaultSubjects);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, );

  const handleOpenDialog = (subject) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({ name: subject.name, code: subject.code, description: subject.description });
    } else {
      setEditingSubject(null);
      setFormData({ name: "", code: "", description: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedSubjects;
    if (editingSubject) {
      updatedSubjects = subjects.map((s) =>
        s.id === editingSubject.id ? { ...editingSubject, ...formData } : s
      );
    } else {
      updatedSubjects = [...subjects, { id: Date.now().toString(), ...formData }];
    }
    setSubjects(updatedSubjects);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière ?")) {
      const updatedSubjects = subjects.filter((s) => s.id !== id);
      setSubjects(updatedSubjects);
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.code.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  const handleSort = (field) => {
    const asc = sortField === field ? !sortAsc : true;
    setSortField(field);
    setSortAsc(asc);
    const sorted = [...(filteredSubjects.length ? filteredSubjects : subjects)].sort((a, b) =>
      asc ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])
    );
    setFilteredSubjects(sorted);
  };

  const displayedSubjects = filteredSubjects.length ? filteredSubjects : subjects;

  // Statistiques
  const totalCourses = subjects.length;
  const totalEnrollment = subjects.length * 10; // Exemple simple
  const avgCapacity = subjects.length ? Math.floor((totalEnrollment / (subjects.length * 10)) * 100) : 0;
  const fullCourses = subjects.length ? 1 : 0; // Exemple simple

  return (
    <div className={`courses-page theme`}>
      <div className="header">
        <div>
          <h1>Gestion des matières</h1>
          <p>Gérez toutes les matières enseignées</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} /> Ajouter une matière
          </button>
        </div>
      </div>

      {/* Dashboard Statistiques */}
      <div className="dashboard">
        <div className="card-stats">
          <h3>Total Courses</h3>
          <p>{totalCourses}</p>
          <div className="progress-bar">
            <div className="progress-fill progress-success" style={{ width: "100%" }}></div>
          </div>
        </div>
        <div className="card-stats">
          <h3>Total Enrollment</h3>
          <p>{totalEnrollment}</p>
          <div className="progress-bar">
            <div className="progress-fill progress-success" style={{ width: "75%" }}></div>
          </div>
        </div>
        <div className="card-stats">
          <h3>Avg Capacity</h3>
          <p>{avgCapacity}%</p>
          <div className="progress-bar">
            <div className="progress-fill progress-warning" style={{ width: `${avgCapacity}%` }}></div>
          </div>
        </div>
        <div className="card-stats">
          <h3>Full Courses</h3>
          <p>{fullCourses}</p>
          <div className="progress-bar">
            <div className="progress-fill progress-danger" style={{ width: "10%" }}></div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <h2><School size={20} /> Liste des matières ({displayedSubjects.length})</h2>
        </div>
        <div className="card-content">
          <input
            type="text"
            placeholder="Rechercher par nom ou code..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="input-search"
          />
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("code")}>Code <ChevronDown size={12} /></th>
                <th onClick={() => handleSort("name")}>Nom <ChevronDown size={12} /></th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubjects.length > 0 ? (
                displayedSubjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.code}</td>
                    <td>{subject.name}</td>
                    <td>{subject.description}</td>
                    <td>
                      <button className="btn-icon edit" onClick={() => handleOpenDialog(subject)}><Pencil size={16} /></button>
                      <button className="btn-icon delete" onClick={() => handleDelete(subject.id)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">Aucune matière trouvée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingSubject ? "Modifier la matière" : "Ajouter une matière"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Code de la matière"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Nom de la matière"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsDialogOpen(false)}>Annuler</button>
                <button type="submit" className="btn-primary">{editingSubject ? "Modifier" : "Ajouter"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
