import { Phone, MapPin, Baby } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full min-h-screen font-sans">

      {/* HERO SECTION avec FORM transparent */}
      <section
        className="relative flex items-center justify-center min-h-[85vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        {/* Overlay semi-transparent rose pour rendre le form lisible */}
        <div className="absolute inset-0 bg-pink-600/30"></div>

        {/* Formulaire centré */}
        <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-8 w-full max-w-3xl mx-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 drop-shadow">
            Contactez-nous 💌
          </h1>
          <p className="text-white/90 text-center mb-6 drop-shadow">
            Des questions ou des remarques ? Écrivez-nous simplement un message !
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border border-white/60 bg-white/30 placeholder-white/80 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Nom"
              className="border border-white/60 bg-white/30 placeholder-white/80 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <textarea
            rows="4"
            placeholder="Votre message..."
            className="border border-white/60 bg-white/30 placeholder-white/80 text-white rounded-xl px-4 py-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>

          <button
            className="mt-4 w-full bg-pink-500/80 text-white py-3 rounded-full font-semibold hover:bg-pink-600/80 transition"
          >
            SOUMETTRE 💌
          </button>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="py-16 px-4 flex justify-center bg-pink-50">
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-md grid md:grid-cols-3 gap-6 p-6">
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
      </section>

    </div>
  );
}
