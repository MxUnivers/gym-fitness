import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [productItems, setProductItems] = useState([]);
  const [reservationItems, setReservationItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', paymentMethod: 'orange_money',
  });
  const [cardData, setCardData] = useState({
    number: '', name: '', expiry: '', cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');

  const periodLabels = {
    '1_jour': '1 jour', '1_semaine': '1 semaine', '2_semaines': '2 semaines',
    '3_semaines': '3 semaines', '1_mois': '1 mois', '2_mois': '2 mois',
    '3_mois': '3 mois', '5_mois': '5 mois', '6_mois': '6 mois',
    '7_mois': '7 mois', '8_mois': '8 mois', '9_mois': '9 mois',
    '10_mois': '10 mois', '11_mois': '11 mois', '1_an': '1 an',
  };

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem('productCart') || '[]');
    const r = JSON.parse(localStorage.getItem('reservationCart') || '[]');
    setProductItems(p);
    setReservationItems(r);
  }, []);

  const productSubtotal = productItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const productDelivery = productItems.length > 0 ? 2000 : 0;
  const reservationTotal = reservationItems.reduce((sum, item) => sum + item.price, 0);
  const total = productSubtotal + productDelivery + reservationTotal;

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const validateCard = () => {
    const digits = cardData.number.replace(/\s/g, '');
    if (digits.length < 16) return 'Numéro de carte invalide (16 chiffres requis)';
    if (!cardData.name.trim()) return 'Nom du titulaire requis';
    const [mm, yy] = cardData.expiry.split('/');
    if (!mm || !yy || parseInt(mm) > 12 || parseInt(mm) < 1) return 'Date d\'expiration invalide';
    if (cardData.cvv.length < 3) return 'CVV invalide';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card') {
      const err = validateCard();
      if (err) { setCardError(err); return; }
      setCardError('');
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('productCart');
      localStorage.removeItem('reservationCart');
      navigate('/payment-success');
    }, 2000);
  };

  const paymentMethods = [
    { value: 'orange_money', label: 'Orange Money', desc: 'Paiement instantané', icon: 'ri-smartphone-line', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { value: 'mtn', label: 'MTN Mobile Money', desc: 'Rapide et fiable', icon: 'ri-phone-line', color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { value: 'wave', label: 'Wave', desc: 'Sans frais', icon: 'ri-wallet-3-line', color: 'bg-teal-100', iconColor: 'text-teal-600' },
    { value: 'card', label: 'Carte Bancaire', desc: 'Visa / Mastercard', icon: 'ri-bank-card-line', color: 'bg-gray-100', iconColor: 'text-gray-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .card-input { font-family: 'Courier New', monospace; letter-spacing: 0.1em; }
      `}</style>

      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><i className="ri-building-line text-white text-sm"></i></div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <i className="ri-lock-line text-teal-500"></i>
            <span className="hidden sm:inline">Paiement sécurisé</span>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Paiement</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Infos personnelles */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-line text-teal-500"></i>Informations personnelles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                    <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                    <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Kouassi" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="votre@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="+225 07 XX XX XX XX" />
                  </div>
                </div>
              </div>

              {/* Livraison */}
              {productItems.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-truck-line text-teal-500"></i>Adresse de livraison
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
                      <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Rue, quartier..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville</label>
                      <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Abidjan" />
                    </div>
                  </div>
                </div>
              )}

              {/* Méthode de paiement */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-secure-payment-line text-teal-500"></i>Méthode de paiement
                </h2>
                <div className="space-y-2.5">
                  {paymentMethods.map(method => (
                    <label key={method.value} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === method.value ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={(e) => { setFormData({ ...formData, paymentMethod: e.target.value }); setCardError(''); }}
                        className="w-4 h-4 text-teal-600"
                      />
                      <div className={`w-10 h-10 flex items-center justify-center ${method.color} rounded-lg flex-shrink-0`}>
                        <i className={`${method.icon} ${method.iconColor}`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                      {method.value === 'card' && (
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                          <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        </div>
                      )}
                    </label>
                  ))}
                </div>

                {/* Formulaire carte bancaire */}
                {formData.paymentMethod === 'card' && (
                  <div className="mt-5 p-5 bg-gray-50 rounded-xl border border-gray-200 fade-in">
                    <div className="flex items-center gap-2 mb-4">
                      <i className="ri-lock-line text-teal-500 text-sm"></i>
                      <p className="text-xs text-gray-500">Vos données sont chiffrées et sécurisées</p>
                    </div>

                    {/* Card preview */}
                    <div className="relative w-full max-w-xs mx-auto mb-5 h-40 bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-white overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <i className="ri-bank-card-line text-2xl text-white/80"></i>
                          <div className="flex gap-1">
                            <div className="w-6 h-6 bg-red-400 rounded-full opacity-80"></div>
                            <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-80 -ml-2"></div>
                          </div>
                        </div>
                        <p className="text-sm font-mono tracking-widest mb-2 text-white/90">
                          {cardData.number || '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-white/60 uppercase">Titulaire</p>
                            <p className="text-xs font-semibold uppercase">{cardData.name || 'VOTRE NOM'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/60 uppercase">Expire</p>
                            <p className="text-xs font-semibold">{cardData.expiry || 'MM/AA'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {cardError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <i className="ri-error-warning-line text-red-500 text-sm flex-shrink-0"></i>
                        <p className="text-xs text-red-600">{cardError}</p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Numéro de carte</label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm card-input"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom du titulaire</label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm uppercase"
                          placeholder="JEAN KOUASSI"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date d'expiration</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm card-input"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                          <input
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm card-input"
                            placeholder="•••"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><i className="ri-loader-4-line animate-spin"></i> Traitement en cours...</>
                  : <><i className="ri-secure-payment-line"></i>Payer {total.toLocaleString('fr-FR')} FCFA</>
                }
              </button>
            </form>
          </div>

          {/* Récapitulatif */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Récapitulatif</h2>
              {productItems.length === 0 && reservationItems.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Panier vide</p>
              )}
              <div className="space-y-3 mb-4">
                {productItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700">
                    <span className="truncate mr-2">{item.name} ×{item.quantity}</span>
                    <span className="whitespace-nowrap font-medium">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                ))}
                {productItems.length > 0 && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Livraison</span>
                    <span>{productDelivery.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}
                {reservationItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700">
                    <span className="truncate mr-2">{item.sport} ({periodLabels[item.pack] || item.pack})</span>
                    <span className="whitespace-nowrap font-medium">{item.price.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-teal-600 text-lg">{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="ri-shield-check-line text-teal-500"></i>
                  <span>Paiement 100% sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
