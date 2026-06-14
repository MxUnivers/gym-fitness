import { useNavigate } from 'react-router-dom';
import { reservations } from '../../mocks/reservations';

export default function ReservationDetailPage() {
  const navigate = useNavigate();
  const reservation = reservations[0];

  const statusColors = {
    'confirmée': 'bg-green-100 text-green-700',
    'en attente': 'bg-amber-100 text-amber-700',
    'annulée': 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><i className="ri-building-line text-white text-sm"></i></div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
          <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 cursor-pointer"><i className="ri-arrow-left-line"></i> Retour</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Détail de la réservation</h1>
          <span className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${statusColors[reservation.status] || 'bg-gray-100 text-gray-700'}`}>{reservation.status}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
          <div className="bg-teal-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div><p className="text-teal-100 text-sm mb-1">Référence</p><p className="text-2xl font-bold">{reservation.id}</p></div>
              <div className="text-right"><p className="text-teal-100 text-sm mb-1">Montant total</p><p className="text-2xl font-bold">{reservation.prixTotal.toLocaleString('fr-FR')} FCFA</p></div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Informations client</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Prénom</p><p className="text-sm font-medium text-gray-900">{reservation.firstName}</p></div>
                <div><p className="text-xs text-gray-500">Nom</p><p className="text-sm font-medium text-gray-900">{reservation.lastName}</p></div>
                <div><p className="text-xs text-gray-500">Téléphone</p><p className="text-sm font-medium text-gray-900">{reservation.indicatif} {reservation.phone}</p></div>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Détails de la réservation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Site / Centre</p><p className="text-sm font-medium text-gray-900">{reservation.site}</p></div>
                <div><p className="text-xs text-gray-500">Sport</p><p className="text-sm font-medium text-gray-900">{reservation.sport}</p></div>
                <div><p className="text-xs text-gray-500">Pack / Période</p><p className="text-sm font-medium text-gray-900">{reservation.pack}</p></div>
                <div><p className="text-xs text-gray-500">Abonnement</p><p className="text-sm font-medium text-gray-900">{reservation.abonnement}</p></div>
                <div><p className="text-xs text-gray-500">Date début</p><p className="text-sm font-medium text-gray-900">{new Date(reservation.startDate).toLocaleDateString('fr-FR')}</p></div>
                <div><p className="text-xs text-gray-500">Date fin</p><p className="text-sm font-medium text-gray-900">{new Date(reservation.endDate).toLocaleDateString('fr-FR')}</p></div>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Paiement</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Méthode</p><p className="text-sm font-medium text-gray-900">{reservation.paymentMethod}</p></div>
                <div><p className="text-xs text-gray-500">Montant</p><p className="text-sm font-bold text-teal-600">{reservation.prixTotal.toLocaleString('fr-FR')} FCFA</p></div>
              </div>
            </div>

            {reservation.notes && (
              <>
                <div className="border-t border-gray-100"></div>
                <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800"><i className="ri-information-line mr-1"></i>{reservation.notes}</div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate('/client/profile')} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><i className="ri-arrow-left-line"></i> Mes réservations</button>
          <button onClick={() => navigate('/')} className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><i className="ri-home-line"></i> Accueil</button>
        </div>
      </div>
    </div>
  );
}