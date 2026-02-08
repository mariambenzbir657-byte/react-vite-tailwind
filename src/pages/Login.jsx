import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, Eye, Sparkles } from "lucide-react";
import axios from "axios";

const BubbleArt = ({ opacity = 0.25 }) => (
  <svg
    viewBox="0 0 600 600"
    aria-hidden="true"
    className="absolute inset-0 w-full h-full"
    style={{ opacity }}
    preserveAspectRatio="none"
  >
    <defs>
      <radialGradient id="b1" cx="30%" cy="30%" r="60%">
        <stop offset="0" stopColor="rgba(255,255,255,0.95)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <radialGradient id="b2" cx="70%" cy="40%" r="55%">
        <stop offset="0" stopColor="rgba(255,255,255,0.85)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <radialGradient id="b3" cx="55%" cy="75%" r="55%">
        <stop offset="0" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="600" height="600" fill="transparent" />
    <circle cx="140" cy="150" r="120" fill="url(#b1)" />
    <circle cx="440" cy="190" r="150" fill="url(#b2)" />
    <circle cx="340" cy="460" r="170" fill="url(#b3)" />
  </svg>
);

const SplitLoginCard = ({
  brand,
  tagline,
  hint,
  gradientClass,
  buttonClass,
  leftTitle = "WELCOME BACK",
  children,
  onSubmit,
  loading,
  onBrandClick,
}) => (
  <section className="py-20 bg-gradient-to-b from-slate-50 to-white min-h-screen flex items-center justify-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel */}
          <div className={`relative p-10 text-white ${gradientClass} hidden md:block`}>
            <BubbleArt opacity={0.28} />
            <div className="relative z-10">
              <div
                onClick={onBrandClick}
                className="inline-flex items-center space-x-2 bg-white/15 border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:bg-white/25 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{brand}</span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold tracking-tight">{leftTitle}</h2>
              <p className="mt-3 text-white/85 leading-relaxed">{tagline}</p>
              <div className="mt-8 space-y-3 text-sm text-white/85">
                <p className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Connexion sécurisée (UI)</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Support: support@demo.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Inscription</p>
                <p className="text-lg font-bold text-gray-900 mt-2">{brand}</p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {children}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-2xl font-semibold text-white shadow-lg transition ${buttonClass} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-500 focus:ring-offset-0"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="inline-flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-semibold">
                  <Eye className="w-4 h-4" />
                  <span>Forgot?</span>
                </button>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-semibold text-gray-900 mb-2">Accès démo</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-mono">admin@demo.com</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mot de passe</p>
                    <p className="font-mono">Password123!</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{hint}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Input = ({ label, type = "text", placeholder, icon, value, onChange, required = false }) => (
  <label className="block text-sm">
    <span className="font-semibold text-gray-800">{label}</span>
    <div className="mt-2 relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition ${icon ? "pl-11" : ""}`}
      />
    </div>
  </label>
);

const SmartBabyCareLogin = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", { email, mdp });

      const { token, user } = res.data;

      if (!token || !user) {
        navigate("/register");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role.toLowerCase() === "admin") {
        navigate("/admin");
      } else if (user.role.toLowerCase() === "parent") {
        navigate("/MesReservations");
      } else if (user.role.toLowerCase() === "babysitter") {
        navigate("/");
      } else {
        alert("Rôle utilisateur inconnu");
        localStorage.clear();
      }
    } catch (err) {
      if (err.response?.status === 404) {
        navigate("/register");
      } else {
        alert("Email ou mot de passe incorrect ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SplitLoginCard
      brand="SmartBabyCare"
      gradientClass="bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500"
      buttonClass="bg-pink-600 hover:bg-pink-700"
      tagline="Espace sécurisé pour les parents et baby-sitters vérifiés."
      hint="Utilisez les identifiants démo pour tester les rôles."
      onSubmit={handleSubmit}
      loading={loading}
      leftTitle="WELCOME BACK"
      onBrandClick={() => navigate(-1)}
    >
      <Input
        label="Email"
        type="email"
        placeholder="email@exemple.com"
        icon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        icon={<Lock className="w-4 h-4" />}
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
        required
      />
    </SplitLoginCard>
  );
};

export default SmartBabyCareLogin;
