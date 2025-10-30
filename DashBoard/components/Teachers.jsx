import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Search,
  FileSpreadsheet,
  FileDown,
  GripVertical,
  Moon,
  Sun,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react";
import "./teachers.css";

export default function ProfessorsPage() {
  const [professors, setProfessors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [regions, setRegions] = useState([]);

  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);

  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const dragIndex = useRef(null);

  const save = (data) =>
    localStorage.setItem("professors", JSON.stringify(data));

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("professors") || "[]");
    const s = JSON.parse(localStorage.getItem("subjects") || "[]");
    const r = JSON.parse(localStorage.getItem("regions") || "[]");

    setProfessors(p);
    setSubjects(s.map((x) => x.name));
    setRegions(r.map((x) => x.name));
  }, []);

  useEffect(() => {
    let list = [...professors];

    if (search)
      list = list.filter(
        (p) =>
          p.firstName.toLowerCase().includes(search) ||
          p.lastName.toLowerCase().includes(search) ||
          p.email.toLowerCase().includes(search)
      );

    if (filterSubject !== "all")
      list = list.filter((p) => p.subject === filterSubject);

    if (filterRegion !== "all")
      list = list.filter((p) => p.region === filterRegion);

    setFiltered(list);
  }, [search, filterRegion, filterSubject, professors]);

  const openModal = (prof = null) => {
    setForm(
      prof || {
        firstName: "",
        lastName: "",
        subject: "",
        region: "",
        email: "",
        phone: "",
      }
    );
    setEditId(prof?.id || null);
    setShowModal(true);
  };

  const saveForm = () => {
    let updated;
    if (editId) {
      updated = professors.map((p) => (p.id === editId ? form : p));
    } else {
      updated = [...professors, { id: Date.now().toString(), ...form }];
    }
    setProfessors(updated);
    save(updated);
    setShowModal(false);
  };

  const del = (id) => {
    if (!window.confirm("Supprimer ce professeur ?")) return;
    const updated = professors.filter((p) => p.id !== id);
    setProfessors(updated);
    save(updated);
  };

  /* Pagination */
  const totalPages = Math.ceil(filtered.length / pageSize);
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  /* Export CSV */
  const exportCSV = () => {
    const rows = [
      ["Nom", "Prénom", "Matière", "Région", "Email", "Téléphone"],
      ...filtered.map((p) => [
        p.lastName,
        p.firstName,
        p.subject,
        p.region,
        p.email,
        p.phone,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "professeurs.csv";
    a.click();
  };

  /* Export PDF = print view */
  const exportPDF = () => window.print();

  /* Drag & Drop */
  const dragStart = (index) => (dragIndex.current = index);
  const dragOver = (e) => e.preventDefault();
  const drop = (index) => {
    const copy = [...professors];
    const [moved] = copy.splice(dragIndex.current, 1);
    copy.splice(index, 0, moved);
    setProfessors(copy);
    save(copy);
  };

  return (
    <div className={dark ? "page dark" : "page"}>
      <header className="topbar">
        <h1>Gestion des professeurs</h1>
        <button onClick={() => setDark((d) => !d)}>
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>

      <div className="filters">
        <div className="input-icon">
          <Search />{" "}
          <input
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>

        <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
          <option value="all">Toutes matières</option>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
          <option value="all">Toutes régions</option>
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <button className="addbtn" onClick={() => openModal()}>
          <Plus /> Ajouter
        </button>
      </div>

      <div className="export">
        <button onClick={exportCSV}>
          <FileSpreadsheet /> Excel
        </button>
        <button onClick={exportPDF}>
          <FileDown /> PDF
        </button>
      </div>

      <div className="table-wrapper">
        <table className="smooth">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matière</th>
              <th>Région</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {current.map((p, i) => (
              <tr
                key={p.id}
                draggable
                onDragStart={() => dragStart((page - 1) * pageSize + i)}
                onDragOver={dragOver}
                onDrop={() => drop((page - 1) * pageSize + i)}
              >
                <td className="drag"><GripVertical /></td>
                <td>{p.lastName}</td>
                <td>{p.firstName}</td>
                <td>{p.subject}</td>
                <td>{p.region}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td className="actions">
                  <button onClick={() => openModal(p)}><Pencil size={15} /></button>
                  <button onClick={() => del(p.id)} className="red"><Trash2 size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && <div className="empty">Aucun professeur 🤷‍♂️</div>}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>←</button>
        <span>{page}/{totalPages || 1}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>→</button>
      </div>

      {showModal && (
        <div className="modal-bg" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? "Modifier" : "Ajouter"}</h2>

            {["lastName","firstName","subject","region","email","phone"].map((f)=>(
              <input key={f} placeholder={f}
                value={form[f]||""}
                onChange={(e)=> setForm({...form,[f]:e.target.value})}/>
            ))}

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={saveForm}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
