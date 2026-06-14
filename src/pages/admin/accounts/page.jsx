import { useState } from 'react';
import { accounts } from '../../../mocks/accounts';

export default function AccountsPage() {
  const [accountsList, setAccountsList] = useState(accounts);
  const [modalType, setModalType] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [filterRole, setFilterRole] = useState('Tous');
  const [filterStatus, setFilterStatus] = useState('Tous');

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'Caissier', gym: 'FitZone Cocody', status: 'Actif',
  });

  const roles = ['Super Admin', 'Gérant de salle', 'Caissier', 'Coach'];
  const gyms = ['Toutes les salles', 'FitZone Cocody', 'PowerGym Plateau', 'Elite Fitness Marcory', 'BodyShape Yopougon'];

  const openModal = (type, account) => {
    setModalType(type);
    if (account) {
      setSelectedAccount(account);
      if (type === 'edit') {
        setFormData({ name: account.name, email: account.email, password: '', role: account.role, gym: account.gym, status: account.status });
      }
      if (type === 'assign') {
        setFormData({ ...formData, role: account.role, gym: account.gym });
      }
    } else {
      setFormData({ name: '', email: '', password: '', role: 'Caissier', gym: 'FitZone Cocody', status: 'Actif' });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedAccount(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newAccount = {
        id: accountsList.length + 1, name: formData.name, email: formData.email,
        role: formData.role, gym: formData.gym, status: formData.status,
        lastLogin: 'Jamais connecté', createdAt: new Date().toISOString().split('T')[0],
      };
      setAccountsList([...accountsList, newAccount]);
    } else if (modalType === 'edit' && selectedAccount) {
      setAccountsList(accountsList.map((acc) => acc.id === selectedAccount.id ? { ...acc, name: formData.name, email: formData.email, role: formData.role, gym: formData.gym, status: formData.status } : acc));
    } else if (modalType === 'assign' && selectedAccount) {
      setAccountsList(accountsList.map((acc) => acc.id === selectedAccount.id ? { ...acc, role: formData.role, gym: formData.gym } : acc));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedAccount) {
      setAccountsList(accountsList.filter((acc) => acc.id !== selectedAccount.id));
      closeModal();
    }
  };

  const toggleStatus = (id) => {
    setAccountsList(accountsList.map((acc) => acc.id === id ? { ...acc, status: acc.status === 'Actif' ? 'Inactif' : 'Actif' } : acc));
  };

  const filteredAccounts = accountsList.filter((account) => {
    const roleMatch = filterRole === 'Tous' || account.role === filterRole;
    const statusMatch = filterStatus === 'Tous' || account.status === filterStatus;
    return roleMatch && statusMatch;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-purple-100 text-purple-800';
      case 'Gérant de salle': return 'bg-blue-100 text-blue-800';
      case 'Caissier': return 'bg-teal-100 text-teal-800';
      case 'Coach': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comptes & Accès</h1>
          <p className="text-gray-600 mt-2">Gestion des utilisateurs et permissions</p>
        </div>
        <button onClick={() => openModal('add')} className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
          <i className="ri-add-line text-xl"></i>Créer un compte
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par rôle</label>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Tous</option>
              {roles.map((role) => (<option key={role}>{role}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par statut</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Tous</option>
              <option>Actif</option>
              <option>Inactif</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-gray-600"><strong>{filteredAccounts.length}</strong> compte(s) trouvé(s)</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salle assignée</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière connexion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-semibold">{account.name.split(' ').map((n) => n[0]).join('')}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{account.email}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(account.role)}`}>{account.role}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{account.gym}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{account.lastLogin}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => toggleStatus(account.id)} className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-colors ${account.status === 'Actif' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}>{account.status}</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal('assign', account)} className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Assigner rôle/salle"><i className="ri-user-settings-line text-lg"></i></button>
                      <button onClick={() => openModal('edit', account)} className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Modifier"><i className="ri-edit-line text-lg"></i></button>
                      <button onClick={() => openModal('delete', account)} className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer"><i className="ri-delete-bin-line text-lg"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200"><h2 className="text-2xl font-bold text-gray-900">{modalType === 'add' ? 'Créer un compte' : 'Modifier le compte'}</h2></div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Ex: Kouadio Jean" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="email@exemple.ci" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe {modalType === 'add' && '*'}</label>
                  <input type="password" required={modalType === 'add'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder={modalType === 'edit' ? 'Laisser vide pour ne pas changer' : 'Mot de passe'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rôle *</label>
                  <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {roles.map((role) => (<option key={role}>{role}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salle assignée *</label>
                  <select required value={formData.gym} onChange={(e) => setFormData({ ...formData, gym: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {gyms.map((gym) => (<option key={gym}>{gym}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut *</label>
                  <select required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Actif</option>
                    <option>Inactif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={closeModal} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">{modalType === 'add' ? 'Créer le compte' : 'Enregistrer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'assign' && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Assigner rôle et permissions</h2>
              <p className="text-gray-600 mt-1">Compte : <strong>{selectedAccount.name}</strong></p>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau rôle *</label>
                  <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {roles.map((role) => (<option key={role}>{role}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouvelle salle assignée *</label>
                  <select required value={formData.gym} onChange={(e) => setFormData({ ...formData, gym: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    {gyms.map((gym) => (<option key={gym}>{gym}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={closeModal} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">Assigner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'delete' && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-error-warning-line text-2xl text-red-600"></i></div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer le compte</h2>
              <p className="text-gray-600 text-center mb-6">Êtes-vous sûr de vouloir supprimer le compte de <strong>{selectedAccount.name}</strong> ? Cette action est irréversible.</p>
              <div className="flex justify-center gap-3">
                <button onClick={closeModal} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">Annuler</button>
                <button onClick={handleDelete} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}