import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin,Star } from "lucide-react";

function ProfilBabySitter() {
  const navigate = useNavigate();
  const [sitter, setSitter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const data = localStorage.getItem("selectedSitter");
    if (data) {
      setSitter(JSON.parse(data));
      setLoading(false);
    } else {
      setError("Profil introuvable");
      setLoading(false);
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-pink-600">SmartBabyCare</h1>
        </div>
      </header>
  
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Chargement...</p>
          ) : error ? (
            <p className="text-center text-gray-500 py-8">{error}</p>
          ) : sitter ? (
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={
                    sitter.image
                      ? `http://localhost:4000/uploads/${sitter.image}`
                      : "/placeholder.png"
                  }
                  alt={`${sitter.nom} ${sitter.prenom}`}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {sitter.nom} {sitter.prenom}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{sitter.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold text-gray-900">
                      {sitter.rating}
                    </span>
                    <span className="text-gray-500">({sitter.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {sitter.specialty}
                  </span>
                  <span className="text-gray-600">{sitter.experience} d'expérience</span>
                </div>
                <p className="text-gray-700 mb-4">{sitter.bio}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Langues</p>
                    <p className="font-semibold text-gray-900">
                    {sitter.languages ? sitter.languages.join(', ') : 'Aucune langue'}
                    </p>

                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certifications</p>
                    <p className="font-semibold text-gray-900">
                    {sitter.certifications ? sitter.certifications.length : 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-2xl font-bold text-pink-600">{sitter.price}</p>
                    <p className="text-sm text-gray-500">Tarif horaire</p>
                  </div>
                  <button
                    onClick={() => navigate("/MesReservations")} 
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-semibold">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Profil introuvable</p>
          )}
          {/* Calendrier disponibilité */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Disponibilités</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{day}</p>
                  <div className={`h-10 rounded-lg flex items-center justify-center ${idx < 5 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    {idx < 5 ? '✓' : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  export default ProfilBabySitter;
