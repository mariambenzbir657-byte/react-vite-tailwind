import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    role: "Parent",         
    adresse: "",
    qualifications: "",
    estVerifie: false,
    disponibilites: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData);
    alert("Inscription réussie");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input name="nom" onChange={handleChange} placeholder="Nom" className="input" required />
      <input name="prenom" onChange={handleChange} placeholder="Prénom" className="input" required />
      <input name="email" onChange={handleChange} placeholder="Email" className="input" type="email" required />
      <input name="mdp" type="password" onChange={handleChange} placeholder="Mot de passe" className="input" required />

      <select name="role" onChange={handleChange} value={formData.role} className="input" required>
        <option value="Parent">Parent</option>
        <option value="BabySitter">BabySitter</option>
      </select>

      {formData.role === "Parent" && (
        <input name="adresse" onChange={handleChange} placeholder="Adresse" className="input" required />
      )}

      {formData.role === "BabySitter" && (
        <>
          <input name="qualifications" onChange={handleChange} placeholder="Qualifications" className="input" required />
          <input type="checkbox" name="estVerifie" onChange={handleChange} checked={formData.estVerifie} /> Est Vérifié
          <input name="disponibilites" onChange={handleChange} placeholder="Disponibilités" className="input" required />
        </>
      )}

      <button className="btn" type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
