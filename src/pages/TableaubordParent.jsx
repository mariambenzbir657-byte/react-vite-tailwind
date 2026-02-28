import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, CheckCircle, Heart, Clock, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function TableaubordParent() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const parentId = user?.id || user?._id;

        if (!parentId) return;

        const res = await axios.get(
          `http://localhost:4000/api/reservations/parent/${parentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReservations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const now = new Date();

  const prochaines = reservations.filter(
    (r) => new Date(r.dateHeureDebut) > now
  );

  const passees = reservations.filter(
    (r) => new Date(r.dateHeureDebut) <= now
  );

  // Optional: Baby-sitters favoris (exemple static)
  const favoris = reservations
    .map((r) => r.babySitterId)
    .filter(Boolean)
    .slice(0, 3); 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="w-full bg-white shadow-md px-4 md:px-8 py-4 flex justify-between items-center flex-wrap overflow-x-hidden">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <h1 className="text-2xl font-bold text-pink-600">SmartBabyCare</h1>
        </button>
        <nav className="flex gap-6 text-gray-700 font-medium flex-wrap">
          <Link to="/TableaubordParent" className="hover:text-pink-600">
            Tableau de bord
          </Link>
          <Link to="/search-results" className="hover:text-pink-600">
            Recherche
          </Link>
          <Link to="/messages" className="hover:text-pink-600">
            Messages
          </Link>
        </nav>

        <button
          className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition"
          onClick={() => navigate("/register")}
        >
          Mon compte
        </button>
      </header>

      {/* MAIN TITLE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Mon tableau de bord
        </h2>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prochaines gardes</p>
              <p className="text-2xl font-bold">{prochaines.length}</p>
            </div>
            <Calendar className="w-10 h-10 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gardes passées</p>
              <p className="text-2xl font-bold">{passees.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Baby-sitters favoris</p>
              <p className="text-2xl font-bold">{favoris.length}</p>

            </div>
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
          </div>
        </div>
      </div>

      {/* PROCHAINES GARDES */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 mx-4 sm:mx-6 lg:mx-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Prochaines gardes</h3>
        <div className="space-y-4">
          {loading && (
            <div className="text-center py-10 text-gray-500 animate-pulse">
              Loading...
            </div>
          )}

          {!loading && prochaines.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              Aucune réservation.
            </div>
          )}

          {prochaines.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                {/* LEFT INFO */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-gray-800">
                    {r.babySitterId?.nom || "Baby-sitter"}_
                    {r.babySitterId?.prenom || "Baby-sitter"}
                  </h4>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    {new Date(r.dateHeureDebut).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-pink-500" />
                    {new Date(r.dateHeureDebut).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                      r.paiement === "payé"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {r.paiement === "payé" ? "Payé ✅" : "Non payé ⏳"}
                  </span>
                </div>

                {/* RIGHT BUTTONS */}
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-semibold">
                    Détails
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/messages/${r.babySitterId?._id}`)
                    }
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm font-semibold"
                  >
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORIQUE */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 mx-4 sm:mx-6 lg:mx-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Historique</h3>
        <div className="space-y-4">
          {!loading && passees.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              Aucune réservation passée.
            </div>
          )}

          {passees.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                {/* LEFT INFO */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-gray-800">
                    {r.babySitterId?.nom || "Baby-sitter"}_
                    {r.babySitterId?.prenom || "Baby-sitter"}
                  </h4>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    {new Date(r.dateHeureDebut).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-pink-500" />
                    {new Date(r.dateHeureDebut).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                      r.paiement === "payé"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {r.paiement === "payé" ? "Payé ✅" : "Non payé ⏳"}
                  </span>
                </div>

                {/* RIGHT BUTTONS */}
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-semibold">
                    Voir détails
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/messages/${r.babySitterId?._id}`)
                    }
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm font-semibold"
                  >
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
