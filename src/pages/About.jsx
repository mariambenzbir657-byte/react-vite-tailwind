import { ShieldCheck, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white py-12 px-4">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-16">

        {/* TEXT */}
        <div>
          <h1 className="text-4xl font-bold text-pink-700 mb-4">
            À propos de SmartBabyCare 💕
          </h1>
          <p className="text-gray-600 mb-4">
            SmartBabyCare est une plateforme innovante qui aide les parents à trouver
            des baby-sitters fiables, qualifiés et proches de chez eux.
          </p>
          <p className="text-gray-600">
            Notre mission est de garantir la sécurité, la confiance et le confort
            pour les familles modernes.
          </p>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src="/about-baby.png"
            alt="baby"
            className="w-80 rounded-2xl shadow-lg border-4 border-pink-200"
          />
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16 text-center">

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-pink-700">500+</h2>
          <p className="text-gray-600">Parents satisfaits</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-pink-700">200+</h2>
          <p className="text-gray-600">Baby-sitters qualifiés</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-pink-700">1000+</h2>
          <p className="text-gray-600">Services réalisés</p>
        </div>

      </div>

      {/* VALUES SECTION */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <div className="w-14 h-14 mx-auto bg-pink-600 text-white rounded-full flex items-center justify-center mb-4">
            <ShieldCheck />
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Sécurité</h3>
          <p className="text-gray-600 text-sm mt-2">
            Nous vérifions chaque baby-sitter pour garantir la sécurité des enfants.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <div className="w-14 h-14 mx-auto bg-pink-600 text-white rounded-full flex items-center justify-center mb-4">
            <Users />
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Communauté</h3>
          <p className="text-gray-600 text-sm mt-2">
            Une grande communauté de parents et de baby-sitters connectés.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition">
          <div className="w-14 h-14 mx-auto bg-pink-600 text-white rounded-full flex items-center justify-center mb-4">
            <Heart />
          </div>
          <h3 className="text-lg font-semibold text-pink-700">Confiance</h3>
          <p className="text-gray-600 text-sm mt-2">
            Nous construisons une relation durable entre parents et baby-sitters.
          </p>
        </div>

      </div>
    </div>
  );
}
