import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Recherche from "./pages/Recherche";
import MesReservations from "./pages/MesReservations";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard"; 
import HomeHeader from "./components/HomeHeader";
import SearchHeader from "./components/SearchHeader";
import Footer from "./components/Footer";
import Chatbot from "./pages/Chatbot";
import ProfilBabySitter from "./pages/ProfilBabySitter";
import Messages from "./pages/Messages";
import TableaubordParent from "./pages/TableaubordParent";
import Paiement from"./pages/Paiement";
import ProtectedRoute from "./components/ProtectedRoute";
function Layout() {
  const location = useLocation();
  const headerMap = {
    "/": HomeHeader,
    "/Messages": SearchHeader,
    "/about": HomeHeader,
    "/contact": HomeHeader,
    "/search-results": SearchHeader,
    
  };
  const HeaderComponent = headerMap[location.pathname];
  const noFooterRoutes = ["/Login","/admin","/MesReservations","/search-results","/Register","/messages","/Chatbot","/TableaubordParent","/Paiement"];
  const hideFooter =
  noFooterRoutes.includes(location.pathname) || 
  location.pathname.startsWith("/ProfilBabySitter/") ||
  location.pathname.startsWith("/Messages/");
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {HeaderComponent && <HeaderComponent />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin"element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
          }
        />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/search-results" element={<Recherche />} />
        <Route path="/MesReservations" element={<MesReservations />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/ProfilBabySitter/:id" element={<ProfilBabySitter />} />
        <Route path="/TableaubordParent" element={<TableaubordParent/>}/>
        <Route path="/Paiement"element={<Paiement/>}/>
        <Route path="/Messages/:id" element={<Messages />} />

      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;