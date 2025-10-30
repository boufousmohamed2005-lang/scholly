import React, { useEffect, useState } from "react";
import "./students.css";
import { Pencil, Trash2 } from "lucide-react";
export default function StudentsPage({setetu}) {
  // const [isDark, setIsDark] = useState(false);
  const [students, setStudents] = useState([]);
 
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    class: "",
    region: "",
    email: "",
    id:"",
    phone: "",
  });

  const classOptions = ["1ère année", "2ème année", "3ème année"];
  const regionOptions = ["Rabat", "Casablanca", "Tanger", "Marrakech"];

  // Données par défaut
  useEffect(() => {
    const defaultStudents = [
      {
        id: "STU001",
        firstName: "Youssef",
        lastName: "El Amrani",
        class: "1ère année",
        region: "Rabat",
        email: "youssef@example.com",
        phone: "0600000001",
        date: "2025-10-20",
      },
      {
        id: "STU002",
        firstName: "Sara",
        lastName: "Bennani",
        class: "2ème année",
        region: "Casablanca",
        email: "sara@example.com",
        phone: "0600000002",
        date: "2025-10-22",
      },
      {
        id: "STU003",
        firstName: "Omar",
        lastName: "Khalil",
        class: "3ème année",
        region: "Tanger",
        email: "omar@example.com",
        phone: "0600000003",
        date: "2025-10-24",
      },
    ];
    setStudents(defaultStudents);
   
  }, []);

  useEffect(() => {
    filterStudents();
  }, );

  const filterStudents = () => {
    let filtered = [...students];
    if (searchTerm)
      filtered = filtered.filter(
        (s) =>
          s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (filterClass !== "all")
      filtered = filtered.filter((s) => s.class === filterClass);

    if (filterRegion !== "all")
      filtered = filtered.filter((s) => s.region === filterRegion);

    setFilteredStudents(filtered);
  };

  const handleOpenDialog = (student) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        class: student.class,
        region: student.region,
        email: student.email,
        phone: student.phone,
      });
    } else {
      setEditingStudent(null);
      setFormData({
        firstName: "",
        lastName: "",
        class: "",
        region: "",
        email: "",
        phone: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      const updated = students.map((s) =>
        s.id === editingStudent.id ? { ...editingStudent, ...formData } : s
      );
      setStudents(updated);
    } else {
      const newStudent = {
        id: "STU" + String(Date.now()).slice(-4),
        ...formData,
        date: new Date().toISOString().split("T")[0],
      };
      setStudents([...students, newStudent]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet étudiant ?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };
  document.onload = function() {
  setetu(4);
}
  return (
    <div className={`students-page }`}>
      <header className="header">
        <h1>Gestion des étudiants</h1>
        <div className="actions">
          <button className="btn" onClick={() => handleOpenDialog(null)}>+ Ajouter</button>
          
        </div>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) =>{
               setetu(students.length);
          setSearchTerm(e.target.value)
          }}
         
        />
        <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
          <option value="all">Toutes les classes</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
          <option value="all">Toutes les régions</option>
          {regionOptions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Classe</th>
              <th>Région</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length ? (
              filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.lastName}</td>
                  <td>{s.firstName}</td>
                  <td>{s.class}</td>
                  <td>{s.region}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.date}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleOpenDialog(s)}><Pencil  size={20} /></button>
                    <button className="delete" onClick={() => handleDelete(s.id)}><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">Aucun étudiant trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>{editingStudent ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.firstName}
                  required
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.lastName}
                  required
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  required
                >
                  <option value="">Classe...</option>
                  {classOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                >
                  <option value="">Région...</option>
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="id"
                  value={formData.id}
                  required
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.phone}
                  required
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="dialog-actions">
                <button type="button" className="btn-outline" onClick={() => setIsDialogOpen(false)}>Annuler</button>
                <button type="submit" className="btn">{editingStudent ? "Modifier" : "Ajouter"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
