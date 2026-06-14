import { useState } from 'react';
import { orders as initialOrders } from '../../../mocks/orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState('tous');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState('');

  const filtered = orders.filter(o => filterStatus === 'tous' || o.status === filterStatus);

  const statusColors = {
    'en attente': 'bg-amber-100 text-amber-700',
    'validée': 'bg-teal-100 text-teal-700',
    'livrée': 'bg-green-100 text-green-700',
    'annulée': 'bg-red-100 text-red-700',
  };

  const updateStatus = (id, status, info) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status, deliveryInfo: info || o.deliveryInfo } : o));
  };

  const handleDeliver = () => {
    if (!deliveryInfo.trim()) return;
    updateStatus(selectedOrder.id, 'livrée', deliveryInfo);
    setShowDeliveryModal(false);
    setDeliveryInfo('');
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    updateStatus(selectedOrder.id, 'annulée');
    setShowCancelModal(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total commandes', value: orders.length, color: 'text-gray-900' },
          { label: 'En attente', value: orders.filter(o => o.status === 'en attente').length, color: 'text-amber-600' },
          { label: 'Validées', value: orders.filter(o => o.status === 'validée').length, color: 'text-teal-600' },
          { label: 'Livrées', value: orders.filter(o => o.status === 'livrée').length, color: 'text-green-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        {['tous', 'en attente', 'validée', 'livrée', 'annulée'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors capitalize ${filterStatus === s ? 'bg-teal-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            {s === 'tous' ? 'Toutes' : s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(order => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-gray-900">{order.id}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[order.status]}`}>{order.status}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{order.clientName}</p>
                <p className="text-xs text-gray-500">{order.clientEmail} • {order.clientPhone}</p>
                <p className="text-xs text-gray-500 mt-0.5">{formatDate(order.orderDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{order.total.toLocaleString('fr-FR')} FCFA</p>
                <p className="text-xs text-gray-500">{order.paymentMethod}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">Articles commandés</p>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                    <span className="font-medium text-gray-900">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600"><i className="ri-map-pin-line mr-1"></i>{order.deliveryAddress}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setSelectedOrder(order); setShowDetailModal(true); }} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs font-medium whitespace-nowrap cursor-pointer flex items-center gap-1"><i className="ri-eye-line"></i> Détails</button>
                {order.status === 'en attente' && (
                  <button onClick={() => updateStatus(order.id, 'validée')} className="px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs font-medium whitespace-nowrap cursor-pointer flex items-center gap-1"><i className="ri-check-line"></i> Valider</button>
                )}
                {order.status === 'validée' && (
                  <button onClick={() => { setSelectedOrder(order); setShowDeliveryModal(true); }} className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium whitespace-nowrap cursor-pointer flex items-center gap-1"><i className="ri-truck-line"></i> Livrer</button>
                )}
                {(order.status === 'en attente' || order.status === 'validée') && (
                  <button onClick={() => { setSelectedOrder(order); setShowCancelModal(true); }} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-medium whitespace-nowrap cursor-pointer flex items-center gap-1"><i className="ri-close-line"></i> Annuler</button>
                )}
              </div>
            </div>
            {order.deliveryInfo && (
              <div className="mt-3 bg-green-50 rounded-lg p-3 text-xs text-green-700"><i className="ri-truck-line mr-1"></i>{order.deliveryInfo}</div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 text-center py-16 text-gray-400">
            <i className="ri-shopping-bag-line text-5xl block mb-3"></i>
            <p>Aucune commande trouvée</p>
          </div>
        )}
      </div>

      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Commande {selectedOrder.id}</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-gray-500">Client</p><p className="font-medium text-gray-900">{selectedOrder.clientName}</p></div>
                <div><p className="text-xs text-gray-500">Email</p><p className="font-medium text-gray-900">{selectedOrder.clientEmail}</p></div>
                <div><p className="text-xs text-gray-500">Téléphone</p><p className="font-medium text-gray-900">{selectedOrder.clientPhone}</p></div>
                <div><p className="text-xs text-gray-500">Paiement</p><p className="font-medium text-gray-900">{selectedOrder.paymentMethod}</p></div>
                <div className="col-span-2"><p className="text-xs text-gray-500">Adresse de livraison</p><p className="font-medium text-gray-900">{selectedOrder.deliveryAddress}</p></div>
                <div><p className="text-xs text-gray-500">Date commande</p><p className="font-medium text-gray-900">{formatDate(selectedOrder.orderDate)}</p></div>
                <div><p className="text-xs text-gray-500">Total</p><p className="font-bold text-teal-600">{selectedOrder.total.toLocaleString('fr-FR')} FCFA</p></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-600 mb-3">Articles</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1.5 border-b border-gray-200 last:border-0">
                    <span className="text-gray-700">{item.name} x{item.quantity}</span>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                ))}
              </div>
              {selectedOrder.notes && (
                <div className="bg-amber-50 rounded-lg p-3 text-sm text-amber-800"><i className="ri-information-line mr-1"></i>{selectedOrder.notes}</div>
              )}
              {selectedOrder.deliveryInfo && (
                <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700"><i className="ri-truck-line mr-1"></i>{selectedOrder.deliveryInfo}</div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {showDeliveryModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Confirmer la livraison</h3>
              <p className="text-sm text-gray-600 mt-1">Commande {selectedOrder.id} — {selectedOrder.clientName}</p>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Informations de livraison</label>
              <textarea value={deliveryInfo} onChange={(e) => setDeliveryInfo(e.target.value)} placeholder="Ex: Livré par coursier le 24/04/2026 à 14h30. Reçu par le client." rows={4} maxLength={500} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none" />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { setShowDeliveryModal(false); setDeliveryInfo(''); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={handleDeliver} disabled={!deliveryInfo.trim()} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 flex items-center gap-2"><i className="ri-truck-line"></i> Confirmer livraison</button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-close-circle-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Annuler la commande</h3>
              <p className="text-gray-600 text-center mb-6">Annuler la commande <strong>{selectedOrder?.id}</strong> de {selectedOrder?.clientName} ?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowCancelModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Non, garder</button>
                <button onClick={handleCancel} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Oui, annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}