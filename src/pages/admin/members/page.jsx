import { useState } from 'react';
import { members as initialMembers } from '../../../mocks/members';
import { gyms } from '../../../mocks/gyms';

export default function MembersPage() {
  const [membersList, setMembersList] = useState(initialMembers);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', gym: '', photo: '', status: 'actif'
  });

  const handleAdd = () => {
    setModalMode('add');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', gym: '', photo: '', status: 'actif' });
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setModalMode('edit');
    setSelectedMember(member);
    setFormData({
      firstName: member.firstName, lastName: member.lastName, email: member.email,
      phone: member.phone, gym: member.gym, photo: member.photo, status: member.status
    });
    setShowModal(true);
  };

  const handleDelete = (member) => {
    setModalMode('delete');
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleAssign = (member) => {
    setModalMode('assign');
    setSelectedMember(member);
    setFormData({ ...formData, gym: member.gym });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      const newMember = {
        id: `MEM${String(membersList.length + 1).padStart(3, '0')}`,
        ...formData, joinDate: new Date().toISOString().split('T')[0], subscriptionType: 'Basic'
      };
      setMembersList([...membersList, newMember]);
    } else if (modalMode === 'edit' && selectedMember) {
      setMembersList(membersList.map(m => m.id === selectedMember.id ? { ...m, ...formData } : m));
    } else if (modalMode === 'delete' && selectedMember) {
      setMembersList(membersList.filter(m => m.id !== selectedMember.id));
    } else if (modalMode === 'assign' && selectedMember) {
      setMembersList(membersList.map(m => m.id === selectedMember.id ? { ...m, gym: formData.gym } : m));
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Membres</h2>
          <p className="text-sm text-gray-600 mt-1">Gérez les membres de vos salles de sport</p>
        </div>
        <button onClick={handleAdd} className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
          <i className="ri-user-add-line text-lg"></i>
          Ajouter un membre
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Membre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Salle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date d&apos;inscription</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {membersList.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={member.photo} alt={`${member.firstName} ${member.lastName}`} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</p>
                        <p className="text-xs text-gray-600">{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{member.email}</p>
                      <p className="text-gray-600">{member.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><p className="text-sm text-gray-900">{member.gym}</p></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${member.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{member.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(member.joinDate).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleAssign(member)} className="w-9 h-9 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors" title="Assigner à une salle"><i className="ri-building-line text-lg"></i></button>
                      <button onClick={() => handleEdit(member)} className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Modifier"><i className="ri-edit-line text-lg"></i></button>
                      <button onClick={() => handleDelete(member)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Supprimer"><i className="ri-delete-bin-line text-lg"></i></button>
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
                {modalMode === 'add' && 'Ajouter un membre'}
                {modalMode === 'edit' && 'Modifier le membre'}
                {modalMode === 'delete' && 'Supprimer le membre'}
                {modalMode === 'assign' && 'Assigner à une salle'}
              </h3>
            </div>
            <div className="p-6">
              {modalMode === 'delete' ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-error-warning-line text-3xl text-red-600"></i></div>
                  <p className="text-gray-700 mb-2">Êtes-vous sûr de vouloir supprimer</p>
                  <p className="font-bold text-gray-900 mb-4">{selectedMember?.firstName} {selectedMember?.lastName} ?</p>
                  <p className="text-sm text-gray-600">Cette action est irréversible.</p>
                </div>
              ) : modalMode === 'assign' ? (
                <div>
                  <p className="text-sm text-gray-700 mb-4">Assigner <strong>{selectedMember?.firstName} {selectedMember?.lastName}</strong> à une nouvelle salle</p>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salle</label>
                  <select value={formData.gym} onChange={(e) => setFormData({ ...formData, gym: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
                    <option value="">Sélectionner une salle</option>
                    {gyms.map((gym) => (<option key={gym.id} value={gym.name}>{gym.name}</option>))}
                  </select>
                </div>
              ) : (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label><input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Jean" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom</label><input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Kouassi" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="jean.kouassi@email.com" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="+225 XX XX XX XX XX" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Salle</label><select value={formData.gym} onChange={(e) => setFormData({ ...formData, gym: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="">Sélectionner une salle</option>{gyms.map((gym) => (<option key={gym.id} value={gym.name}>{gym.name}</option>))}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Photo</label><input type="text" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="https://..." /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Statut</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"><option value="actif">Actif</option><option value="inactif">Inactif</option></select></div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">Annuler</button>
              <button onClick={handleSubmit} className={`flex-1 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${modalMode === 'delete' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
                {modalMode === 'add' && 'Ajouter'}{modalMode === 'edit' && 'Enregistrer'}{modalMode === 'delete' && 'Supprimer'}{modalMode === 'assign' && 'Assigner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}