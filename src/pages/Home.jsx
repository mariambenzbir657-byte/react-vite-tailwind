import React from "react";
import { Heart, Shield,Search, CheckCircle } from "lucide-react";

function Home() {
  return (
    <div className="w-full min-h-screen font-sans">

      {/* HERO */}
      <section
        className="relative flex items-center min-h-[85vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(219,39,119,0.25), rgba(219,39,119,0.25)), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-10 px-10">

          {/* LEFT */}
          <div className="md:w-7/12">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow">
              Trouvez la{" "}
              <span className="text-pink-200">Garde Parfaite</span> pour Vos
              Enfants
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Parents & baby-sitters vérifiés. Recherche simple, matching IA et
              réservation en quelques clics.
            </p>

            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-7 flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ville, besoin, âge…"
                    className="w-full bg-transparent focus:outline-none text-gray-700"
                  />
                </div>

                <div className="md:col-span-5 flex gap-3">
                  <button className="w-full bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition font-semibold shadow-lg">
                    Rechercher
                  </button>
                  <button className="hidden md:inline-flex w-full bg-white text-pink-700 border border-pink-200 px-6 py-3 rounded-xl hover:bg-pink-50 transition font-semibold">
                    S’inscrire
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="md:w-5/12 w-full">
            <div className="bg-white/10 border border-white/20 rounded-3xl p-5 backdrop-blur">
              <h4 className="text-white font-semibold text-lg mb-3">
                Pourquoi SmartBabyCare ?
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15">
                    <Shield className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="text-white/90">
                    Profils vérifiés & sécurité renforcée.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15">
                    <Heart className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="text-white/90">
                    Matching IA selon vos besoins.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15">
                    <CheckCircle className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="text-white/90">
                    Réservation rapide & transparente.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-10 py-20 bg-white">
        <h2 className="mb-16 text-3xl font-bold text-center">
          Pourquoi Choisir SmartBabyCare ?
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="p-8 text-center bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-pink-100 rounded-full">
              🔍
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              Recherche Intelligente
            </h3>
            <p className="text-gray-600">
              Trouvez des profils basés sur vos critères.
            </p>
          </div>

          <div className="p-8 text-center bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-pink-100 rounded-full">
              ❤️
            </div>
            <h3 className="mb-2 text-xl font-semibold">Matching IA</h3>
            <p className="text-gray-600">
              Notre IA recommande les baby-sitters idéales.
            </p>
          </div>

          <div className="p-8 text-center bg-gray-50 rounded-2xl">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-pink-100 rounded-full">
              🛡️
            </div>
            <h3 className="mb-2 text-xl font-semibold">Profils Vérifiés</h3>
            <p className="text-gray-600">
              Sécurité maximale pour vos enfants.
            </p>
          </div>
        </div>
      </section>

      {/* IA SECTION */}
      <section className="px-10 py-20 bg-pink-50 text-center">
        <h2 className="mb-6 text-3xl font-bold">
          L'Intelligence Artificielle au Service de Votre Sérénité
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-gray-600">
          Notre IA analyse les besoins pour recommander la baby-sitter idéale.
        </p>
        <button className="px-8 py-3 text-white bg-pink-600 rounded-full hover:bg-pink-700">
          Découvrir le Matching IA
        </button>
      </section>

    </div>
  );
}

export default Home;
