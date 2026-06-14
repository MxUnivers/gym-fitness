import { useState } from 'react';
import { subscriptions as initialSubscriptions } from '../../../mocks/subscriptions';
import { members } from '../../../mocks/members';
import { gyms } from '../../../mocks/gyms';

export default function SubscriptionsPage() {
  const [subscriptionsList, setSubscriptionsList] = useState(initialSubscriptions);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [formData, setFormData] = useState({
    memberId: '', plan: 'Basic', gym: '', startDate: '', endDate: '', amount: 25000, autoRenew: false
  });

  const planPrices = { 'Basic': 25000, 'Standard': 35000, 'Premium': 50000 };

  const handleAdd = () => {
    setModalMode('add');
    setFormData({ memberId: '', plan: 'Basic', gym: '', startDate: new Date().toISOString().split('T')[0], endDate: '', amount: 25000, autoRenew: false });
    setShowModal(true);
  };

  const handleEdit = (subscription) => {
    setModalMode('edit');
    setSelectedSubscription(subscription);
    setFormData({
      memberId: subscription.memberId, plan: subscription.plan, gym: subscription.gym,
      startDate: subscription.startDate, endDate: subscription.endDate, amount: subscription.amount, autoRenew: subscription.autoRenew
    });
    setShowModal(true);
  };

  const handleDelete = (subscription) => {
    setModalMode('delete');
    setSelectedSubscription(subscription);
    setShowModal(true);
  };

  const handleRenew = (subscription) => {
    setModalMode('renew');
    setSelectedSubscription(subscription);
    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 3);
    setFormData({
      ...formData, startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0], plan: subscription.plan, amount: planPrices[subscription.plan]
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const member = members.find(m => m.id === formData.memberId);
      const newSubscription = {
        id: `SUB${String(subscriptionsList.length + 1).padStart(3, '0')}`,
        memberId: formData.memberId, memberName: member ? `${member.firstName} ${member.lastName}` : '',
        plan: formData.plan, gym: formData.gym, startDate: formData.startDate, endDate: formData.endDate,
        amount: formData.amount, status: 'actif', autoRenew: formData.autoRenew
      };
      setSubscriptionsList([...subscriptionsList, newSubscription]);
    } else if (modalMode === 'edit' && selectedSubscription) {
      setSubscriptionsList(subscriptionsList.map(s => s.id === selectedSubscription.id ? { ...s, ...formData, memberName: selectedSubscription.memberName } : s));
    } else if (modalMode === 'delete' && selectedSubscription) {
      setSubscriptionsList(subscriptionsList.filter(s => s.id !== selectedSubscription.id));
    } else if (modalMode === 'renew' && selectedSubscription) {
      setSubscriptionsList(subscriptionsList.map(s => s.id === selectedSubscription.id ? { ...s, startDate: formData.startDate, endDate: formData.endDate, status: 'actif' } : s));
    }
    setShowModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-700';
      case 'expirant': return 'bg-yellow-100 text-yellow-700';
      case 'expiré': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Basic': return 'bg-gray-100 text-gray-700';
      case 'Standard': return 'bg-blue-100 text-blue-700';
      case 'Premium': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Abonnements</h2>
          <p className="text-sm text-gray-600 mt-1">Gérez les abonnements de vos membres</p>
        </div>
        <button onClick={handleAdd} className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
          <i className="ri-add-line text-lg"></i>Créer un abonnement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Membre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Formule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Salle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Période</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptionsList.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4"><div><p className="text-sm font-medium text-gray-900">{subscription.memberName}</p><p className="text-xs text-gray-600">{subscription.id}</p></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getPlanColor(subscription.plan)}`}>{subscription.plan}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-sm text-gray-900">{subscription.gym}</p></td>
                  <td className="px-6 py-4"><div className="text-sm"><p className="text-gray-900">{new Date(subscription.startDate).toLocaleDateString('fr-FR')}</p><p className="text-gray-600">au {new Date(subscription.endDate).toLocaleDateString('fr-FR')}</p></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-sm font-bold text-gray-900">{subscription.amount.toLocaleString()} FCFA</p>{subscription.autoRenew && (<p className="text-xs text-teal-600 flex items-center gap-1"><i className="ri-refresh-line"></i>Auto-renouvellement</p>)}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(subscription.status)}`}>{subscription.status}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleRenew(subscription)} className="w-9 h-9 flex items-center justify-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Renouveler"><i className="ri-refresh-line text-lg"></i></button>
                      <button onClick={() => handleEdit(subscription)} className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Modifier"><i className="ri-edit-line text-lg"></i></button>
                      <button onClick={() => handleDelete(subscription)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Supprimer"><i className="ri-delete-bin-line text-lg"></i></button>
                    </div>
                  </td>
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
              <h3 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' && 'Créer un abonnement'}
                {modalMode === 'edit' && "Modifier l'abonnement"}
                {modalMode === 'delete' && "Supprimer l'abonnement"}
                {modalMode === 'renew' && "Renouveler l'abonnement"}
              </h3>
            </div>
            <div className="p-6">
              {modalMode === 'delete' ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-error-warning-line text-3xl text-red-600"></i></div>
                  <p className="text-gray-700 mb-2">Êtes-vous sûr de vouloir supprimer</p>
                  <p className="font-bold text-gray-900 mb-4">l&apos;abonnement de {selectedSubscription?.memberName} ?</p>
                  <p className="text-sm text-gray-600">Cette action est irréversible.</p>
                </div>
              ) : modalMode === 'renew' ? (
                <div className="space-y-4">
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <p className="text-sm text-teal-800">Renouveler l&apos;abonnement <strong>{selectedSubscription?.plan}</strong> de <strong>{selectedSubscription?.memberName}</strong></p>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div className="bg-gray-50 rounded-lg p-4"><div className="flex justify-between items-center"><span className="text-sm text-gray-700">Montant à payer</span><span className="text-lg font-bold text-gray-900">{formData.amount.toLocaleString()} FCFA</span></div></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Membre</label><select value={formData.memberId} onChange={(e) => setFormData({ ...formData, memberId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" disabled={modalMode === 'edit'}><option value="">Sélectionner un membre</option>{members.map((member) => (<option key={member.id} value={member.id}>{member.firstName} {member.lastName}</option>))}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Formule</label><select value={formData.plan} onChange={(e) => { const plan = e.target.value; setFormData({ ...formData, plan, amount: planPrices[plan] }); }} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="Basic">Basic - 25,000 FCFA</option><option value="Standard">Standard - 35,000 FCFA</option><option value="Premium">Premium - 50,000 FCFA</option></select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Salle</label><select value={formData.gym} onChange={(e) => setFormData({ ...formData, gym: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner une salle</option>{gyms.map((gym) => (<option key={gym.id} value={gym.name}>{gym.name}</option>))}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Montant (FCFA)</label><input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="autoRenew" checked={formData.autoRenew} onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                    <label htmlFor="autoRenew" className="text-sm text-gray-700">Activer le renouvellement automatique</label>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">Annuler</button>
              <button onClick={handleSubmit} className={`flex-1 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${modalMode === 'delete' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
                {modalMode === 'add' && 'Créer'}{modalMode === 'edit' && 'Enregistrer'}{modalMode === 'delete' && 'Supprimer'}{modalMode === 'renew' && 'Renouveler'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}