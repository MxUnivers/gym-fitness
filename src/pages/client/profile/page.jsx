import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservations } from '../../../mocks/reservations';

export default function ClientProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jean', lastName: 'Kouassi', email: 'jean.kouassi@email.com',
    phone: '+225 07 12 34 56 78', site: 'FitZone Cocody', sport: 'Musculation',
    abonnement: 'Standard', address: 'Cocody, Abidjan',
    photo: 'https://readdy.ai/api/search-image?query=professional%20african%20man%20portrait%2C%20athletic%20build%2C%20confident%20smile%2C%20fitness%20enthusiast%2C%20clean%20simple%20background&width=200&height=200&seq=clientprofile1&orientation=squarish',
  });
  const [editData, setEditData] = useState({ ...profileData });

  const myReservations = reservations.slice(0, 4);

  const statusColors = {
    'confirmée': 'bg-green-100 text-green-700',
    'en attente': 'bg-amber-100 text-amber-700',
    'annulée': 'bg-red-100 text-red-700',
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center"><i className="ri-building-line text-white text-sm"></i></div>
            <span className="text-lg font-bold text-gray-900">GymManager</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/cart" className="relative w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
              <i className="ri-shopping-cart-line text-gray-700"></i>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">2</span>
            </a>
            <button onClick={() => navigate('/client/login')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center"><img src={profileData.photo} alt="Profile" className="w-8 h-8 rounded-full object-cover" /></div>
              <span className="font-medium">{profileData.firstName}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 flex items-center justify-center"><img src={profileData.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover" /></div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h1>
              <p className="text-gray-600 text-sm">{profileData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${profileData.abonnement === 'Premium' ? 'bg-amber-100 text-amber-700' : profileData.abonnement === 'Standard' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}`}>{profileData.abonnement}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">{profileData.site}</span>
              </div>
            </div>
            <button onClick={() => navigate('/')} className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer flex items-center gap-2"><i className="ri-add-line"></i> Nouvelle réservation</button>
          </div>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { id: 'profile', label: 'Profil', icon: 'ri-user-line' },
            { id: 'reservations', label: 'Réservations', icon: 'ri-calendar-line' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-teal-700' : 'text-gray-600 hover:text-gray-900'}`}>
              <i className={tab.icon}></i>{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Informations personnelles</h2>
              {!isEditing ? (
                <button onClick={() => { setEditData({ ...profileData }); setIsEditing(true); }} className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer flex items-center gap-2"><i className="ri-edit-line"></i> Modifier</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Enregistrer</button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'Prénom', key: 'firstName' },
                { label: 'Nom', key: 'lastName' },
                { label: 'Email', key: 'email' },
                { label: 'Téléphone', key: 'phone' },
                { label: 'Adresse', key: 'address' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  {isEditing ? (
                    <input type="text" value={editData[field.key]} onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" />
                  ) : (
                    <p className="text-sm text-gray-900 px-4 py-2.5 bg-gray-50 rounded-xl">{profileData[field.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {myReservations.map(res => (
              <div key={res.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900">{res.id}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[res.status] || 'bg-gray-100 text-gray-700'}`}>{res.status}</span>
                    </div>
                    <p className="text-sm text-gray-700">{res.sport} — {res.pack}</p>
                    <p className="text-xs text-gray-500">{res.site}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{res.prixTotal.toLocaleString('fr-FR')} FCFA</p>
                    <p className="text-xs text-gray-500">{res.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                  <span>Du {new Date(res.startDate).toLocaleDateString('fr-FR')} au {new Date(res.endDate).toLocaleDateString('fr-FR')}</span>
                  <a href={`/reservation/${res.id}`} className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">Détails <i className="ri-arrow-right-line"></i></a>
                </div>
              </div>
            ))}
            {myReservations.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 text-center py-16 text-gray-400">
                <i className="ri-calendar-line text-5xl block mb-3"></i>
                <p>Aucune réservation pour le moment</p>
                <a href="/" className="mt-4 inline-block px-6 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium">Faire une réservation</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}