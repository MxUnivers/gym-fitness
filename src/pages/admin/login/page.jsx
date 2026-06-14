import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (formData.email === 'admin@gymmanager.ci' && formData.password === 'admin123') {
        navigate('/admin');
      } else {
        setError('Email ou mot de passe incorrect');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20gym%20interior%20with%20professional%20fitness%20equipment%2C%20treadmills%20and%20weight%20machines%2C%20bright%20lighting%2C%20motivational%20atmosphere%2C%20contemporary%20sports%20facility%20design%2C%20clean%20and%20organized%20workout%20space&width=900&height=1080&seq=adminlogin1&orientation=portrait"
          alt="GymManager"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-700/40"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-xl text-teal-600"></i>
            </div>
            <span className="text-2xl font-bold text-white">GymManager</span>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Gérez vos salles de sport à Abidjan
            </h2>
            <p className="text-white/80 text-lg">
              Plateforme complète de gestion avec réservations, abonnements et paiements électroniques.
            </p>
            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-white/70 text-sm">Salles</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">1,248</p>
                <p className="text-white/70 text-sm">Membres</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">342</p>
                <p className="text-white/70 text-sm">Réservations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-xl text-white"></i>
            </div>
            <span className="text-2xl font-bold text-gray-900">GymManager</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion Admin</h1>
            <p className="text-gray-600">Accédez à votre tableau de bord</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
              <div className="relative">
                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@gymmanager.ci"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">
                <i className="ri-error-warning-line"></i>
                {error}
              </div>
            )}

            <div className="bg-teal-50 rounded-xl p-3 text-xs text-teal-700">
              <strong>Démo :</strong> admin@gymmanager.ci / admin123
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              <i className="ri-arrow-left-line mr-1"></i>
              Retour au site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}