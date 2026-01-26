function Enfant({enfant}) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {enfant.nom}
          </h3>
  
          <p className="text-sm text-gray-600 mt-2">
            {enfant.dateNaissance}
          </p>
  
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {enfant.allergies}
            </span>
  
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {enfant.besoinsSpeciaux}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  export default Enfant;
  