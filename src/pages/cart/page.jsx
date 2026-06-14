import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('productCart') || '[]');
    setCartItems(stored);
  }, []);

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const updated = cartItems.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
    setCartItems(updated);
    localStorage.setItem('productCart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('productCart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cartItems.length > 0 ? 2000 : 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><i className="ri-building-line text-white text-sm"></i></div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
          <a href="/boutique" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"><i className="ri-arrow-left-line"></i> Continuer les achats</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon Panier <span className="text-gray-400 font-normal text-lg">({cartItems.length} articles)</span></h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
                  <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                    <p className="text-base font-bold text-teal-600">{item.price.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-1 py-1">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"><i className="ri-subtract-line text-gray-600"></i></button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer"><i className="ri-add-line text-gray-600"></i></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 cursor-pointer"><i className="ri-delete-bin-line text-sm"></i></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-80">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm text-gray-700"><span>Sous-total</span><span>{subtotal.toLocaleString('fr-FR')} FCFA</span></div>
                  <div className="flex justify-between text-sm text-gray-700"><span>Livraison</span><span>{delivery.toLocaleString('fr-FR')} FCFA</span></div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900"><span>Total</span><span className="text-teal-600">{total.toLocaleString('fr-FR')} FCFA</span></div>
                </div>
                <button onClick={() => navigate('/checkout')} className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><i className="ri-secure-payment-line"></i>Passer la commande</button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500"><i className="ri-shield-check-line text-green-500"></i>Paiement 100% sécurisé</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 text-center py-20">
            <i className="ri-shopping-cart-line text-6xl text-gray-300 block mb-4"></i>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Découvrez nos produits et équipements de sport</p>
            <a href="/boutique" className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap">Voir la boutique</a>
          </div>
        )}
      </div>
    </div>
  );
}
