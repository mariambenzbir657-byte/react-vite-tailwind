import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Heart,
  Plus,
  Pencil,
  Trash2,
  X,
  Sparkles,
  Search,
  Settings,
  ArrowLeft,
} from "lucide-react";

// Helper to join class names
const cx = (...c) => c.filter(Boolean).join(" ");

/* ================= MODAL ================= */
const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/* ================= INPUT ================= */
const InputField = ({ label, value, onChange, type = "text", placeholder }) => (
  <label className="block">
    <span className="text-sm font-semibold text-gray-800">{label}</span>
    <input
      type={type}
      value={type !== "file" ? value : undefined}
      placeholder={placeholder}
      onChange={(e) => {
        if (type === "file") {
          onChange(e.target.files[0]);
        } else {
          onChange(e.target.value);
        }
      }}
      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
    />
  </label>
);

/* ================= CRUD TABLE ================= */
const CrudTable = ({
  title,
  accent = "pink",
  columns,
  rows,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [q, setQ] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const accentClasses =
    accent === "pink"
      ? "bg-pink-600 hover:bg-pink-700"
      : accent === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : accent === "green"
      ? "bg-green-700 hover:bg-green-800"
      : "bg-pink-600 hover:bg-pink-700";

  const empty = Object.fromEntries(columns.map((c) => [c.key, ""]));
  const [formData, setFormData] = useState(empty);

  // Reset form data when modal opens/closes
  useEffect(() => {
    if (editRow) {
      setFormData({ ...editRow, image: null });
    }
  }, [editRow]);

  // handleChange pour inputs
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // open create modal
  const openCreate = () => {
    setFormData(empty);
    setIsCreateOpen(true);
    setEditRow(null);
  };

  // close edit modal
  const closeEdit = () => {
    setEditRow(null);
  };

  // Filtrer les rows selon recherche
  const filtered = useMemo(() => {
    if (!q) return rows;
    return rows.filter((r) =>
      columns.some((c) =>
        String(r[c.key] ?? "").toLowerCase().includes(q.toLowerCase())
      )
    );
  }, [q, rows, columns]);

  const saveCreate = () => {
    onCreate(formData);
    setIsCreateOpen(false);
  };

  const saveEdit = () => {
    onUpdate(editRow.id, formData);
    setEditRow(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full">
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            CRUD statique (create / edit / delete) sans API.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher…"
              className="pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <button
            onClick={openCreate}
            className={cx(
              "inline-flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition",
              accentClasses
            )}
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-6 py-3 font-semibold uppercase text-xs tracking-wide"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-6 py-3 font-semibold uppercase text-xs tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/60">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="px-6 py-3 text-gray-800 whitespace-nowrap"
                  >
                    {c.key === "mdp" ? (
                      "******"
                    ) : c.key === "image" ? (
                      r.image ? (
                        typeof r.image === "string" ? (
                          <img
                            src={
                              r.image
                                ? `http://localhost:4000/uploads/${r.image}`
                                : "/placeholder.png"
                            }
                            alt="img"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            Nouvelle image
                          </span>
                        )
                      ) : (
                        "-"
                      )
                    ) : (
                      String(r[c.key] ?? "")
                    )}
                  </td>
                ))}

                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => {
                        setEditRow(r);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition text-gray-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => onDelete(r.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 transition"
                    >
                      <Trash2 className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  className="px-6 py-10 text-center text-gray-500"
                  colSpan={columns.length + 1}
                >
                  Aucun résultat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      <Modal
        title={`Ajouter — ${title}`}
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {columns
            .filter((c) => c.key !== "id")
            .map((c) => (
              <InputField
                key={c.key}
                label={c.label}
                value={formData[c.key]}
                onChange={(v) => handleChange(c.key, v)}
                type={c.key === "image" ? "file" : "text"}
              />
            ))}
        </div>
        {formData.image && typeof formData.image === "object" && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="preview"
            className="w-24 h-24 object-cover rounded-md mt-2"
          />
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsCreateOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-semibold"
          >
            Annuler
          </button>
          <button
            onClick={saveCreate}
            className={cx(
              "px-4 py-2.5 rounded-xl text-white font-semibold transition",
              accentClasses
            )}
          >
            Enregistrer
          </button>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        title={`Modifier - ${title}`}
        isOpen={!!editRow}
        onClose={() => setEditRow(null)}
      >
        {editRow && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800">
            ID
          </label>
          <p className="mt-1 text-gray-600 select-all bg-gray-50 px-3 py-2 rounded-xl">
            {editRow.id}
          </p>
        </div>
        )}
        {columns
          .filter((c) => c.key !== "id") // exclude id from editable inputs
          .map((c) => (
          <InputField
            key={c.key}
            label={c.label}
            value={formData[c.key]}
            onChange={(v) => handleChange(c.key, v)}
            type={c.key === "image" ? "file" : "text"}
          />
        ))}
        {formData.image && typeof formData.image === "object" && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="preview"
            className="w-24 h-24 object-cover rounded-md mt-2"
          />
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={closeEdit}
            className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-semibold"
          >
            Annuler
          </button>
          <button
            onClick={saveEdit}
            className={cx(
              "px-4 py-2.5 rounded-xl text-white font-semibold transition",
              accentClasses
            )}
          >
            Sauvegarder
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default function SmartBabyCareAdminDashboard() {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [sitters, setSitters] = useState([]);
  const [section, setSection] = useState("parents");

  const accent = "pink"; 
  const accentBg =
    accent === "pink"
      ? "bg-pink-600"
      : accent === "blue"
      ? "bg-blue-600"
      : accent === "green"
      ? "bg-green-700"
      : "bg-pink-600";

  const accentBorder =
    accent === "pink"
      ? "border-pink-600"
      : accent === "blue"
      ? "border-blue-600"
      : accent === "green"
      ? "border-green-700"
      : "border-pink-600";

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  /* ===== GET DATA ===== */
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/", authHeader)
      .then((res) => {
        const users = res.data;

        const parentsData = users.filter(
          (u) => u.role && u.role.toLowerCase() === "parent"
        );

        const sittersData = users.filter(
          (u) => u.role && u.role.toLowerCase() === "babysitter"
        );

        setParents(
          parentsData.map((p) => ({
            id: p._id,
            nom: p.nom,
            prenom: p.prenom,
            email: p.email,
            role: p.role,
            mdp: p.mdp,
            adresse: p.adresse,
            image: p.image,
          }))
        );

        setSitters(
          sittersData.map((s) => ({
            id: s._id,
            nom: s.nom,
            prenom: s.prenom,
            email: s.email,
            role: s.role,
            mdp: s.mdp,
            qualifications: s.qualifications,
            estVerifie: s.estVerifie,
            disponibilites: s.disponibilites,
            image: s.image,
          }))
        );
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  /* ===== CRUD FUNCTIONS ===== */
  const handleCreate = async (d, role) => {
    if (!d.mdp || d.mdp.trim() === "") {
      alert("Veuillez saisir un mot de passe.");
      return;
    }

    try {
      const fd = new FormData();

      let roleValue = role.toLowerCase() === "parent" ? "Parent" : "BabySitter";

      Object.entries({ ...d, role: roleValue }).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            fd.append("image", value);
          }
        } else if (value !== undefined && value !== null) {
          fd.append(key, value);
        }
      });

      const res = await axios.post(
        "http://localhost:4000/api/users/ajouter",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (roleValue === "Parent") {
        setParents([{ ...d, id: res.data._id, role: roleValue }, ...parents]);
      } else {
        setSitters([{ ...d, id: res.data._id, role: roleValue }, ...sitters]);
      }
    } catch (err) {
      console.error("Create error:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        console.error("Response data:", err.response.data);
      }
    }
  };

  const handleUpdate = async (id, d, role) => {
    try {
      const formDataToSend = new FormData();
      Object.entries(d).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            formDataToSend.append("image", value);
          }
        } else if (value !== undefined && value !== null) {
          formDataToSend.append(key, value);
        }
      });

      await axios.put(
        `http://localhost:4000/api/users/modifier/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (role === "parent") {
        setParents(parents.map((p) => (p.id === id ? { ...p, ...d } : p)));
      } else {
        setSitters(sitters.map((s) => (s.id === id ? { ...s, ...d } : s)));
      }
    } catch (err) {
      console.error("Update error:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
      }
    }
  };

  const handleDelete = async (id, role) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`, authHeader);
      if (role === "parent") setParents(parents.filter((p) => p.id !== id));
      else setSitters(sitters.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 hidden md:flex flex-col border-r border-gray-200 bg-white sticky top-0 h-screen">
          <div className={`px-6 py-5 border-b-4 ${accentBg} ${accentBorder}`}>
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-2xl ${accentBg} text-white flex items-center justify-center shadow-lg`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
              <p
                onClick={() => navigate("/TableaubordParent")}
                className="text-sm uppercase tracking-wider text-pink-200 font-bold cursor-pointer hover:text-pink-300 transition"
              >
                Admin
              </p>

                <h2 onClick={() => navigate("/")}
                  className="font-bold text-white text-lg cursor-pointer hover:opacity-80 transition"
                >
                SmartBabyCare
                </h2>
              </div>
            </div>
          </div>
          <nav className="flex flex-col flex-1 p-6">
            <button
              onClick={() => setSection("parents")}
              className={cx(
                "flex items-center gap-3 px-4 py-2 rounded-xl text-gray-800 font-semibold text-sm hover:bg-pink-50 transition",
                section === "parents" && "bg-pink-100"
              )}
            >
              <Users className="w-5 h-5" />
              Parents
            </button>
            <button
              onClick={() => setSection("sitters")}
              className={cx(
                "flex items-center gap-3 px-4 py-2 rounded-xl text-gray-800 font-semibold text-sm hover:bg-pink-50 transition",
                section === "sitters" && "bg-pink-100"
              )}
            >
              <Heart className="w-5 h-5" />
              Babysitters
            </button>
          </nav>
          <div className="px-4 pb-6">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
              <Settings className="w-4 h-4" />
              <span className="font-semibold">Paramètres</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 w-full">
          {section === "parents" && (
            <CrudTable
              accent={accent}
              title="Parents"
              columns={[
                { key: "id", label: "ID" },
                { key: "nom", label: "Nom" },
                { key: "prenom", label: "Prénom" },
                { key: "email", label: "Email" },
                { key: "mdp", label: "Mot de passe" },
                { key: "adresse", label: "Adresse" },
                { key: "image", label: "Image" },
              ]}
              rows={parents}
              onCreate={(d) => handleCreate(d, "parent")}
              onUpdate={(id, d) => handleUpdate(id, d, "parent")}
              onDelete={(id) => handleDelete(id, "parent")}
            />
          )}

          {section === "sitters" && (
            <CrudTable
              accent={accent}
              title="Babysitters"
              columns={[
                { key: "id", label: "ID" },
                { key: "nom", label: "Nom" },
                { key: "prenom", label: "Prénom" },
                { key: "email", label: "Email" },
                { key: "mdp", label: "Mot de passe" },
                { key: "qualifications", label: "Qualifications" },
                { key: "estVerifie", label: "Vérifié" },
                { key: "disponibilites", label: "Disponibilités" },
                { key: "image", label: "Image" },
              ]}
              rows={sitters}
              onCreate={(d) => handleCreate(d, "babysitter")}
              onUpdate={(id, d) => handleUpdate(id, d, "babysitter")}
              onDelete={(id) => handleDelete(id, "babysitter")}
            />
          )}
          
        </main>
      </div>
    </div>
  );
}
