import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sports, periodLabels } from '../../mocks/sports';

export default function ReservationCartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reservationCart') || '[]');
    setItems(stored);
  }, []);

  const removeItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem('reservationCart', JSON.stringify(updated));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><i className="ri-building-line text-white text-sm"></i></div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"><i className="ri-arrow-left-line"></i> Retour</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Panier de Réservations <span className="text-gray-400 font-normal text-lg">({items.length})</span></h1>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {items.map((item) => {
                const sport = sports.find((s) => s.name === item.sport);
                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl">
                          <i className={`${sport?.icon || 'ri-run-line'} text-2xl text-teal-600`}></i>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{item.sport}</h3>
                          <p className="text-xs text-gray-500">{item.site}</p>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 cursor-pointer">
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500 mb-0.5">Pack</p><p className="font-medium text-gray-900">{periodLabels[item.pack] || item.pack}</p></div>
                      <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500 mb-0.5">{item.type === 'coach' ? 'Coach' : 'Abonnement'}</p><p className="font-medium text-gray-900">{item.coach || item.abonnement}</p></div>
                      <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-500 mb-0.5">Début</p><p className="font-medium text-gray-900">{new Date(item.startDate).toLocaleDateString('fr-FR')}</p></div>
                    </div>
                    <div className="mt-3 flex justify-end"><p className="text-lg font-bold text-teal-600">{item.price.toLocaleString('fr-FR')} FCFA</p></div>
                  </div>
                );
              })}
            </div>

            <div className="w-full lg:w-72">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h2>
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-700"><span>{item.sport}</span><span>{item.price.toLocaleString('fr-FR')} FCFA</span></div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900"><span>Total</span><span className="text-teal-600">{total.toLocaleString('fr-FR')} FCFA</span></div>
                </div>
                <button onClick={() => navigate('/checkout')} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><i className="ri-secure-payment-line"></i>Payer maintenant</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 text-center py-20">
            <i className="ri-calendar-line text-6xl text-gray-300 block mb-4"></i>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aucune réservation</h2>
            <p className="text-gray-600 mb-6">Choisissez un sport et une salle pour commencer</p>
            <a href="/" className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap">Voir les sports</a>
          </div>
        )}
      </div>
    </div>
  );
}
