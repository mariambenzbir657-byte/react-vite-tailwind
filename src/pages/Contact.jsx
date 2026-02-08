import { Phone, MapPin, Baby } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-12 px-4">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Contactez-nous 💕
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Des questions ou des remarques ? Écrivez-nous simplement un message !
      </p>

      {/* FORM */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mb-10">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-700"
          />
          <input
            type="text"
            placeholder="Nom"
            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-700"
          />
        </div>

        <textarea
          rows="4"
          placeholder="Votre message..."
          className="border rounded-xl px-4 py-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-pink-700"
        ></textarea>

        <button
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-full font-semibold hover:bg-pink-500 transition"
        >
          SOUMETTRE 💌
        </button>
      </div>

      {/* INFO CARDS */}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-md grid md:grid-cols-3 gap-6 p-6">
        
        {/* CARD */}
        {[
          {
            title: "À propos de SmartBabyCare",
            text: "Plateforme de baby-sitting sécurisée et fiable.",
            icon: <Baby />,
          },
          {
            title: "Téléphone",
            text: "+216 23 499 281\n+216 96 745 496",
            icon: <Phone />,
          },
          {
            title: "Adresse",
            text: "Tunis, Tunisie 🇹🇳",
            icon: <MapPin />,
          },
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-14 h-14 mx-auto bg-pink-500 text-white rounded-full flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg text-pink-700">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
