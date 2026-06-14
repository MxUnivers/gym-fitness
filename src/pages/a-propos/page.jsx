import { useState } from 'react';
import { gyms } from '../../mocks/gyms';
import { coaches } from '../../mocks/coaches';

const stats = [
  { number: '4', label: 'Salles de sport', icon: 'ri-building-line' },
  { number: '15+', label: 'Coachs experts', icon: 'ri-user-star-line' },
  { number: '2,500+', label: 'Membres actifs', icon: 'ri-team-line' },
  { number: '8', label: 'Sports proposés', icon: 'ri-run-line' },
];

const values = [
  { title: 'Excellence', description: 'Nous visons l\'excellence dans chaque séance, chaque cours et chaque interaction avec nos membres.', icon: 'ri-medal-line' },
  { title: 'Communauté', description: 'Nous créons un environnement chaleureux où chacun se sent accueilli et motivé.', icon: 'ri-heart-line' },
  { title: 'Innovation', description: 'Nous investissons dans les équipements les plus modernes et les méthodes les plus efficaces.', icon: 'ri-lightbulb-line' },
  { title: 'Accessibilité', description: 'Nous rendons le fitness accessible à tous avec des tarifs adaptés et des horaires flexibles.', icon: 'ri-hand-heart-line' },
];

export default function AProposPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">GymManager</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">Accueil</a>
            <a href="/boutique" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">Boutique</a>
            <a href="/a-propos" className="text-sm font-medium text-teal-600 whitespace-nowrap">À Propos</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">Contact</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="/client/login" className="bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold whitespace-nowrap">Connexion</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center">
            <i className="ri-menu-line text-2xl text-gray-900"></i>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
            <a href="/" className="block text-sm font-medium text-gray-700 py-2">Accueil</a>
            <a href="/boutique" className="block text-sm font-medium text-gray-700 py-2">Boutique</a>
            <a href="/a-propos" className="block text-sm font-medium text-teal-600 py-2">À Propos</a>
            <a href="/contact" className="block text-sm font-medium text-gray-700 py-2">Contact</a>
            <a href="/client/login" className="block text-sm font-medium text-teal-600 py-2">Connexion</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20fitness%20gym%20interior%20wide%20panoramic%20view%2C%20state%20of%20the%20art%20equipment%2C%20bright%20contemporary%20athletic%20facility%2C%20people%20exercising%2C%20professional%20architectural%20photography%2C%20clean%20spacious%20workout%20area&width=1920&height=600&seq=about-hero&orientation=landscape"
          alt="À propos"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">À Propos de Nous</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Depuis 2018, nous transformons la vie de milliers d'Ivoiriens à travers le fitness
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center border border-gray-200">
                <div className="w-14 h-14 flex items-center justify-center bg-teal-100 rounded-xl mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-teal-600`}></i>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondé en 2018 à Abidjan, GymManager est né d'une vision simple : rendre le fitness accessible à tous les Ivoiriens. Ce qui a commencé comme une petite salle de sport à Cocody est devenu un réseau de 4 salles modernes réparties dans toute la ville.
                </p>
                <p>
                  Notre mission est de créer un environnement où chacun, quel que soit son niveau, peut atteindre ses objectifs de santé et de bien-être. Avec plus de 15 coachs certifiés et 8 disciplines sportives, nous offrons une expérience fitness complète et personnalisée.
                </p>
                <p>
                  Aujourd'hui, nous comptons plus de 2 500 membres actifs qui nous font confiance pour leur transformation physique et mentale. Notre engagement envers l'excellence et l'innovation continue de guider chaque décision que nous prenons.
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=diverse%20group%20of%20african%20athletes%20training%20together%20in%20modern%20gym%2C%20teamwork%20and%20motivation%2C%20bright%20contemporary%20fitness%20facility%2C%20professional%20sports%20photography%2C%20energetic%20atmosphere&width=800&height=600&seq=about-story&orientation=landscape"
                alt="Notre équipe"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident chaque action de notre équipe
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl mb-4">
                  <i className={`${value.icon} text-xl text-teal-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Salles */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Salles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              4 adresses stratégiques à Abidjan pour vous accompagner partout
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gyms.map((gym) => (
              <div key={gym.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-48">
                  <img src={gym.image} alt={gym.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{gym.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <i className="ri-map-pin-line text-teal-500"></i>
                    <span>{gym.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Capacité: {gym.capacity}</span>
                    <span className="text-teal-600 font-semibold">{gym.available} places</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Coachs */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Coachs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une équipe de professionnels passionnés à votre service
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.filter(c => c.status === 'active').map((coach) => (
              <div key={coach.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center">
                <img src={coach.photo} alt={coach.firstName} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">{coach.firstName} {coach.lastName}</h3>
                <p className="text-sm text-teal-600 mb-2">{coach.specialty}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><i className="ri-star-fill text-amber-400"></i>{coach.rating}</span>
                  <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{coach.gym}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-700 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold">GymManager</span>
              </div>
              <p className="text-white/80 text-sm">La solution complète pour gérer vos salles de sport à Abidjan</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-white/80 hover:text-white transition-colors text-sm whitespace-nowrap">Accueil</a></li>
                <li><a href="/boutique" className="text-white/80 hover:text-white transition-colors text-sm whitespace-nowrap">Boutique</a></li>
                <li><a href="/a-propos" className="text-white/80 hover:text-white transition-colors text-sm whitespace-nowrap">À Propos</a></li>
                <li><a href="/contact" className="text-white/80 hover:text-white transition-colors text-sm whitespace-nowrap">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Nos Salles</h4>
              <ul className="space-y-2">
                {gyms.map((gym) => (
                  <li key={gym.id} className="text-white/80 text-sm">{gym.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Suivez-Nous</h4>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-facebook-fill text-white"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-instagram-line text-white"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-twitter-x-line text-white"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-youtube-line text-white"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-sm">© 2025 GymManager. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}