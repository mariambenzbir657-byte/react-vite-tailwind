import { ShieldCheck, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="w-full min-h-screen font-sans">

      {/* HERO SECTION */}
      <section
        className="relative flex items-center min-h-[85vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(219,39,119,0.25), rgba(219,39,119,0.25)), url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-10 px-10">

          {/* LEFT TEXT */}
          <div className="md:w-7/12">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow">
              À propos de <span className="text-pink-200">SmartBabyCare</span> 
            </h2>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              SmartBabyCare est une plateforme dédiée à la sécurité, au confort et à la confiance entre parents et baby-sitters.
            </p>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Notre mission : simplifier la recherche, la réservation et le suivi des gardes pour toutes les familles modernes.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="md:w-5/12 w-full">
            <div className="bg-white/10 border border-white/20 rounded-3xl p-5 backdrop-blur">
              <h4 className="text-white font-semibold text-lg mb-3">
                Nos Valeurs
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15">
                    <ShieldCheck className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="text-white/90">
                    Sécurité renforcée : profils vérifiés et contrôlés.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15">
                    <Users className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="text-white/90">
                    Communauté active de parents et baby-sitters connectés.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15">
                    <Heart className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="text-white/90">
                    Confiance : relations durables et transparence dans les services.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-10 py-20 bg-white">
        <h2 className="mb-16 text-3xl font-bold text-center">
          Nos Chiffres Clés
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="p-8 text-center bg-gray-50 rounded-2xl">
            <h3 className="text-3xl font-bold text-pink-700 mb-2">500+</h3>
            <p className="text-gray-600">Parents satisfaits</p>
          </div>

          <div className="p-8 text-center bg-gray-50 rounded-2xl">
            <h3 className="text-3xl font-bold text-pink-700 mb-2">200+</h3>
            <p className="text-gray-600">Baby-sitters qualifiés</p>
          </div>

          <div className="p-8 text-center bg-gray-50 rounded-2xl">
            <h3 className="text-3xl font-bold text-pink-700 mb-2">1000+</h3>
            <p className="text-gray-600">Services réalisés</p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="px-10 py-20 bg-pink-50">
        <h2 className="mb-16 text-3xl font-bold text-center">
          Pourquoi Nous Choisir ?
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="p-8 text-center bg-white rounded-2xl shadow-md hover:-translate-y-2 transition">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-pink-100 rounded-full">
              🔍
            </div>
            <h3 className="text-xl font-semibold mb-2">Recherche Simple</h3>
            <p className="text-gray-600">
              Trouvez facilement des baby-sitters qualifiés selon vos critères.
            </p>
          </div>

          <div className="p-8 text-center bg-white rounded-2xl shadow-md hover:-translate-y-2 transition">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-pink-100">
              ❤️
            </div>
            <h3 className="text-xl font-semibold mb-2">Matching IA</h3>
            <p className="text-gray-600">
              Notre IA recommande le baby-sitter idéal pour votre enfant.
            </p>
          </div>

          <div className="p-8 text-center bg-white rounded-2xl shadow-md hover:-translate-y-2 transition">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-pink-100">
              🛡️
            </div>
            <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
            <p className="text-gray-600">
              Vérifications et contrôles pour un service fiable et sécurisé.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
