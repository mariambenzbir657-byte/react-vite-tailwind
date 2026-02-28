import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { Lock, Mail, ShieldCheck, User, Phone, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BubbleArt = ({ opacity = 0.25 }) => (
  <svg viewBox="0 0 600 600" aria-hidden="true"className="absolute inset-0 w-full h-full"style={{ opacity }}preserveAspectRatio="none">
    <defs>
      <radialGradient id="rb1" cx="30%" cy="30%" r="60%">
        <stop offset="0" stopColor="rgba(255,255,255,0.95)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <radialGradient id="rb2" cx="70%" cy="40%" r="55%">
        <stop offset="0" stopColor="rgba(255,255,255,0.85)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <radialGradient id="rb3" cx="55%" cy="75%" r="55%">
        <stop offset="0" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="600" height="600" fill="transparent" />
    <circle cx="140" cy="150" r="120" fill="url(#rb1)" />
    <circle cx="440" cy="190" r="150" fill="url(#rb2)" />
    <circle cx="340" cy="460" r="170" fill="url(#rb3)" />
  </svg>
);
const Input = ({ label, type = "text", placeholder, icon, name, value, onChange, required }) => (
  <label className="block text-sm">
    <span className="font-semibold text-gray-800">{label}</span>
    <div className="mt-2 relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input type={type}name={name}placeholder={placeholder}className={`w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition ${icon ? "pl-11" : ""}`}
      value={value}onChange={onChange}required={required}/>
    </div>
  </label>
);
const Select = ({ label, name, options, icon, value, onChange, required }) => (
  <label className="block text-sm">
    <span className="font-semibold text-gray-800">{label}</span>
    <div className="mt-2 relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
      <select name={name}className={`w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition ${icon ? "pl-11" : ""}`}
        value={value}onChange={onChange}required={required}
      >
        <option value="" disabled>Choisir…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </label>
);
const RegisterCard = ({brand,tagline,gradientClass,buttonClass,leftTitle = "CRÉER UN COMPTE",children,onSubmit,  onBrandClick,handleReserver, // ✅
}) => (
  <section className="py-20 bg-gradient-to-b from-slate-50 to-white min-h-screen flex items-center justify-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={`relative p-10 text-white ${gradientClass} hidden md:block`}>
            <BubbleArt opacity={0.28} />
            <div className="relative z-10">
              <button
                type="button"
                onClick={onBrandClick}
                className="inline-flex items-center space-x-2 bg-white/15 border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:bg-white/25 transition"
              >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{brand}</span>
              </button>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight">{leftTitle}</h2>
              <p className="mt-3 text-white/85 leading-relaxed">{tagline}</p>
              <div className="mt-8 space-y-3 text-sm text-white/85">
                <p className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Profil vérifié (UI)</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Confirmation email (mock)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Inscription</p>
                <p className="text-lg font-bold text-gray-900 mt-2">{brand}</p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                <User className="w-4 h-4" />
              </div>
            </div>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              {children}
              <button
                className={`w-full py-3.5 rounded-2xl font-semibold text-white shadow-lg transition ${buttonClass}`}
                type="submit"
              >
                S’inscrire
              </button>
              <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="estVerifie"
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-500 focus:ring-offset-0"
                  />
                  <span>J’accepte les conditions</span>
                </label>
                <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={handleReserver}
                  className="text-gray-700 hover:text-gray-900 font-semibold"
                >
                  Déjà un compte ?
                </button>

              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    role: "",
    adresse: "",
    qualifications: "",
    estVerifie: false,
    disponibilites: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 400) {
        // Email déjà utilisé
        navigate("/Login");
      } else {
        alert(error.response?.data?.message || "Erreur lors de l'inscription");
      }
    }
  };
  const handleReserver = (e) => {
    e.preventDefault(); 
    console.log("Bouton déjà un compte cliqué"); 
    navigate("/Login");
  };
  return (
    <RegisterCard 
    brand="SmartBabyCare"
    gradientClass="bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500"
    buttonClass="bg-pink-600 hover:bg-pink-700"
    tagline="Créez un compte parent ou baby-sitter en quelques secondes."
    hint="Choisissez votre rôle et complétez vos informations pour un matching rapide."
    onSubmit={handleSubmit}
    onBrandClick={() => navigate(-1)}
    handleReserver={handleReserver} 
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nom"name="nom"placeholder="Ex: Mariem"icon={<User className="w-4 h-4" />}value={formData.nom}onChange={handleChange}
          required/>
        <Input label="Prénom"name="prenom"placeholder="Ex: ben zbir"icon={<User className="w-4 h-4" />}value={formData.prenom}onChange={handleChange}
          required/>
      </div>
      <Input label="Email"name="email"type="email"placeholder="parent/babysitter@exemple.com"icon={<Mail className="w-4 h-4" />}value={formData.email}onChange={handleChange}
        required />
      <Select
        label="Rôle"
        name="role"
        options={["Parent", "BabySitter"]}
        icon={<ShieldCheck className="w-4 h-4" />}
        value={formData.role}
        onChange={handleChange}
        required
      />
      {formData.role === "Parent" && (
        <Input
          label="Adresse"
          name="adresse"
          placeholder="Votre adresse"
          icon={<Phone className="w-4 h-4" />}
          value={formData.adresse}
          onChange={handleChange}
          required
        />
      )}
      {formData.role === "BabySitter" && (
        <>
          <Input
            label="Qualifications"
            name="qualifications"
            placeholder="Ex: Première aide, BAFA..."
            value={formData.qualifications}
            onChange={handleChange}
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="estVerifie"
              id="estVerifie"
              checked={formData.estVerifie}
              onChange={handleChange}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-500 focus:ring-offset-0"
            />
            <label htmlFor="estVerifie" className="text-gray-700 font-semibold select-none">
              Est Vérifié
            </label>
          </div>
          <Input
            label="Disponibilités"
            name="disponibilites"
            placeholder="Ex: Lundi - Vendredi 9h-18h"
            value={formData.disponibilites}
            onChange={handleChange}
            required
          />
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Mot de passe"
          name="mdp"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-4 h-4" />}
          value={formData.mdp}
          onChange={handleChange}
          required
        />
        <Input
          label="Confirmer le mot de passe"
          name="confirmMdp"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-4 h-4" />}
          value={formData.confirmMdp || ""}
          onChange={handleChange}
          required
        />
      </div>
    </RegisterCard>
  );
};

export default Register;
