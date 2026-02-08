import { Link,useNavigate} from "react-router-dom";

function HomeHeader() {
  const navigate = useNavigate();

  const handleReserver = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      navigate("/login");
    }
  };
  
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
      </div>

      {/* Right: Button */}
      <button 
        onClick={handleReserver}
        className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300">
        Réserver
      </button>

    </nav>
  );
}

export default HomeHeader;

