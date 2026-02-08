import React from "react";
import { Calendar,CheckCircle,Heart,Clock,Star} from "lucide-react";
import { Link,useNavigate} from "react-router-dom";

export default function TableaubordParent() {
    const navigate = useNavigate();
    return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">   
        {/* Logo */}
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <h1 className="text-2xl font-bold text-pink-600">
            SmartBabyCare
            </h1>
        </button>
        {/* Menu */}
        <nav className="flex gap-6 text-gray-700 font-medium">
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

        {/* Button */}
        <button
            className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition"
            onClick={() => navigate("/register")}
        >
            Mon compte
        </button>

        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mon tableau de bord</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prochaines gardes</p>
              </div>
              <Calendar className="w-10 h-10 text-pink-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gardes passées</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Baby-sitters favoris</p>
              </div>
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
            </div>
          </div>
        </div>
        {/* Prochaines gardes */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Prochaines gardes</h3>
          <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-semibold">
                      Détails
                    </button>
                    <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm font-semibold">
                      Contacter
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
        {/* Historique */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Historique</h3>
          <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />

                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />

                      </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

                        </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-semibold">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}
