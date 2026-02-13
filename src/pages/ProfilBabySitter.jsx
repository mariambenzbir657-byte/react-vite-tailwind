import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import axios from "axios";

function ProfilBabySitter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sitter, setSitter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const generateFixedRating = (id) => {
    const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Number((4 + (sum % 10) / 10).toFixed(1));
  };
  

  useEffect(() => {
    async function fetchSitter() {
      try {
        const resUser = await axios.get(`http://localhost:4000/api/users/${id}`);
        
        // Créer l’objet sitter avec rating fixe
        const sitterWithRating = {
          ...resUser.data,
          rating: generateFixedRating(resUser.data._id),
          reviews: (resUser.data._id.charCodeAt(0) % 40) + 10,
        };
  
        // Récupérer le service
        const resService = await axios.get(
          `http://localhost:4000/api/services/babysitter/${id}`
        );
  
        if (resService.data.length > 0) {
          const service = resService.data[0];
          sitterWithRating.serviceId = service._id;
          sitterWithRating.prixParHeure = service.prixParHeure;
          sitterWithRating.typeService = service.typeService;
          sitterWithRating.descriptionService = service.description;
        }
  
        setSitter(sitterWithRating);
  
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le profil du babysitter");
      } finally {
        setLoading(false);
      }
    }
  
    fetchSitter();
  }, [id]);
  
  

  if (loading) return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!sitter) return <p className="text-center mt-10 text-gray-500">Profil introuvable</p>;

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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={sitter.image ? `http://localhost:4000/uploads/${sitter.image}` : "/placeholder.png"}
                alt={`${sitter.nom} ${sitter.prenom}`}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{sitter.nom} {sitter.prenom}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{sitter.adresse}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-700">
                    {sitter.rating}
                  </span>
                </div>

                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {sitter.qualifications}
                </span>
                <span className="text-gray-600">{sitter.niveau} Niveau d'étude </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  {sitter.descriptionService}
                </p>
              </div>              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Langues</p>
                  <p className="font-semibold text-gray-900">
                    {sitter.languages ? sitter.languages.join(', ') : 'Arabe , Français , Anglais'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type de service</p>
                  <p className="font-semibold text-gray-900">{sitter.typeService}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-pink-600">{sitter.prixParHeure}DT/h</p>
                  <p className="text-sm text-gray-500">Tarif horaire</p>
                </div>
                <button
                  onClick={() => navigate("/MesReservations", {
                    state: {
                      selectedBabySitter: sitter,
                      serviceId: sitter.serviceId,
                      prixParHeure: sitter.prixParHeure

                    }
                  })}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-semibold"
                >
                  Réserver
                </button>


              </div>
            </div>
          </div>
        </div>

        {/* Calendrier disponibilités */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Disponibilités</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
              <div key={idx} className="text-center">
                <p className="text-sm font-semibold text-gray-700 mb-2">{day}</p>
                <div
                  className={`h-10 rounded-lg flex items-center justify-center ${
                    sitter.disponibilites && sitter.disponibilites.includes(day)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {sitter.disponibilites && sitter.disponibilites.includes(day) ? '✓' : '—'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilBabySitter;
