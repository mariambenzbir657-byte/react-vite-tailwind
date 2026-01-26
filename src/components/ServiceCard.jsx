function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {service.typeService}
        </h3>

        <p className="text-sm text-gray-600 mt-2">
          {service.prixParHeure} DT / heure
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {service.description}
          </span>

          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            {service.idBabySitter?.nom}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
