import { useState } from 'react';
import { reservations } from '../../../mocks/reservations';
import { events } from '../../../mocks/events';

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const sportColors = {
  'Musculation': { bg: 'bg-teal-500', light: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
  'Yoga & Pilates': { bg: 'bg-emerald-500', light: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Cardio Training': { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'Boxe & Arts Martiaux': { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Zumba & Danse': { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
  'CrossFit': { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Fitness & Aérobic': { bg: 'bg-cyan-500', light: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  'Natation': { bg: 'bg-sky-500', light: 'bg-sky-100', text: 'text-sky-700', dot: 'bg-sky-500' },
};

const statusColors = {
  'confirmée': 'bg-green-100 text-green-700',
  'en attente': 'bg-amber-100 text-amber-700',
  'annulée': 'bg-red-100 text-red-700',
};

export default function CalendarPage() {
  const today = new Date(2026, 3, 24);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState(today);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'week' | 'list'
  const [filterSport, setFilterSport] = useState('Tous');
  const [filterStatus, setFilterStatus] = useState('Tous');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => { setCurrentDate(new Date(2026, 3, 1)); setSelectedDay(today); };

  const getReservationsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return reservations.filter(r => {
      if (filterSport !== 'Tous' && r.sport !== filterSport) return false;
      if (filterStatus !== 'Tous' && r.status !== filterStatus) return false;
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      const cur = new Date(dateStr);
      return cur >= start && cur <= end;
    });
  };

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getSelectedDayItems = () => {
    if (!selectedDay) return { reservations: [], events: [] };
    const dateStr = `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, '0')}-${String(selectedDay.getDate()).padStart(2, '0')}`;
    const dayRes = reservations.filter(r => {
      if (filterSport !== 'Tous' && r.sport !== filterSport) return false;
      if (filterStatus !== 'Tous' && r.status !== filterStatus) return false;
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      const cur = new Date(dateStr);
      return cur >= start && cur <= end;
    });
    const dayEvts = events.filter(e => e.date === dateStr);
    return { reservations: dayRes, events: dayEvts };
  };

  const isToday = (day) => year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
  const isSelected = (day) => selectedDay && year === selectedDay.getFullYear() && month === selectedDay.getMonth() && day === selectedDay.getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, currentMonth: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, currentMonth: true });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, currentMonth: false });

  const selectedItems = getSelectedDayItems();

  const allSports = ['Tous', ...Object.keys(sportColors)];
  const allStatuses = ['Tous', 'confirmée', 'en attente', 'annulée'];

  // Stats du mois
  const monthStats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmée').length,
    pending: reservations.filter(r => r.status === 'en attente').length,
    cancelled: reservations.filter(r => r.status === 'annulée').length,
    revenue: reservations.filter(r => r.status === 'confirmée').reduce((s, r) => s + r.prixTotal, 0),
  };

  return (
    <div className="space-y-4 h-full">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Total', value: monthStats.total, icon: 'ri-calendar-line', color: 'text-gray-700', bg: 'bg-gray-100' },
          { label: 'Confirmées', value: monthStats.confirmed, icon: 'ri-checkbox-circle-line', color: 'text-green-700', bg: 'bg-green-100' },
          { label: 'En attente', value: monthStats.pending, icon: 'ri-time-line', color: 'text-amber-700', bg: 'bg-amber-100' },
          { label: 'Annulées', value: monthStats.cancelled, icon: 'ri-close-circle-line', color: 'text-red-700', bg: 'bg-red-100' },
          { label: 'Revenus', value: `${monthStats.revenue.toLocaleString('fr-FR')} F`, icon: 'ri-money-cny-circle-line', color: 'text-teal-700', bg: 'bg-teal-100' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3">
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 ${stat.bg}`}>
              <i className={`${stat.icon} ${stat.color}`}></i>
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 h-full">
        {/* Calendrier principal */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button onClick={goToday} className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Aujourd&apos;hui</button>
              <div className="flex items-center gap-1">
                <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"><i className="ri-arrow-left-s-line text-gray-600"></i></button>
                <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"><i className="ri-arrow-right-s-line text-gray-600"></i></button>
              </div>
              <h2 className="text-base font-bold text-gray-900">{MONTHS[month]} {year}</h2>
            </div>

            {/* Filtres */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterSport}
                onChange={e => setFilterSport(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {allSports.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {allStatuses.map(s => <option key={s} value={s}>{s === 'Tous' ? 'Tous statuts' : s}</option>)}
              </select>
            </div>
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS.map(day => (
              <div key={day} className="py-2.5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{day}</div>
            ))}
          </div>

          {/* Grille des jours */}
          <div className="grid grid-cols-7 flex-1 overflow-auto">
            {cells.map((cell, idx) => {
              const dayReservations = cell.currentMonth ? getReservationsForDay(cell.day) : [];
              const dayEvents = cell.currentMonth ? getEventsForDay(cell.day) : [];
              const totalItems = dayReservations.length + dayEvents.length;

              return (
                <div
                  key={idx}
                  onClick={() => cell.currentMonth && setSelectedDay(new Date(year, month, cell.day))}
                  className={`min-h-[90px] p-1.5 border-b border-r border-gray-100 cursor-pointer transition-colors ${!cell.currentMonth ? 'bg-gray-50/50' : 'hover:bg-gray-50'} ${isSelected(cell.day) && cell.currentMonth ? 'bg-teal-50 border-teal-100' : ''}`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold mb-1 ${isToday(cell.day) && cell.currentMonth ? 'bg-teal-600 text-white' : isSelected(cell.day) && cell.currentMonth ? 'bg-teal-100 text-teal-700' : cell.currentMonth ? 'text-gray-800' : 'text-gray-300'}`}>
                    {cell.day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 1).map(evt => (
                      <div key={evt.id} className="text-xs bg-amber-100 text-amber-700 px-1 py-0.5 rounded truncate">
                        <i className="ri-star-line mr-0.5 text-xs"></i>{evt.title.split(' ').slice(0, 2).join(' ')}
                      </div>
                    ))}
                    {dayReservations.slice(0, 2).map(res => {
                      const colors = sportColors[res.sport] || { light: 'bg-gray-100', text: 'text-gray-700' };
                      return (
                        <div
                          key={res.id}
                          onClick={(e) => { e.stopPropagation(); setSelectedRes(res); setShowEventModal(true); }}
                          className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 ${colors.light} ${colors.text}`}
                        >
                          {res.firstName} — {res.sport.split(' ')[0]}
                        </div>
                      );
                    })}
                    {totalItems > 3 && (
                      <div className="text-xs text-gray-400 px-1 font-medium">+{totalItems - 3} autres</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panneau latéral */}
        <div className="w-72 flex flex-col gap-3 overflow-y-auto">
          {/* Jour sélectionné */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
            <div className="px-4 py-3 bg-teal-600 text-white">
              <h3 className="text-sm font-bold">
                {selectedDay
                  ? `${DAYS[selectedDay.getDay()]} ${selectedDay.getDate()} ${MONTHS[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`
                  : 'Sélectionnez un jour'}
              </h3>
              {selectedDay && (
                <p className="text-teal-200 text-xs mt-0.5">
                  {selectedItems.reservations.length} réservation{selectedItems.reservations.length !== 1 ? 's' : ''} · {selectedItems.events.length} événement{selectedItems.events.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <div className="p-3 space-y-2 max-h-72 overflow-y-auto">
              {selectedItems.events.map(evt => (
                <div key={evt.id} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 flex items-center justify-center bg-amber-400 rounded flex-shrink-0">
                      <i className="ri-star-line text-white text-xs"></i>
                    </div>
                    <span className="text-xs font-bold text-amber-800 uppercase">Événement</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{evt.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{evt.time} · {evt.location}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-amber-200 rounded-full h-1">
                      <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${(evt.registered / evt.spots) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-amber-700">{evt.registered}/{evt.spots}</span>
                  </div>
                </div>
              ))}
              {selectedItems.reservations.map(res => {
                const colors = sportColors[res.sport] || { light: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
                return (
                  <div
                    key={res.id}
                    onClick={() => { setSelectedRes(res); setShowEventModal(true); }}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-teal-200 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                        <span className="text-sm font-semibold text-gray-900">{res.firstName} {res.lastName}</span>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap ${statusColors[res.status] || 'bg-gray-100 text-gray-700'}`}>{res.status}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors.light} ${colors.text}`}>
                      {res.sport}
                    </div>
                    <div className="mt-1.5 text-xs text-gray-500 space-y-0.5">
                      <div className="flex items-center gap-1"><i className="ri-map-pin-line text-teal-500 text-xs"></i>{res.site}</div>
                      <div className="flex items-center gap-1"><i className="ri-time-line text-teal-500 text-xs"></i>{res.pack}</div>
                      <div className="flex items-center gap-1 font-semibold text-teal-600"><i className="ri-money-cny-circle-line text-xs"></i>{res.prixTotal.toLocaleString('fr-FR')} FCFA</div>
                    </div>
                  </div>
                );
              })}
              {selectedDay && selectedItems.reservations.length === 0 && selectedItems.events.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  <i className="ri-calendar-line text-3xl block mb-2"></i>
                  <p className="text-xs">Aucune activité ce jour</p>
                </div>
              )}
              {!selectedDay && (
                <div className="text-center py-6 text-gray-400">
                  <i className="ri-cursor-line text-3xl block mb-2"></i>
                  <p className="text-xs">Cliquez sur un jour</p>
                </div>
              )}
            </div>
          </div>

          {/* Prochains événements */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <i className="ri-calendar-event-line text-amber-500"></i>Prochains Événements
            </h3>
            <div className="space-y-2">
              {events.map(evt => (
                <div key={evt.id} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 flex-shrink-0 bg-amber-100 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-amber-700 leading-none">{new Date(evt.date).getDate()}</span>
                    <span className="text-xs text-amber-600 leading-none">{MONTHS[new Date(evt.date).getMonth()].slice(0, 3)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{evt.title}</p>
                    <p className="text-xs text-gray-500">{evt.time}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div className="bg-amber-400 h-1 rounded-full" style={{ width: `${(evt.registered / evt.spots) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400">{evt.registered}/{evt.spots}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Légende des sports */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Légende</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(sportColors).map(([sport, colors]) => (
                <div key={sport} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colors.dot}`}></div>
                  <span className="text-xs text-gray-600 truncate">{sport}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-amber-400"></div>
                <span className="text-xs text-gray-600">Événement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal détail réservation */}
      {showEventModal && selectedRes && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Réservation {selectedRes.id}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Détails complets</p>
              </div>
              <button onClick={() => setShowEventModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${sportColors[selectedRes.sport]?.bg || 'bg-teal-500'}`}>
                  <i className="ri-user-line text-white text-lg"></i>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{selectedRes.firstName} {selectedRes.lastName}</p>
                  <p className="text-sm text-gray-500">{selectedRes.indicatif} {selectedRes.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Sport', value: selectedRes.sport },
                  { label: 'Pack', value: selectedRes.pack },
                  { label: 'Site', value: selectedRes.site },
                  { label: 'Abonnement', value: selectedRes.abonnement },
                  { label: 'Début', value: new Date(selectedRes.startDate).toLocaleDateString('fr-FR') },
                  { label: 'Fin', value: new Date(selectedRes.endDate).toLocaleDateString('fr-FR') },
                  { label: 'Paiement', value: selectedRes.paymentMethod },
                  { label: 'Prix Total', value: `${selectedRes.prixTotal.toLocaleString('fr-FR')} FCFA` },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {selectedRes.notes && (
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-xs text-teal-600 font-medium mb-1">Notes</p>
                  <p className="text-sm text-gray-700">{selectedRes.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap ${statusColors[selectedRes.status] || 'bg-gray-100 text-gray-700'}`}>
                  {selectedRes.status}
                </span>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
