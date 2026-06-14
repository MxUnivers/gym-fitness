import { useState } from 'react';
import { clients as initialClients } from '../../../mocks/clients';

export default function ClientsPage() {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const filtered = clients.filter(c => {
    const matchSearch = search === '' || `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'tous' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    setShowDeleteModal(false);
    setSelectedClient(null);
  };

  const toggleStatus = (id) => {
    setClients(clients.map(c => c.id === id ? { ...c, status: c.status === 'actif' ? 'inactif' : 'actif' } : c));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" placeholder="Rechercher par nom ou email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
          <option value="tous">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total clients</p>
          <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Clients actifs</p>
          <p className="text-2xl font-bold text-green-600">{clients.filter(c => c.status === 'actif').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total réservations</p>
          <p className="text-2xl font-bold text-teal-600">{clients.reduce((sum, c) => sum + c.totalReservations, 0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Revenus clients</p>
          <p className="text-lg font-bold text-gray-900">{clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString('fr-FR')} FCFA</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Site</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sport</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Abonnement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Réservations</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total dépensé</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center">
                        <img src={client.photo} alt={`${client.firstName} ${client.lastName}`} className="w-9 h-9 rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.firstName} {client.lastName}</div>
                        <div className="text-xs text-gray-500">{client.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-700">{client.email}</div>
                    <div className="text-xs text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{client.site}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{client.sport}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${client.abonnement === 'Premium' ? 'bg-amber-100 text-amber-700' : client.abonnement === 'Standard' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>{client.abonnement}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{client.totalReservations}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{client.totalSpent.toLocaleString('fr-FR')} FCFA</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(client.id)} className="cursor-pointer">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${client.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{client.status}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedClient(client); setShowDetailModal(true); }} className="w-7 h-7 flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"><i className="ri-eye-line text-sm"></i></button>
                      <button onClick={() => { setSelectedClient(client); setShowDeleteModal(true); }} className="w-7 h-7 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"><i className="ri-delete-bin-line text-sm"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-user-line text-4xl block mb-2"></i>
            Aucun client trouvé
          </div>
        )}
      </div>

      {showDetailModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={selectedClient.photo} alt={selectedClient.firstName} className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedClient.firstName} {selectedClient.lastName}</h3>
                <p className="text-sm text-gray-600">{selectedClient.id}</p>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${selectedClient.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{selectedClient.status}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-900">{selectedClient.email}</p></div>
                <div><p className="text-xs text-gray-500">Téléphone</p><p className="text-sm font-medium text-gray-900">{selectedClient.phone}</p></div>
                <div><p className="text-xs text-gray-500">Site</p><p className="text-sm font-medium text-gray-900">{selectedClient.site}</p></div>
                <div><p className="text-xs text-gray-500">Sport pratiqué</p><p className="text-sm font-medium text-gray-900">{selectedClient.sport}</p></div>
                <div><p className="text-xs text-gray-500">Abonnement</p><p className="text-sm font-medium text-gray-900">{selectedClient.abonnement}</p></div>
                <div><p className="text-xs text-gray-500">Adresse</p><p className="text-sm font-medium text-gray-900">{selectedClient.address}</p></div>
                <div><p className="text-xs text-gray-500">Inscrit le</p><p className="text-sm font-medium text-gray-900">{new Date(selectedClient.registeredAt).toLocaleDateString('fr-FR')}</p></div>
                <div><p className="text-xs text-gray-500">Dernière connexion</p><p className="text-sm font-medium text-gray-900">{new Date(selectedClient.lastLogin).toLocaleDateString('fr-FR')}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-600">{selectedClient.totalReservations}</p>
                  <p className="text-xs text-gray-600">Réservations</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{selectedClient.totalSpent.toLocaleString('fr-FR')}</p>
                  <p className="text-xs text-gray-600">FCFA dépensés</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-delete-bin-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer le client</h3>
              <p className="text-gray-600 text-center mb-6">Supprimer <strong>{selectedClient?.firstName} {selectedClient?.lastName}</strong> ? Cette action est irréversible.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}