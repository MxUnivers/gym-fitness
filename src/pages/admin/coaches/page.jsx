import { useState } from 'react';
import { coaches as initialCoaches } from '../../../mocks/coaches';
import { gyms } from '../../../mocks/gyms';
import { courses } from '../../../mocks/courses';
import { sports } from '../../../mocks/sports';

export default function CoachesPage() {
  const [coaches, setCoaches] = useState(initialCoaches.map(c => ({ ...c, sports: c.specialty ? [c.specialty] : [] })));
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddSportModal, setShowAddSportModal] = useState(false);
  const [showRemoveSportModal, setShowRemoveSportModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedSportToRemove, setSelectedSportToRemove] = useState('');
  const [selectedSportToAdd, setSelectedSportToAdd] = useState('');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', specialty: '', phone: '', email: '', gymId: '', photo: ''
  });

  const specialties = [
    'Yoga & Pilates', 'Musculation & CrossFit', 'Cardio Training', 'Zumba & Danse',
    'Boxe & Arts Martiaux', 'Fitness & Aérobic', 'Natation', 'Spinning'
  ];

  const handleAdd = () => {
    const gym = gyms.find(g => g.id === parseInt(formData.gymId));
    const newCoach = {
      id: coaches.length + 1, firstName: formData.firstName, lastName: formData.lastName,
      specialty: formData.specialty, sports: formData.specialty ? [formData.specialty] : [],
      phone: formData.phone, email: formData.email, gym: gym?.name || '', gymId: parseInt(formData.gymId),
      photo: formData.photo || 'https://readdy.ai/api/search-image?query=professional%20african%20fitness%20coach%2C%20athletic%20wear%2C%20confident%20pose%2C%20gym%20background%2C%20natural%20lighting&width=200&height=200&seq=newcoach&orientation=squarish',
      status: 'active', coursesCount: 0, rating: 0
    };
    setCoaches([...coaches, newCoach]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    const gym = gyms.find(g => g.id === parseInt(formData.gymId));
    setCoaches(coaches.map(coach => coach.id === selectedCoach.id ? {
      ...coach, firstName: formData.firstName, lastName: formData.lastName, specialty: formData.specialty,
      phone: formData.phone, email: formData.email, gym: gym?.name || '', gymId: parseInt(formData.gymId),
      photo: formData.photo || coach.photo
    } : coach));
    setShowEditModal(false);
    resetForm();
  };

  const handleDelete = () => {
    setCoaches(coaches.filter(coach => coach.id !== selectedCoach.id));
    setShowDeleteModal(false);
    setSelectedCoach(null);
  };

  const handleAddSport = () => {
    if (!selectedSportToAdd) return;
    setCoaches(coaches.map(coach => coach.id === selectedCoach.id ? { ...coach, sports: [...(coach.sports || []), selectedSportToAdd] } : coach));
    setShowAddSportModal(false);
    setSelectedSportToAdd('');
  };

  const handleRemoveSport = () => {
    if (!selectedSportToRemove) return;
    setCoaches(coaches.map(coach => coach.id === selectedCoach.id ? { ...coach, sports: (coach.sports || []).filter(s => s !== selectedSportToRemove) } : coach));
    setShowRemoveSportModal(false);
    setSelectedSportToRemove('');
  };

  const toggleStatus = (coachId) => {
    setCoaches(coaches.map(coach => coach.id === coachId ? { ...coach, status: coach.status === 'active' ? 'inactive' : 'active' } : coach));
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', specialty: '', phone: '', email: '', gymId: '', photo: '' });
  };

  const openEditModal = (coach) => {
    setSelectedCoach(coach);
    setFormData({ firstName: coach.firstName, lastName: coach.lastName, specialty: coach.specialty, phone: coach.phone, email: coach.email, gymId: coach.gymId.toString(), photo: coach.photo });
    setShowEditModal(true);
  };

  const getCoachCourses = (coachId) => courses.filter(course => course.coachId === coachId);
  const getAvailableSportsToAdd = (coach) => {
    const coachSports = coach.sports || [];
    return sports.filter(s => !coachSports.includes(s.name));
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2 cursor-pointer">
          <i className="ri-add-line"></i>Ajouter un coach
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Coach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sports</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Salle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coaches.map(coach => (
                <tr key={coach.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img src={coach.photo} alt={`${coach.firstName} ${coach.lastName}`} className="w-10 h-10 rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{coach.firstName} {coach.lastName}</div>
                        <div className="text-xs text-gray-600">{coach.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(coach.sports || [coach.specialty]).map((sport, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full whitespace-nowrap">{sport}</span>
                      ))}
                    </div>
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => { setSelectedCoach(coach); setShowAddSportModal(true); }} className="text-xs text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-0.5"><i className="ri-add-circle-line"></i> Ajouter</button>
                      {(coach.sports || []).length > 0 && (
                        <button onClick={() => { setSelectedCoach(coach); setShowRemoveSportModal(true); }} className="text-xs text-red-500 hover:text-red-600 cursor-pointer flex items-center gap-0.5 ml-2"><i className="ri-close-circle-line"></i> Retirer</button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{coach.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{coach.gym}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => { setSelectedCoach(coach); setShowAssignModal(true); }} className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">{coach.coursesCount} cours</button>
                  </td>
                  <td className="px-6 py-4"><div className="flex items-center gap-1"><i className="ri-star-fill text-yellow-500 text-sm"></i><span className="text-sm font-medium text-gray-900">{coach.rating}</span></div></td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleStatus(coach.id)} className="cursor-pointer">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${coach.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{coach.status === 'active' ? 'Actif' : 'Inactif'}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(coach)} className="w-8 h-8 flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"><i className="ri-edit-line"></i></button>
                      <button onClick={() => { setSelectedCoach(coach); setShowDeleteModal(true); }} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"><i className="ri-delete-bin-line"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-900">{showAddModal ? 'Ajouter un coach' : 'Modifier le coach'}</h3></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Ex: Aminata" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Nom</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Ex: Touré" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Spécialité principale</label><select value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner une spécialité</option>{specialties.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="+225 07 12 34 56 78" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="coach@gymmanager.ci" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Salle assignée</label><select value={formData.gymId} onChange={(e) => setFormData({ ...formData, gymId: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner une salle</option>{gyms.map(gym => <option key={gym.id} value={gym.id}>{gym.name}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">URL Photo</label><input type="url" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="https://..." /></div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); resetForm(); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={showAddModal ? handleAdd : handleEdit} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">{showAddModal ? 'Ajouter' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {showAddSportModal && selectedCoach && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-bold text-gray-900">Ajouter un sport à {selectedCoach.firstName} {selectedCoach.lastName}</h3></div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Choisir un sport</label>
              <select value={selectedSportToAdd} onChange={(e) => setSelectedSportToAdd(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner un sport</option>{getAvailableSportsToAdd(selectedCoach).map(s => <option key={s.id} value={s.name}>{s.name}</option>)}</select>
              {getAvailableSportsToAdd(selectedCoach).length === 0 && (<p className="text-sm text-gray-500 mt-2">Tous les sports sont déjà assignés à ce coach.</p>)}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { setShowAddSportModal(false); setSelectedSportToAdd(''); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={handleAddSport} disabled={!selectedSportToAdd} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer disabled:opacity-50">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {showRemoveSportModal && selectedCoach && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-bold text-gray-900">Retirer un sport à {selectedCoach.firstName} {selectedCoach.lastName}</h3></div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Choisir le sport à retirer</label>
              <select value={selectedSportToRemove} onChange={(e) => setSelectedSportToRemove(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner un sport</option>{(selectedCoach.sports || []).map((s, idx) => <option key={idx} value={s}>{s}</option>)}</select>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { setShowRemoveSportModal(false); setSelectedSportToRemove(''); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={handleRemoveSport} disabled={!selectedSportToRemove} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer disabled:opacity-50">Retirer</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-delete-bin-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer le coach</h3>
              <p className="text-gray-600 text-center mb-6">Êtes-vous sûr de vouloir supprimer {selectedCoach?.firstName} {selectedCoach?.lastName} ?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && selectedCoach && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-900">Cours de {selectedCoach.firstName} {selectedCoach.lastName}</h3></div>
            <div className="p-6">
              <div className="space-y-3">
                {getCoachCourses(selectedCoach.id).length > 0 ? (
                  getCoachCourses(selectedCoach.id).map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                        <div className="text-xs text-gray-600">{new Date(course.date).toLocaleDateString('fr-FR')} • {course.startTime} - {course.endTime}</div>
                        <div className="text-xs text-gray-600">{course.gym}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${course.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{course.enrolled}/{course.capacity}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-600">Aucun cours assigné pour le moment</div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowAssignModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}