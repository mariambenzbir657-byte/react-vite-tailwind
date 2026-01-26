import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ParentPage from "./pages/ParentPage";
import BabySitterPage from "./pages/BabySitterPage";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/babysitter" element={<BabySitterPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;

