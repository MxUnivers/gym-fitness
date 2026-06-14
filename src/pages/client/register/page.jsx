import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', indicatif: '+225',
    password: '', confirmPassword: '', site: '', sport: '', abonnement: '',
    address: '', birthDate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const sites = ['FitZone Cocody', 'PowerGym Plateau', 'Elite Fitness Marcory', 'BodyShape Yopougon'];
  const sports = ['Musculation', 'Yoga & Pilates', 'Cardio Training', 'Boxe & Arts Martiaux', 'Zumba & Danse', 'CrossFit', 'Fitness & Aérobic', 'Natation'];
  const abonnements = ['Basic — 35,000 FCFA/mois', 'Standard — 75,000 FCFA/mois', 'Premium — 150,000 FCFA/mois'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => navigate('/client/profile'), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-white text-sm"></i>
            </div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
          <a href="/client/login" className="text-sm text-teal-600 hover:text-teal-700 font-medium">Se connecter</a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                <span className={`text-sm font-medium ${step >= s ? 'text-teal-600' : 'text-gray-400'}`}>{s === 1 ? 'Informations' : 'Préférences'}</span>
                {s < 2 && <div className={`w-12 h-0.5 ${step > s ? 'bg-teal-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{step === 1 ? 'Créer votre compte' : 'Vos préférences'}</h1>
            <p className="text-gray-600 text-sm mb-6">{step === 1 ? 'Renseignez vos informations personnelles' : 'Choisissez votre salle et votre sport'}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Jean" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Kouassi" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="jean@email.com" /></div>
                  <div className="flex gap-2">
                    <select value={formData.indicatif} onChange={(e) => setFormData({ ...formData, indicatif: e.target.value })} className="px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm w-28">
                      <option value="+225">+225 CI</option><option value="+221">+221 SN</option><option value="+223">+223 ML</option><option value="+33">+33 FR</option>
                    </select>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="07 12 34 56 78" />
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label><input type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"><i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i></button>
                    </div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label><input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="••••••••" /></div>
                </>
              )}

              {step === 2 && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Salle préférée</label><select value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner une salle</option>{sites.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Sport pratiqué</label><select value={formData.sport} onChange={(e) => setFormData({ ...formData, sport: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner un sport</option>{sports.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Formule d'abonnement</label><div className="space-y-2">{abonnements.map(a => (<label key={a} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${formData.abonnement === a ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}><input type="radio" name="abonnement" value={a} checked={formData.abonnement === a} onChange={(e) => setFormData({ ...formData, abonnement: e.target.value })} className="text-teal-600" /><span className="text-sm font-medium text-gray-900">{a}</span></label>))}</div></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label><input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Votre quartier, Abidjan" /></div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                {step > 1 && (<button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm whitespace-nowrap cursor-pointer">Retour</button>)}
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2">
                  {loading ? <><i className="ri-loader-4-line animate-spin"></i> Création...</> : step === 1 ? 'Continuer' : 'Créer mon compte'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Déjà un compte ? <a href="/client/login" className="text-teal-600 hover:text-teal-700 font-medium">Se connecter</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}