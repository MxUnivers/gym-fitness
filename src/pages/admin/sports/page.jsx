import { useState } from 'react';
import { sports as initialSports, periodLabels } from '../../../mocks/sports';

const periodKeys = [
  '1_jour', '1_semaine', '2_semaines', '3_semaines',
  '1_mois', '2_mois', '3_mois', '5_mois',
  '6_mois', '7_mois', '8_mois', '9_mois',
  '10_mois', '11_mois', '1_an'
];

export default function SportsPage() {
  const [sportsList, setSportsList] = useState(initialSports);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPricesModal, setShowPricesModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', icon: 'ri-run-line', color: 'teal',
  });
  const [pricesData, setPricesData] = useState({});

  const colorOptions = ['teal', 'emerald', 'red', 'orange', 'pink', 'amber', 'cyan', 'sky'];
  const iconOptions = [
    'ri-boxing-line', 'ri-mental-health-line', 'ri-heart-pulse-line',
    'ri-sword-line', 'ri-music-2-line', 'ri-run-line', 'ri-body-scan-line',
    'ri-water-flash-line', 'ri-football-line', 'ri-basketball-line'
  ];

  const colorClasses = {
    teal: 'bg-teal-100 text-teal-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    red: 'bg-red-100 text-red-700',
    orange: 'bg-orange-100 text-orange-700',
    pink: 'bg-pink-100 text-pink-700',
    amber: 'bg-amber-100 text-amber-700',
    cyan: 'bg-cyan-100 text-cyan-700',
    sky: 'bg-sky-100 text-sky-700',
  };

  const handleAdd = () => {
    const defaultPrices = {};
    periodKeys.forEach(k => { defaultPrices[k] = 0; });
    const newSport = {
      id: sportsList.length + 1, name: formData.name, description: formData.description,
      icon: formData.icon, color: formData.color, coaches: [], prices: defaultPrices,
    };
    setSportsList([...sportsList, newSport]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    setSportsList(sportsList.map(s => s.id === selectedSport.id ? { ...s, name: formData.name, description: formData.description, icon: formData.icon, color: formData.color } : s));
    setShowEditModal(false);
    resetForm();
  };

  const handleDelete = () => {
    setSportsList(sportsList.filter(s => s.id !== selectedSport.id));
    setShowDeleteModal(false);
    setSelectedSport(null);
  };

  const handleSavePrices = () => {
    setSportsList(sportsList.map(s => s.id === selectedSport.id ? { ...s, prices: { ...pricesData } } : s));
    setShowPricesModal(false);
  };

  const openEditModal = (sport) => {
    setSelectedSport(sport);
    setFormData({ name: sport.name, description: sport.description, icon: sport.icon, color: sport.color });
    setShowEditModal(true);
  };

  const openPricesModal = (sport) => {
    setSelectedSport(sport);
    setPricesData({ ...sport.prices });
    setShowPricesModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', icon: 'ri-run-line', color: 'teal' });
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2 cursor-pointer">
          <i className="ri-add-line"></i>Ajouter un sport
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sportsList.map(sport => (
          <div key={sport.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-200 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${colorClasses[sport.color] || 'bg-teal-100 text-teal-700'}`}>
                <i className={`${sport.icon} text-2xl`}></i>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openPricesModal(sport)} className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer" title="Gérer les prix"><i className="ri-price-tag-3-line text-sm"></i></button>
                <button onClick={() => openEditModal(sport)} className="w-8 h-8 flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"><i className="ri-edit-line text-sm"></i></button>
                <button onClick={() => { setSelectedSport(sport); setShowDeleteModal(true); }} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"><i className="ri-delete-bin-line text-sm"></i></button>
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">{sport.name}</h3>
            <p className="text-xs text-gray-600 mb-3">{sport.description}</p>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1"><span>1 Jour</span><span className="font-semibold text-gray-900">{sport.prices['1_jour']?.toLocaleString('fr-FR')} FCFA</span></div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1"><span>1 Mois</span><span className="font-semibold text-gray-900">{sport.prices['1_mois']?.toLocaleString('fr-FR')} FCFA</span></div>
              <div className="flex items-center justify-between text-xs text-gray-600"><span>1 An</span><span className="font-semibold text-teal-600">{sport.prices['1_an']?.toLocaleString('fr-FR')} FCFA</span></div>
            </div>
            <button onClick={() => openPricesModal(sport)} className="mt-3 w-full text-xs text-teal-600 hover:text-teal-700 font-medium cursor-pointer flex items-center justify-center gap-1"><i className="ri-list-check-2"></i> Voir tous les tarifs</button>
          </div>
        ))}
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-900">{showAddModal ? 'Ajouter un sport' : 'Modifier le sport'}</h3></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Nom du sport</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Ex: Musculation" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Courte description" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Icône</label><div className="flex flex-wrap gap-2">{iconOptions.map(icon => (<button key={icon} onClick={() => setFormData({ ...formData, icon })} className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-colors ${formData.icon === icon ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}><i className={`${icon} text-lg text-gray-700`}></i></button>))}</div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label><div className="flex flex-wrap gap-2">{colorOptions.map(color => (<button key={color} onClick={() => setFormData({ ...formData, color })} className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer border-2 transition-colors ${colorClasses[color]} ${formData.color === color ? 'border-gray-700' : 'border-transparent'}`}>{color}</button>))}</div></div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); resetForm(); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={showAddModal ? handleAdd : handleEdit} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">{showAddModal ? 'Ajouter' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {showPricesModal && selectedSport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-900">Tarifs — {selectedSport.name}</h3><p className="text-sm text-gray-600 mt-1">Gérez les prix par période (en FCFA)</p></div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {periodKeys.map(key => (
                  <div key={key} className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 w-28 flex-shrink-0">{periodLabels[key]}</label>
                    <div className="flex-1 relative">
                      <input type="number" value={pricesData[key] || 0} onChange={(e) => setPricesData({ ...pricesData, [key]: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm pr-14" min="0" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">FCFA</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowPricesModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={handleSavePrices} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Enregistrer les tarifs</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-delete-bin-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer le sport</h3>
              <p className="text-gray-600 text-center mb-6">Êtes-vous sûr de vouloir supprimer <strong>{selectedSport?.name}</strong> ?</p>
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