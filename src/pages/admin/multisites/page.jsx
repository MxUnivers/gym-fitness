import { useState } from 'react';
import { gyms } from '../../../mocks/gyms';

export default function MultisitesPage() {
  const [gymsList, setGymsList] = useState(gyms);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedGym, setSelectedGym] = useState(null);
  const [formData, setFormData] = useState({
    name: '', location: '', address: '', phone: '', email: '', capacity: 0, status: 'actif'
  });

  const handleAdd = () => {
    setModalMode('add');
    setFormData({ name: '', location: '', address: '', phone: '', email: '', capacity: 0, status: 'actif' });
    setShowModal(true);
  };

  const handleEdit = (gym) => {
    setModalMode('edit');
    setSelectedGym(gym);
    setFormData({
      name: gym.name, location: gym.location, address: gym.address,
      phone: gym.phone, email: gym.email, capacity: gym.capacity, status: gym.status
    });
    setShowModal(true);
  };

  const handleDelete = (gym) => {
    setModalMode('delete');
    setSelectedGym(gym);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newGym = {
        id: `GYM${String(gymsList.length + 1).padStart(3, '0')}`,
        ...formData, members: 0
      };
      setGymsList([...gymsList, newGym]);
    } else if (modalMode === 'edit' && selectedGym) {
      setGymsList(gymsList.map(g => g.id === selectedGym.id ? { ...g, ...formData } : g));
    } else if (modalMode === 'delete' && selectedGym) {
      setGymsList(gymsList.filter(g => g.id !== selectedGym.id));
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion Multisites</h2>
          <p className="text-sm text-gray-600 mt-1">Gérez vos différentes salles de sport</p>
        </div>
        <button onClick={handleAdd} className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
          <i className="ri-add-line text-lg"></i>
          Ajouter une salle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gymsList.map((gym) => (
          <div key={gym.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{gym.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{gym.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${gym.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {gym.status}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700"><i className="ri-map-pin-line text-teal-600"></i><span>{gym.address}</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><i className="ri-phone-line text-teal-600"></i><span>{gym.phone}</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><i className="ri-mail-line text-teal-600"></i><span>{gym.email}</span></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-4">
                <div><p className="text-xs text-gray-600">Membres</p><p className="text-lg font-bold text-gray-900">{gym.members}</p></div>
                <div><p className="text-xs text-gray-600">Capacité</p><p className="text-lg font-bold text-gray-900">{gym.capacity}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(gym)} className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"><i className="ri-edit-line text-lg"></i></button>
                <button onClick={() => handleDelete(gym)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"><i className="ri-delete-bin-line text-lg"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' && 'Ajouter une salle'}
                {modalMode === 'edit' && 'Modifier la salle'}
                {modalMode === 'delete' && 'Supprimer la salle'}
              </h3>
            </div>
            <div className="p-6">
              {modalMode === 'delete' ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-error-warning-line text-3xl text-red-600"></i>
                  </div>
                  <p className="text-gray-700 mb-2">Êtes-vous sûr de vouloir supprimer</p>
                  <p className="font-bold text-gray-900 mb-4">{selectedGym?.name} ?</p>
                  <p className="text-sm text-gray-600">Cette action est irréversible.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la salle</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Ex: FitZone Cocody" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Ex: Cocody" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                    <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Ex: Rue des Jardins, Cocody" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="+225 XX XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="contact@salle.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacité maximale</label>
                    <input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="150" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">Annuler</button>
              <button onClick={handleSubmit} className={`flex-1 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${modalMode === 'delete' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
                {modalMode === 'add' && 'Ajouter'}
                {modalMode === 'edit' && 'Enregistrer'}
                {modalMode === 'delete' && 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}