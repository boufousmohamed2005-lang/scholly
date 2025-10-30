import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, School, Sun, Moon, Droplet, ChevronDown } from "lucide-react";
import "./courses.css";

const themes = ["clair", "dark", "coloré"];
const defaultSubjects = [
  { id: "1", code: "MATH101", name: "Mathématiques", description: "Cours de maths de base" },
  { id: "2", code: "PHYS101", name: "Physique", description: "Cours de physique" },
  { id: "3", code: "CHEM101", name: "Chimie", description: "Cours de chimie" },
];

export default function SubjectsPage({ initialTheme = "clair" }) {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({ name: "", code: "", description: "" });
  const [professorCounts, setProfessorCounts] = useState({});
  const [theme, setTheme] = useState(initialTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  });

  const loadData = () => {
    let subjectsData = JSON.parse(localStorage.getItem("subjects") || "[]");
    if (subjectsData.length === 0) subjectsData = defaultSubjects;

    let professorsData = JSON.parse(localStorage.getItem("professors") || "[]");
    setSubjects(subjectsData);

    const counts = {};
    subjectsData.forEach((subject) => {
      counts[subject.name] = professorsData.filter((p) => p.subject === subject.name).length;
    });
    setProfessorCounts(counts);
  };

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
      alert("Matière modifiée !");
    } else {
      const newSubject = { id: Date.now().toString(), ...formData };
      updatedSubjects = [...subjects, newSubject];
      alert("Nouvelle matière ajoutée !");
    }
    setSubjects(updatedSubjects);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setIsDialogOpen(false);
    loadData();
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière ?")) {
      const updatedSubjects = subjects.filter((s) => s.id !== id);
      setSubjects(updatedSubjects);
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      alert("Matière supprimée !");
      loadData();
    }
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "clair": return <Sun size={16} />;
      case "dark": return <Moon size={16} />;
      case "coloré": return <Droplet size={16} />;
      default: return <Sun size={16} />;
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
    const sorted = [...(filteredSubjects.length ? filteredSubjects : subjects)].sort((a, b) => {
      if (field === "professors") {
        return asc
          ? (professorCounts[a.name] || 0) - (professorCounts[b.name] || 0)
          : (professorCounts[b.name] || 0) - (professorCounts[a.name] || 0);
      } else {
        return asc
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });
    setFilteredSubjects(sorted);
  };

  const displayedSubjects = filteredSubjects.length ? filteredSubjects : subjects;

  return (
    <div className={`subjects-page theme-${theme}`}>
      <div className="header">
        <div>
          <h1>Gestion des matières</h1>
          <p>Gérez toutes les matières enseignées</p>
        </div>
        <div className="header-actions">
          <button className="btn-theme" onClick={toggleTheme}>
            {getThemeIcon()} {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
          <button className="btn-primary" onClick={() => handleOpenDialog()}>
            <Plus size={16} /> Ajouter une matière
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>
            <School size={20} /> Liste des matières ({displayedSubjects.length})
          </h2>
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
                <th className="text-center" onClick={() => handleSort("professors")}>
                  Professeurs <ChevronDown size={12} />
                </th>
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
                    <td className="text-center">{professorCounts[subject.name] || 0}</td>
                    <td className="text-right">
                      <button className="btn-ghost" onClick={() => handleOpenDialog(subject)}>
                        <Pencil size={16} />
                      </button>
                      <button className="btn-ghost btn-destructive" onClick={() => handleDelete(subject.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Aucune matière trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <h3>{editingSubject ? "Modifier la matière" : "Ajouter une matière"}</h3>
            <p>{editingSubject ? "Modifiez les informations de la matière" : "Remplissez les informations de la nouvelle matière"}</p>
            <form onSubmit={handleSubmit}>
              <label>
                Code de la matière
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="ex: MATH101"
                  required
                />
              </label>
              <label>
                Nom de la matière
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Mathématiques"
                  required
                />
              </label>
              <label>
                Description
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de la matière"
                  required
                />
              </label>
              <div className="dialog-actions">
                <button type="button" className="btn-outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingSubject ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
