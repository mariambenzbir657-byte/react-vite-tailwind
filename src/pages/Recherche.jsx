import { useEffect, useState } from "react";
import axios from "axios";
import { Filter,Star,MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Recherche() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const [babysitters, setBabySitters] = useState([]);
  const [filters, setFilters] = useState({
    rating: "",
  });

  const generateFixedRating = (id) => {
    const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Number((4 + (sum % 10) / 10).toFixed(1));
  };

  useEffect(() => {
    async function fetchBabySitters() {
      try {
        const res = await axios.get("http://localhost:4000/api/users/", {
          params: { search },
        });

        const onlySitters = res.data.filter((u) => u.role === "BabySitter");

        const sittersWithService = await Promise.all(
          onlySitters.map(async (s) => {
            try {
              const resService = await axios.get(
                `http://localhost:4000/api/services/babysitter/${s._id}`
              );
              if (resService.data.length > 0) {
                const service = resService.data[0];
                return {
                  ...s,
                  serviceId: service._id,
                  prixParHeure: service.prixParHeure,
                  typeService: service.typeService,
                  descriptionService: service.description,
                };
              }
              return s;
            } catch {
              return s;
            }
          })
        );

        const sittersWithRating = sittersWithService.map((s) => ({
          ...s,
          rating: generateFixedRating(s._id),
          reviews: (s._id.charCodeAt(0) % 40) + 10,
        }));
        
        
        setBabySitters(sittersWithRating);
        } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBabySitters();
  }, [search]);

  const filteredBabysitters = babysitters.filter((b) => {
    const cityMatch = filters.adresse
      ? b.adresse?.toLowerCase().includes(filters.adresse.toLowerCase())
      : true;
    const priceMatch = filters.prixParHeure
      ? b.prixParHeure <= Number(filters.prixParHeure)
      : true;
    const ratingMatch = filters.rating ? b.rating >= Number(filters.rating) : true;
  
    const availabilityMatch = (() => {
      if (!filters.disponibilites) return true;
  
      const today = new Date();
      const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      const currentDay = dayNames[today.getDay()];
  
      if (filters.disponibilites === "now" || filters.disponibilites === "today") {
        return b.disponibilites?.includes(currentDay);
      }
  
      if (filters.disponibilites === "week") {
        return b.disponibilites && b.disponibilites.length > 0;
      }
  
      return true;
    })();
  
    return cityMatch && priceMatch && ratingMatch && availabilityMatch;
  });
  

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Trouvez votre baby-sitter
        </h2>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-pink-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                placeholder="Ex: ville"
                value={filters.adresse}
                onChange={(e) => setFilters({ ...filters, adresse: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix max
              </label>
              <select
                value={filters.prixParHeure}
                onChange={(e) =>
                  setFilters({ ...filters, prixParHeure: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Tous</option>
                <option value="15">15DT/h max</option>
                <option value="20">20DT/h max</option>
                <option value="25">25DT/h max</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Note min
              </label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Tous</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.7">4.7+ ⭐</option>
                <option value="4.9">4.9+ ⭐</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Disponibilité
              </label>
              <select
                value={filters.disponibilites}
                onChange={(e) =>
                  setFilters({ ...filters,disponibilites: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Tous</option>
                <option value="now">Disponible maintenant</option>
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">
            Chargement...
          </p>
          ):filteredBabysitters.length > 0 ? (
            filteredBabysitters.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative h-48">
                  <img
                    src={
                      b.image
                        ? `http://localhost:4000/uploads/${b.image}`
                        : "/placeholder.png"
                    }
                    alt={`${b.prenom} ${b.nom}`}
                    className="w-full h-full object-cover"
                  />
            
                  {b.available && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Disponible
                    </span>
                  )}
                </div>
            
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {b.nom} {b.prenom}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>{b.adresse}</span>
                      </div>
                    </div>
            
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {b.rating}
                      </span>
                    </div>

                  </div>
            
                  <p className="text-sm text-gray-600 mb-3">
                    {b.specialty}
                  </p>
            
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-pink-600 font-bold">
                      {b.prixParHeure} DT/h
                    </span>
                  </div>
            
                  <button
                    onClick={() => {
                      // Navigate with babysitterId and serviceId
                      navigate(`/ProfilBabySitter/${b._id}`, {
                        state: {
                          babysitterId: b._id,
                          serviceId: b.serviceId,
                        },
                      });
                    }}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
                  >
                    Voir Profil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              Aucun baby-sitter trouvé
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Recherche;