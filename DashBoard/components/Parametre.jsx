import "./parametre.css";
import { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import Api from "../../src/Api";

export default function AccountSettings({ userId, role }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [originalForm, setOriginalForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const endpoints = {
    student: "etudiants",
    professor: "professeurs",
    director: "directeurs",
  };
  const profileEndpoint = endpoints[role] || "directeurs";

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Récupérer user
        const userRes = await Api.get(`/users/${userId}`);
        // Récupérer profil
        const profileRes = await Api.get(`/${profileEndpoint}/by-user/${userId}`);

        const initialForm = {
          firstname: profileRes.data.Prenom || "",
          lastname: profileRes.data.Nom || "",
          email: userRes.data.email || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        };

        setForm(initialForm);
        setOriginalForm(initialForm);
      } catch (err) {
        console.error(err);
        setErrorMsg("Impossible de charger vos informations.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId, profileEndpoint]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const changedFields = {};
    if (form.firstname !== originalForm.firstname) changedFields.firstname = form.firstname;
    if (form.lastname !== originalForm.lastname) changedFields.lastname = form.lastname;
    if (form.email !== originalForm.email) changedFields.email = form.email;

    if (form.oldPassword && form.newPassword) {
      if (form.newPassword !== form.confirmPassword) return setErrorMsg("Les mots de passe ne correspondent pas.");
      changedFields.oldPassword = form.oldPassword;
      changedFields.newPassword = form.newPassword;
    }

    if (Object.keys(changedFields).length === 0) return setErrorMsg("Aucun changement détecté.");

    try {
      setLoading(true);

      // Update user si email ou password changé
      if (changedFields.email || changedFields.oldPassword || changedFields.newPassword) {
        await Api.put(`/users/${userId}`, {
          email: changedFields.email || undefined,
          oldPassword: changedFields.oldPassword || undefined,
          newPassword: changedFields.newPassword || undefined,
        });
      }

      // Update profil si firstname/lastname changé
      if (changedFields.firstname || changedFields.lastname) {
        await Api.put(`/${profileEndpoint}/update-by-user/${userId}`, {
          Nom: changedFields.lastname,
          Prenom: changedFields.firstname,
        });
      }

      setSuccessMsg("Profil mis à jour avec succès !");
      setOriginalForm(form);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="acc-wrapper">
      {loading && <div className="acc-loader"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>}
      {!loading && (
        <form className="acc-container" onSubmit={handleSubmit}>
          <h2 className="acc-title"><User size={24} /> Paramètres du compte</h2>
          {successMsg && <div className="acc-success">{successMsg}</div>}
          {errorMsg && <div className="acc-error">{errorMsg}</div>}

          <section className="acc-section">
            <h3><User size={18} /> Informations personnelles</h3>
            <div className="acc-grid">
              <div className="acc-input">
                <label>Nom</label>
                <input type="text" name="lastname" value={form.lastname} onChange={handleChange} placeholder="Votre nom" />
              </div>
              <div className="acc-input">
                <label>Prénom</label>
                <input type="text" name="firstname" value={form.firstname} onChange={handleChange} placeholder="Votre prénom" />
              </div>
            </div>
          </section>

          <section className="acc-section">
            <h3><Mail size={18} /> Email</h3>
            <div className="acc-input">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Votre email" />
            </div>
          </section>

          <section className="acc-section">
            <h3><Lock size={18} /> Sécurité du compte</h3>
            <div className="acc-grid">
              <div className="acc-input">
                <label>Ancien mot de passe</label>
                <input type="password" name="oldPassword" value={form.oldPassword} onChange={handleChange} placeholder="********" />
              </div>
              <div className="acc-input">
                <label>Nouveau mot de passe</label>
                <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="********" />
              </div>
              <div className="acc-input">
                <label>Confirmer</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="********" />
              </div>
            </div>
          </section>

          <button className="acc-btn" disabled={loading}>Enregistrer les modifications</button>
        </form>
      )}
    </div>
  );
}
