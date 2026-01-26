import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, mdp });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Connexion réussie ✅");

      setTimeout(() => {
        navigate(`/${user.role.toLowerCase()}`);
      }, 1000);

    } catch (error) {
      alert(error.response?.data?.message || "Email ou mot de passe incorrect ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={mdp}
        onChange={(e) => setMdp(e.target.value)}
        className="input"
        required
      />

      <button type="submit" className="btn">
        Se connecter
      </button>
    </form>
  );
}

export default Login;
