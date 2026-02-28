import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PaiementPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const reservation = state?.reservation;

  const montant = reservation?.total || 0;
  const [loading, setLoading] = useState(false);
  const [modePaiement, setModePaiement] = useState("Carte");

  if (!reservation?._id) {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        ❌ Aucune réservation disponible.
      </div>
    );
  }

  const handlePaiement = async () => {
    if (!montant || Number(montant) <= 0) {
      alert("❌ Veuillez entrer un montant valide.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:4000/api/paiement/ajouter",
        {
          reservationId: reservation._id,
          montant: montant, 
          modePaiement: modePaiement,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/search-results");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        "❌ Erreur : " +
        (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-pink-600">
            Paiement
          </h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white rounded-xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choisissez votre mode de paiement
          </h2>

          {/* ================= TABS ================= */}
          <div className="flex bg-pink-100 rounded-lg p-1 mb-6">
            {["Carte", "Virement", "Espace"].map((mode) => (
              <button
                key={mode}
                onClick={() => setModePaiement(mode)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  modePaiement === mode
                    ? "bg-pink-500 text-white"
                    : "text-pink-600"
                }`}
              >
                {mode === "Carte" && "💳 Carte"}
                {mode === "Virement" && "🏦 Virement"}
                {mode === "Espace" && "👛 Espace"}
              </button>
            ))}
          </div>

          {/* ================= CARTE ================= */}
          {modePaiement === "Carte" && (
            <div className="space-y-4">

              <div className="flex gap-4 mb-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  className="h-8"
                  alt="Visa"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                  className="h-8"
                  alt="Mastercard"
                />
              </div>

              <input
                type="text"
                placeholder="Nom sur la carte"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
              />

              <input
                type="text"
                placeholder="Numéro de carte"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* ================= VIREMENT ================= */}
          {modePaiement === "Virement" && (
            <div className="bg-pink-50 p-4 rounded-lg space-y-3">
              <p className="text-sm text-gray-600">
                Effectuez un virement vers :
              </p>
              <div className="bg-white p-3 rounded-lg shadow text-sm">
                <p><strong>Banque:</strong> BIAT</p>
                <p><strong>RIB:</strong> 123 456 789 000</p>
                <p><strong>Nom:</strong> Smart Baby Care</p>
              </div>
              <p className="text-xs text-gray-500">
                Votre paiement sera validé après vérification.
              </p>
            </div>
          )}

          {/* ================= ESPACE ================= */}
          {modePaiement === "Espace" && (
            <div className="bg-pink-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">
                Le montant sera déduit de votre solde.
              </p>
            </div>
          )}

          {/* ================= MONTANT ================= */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Montant
            </label>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
                <span className="text-gray-600">Total à payer</span>
                <span className="text-2xl font-bold text-pink-600">
                {montant} DT
                </span>
            </div>
            </div>

          </div>

          {/* ================= RÉSUMÉ ================= */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="flex justify-between text-sm">
              <span>Statut réservation</span>
              <span className="font-semibold">{reservation?.statut}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-pink-600 mt-2">
              <span>Total</span>
              <span>{montant || 0} TND</span>
            </div>
          </div>

          {/* ================= BUTTON ================= */}
          <button
            onClick={handlePaiement}
            disabled={loading || !montant}
            className="w-full mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
          >
            {loading ? "Traitement..." : "Confirmer le paiement"}
          </button>

        </div>
      </div>
    </div>
  );
}
