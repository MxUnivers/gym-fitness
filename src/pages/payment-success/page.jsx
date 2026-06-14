import { useNavigate } from 'react-router-dom';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const orderRef = `CMD${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><i className="ri-building-line text-white text-sm"></i></div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-10">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-5xl text-green-600"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Paiement réussi !</h1>
            <p className="text-gray-600 mb-6">Votre commande a été confirmée avec succès.</p>

            <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Référence commande</span><span className="font-bold text-gray-900">{orderRef}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Montant payé</span><span className="font-bold text-teal-600">51,000 FCFA</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Méthode</span><span className="font-medium text-gray-900">Orange Money</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-medium text-gray-900">{new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Statut</span><span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">Confirmé</span></div>
            </div>

            <div className="bg-teal-50 rounded-xl p-4 mb-6 text-sm text-teal-700 text-left">
              <div className="flex items-start gap-2">
                <i className="ri-mail-line mt-0.5 flex-shrink-0"></i>
                <p>Un email de confirmation a été envoyé à <strong>jean.kouassi@email.com</strong>. Vous recevrez les informations de livraison sous 24h.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate('/client/profile')} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><i className="ri-user-line"></i>Mes réservations</button>
              <button onClick={() => navigate('/')} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><i className="ri-home-line"></i>Retour à l'accueil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}