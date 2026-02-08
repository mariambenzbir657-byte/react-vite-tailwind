import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CheckCircle } from "lucide-react";

const MesReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    date: '',
    startTime: '',
    endTime: '',
    children: '',
    specialNeeds: ''
  });
  const [selectedBabySitter, setSelectedBabySitter] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const steps = [
    { id: 1, title: "Date & Heure" },
    { id: 2, title: "Détails" },
    { id: 3, title: "Confirmation" }
  ];
  const ajouterReservation = async () => {
    try {
      const data = {
        babySitterId: selectedBabySitter?._id || null,
        serviceId: selectedService?._id || null,
        dateHeureDebut: new Date(`${booking.date}T${booking.startTime}`),
        dateHeureFin: new Date(`${booking.date}T${booking.endTime}`),
        statut: booking.statut
      };
      
  
      console.log("DATA SENT 👉", data);
  
      // ✅ axios async/await
      const res = await axios.post(
        "http://localhost:4000/api/reservations/ajouter",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
  
      console.log("Réservation ajoutée :", res.data);
      alert("Réservation ajoutée avec succès ✅");
      setReservations((prev) => [...prev, res.data.reservation]);
  
    } catch (err) {
      console.error("Erreur ajout réservation:", err.response?.data || err.message);
      alert("Erreur lors de la réservation ❌");
    }
  };
  
      
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-pink-600">Réservation</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wizard Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= s.id
                      ? 'bg-pink-500 border-pink-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {step > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
                </div>
                {s.id < steps.length && (
                  <div className={`flex-1 h-1 mx-2 ${step > s.id ? 'bg-pink-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((s) => (
              <span
                key={s.id}
                className={step >= s.id ? 'text-pink-600 font-semibold' : 'text-gray-400'}
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>
        {/* Wizard Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisissez la date et l'heure</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Heure début</label>
                    <input
                      type="time"
                      value={booking.startTime}
                      onChange={(e) => setBooking({ ...booking, startTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Heure fin</label>
                    <input
                      type="time"
                      value={booking.endTime}
                      onChange={(e) => setBooking({ ...booking, endTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails de la garde</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre d'enfants</label>
                  <input
                    type="number"
                    min="1"
                    value={booking.children}
                    onChange={(e) => setBooking({ ...booking, children: e.target.value })}
                    placeholder="Ex: 2"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Besoins spéciaux (optionnel)</label>
                  <textarea
                    value={booking.specialNeeds}
                    onChange={(e) => setBooking({ ...booking, specialNeeds: e.target.value })}
                    placeholder="Allergies, médicaments, instructions particulières..."
                    rows="4"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          )}
          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold">{booking.date || 'Non renseigné'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Heure</span>
                    <span className="font-semibold">{booking.startTime} - {booking.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enfants</span>
                    <span className="font-semibold">{booking.children || '—'}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Total estimé</span>
                    <span className="text-2xl font-bold text-pink-600">€45</span>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-pink-800">
                  💳 Le paiement sera demandé après confirmation de la baby-sitter.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Précédent
              </button>
            )}
            <div className="flex-1" />
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
              >
                Suivant
              </button>
            ) : (
              <button 
                onClick={ajouterReservation}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold">
                Confirmer la réservation
              </button>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MesReservations;
