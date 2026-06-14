import { useState } from 'react';
import { events as initialEvents } from '../../../mocks/events';

const categoryOptions = ['Compétition', 'Masterclass', 'Événement', 'Séminaire', 'Atelier', 'Tournoi'];

export default function AdminEventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    title: '', date: '', time: '', location: '', description: '',
    category: 'Événement', spots: 50, registered: 0,
    image: 'https://readdy.ai/api/search-image?query=sports%20fitness%20event%20in%20modern%20gym%2C%20energetic%20atmosphere%2C%20professional%20photography%2C%20diverse%20athletes%2C%20bright%20lighting&width=600&height=400&seq=ev_new&orientation=landscape',
  });

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreate = () => {
    setEditingEvent(null);
    setForm({
      title: '', date: '', time: '', location: '', description: '',
      category: 'Événement', spots: 50, registered: 0,
      image: 'https://readdy.ai/api/search-image?query=sports%20fitness%20event%20in%20modern%20gym%2C%20energetic%20atmosphere%2C%20professional%20photography%2C%20diverse%20athletes%2C%20bright%20lighting&width=600&height=400&seq=ev_new&orientation=landscape',
    });
    setShowModal(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({ ...event });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.date || !form.location) return;
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...form, id: editingEvent.id } : e));
    } else {
      setEvents([...events, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
    setDeleteConfirm(null);
  };

  const getStatusColor = (event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    if (eventDate < now) return 'bg-gray-100 text-gray-600';
    if (event.registered >= event.spots) return 'bg-red-100 text-red-600';
    if (event.registered >= event.spots * 0.8) return 'bg-orange-100 text-orange-600';
    return 'bg-green-100 text-green-600';
  };

  const getStatusLabel = (event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    if (eventDate < now) return 'Terminé';
    if (event.registered >= event.spots) return 'Complet';
    if (event.registered >= event.spots * 0.8) return 'Presque complet';
    return 'Ouvert';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des Événements</h2>
          <p className="text-sm text-gray-500 mt-1">{events.length} événement{events.length > 1 ? 's' : ''} au total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line"></i>Nouvel Événement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: events.length, icon: 'ri-calendar-event-line', color: 'bg-teal-100 text-teal-600' },
          { label: 'À venir', value: events.filter(e => new Date(e.date) >= new Date()).length, icon: 'ri-calendar-line', color: 'bg-green-100 text-green-600' },
          { label: 'Complets', value: events.filter(e => e.registered >= e.spots).length, icon: 'ri-user-follow-line', color: 'bg-orange-100 text-orange-600' },
          { label: 'Inscrits total', value: events.reduce((s, e) => s + e.registered, 0), icon: 'ri-group-line', color: 'bg-amber-100 text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-3 ${stat.color}`}>
              <i className={`${stat.icon} text-lg`}></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher un événement..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(event => (
          <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="relative h-40">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover object-top" />
              <div className="absolute top-3 left-3">
                <span className="bg-teal-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">{event.category}</span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(event)}`}>{getStatusLabel(event)}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{event.description}</p>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="ri-calendar-line text-teal-500"></i>
                  <span>{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="ri-time-line text-teal-500"></i>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <i className="ri-map-pin-line text-teal-500"></i>
                  <span>{event.location}</span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Inscriptions</span>
                  <span className="font-semibold text-teal-600">{event.registered}/{event.spots}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (event.registered / event.spots) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(event)}
                  className="flex-1 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer flex items-center justify-center gap-1"
                >
                  <i className="ri-edit-line"></i>Modifier
                </button>
                <button
                  onClick={() => setDeleteConfirm(event.id)}
                  className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <i className="ri-calendar-event-line text-5xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">Aucun événement trouvé</p>
        </div>
      )}

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Titre de l'événement"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Horaire</label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={e => setForm({ ...form, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="08:00 - 12:00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Lieu *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Salle ou adresse"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Description de l'événement..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Places disponibles</label>
                  <input
                    type="number"
                    min={1}
                    value={form.spots}
                    onChange={e => setForm({ ...form, spots: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Inscrits actuels</label>
                  <input
                    type="number"
                    min={0}
                    value={form.registered}
                    onChange={e => setForm({ ...form, registered: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap">
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={!form.title || !form.date || !form.location}
                className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {editingEvent ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-500 text-xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Supprimer l'événement ?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium cursor-pointer whitespace-nowrap">Annuler</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-semibold cursor-pointer whitespace-nowrap">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
