import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
      
      {/* Left: Logo */}
      <h1 className="text-2xl font-bold text-pink-600">
        SmartBabyCare
      </h1>

      {/* Center: Menu */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-pink-500">
          Home
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-pink-500">
          About
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-pink-500">
          Contact
        </Link>
        <Link to="/services" className="text-gray-600 hover:text-pink-500">
          Services
        </Link>
        <Link to="/Login" className="text-gray-600 hover:text-pink-500">
          Login
        </Link>
        <Link to="/register" className="text-gray-600 hover:text-pink-500">
          Register
        </Link>
      </div>

      {/* Right: Button */}
      <Link
        to="/reserve"
        className="px-6 py-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 transition"
      >
        Réserver
      </Link>
    </nav>
  );
}

export default Header;

