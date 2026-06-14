import { useState } from 'react';
import { payments as initialPayments } from '../../../mocks/payments';
import { members } from '../../../mocks/members';
import { gyms } from '../../../mocks/gyms';

export default function PaymentsPage() {
  const [paymentsList, setPaymentsList] = useState(initialPayments);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('detail');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    memberId: '', amount: 0, method: 'Orange Money', type: 'Abonnement', gym: ''
  });

  const handleAdd = () => {
    setModalMode('add');
    setFormData({ memberId: '', amount: 0, method: 'Orange Money', type: 'Abonnement', gym: '' });
    setShowModal(true);
  };

  const handleDetail = (payment) => {
    setModalMode('detail');
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const member = members.find(m => m.id === formData.memberId);
      const newPayment = {
        id: `PAY${String(paymentsList.length + 1).padStart(3, '0')}`,
        memberId: formData.memberId,
        memberName: member ? `${member.firstName} ${member.lastName}` : '',
        amount: formData.amount,
        method: formData.method,
        status: 'complété',
        date: new Date().toISOString().split('T')[0],
        transactionId: `${formData.method.substring(0, 3).toUpperCase()}-${new Date().toISOString().split('T')[0]}-${String(paymentsList.length + 1).padStart(3, '0')}`,
        gym: formData.gym,
        type: formData.type
      };
      setPaymentsList([...paymentsList, newPayment]);
    }
    setShowModal(false);
  };

  const filteredPayments = paymentsList.filter(payment => {
    const methodMatch = filterMethod === 'all' || payment.method === filterMethod;
    const statusMatch = filterStatus === 'all' || payment.status === filterStatus;
    return methodMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'complété': return 'bg-green-100 text-green-700';
      case 'en attente': return 'bg-yellow-100 text-yellow-700';
      case 'échoué': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Orange Money': return 'ri-smartphone-line';
      case 'MTN Mobile Money': return 'ri-phone-line';
      case 'Wave': return 'ri-wallet-line';
      default: return 'ri-bank-card-line';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Paiements</h2>
          <p className="text-sm text-gray-600 mt-1">Historique et suivi des paiements</p>
        </div>
        <button onClick={handleAdd} className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
          <i className="ri-add-line text-lg"></i>Enregistrer un paiement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Méthode de paiement</label>
            <select value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
              <option value="all">Toutes les méthodes</option>
              <option value="Orange Money">Orange Money</option>
              <option value="MTN Mobile Money">MTN Mobile Money</option>
              <option value="Wave">Wave</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Statut</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
              <option value="all">Tous les statuts</option>
              <option value="complété">Complété</option>
              <option value="en attente">En attente</option>
              <option value="échoué">Échoué</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Membre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Méthode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4"><div><p className="text-sm font-medium text-gray-900">{payment.id}</p><p className="text-xs text-gray-600">{payment.transactionId}</p></div></td>
                  <td className="px-6 py-4"><div><p className="text-sm font-medium text-gray-900">{payment.memberName}</p><p className="text-xs text-gray-600">{payment.gym}</p></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-sm font-bold text-gray-900">{payment.amount.toLocaleString()} FCFA</p><p className="text-xs text-gray-600">{payment.type}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-2"><div className="w-8 h-8 flex items-center justify-center bg-teal-50 rounded-lg"><i className={`${getMethodIcon(payment.method)} text-teal-600`}></i></div><span className="text-sm text-gray-900">{payment.method}</span></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(payment.status)}`}>{payment.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(payment.date).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right"><button onClick={() => handleDetail(payment)} className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors ml-auto" title="Voir détails"><i className="ri-eye-line text-lg"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{modalMode === 'add' ? 'Enregistrer un paiement' : 'Détails du paiement'}</h3>
            </div>
            <div className="p-6">
              {modalMode === 'detail' && selectedPayment ? (
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b border-gray-200">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${selectedPayment.status === 'complété' ? 'bg-green-100' : selectedPayment.status === 'en attente' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      <i className={`text-3xl ${selectedPayment.status === 'complété' ? 'ri-check-line text-green-600' : selectedPayment.status === 'en attente' ? 'ri-time-line text-yellow-600' : 'ri-close-line text-red-600'}`}></i>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedPayment.amount.toLocaleString()} FCFA</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedPayment.type}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-sm text-gray-600">ID Transaction</span><span className="text-sm font-medium text-gray-900">{selectedPayment.transactionId}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Membre</span><span className="text-sm font-medium text-gray-900">{selectedPayment.memberName}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Salle</span><span className="text-sm font-medium text-gray-900">{selectedPayment.gym}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Méthode</span><span className="text-sm font-medium text-gray-900">{selectedPayment.method}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Date</span><span className="text-sm font-medium text-gray-900">{new Date(selectedPayment.date).toLocaleDateString('fr-FR')}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-gray-600">Statut</span><span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(selectedPayment.status)}`}>{selectedPayment.status}</span></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Membre</label><select value={formData.memberId} onChange={(e) => setFormData({ ...formData, memberId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner un membre</option>{members.map((member) => (<option key={member.id} value={member.id}>{member.firstName} {member.lastName} - {member.gym}</option>))}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Type de paiement</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="Abonnement">Abonnement</option><option value="Cours particulier">Cours particulier</option><option value="Boutique">Boutique</option></select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label><input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="25000" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label><select value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="Orange Money">Orange Money</option><option value="MTN Mobile Money">MTN Mobile Money</option><option value="Wave">Wave</option></select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Salle</label><select value={formData.gym} onChange={(e) => setFormData({ ...formData, gym: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner une salle</option>{gyms.map((gym) => (<option key={gym.id} value={gym.name}>{gym.name}</option>))}</select></div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">{modalMode === 'detail' ? 'Fermer' : 'Annuler'}</button>
              {modalMode === 'add' && (<button onClick={handleSubmit} className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap">Enregistrer</button>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}