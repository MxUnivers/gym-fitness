import { useState } from 'react';
import { gyms } from '../../mocks/gyms';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus(null), 3000);
  };

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
            <a href="/a-propos" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">À Propos</a>
            <a href="/contact" className="text-sm font-medium text-teal-600 whitespace-nowrap">Contact</a>
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
            <a href="/a-propos" className="block text-sm font-medium text-gray-700 py-2">À Propos</a>
            <a href="/contact" className="block text-sm font-medium text-teal-600 py-2">Contact</a>
            <a href="/client/login" className="block text-sm font-medium text-teal-600 py-2">Connexion</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20gym%20reception%20desk%20area%2C%20welcoming%20fitness%20center%20entrance%2C%20bright%20contemporary%20interior%20design%2C%20professional%20customer%20service%20area%2C%20clean%20athletic%20facility%20lobby&width=1920&height=500&seq=contact-hero&orientation=landscape"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contactez-Nous</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Restons en Contact</h2>
              <p className="text-gray-600 mb-8">
                Que vous ayez une question sur nos abonnements, nos salles ou nos services, notre équipe est prête à vous aider.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl flex-shrink-0">
                    <i className="ri-phone-line text-xl text-teal-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600 text-sm">+225 07 XX XX XX XX</p>
                    <p className="text-gray-500 text-xs">Lun - Sam, 6h - 22h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl flex-shrink-0">
                    <i className="ri-mail-line text-xl text-teal-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 text-sm">contact@gymmanager.ci</p>
                    <p className="text-gray-500 text-xs">Réponse sous 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl flex-shrink-0">
                    <i className="ri-map-pin-line text-xl text-teal-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse Principale</h4>
                    <p className="text-gray-600 text-sm">FitZone Cocody, Abidjan</p>
                    <p className="text-gray-500 text-xs">Côte d'Ivoire</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Réseaux Sociaux</h4>
                <div className="flex items-center gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl hover:bg-teal-200 transition-colors">
                    <i className="ri-facebook-fill text-xl text-teal-600"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl hover:bg-teal-200 transition-colors">
                    <i className="ri-instagram-line text-xl text-teal-600"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl hover:bg-teal-200 transition-colors">
                    <i className="ri-twitter-x-line text-xl text-teal-600"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl hover:bg-teal-200 transition-colors">
                    <i className="ri-youtube-line text-xl text-teal-600"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <form data-readdy-form action="https://readdy.ai/api/form/d7lqdgtnkhlbktri2rcg" method="POST" onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <input type="text" name="prenom" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Jean" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <input type="text" name="nom" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Kouassi" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="votre@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input type="tel" name="telephone" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="+225 07 XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                    <select name="sujet" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
                      <option value="">Choisir un sujet</option>
                      <option value="abonnement">Abonnement</option>
                      <option value="reservation">Réservation</option>
                      <option value="coach">Coach personnel</option>
                      <option value="boutique">Boutique</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea name="message" required maxLength={500} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none" placeholder="Votre message..."></textarea>
                    <p className="text-xs text-gray-400 mt-1">Maximum 500 caractères</p>
                  </div>

                  {formStatus === 'success' && (
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm">
                      <i className="ri-check-line"></i>Message envoyé avec succès !
                    </div>
                  )}

                  <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                    <i className="ri-send-plane-line"></i>Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Salles sur la carte */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Adresses</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Retrouvez-nous dans nos 4 salles à Abidjan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {gyms.map((gym) => (
              <div key={gym.id} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl flex-shrink-0">
                    <i className="ri-map-pin-line text-xl text-teal-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{gym.name}</h3>
                    <p className="text-sm text-gray-600">{gym.location}</p>
                    <p className="text-sm text-gray-500 mt-1">Capacité: {gym.capacity} | Disponible: {gym.available}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden h-80 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d-4.0083!3d5.3595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3fe70d5f47c5c!2sAbidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Abidjan"
            ></iframe>
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