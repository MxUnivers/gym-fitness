import { useState } from 'react';
import { reservations as initialReservations } from '../../../mocks/reservations';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [filterSite, setFilterSite] = useState('tous');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', indicatif: '+225', phone: '',
    site: '', sport: '', pack: '', abonnement: '', prixTotal: '',
    paymentMethod: '', date: '', startDate: '', endDate: '', notes: '',
  });

  const sites = ['FitZone Cocody', 'PowerGym Plateau', 'Elite Fitness Marcory', 'BodyShape Yopougon'];
  const sports = ['Musculation', 'Yoga & Pilates', 'Cardio Training', 'Boxe & Arts Martiaux', 'Zumba & Danse', 'CrossFit', 'Fitness & Aérobic', 'Natation'];
  const packs = ['1 Jour', '1 Semaine', '2 Semaines', '3 Semaines', '1 Mois', '2 Mois', '3 Mois', '5 Mois', '6 Mois', '7 Mois', '8 Mois', '9 Mois', '10 Mois', '11 Mois', '1 An'];
  const abonnements = ['Basic', 'Standard', 'Premium'];
  const paymentMethods = ['Orange Money', 'MTN Mobile Money', 'Wave'];

  const filtered = reservations.filter(r => {
    const matchSearch = search === '' || `${r.firstName} ${r.lastName}`.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'tous' || r.status === filterStatus;
    const matchSite = filterSite === 'tous' || r.site === filterSite;
    return matchSearch && matchStatus && matchSite;
  });

  const statusColors = {
    'confirmée': 'bg-green-100 text-green-700',
    'en attente': 'bg-amber-100 text-amber-700',
    'annulée': 'bg-red-100 text-red-700',
  };

  const handleAdd = () => {
    const newRes = {
      id: `RES${String(reservations.length + 1).padStart(3, '0')}`,
      ...formData, prixTotal: parseInt(formData.prixTotal) || 0, status: 'en attente',
    };
    setReservations([newRes, ...reservations]);
    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = () => {
    setReservations(reservations.filter(r => r.id !== selectedRes.id));
    setShowDeleteModal(false);
    setSelectedRes(null);
  };

  const updateStatus = (id, status) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', indicatif: '+225', phone: '', site: '', sport: '', pack: '', abonnement: '', prixTotal: '', paymentMethod: '', date: '', startDate: '', endDate: '', notes: '' });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input type="text" placeholder="Rechercher par nom ou ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
          <option value="tous">Tous les statuts</option>
          <option value="confirmée">Confirmée</option>
          <option value="en attente">En attente</option>
          <option value="annulée">Annulée</option>
        </select>
        <select value={filterSite} onChange={(e) => setFilterSite(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
          <option value="tous">Tous les sites</option>
          {sites.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2 cursor-pointer">
          <i className="ri-add-line"></i> Nouvelle réservation
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Site</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sport</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pack</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Abonnement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Prix Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map(res => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">{res.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{res.firstName} {res.lastName}</div>
                    <div className="text-xs text-gray-500">{new Date(res.date).toLocaleDateString('fr-FR')}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{res.indicatif} {res.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{res.site}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{res.sport}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{res.pack}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${res.abonnement === 'Premium' ? 'bg-amber-100 text-amber-700' : res.abonnement === 'Standard' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>{res.abonnement}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{res.prixTotal.toLocaleString('fr-FR')} FCFA</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[res.status] || 'bg-gray-100 text-gray-700'}`}>{res.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedRes(res); setShowDetailModal(true); }} className="w-7 h-7 flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer" title="Détails"><i className="ri-eye-line text-sm"></i></button>
                      {res.status === 'en attente' && (
                        <button onClick={() => updateStatus(res.id, 'confirmée')} className="w-7 h-7 flex items-center justify-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors cursor-pointer" title="Confirmer"><i className="ri-check-line text-sm"></i></button>
                      )}
                      <button onClick={() => { setSelectedRes(res); setShowDeleteModal(true); }} className="w-7 h-7 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer" title="Supprimer"><i className="ri-delete-bin-line text-sm"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="ri-calendar-line text-4xl mb-2 block"></i>
            Aucune réservation trouvée
          </div>
        )}
      </div>

      {showDetailModal && selectedRes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Détails — {selectedRes.id}</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[selectedRes.status] || 'bg-gray-100 text-gray-700'}`}>{selectedRes.status}</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Prénom</p><p className="text-sm font-medium text-gray-900">{selectedRes.firstName}</p></div>
                <div><p className="text-xs text-gray-500">Nom</p><p className="text-sm font-medium text-gray-900">{selectedRes.lastName}</p></div>
                <div><p className="text-xs text-gray-500">Indicatif</p><p className="text-sm font-medium text-gray-900">{selectedRes.indicatif}</p></div>
                <div><p className="text-xs text-gray-500">Téléphone</p><p className="text-sm font-medium text-gray-900">{selectedRes.phone}</p></div>
                <div><p className="text-xs text-gray-500">Site / Centre</p><p className="text-sm font-medium text-gray-900">{selectedRes.site}</p></div>
                <div><p className="text-xs text-gray-500">Sport</p><p className="text-sm font-medium text-gray-900">{selectedRes.sport}</p></div>
                <div><p className="text-xs text-gray-500">Pack</p><p className="text-sm font-medium text-gray-900">{selectedRes.pack}</p></div>
                <div><p className="text-xs text-gray-500">Abonnement</p><p className="text-sm font-medium text-gray-900">{selectedRes.abonnement}</p></div>
                <div><p className="text-xs text-gray-500">Date début</p><p className="text-sm font-medium text-gray-900">{new Date(selectedRes.startDate).toLocaleDateString('fr-FR')}</p></div>
                <div><p className="text-xs text-gray-500">Date fin</p><p className="text-sm font-medium text-gray-900">{new Date(selectedRes.endDate).toLocaleDateString('fr-FR')}</p></div>
                <div><p className="text-xs text-gray-500">Paiement</p><p className="text-sm font-medium text-gray-900">{selectedRes.paymentMethod}</p></div>
                <div><p className="text-xs text-gray-500">Prix Total</p><p className="text-sm font-bold text-teal-600">{selectedRes.prixTotal.toLocaleString('fr-FR')} FCFA</p></div>
              </div>
              {selectedRes.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700">{selectedRes.notes}</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                {selectedRes.status === 'en attente' && (
                  <button onClick={() => { updateStatus(selectedRes.id, 'confirmée'); setShowDetailModal(false); }} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"><i className="ri-check-line mr-1"></i> Confirmer</button>
                )}
                {selectedRes.status !== 'annulée' && (
                  <button onClick={() => { updateStatus(selectedRes.id, 'annulée'); setShowDetailModal(false); }} className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"><i className="ri-close-line mr-1"></i> Annuler</button>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-900">Nouvelle réservation</h3></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Indicatif</label><select value={formData.indicatif} onChange={(e) => setFormData({ ...formData, indicatif: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="+225">+225 (CI)</option><option value="+221">+221 (SN)</option><option value="+223">+223 (ML)</option><option value="+226">+226 (BF)</option><option value="+33">+33 (FR)</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Site / Centre</label><select value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner</option>{sites.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Sport</label><select value={formData.sport} onChange={(e) => setFormData({ ...formData, sport: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner</option>{sports.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Pack / Période</label><select value={formData.pack} onChange={(e) => setFormData({ ...formData, pack: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner</option>{packs.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Abonnement</label><select value={formData.abonnement} onChange={(e) => setFormData({ ...formData, abonnement: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner</option>{abonnements.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Prix Total (FCFA)</label><input type="number" value={formData.prixTotal} onChange={(e) => setFormData({ ...formData, prixTotal: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label><select value={formData.paymentMethod} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner</option>{paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date de réservation</label><input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date début</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={2} maxLength={500} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none" /></div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-delete-bin-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer la réservation</h3>
              <p className="text-gray-600 text-center mb-6">Supprimer la réservation <strong>{selectedRes?.id}</strong> de {selectedRes?.firstName} {selectedRes?.lastName} ?</p>
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