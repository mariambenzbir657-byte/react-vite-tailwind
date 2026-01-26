import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const [services, setServices] = useState([]);	

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/services")
      .then((res) => {
        console.log("DATA:", res.data);
        setServices(res.data);
      })
      .catch((err) => {
        console.error("ERROR:", err);
      });
  }, []);
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Nos Services Disponibles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default Services;
