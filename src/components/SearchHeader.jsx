import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SearchHeader() {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">   
      {/* Logo */}
      <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
        <h1 className="text-2xl font-bold text-pink-600">
        SmartBabyCare
        </h1>
      </button>

      {/* Menu */}
      <nav className="flex gap-6 text-gray-700 font-medium">
        <Link to="/search-results" className="hover:text-pink-600">
          Recherche
        </Link>
        <Link to="/MesReservations" className="hover:text-pink-600">
          Mes réservations
        </Link>
        <Link to="/messages" className="hover:text-pink-600">
          Messages
        </Link>
      </nav>

      {/* Button */}
      <button className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition">
        Mon compte
      </button>

    </header>
  );
}
