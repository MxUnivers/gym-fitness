import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Kouamé', lastName: 'Adou', email: 'admin@gymmanager.ci',
    phone: '+225 07 00 11 22 33', role: 'Super Admin', site: 'Toutes les salles',
    address: 'Cocody, Abidjan',
    bio: 'Administrateur principal du réseau GymManager Abidjan. Responsable de la gestion des 4 salles de sport.',
    photo: 'https://readdy.ai/api/search-image?query=professional%20african%20man%20portrait%2C%20business%20attire%2C%20confident%20smile%2C%20clean%20simple%20background%2C%20executive%20look&width=200&height=200&seq=adminprofile1&orientation=squarish',
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPass !== passwordData.confirm) return;
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordModal(false);
      setPasswordData({ current: '', newPass: '', confirm: '' });
    }, 2000);
  };

  const activityLog = [
    { id: 1, action: 'Connexion au dashboard', date: '2026-04-24T09:00:00', icon: 'ri-login-box-line', color: 'text-teal-600' },
    { id: 2, action: "Ajout d'un nouveau membre", date: '2026-04-24T09:15:00', icon: 'ri-user-add-line', color: 'text-green-600' },
    { id: 3, action: 'Validation de paiement #PAY042', date: '2026-04-23T14:30:00', icon: 'ri-bank-card-line', color: 'text-amber-600' },
    { id: 4, action: 'Modification des tarifs Musculation', date: '2026-04-23T11:00:00', icon: 'ri-price-tag-3-line', color: 'text-orange-600' },
    { id: 5, action: 'Réponse au message de Marie Diabaté', date: '2026-04-23T16:00:00', icon: 'ri-mail-send-line', color: 'text-teal-600' },
    { id: 6, action: "Création d'un abonnement Premium", date: '2026-04-22T10:00:00', icon: 'ri-vip-crown-line', color: 'text-amber-600' },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 flex items-center justify-center">
                <img src={profileData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 cursor-pointer">
                <i className="ri-camera-line text-sm"></i>
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h2>
                  <p className="text-gray-600 text-sm mt-0.5">{profileData.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full whitespace-nowrap">{profileData.role}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">{profileData.site}</span>
                  </div>
                </div>
                <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer flex items-center gap-2">
                  <i className="ri-lock-line"></i> Changer mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { id: 'info', label: 'Informations', icon: 'ri-user-line' },
            { id: 'activity', label: 'Activité récente', icon: 'ri-history-line' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-teal-700' : 'text-gray-600 hover:text-gray-900'}`}>
              <i className={tab.icon}></i>{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'info' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Informations personnelles</h3>
              {!isEditing ? (
                <button onClick={() => { setEditData({ ...profileData }); setIsEditing(true); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer flex items-center gap-2">
                  <i className="ri-edit-line"></i> Modifier
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Enregistrer</button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Prénom', key: 'firstName', type: 'text' },
                { label: 'Nom', key: 'lastName', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Téléphone', key: 'phone', type: 'tel' },
                { label: 'Adresse', key: 'address', type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  {isEditing ? (
                    <input type={field.type} value={editData[field.key]} onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">{profileData[field.key]}</p>
                  )}
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea value={editData.bio} onChange={(e) => setEditData({ ...editData, bio: e.target.value })} rows={3} maxLength={500} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none" />
                ) : (
                  <p className="text-sm text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Activité récente</h3>
            <div className="space-y-4">
              {activityLog.map(log => (
                <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
                    <i className={`${log.icon} ${log.color}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(log.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200"><h3 className="text-lg font-bold text-gray-900">Changer le mot de passe</h3></div>
            <div className="p-6 space-y-4">
              {passwordSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><i className="ri-check-line text-3xl text-green-600"></i></div>
                  <p className="text-green-700 font-medium">Mot de passe modifié avec succès !</p>
                </div>
              ) : (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label><input type="password" value={passwordData.current} onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label><input type="password" value={passwordData.newPass} onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label><input type="password" value={passwordData.confirm} onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" />{passwordData.confirm && passwordData.newPass !== passwordData.confirm && (<p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>)}</div>
                </>
              )}
            </div>
            {!passwordSuccess && (
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button onClick={() => { setShowPasswordModal(false); setPasswordData({ current: '', newPass: '', confirm: '' }); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
                <button onClick={handlePasswordChange} disabled={!passwordData.current || !passwordData.newPass || passwordData.newPass !== passwordData.confirm} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer disabled:opacity-50">Enregistrer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}