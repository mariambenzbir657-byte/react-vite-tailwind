import { useEffect, useState } from "react";
import axios from "axios";
import { Filter,Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Recherche() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const [babysitters, setBabySitters] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    priceRange: "",
    rating: "",
    availability: "",
  });

  useEffect(() => {
    async function fetchBabySitters() {
      try {
        const res = await axios.get("http://localhost:4000/api/users/",{
          params: { search }, 
        });

        const onlySitters = res.data.filter(
          (u) => u.role === "BabySitter"
        );
        setBabySitters(onlySitters);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBabySitters();
  },  [search]);

  const filteredBabysitters = babysitters.filter((b) => {
    const cityMatch = filters.city
      ? b.city?.toLowerCase().includes(filters.city.toLowerCase())
      : true;
    const priceMatch = filters.priceRange
      ? b.prixParHeure <= Number(filters.priceRange)
      : true;
    const ratingMatch = filters.rating ? b.rating >= Number(filters.rating) : true;
    const availabilityMatch = filters.availability
      ? filters.availability === "now"
        ? b.disponibilites
        : true
      : true;

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
                placeholder="Ex: Paris"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix max
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Tous</option>
                <option value="15">€15/h max</option>
                <option value="20">€20/h max</option>
                <option value="25">€25/h max</option>
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
                value={filters.availability}
                onChange={(e) =>
                  setFilters({ ...filters, availability: e.target.value })
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
                    </div>
            
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {b.rating}
                      </span>
                    </div>
                  </div>
            
                  <p className="text-sm text-gray-600 mb-3">
                    {b.specialty}
                  </p>
            
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-pink-600 font-bold">
                      {b.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {b.reviews} avis
                    </span>
                  </div>
            
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "selectedSitter",
                        JSON.stringify(b)
                      );
                    navigate("/ProfilBabySitter");
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