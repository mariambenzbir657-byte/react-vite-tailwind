function Home() {
  return (
    <div className="w-full min-h-screen font-sans">
    {/* HERO */}
    <section
      className="relative flex items-center min-h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
  "linear-gradient(rgba(219,39,119,0.25), rgba(219,39,119,0.25)), url('https://images.unsplash.com/photo-1504151932400-72d4384f04b3')",

      }}
    >
      <div className="grid w-full grid-cols-1 gap-12 px-10 text-white md:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-5xl font-extrabold leading-tight">
            <span className="block">Trouvez</span>
            <span className="block text-pink-200">la Garde Parfaite</span>
            <span className="block">pour vos Enfants</span>
          </h2>

          <p className="max-w-lg mb-8 text-lg text-white/90">
            Parents & baby-sitters vérifiés. Recherche simple, matching IA et
            réservation en quelques clics.
          </p>

          {/* SEARCH BAR */}
          <div className="flex items-center max-w-xl gap-3 p-3 bg-white rounded-full shadow-lg">
            <input
              type="text"
              placeholder="Ville, besoin, âge..."
              className="flex-1 px-4 text-gray-700 outline-none"
            />
            <button className="px-6 py-2 text-white bg-pink-600 rounded-full hover:bg-pink-700">
              Rechercher
            </button>
            <button className="px-6 py-2 text-pink-600 border border-pink-600 rounded-full hover:bg-pink-50">
              S’inscrire
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md p-6 text-white bg-white/20 backdrop-blur-md rounded-2xl">
            <h3 className="mb-4 text-xl font-semibold">
              Pourquoi SmartBabyCare ?
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-pink-200">✔</span>
                Profils vérifiés & sécurité renforcée
              </li>
              <li className="flex items-center gap-3">
                <span className="text-pink-200">✔</span>
                Matching IA selon vos besoins
              </li>
              <li className="flex items-center gap-3">
                <span className="text-pink-200">✔</span>
                Réservation rapide & transparente
              </li>
            </ul>
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
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-pink-600 bg-pink-100 rounded-full">
            🔍
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            Recherche Intelligente
          </h3>
          <p className="text-gray-600">
            Trouvez des profils basés sur vos critères et les besoins de votre
            enfant.
          </p>
        </div>

        <div className="p-8 text-center bg-gray-50 rounded-2xl">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-pink-600 bg-pink-100 rounded-full">
            ❤️
          </div>
          <h3 className="mb-2 text-xl font-semibold">Matching IA</h3>
          <p className="text-gray-600">
            Notre IA recommande les baby-sitters les plus compatibles.
          </p>
        </div>

        <div className="p-8 text-center bg-gray-50 rounded-2xl">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-pink-600 bg-pink-100 rounded-full">
            🛡️
          </div>
          <h3 className="mb-2 text-xl font-semibold">Profils Vérifiés</h3>
          <p className="text-gray-600">
            Sécurité maximale grâce à la vérification des identités.
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
        Notre IA analyse plus de 50 points de données pour garantir que la
        baby-sitter recommandée correspond parfaitement à la personnalité et
        aux besoins de votre enfant.
      </p>
      <button className="px-8 py-3 text-white bg-pink-600 rounded-full hover:bg-pink-700">
        Découvrir le Matching IA
      </button>
    </section>

    </div>

  );
}
export default Home