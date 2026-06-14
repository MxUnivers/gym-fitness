import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sports, periodLabels } from '../../mocks/sports';
import { coaches } from '../../mocks/coaches';
import { products } from '../../mocks/products';
import { events } from '../../mocks/events';
import { gyms } from '../../mocks/gyms';
import { reservations } from '../../mocks/reservations';

const sponsors = [
  { name: 'Nike', logo: 'https://readdy.ai/api/search-image?query=nike%20brand%20logo%20on%20clean%20white%20background%2C%20iconic%20swoosh%20symbol%2C%20minimalist%20sportswear%20branding%2C%20professional%20logo%20photography&width=200&height=100&seq=sp1&orientation=landscape' },
  { name: 'Adidas', logo: 'https://readdy.ai/api/search-image?query=adidas%20brand%20logo%20on%20clean%20white%20background%2C%20three%20stripes%20symbol%2C%20minimalist%20sportswear%20branding%2C%20professional%20logo%20photography&width=200&height=100&seq=sp2&orientation=landscape' },
  { name: 'Under Armour', logo: 'https://readdy.ai/api/search-image?query=under%20armour%20brand%20logo%20on%20clean%20white%20background%2C%20stylized%20U%20and%20A%20symbol%2C%20minimalist%20sportswear%20branding%2C%20professional%20logo%20photography&width=200&height=100&seq=sp3&orientation=landscape' },
  { name: 'Puma', logo: 'https://readdy.ai/api/search-image?query=puma%20brand%20logo%20on%20clean%20white%20background%2C%20leaping%20cat%20symbol%2C%20minimalist%20sportswear%20branding%2C%20professional%20logo%20photography&width=200&height=100&seq=sp4&orientation=landscape' },
  { name: 'Reebok', logo: 'https://readdy.ai/api/search-image?query=reebok%20brand%20logo%20on%20clean%20white%20background%2C%20vector%20symbol%2C%20minimalist%20sportswear%20branding%2C%20professional%20logo%20photography&width=200&height=100&seq=sp5&orientation=landscape' },
  { name: 'Asics', logo: 'https://readdy.ai/api/search-image?query=asics%20brand%20logo%20on%20clean%20white%20background%2C%20stylized%20stripes%20symbol%2C%20minimalist%20sportswear%20branding%2C%20professional%20logo%20photography&width=200&height=100&seq=sp6&orientation=landscape' },
];

const periodKeys = Object.keys(periodLabels);

function getDaysForPeriod(periodKey) {
  const map = {
    '1_jour': 1, '1_semaine': 7, '2_semaines': 14, '3_semaines': 21,
    '1_mois': 30, '2_mois': 60, '3_mois': 90, '5_mois': 150,
    '6_mois': 180, '7_mois': 210, '8_mois': 240, '9_mois': 270,
    '10_mois': 300, '11_mois': 330, '1_an': 365,
  };
  return map[periodKey] || 30;
}

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

// Sport pattern SVG icons for background decoration
function SportPatterns() {
  const icons = [
    { icon: 'ri-run-line', x: '5%', y: '15%', size: 'text-5xl', delay: '0s', duration: '8s' },
    { icon: 'ri-boxing-line', x: '90%', y: '10%', size: 'text-4xl', delay: '1s', duration: '10s' },
    { icon: 'ri-basketball-line', x: '15%', y: '70%', size: 'text-6xl', delay: '2s', duration: '12s' },
    { icon: 'ri-football-line', x: '80%', y: '65%', size: 'text-5xl', delay: '0.5s', duration: '9s' },
    { icon: 'ri-water-flash-line', x: '50%', y: '5%', size: 'text-4xl', delay: '3s', duration: '11s' },
    { icon: 'ri-bike-line', x: '70%', y: '40%', size: 'text-5xl', delay: '1.5s', duration: '7s' },
    { icon: 'ri-heart-pulse-line', x: '25%', y: '40%', size: 'text-4xl', delay: '2.5s', duration: '13s' },
    { icon: 'ri-trophy-line', x: '60%', y: '80%', size: 'text-5xl', delay: '0.8s', duration: '9s' },
    { icon: 'ri-medal-line', x: '35%', y: '85%', size: 'text-4xl', delay: '3.5s', duration: '10s' },
    { icon: 'ri-fire-line', x: '88%', y: '85%', size: 'text-4xl', delay: '1.2s', duration: '8s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes floatSport {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.08; }
          25% { transform: translateY(-20px) rotate(5deg); opacity: 0.12; }
          50% { transform: translateY(-10px) rotate(-3deg); opacity: 0.06; }
          75% { transform: translateY(-25px) rotate(8deg); opacity: 0.1; }
        }
        @keyframes floatSport2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.07; }
          33% { transform: translateY(-15px) rotate(-6deg) scale(1.05); opacity: 0.11; }
          66% { transform: translateY(-30px) rotate(4deg) scale(0.95); opacity: 0.08; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        .sport-float { animation: floatSport var(--dur, 8s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .sport-float2 { animation: floatSport2 var(--dur, 10s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .pulse-glow { animation: pulseGlow var(--dur, 4s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
      `}</style>
      {icons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.size} text-white ${i % 2 === 0 ? 'sport-float' : 'sport-float2'}`}
          style={{
            left: item.x,
            top: item.y,
            '--delay': item.delay,
            '--dur': item.duration,
          }}
        >
          <i className={item.icon}></i>
        </div>
      ))}
      {/* Geometric circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-white/10 pulse-glow" style={{ '--delay': '0s', '--dur': '6s' }}></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full border-2 border-white/10 pulse-glow" style={{ '--delay': '2s', '--dur': '8s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-white/10 pulse-glow" style={{ '--delay': '1s', '--dur': '5s' }}></div>
    </div>
  );
}

const sportColorMap = {
  'Musculation': { bg: 'bg-teal-500', light: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
  'Yoga & Pilates': { bg: 'bg-emerald-500', light: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Cardio Training': { bg: 'bg-red-500', light: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'Boxe & Arts Martiaux': { bg: 'bg-orange-500', light: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Zumba & Danse': { bg: 'bg-pink-500', light: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
  'CrossFit': { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Fitness & Aérobic': { bg: 'bg-cyan-500', light: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  'Natation': { bg: 'bg-sky-500', light: 'bg-sky-100', text: 'text-sky-700', dot: 'bg-sky-500' },
};

function GymCalendar() {
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedGym, setSelectedGym] = useState('Toutes les salles');
  const [hoveredDay, setHoveredDay] = useState(null);

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
    setSelectedDay(null);
  };

  const getItemsForDay = (day) => {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayReservations = reservations.filter(r => {
      if (selectedGym !== 'Toutes les salles' && r.site !== selectedGym) return false;
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      const cur = new Date(dateStr);
      return cur >= start && cur <= end;
    });
    const dayEvents = events.filter(e => e.date === dateStr);
    return { reservations: dayReservations, events: dayEvents };
  };

  const selectedItems = selectedDay ? getItemsForDay(selectedDay) : { reservations: [], events: [] };

  const gymOptions = ['Toutes les salles', ...gyms.map(g => g.name)];

  const isToday = (day) => day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
  const isPast = (day) => new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Planning</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Calendrier de la Salle</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Consultez les réservations et événements de nos salles en temps réel</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendrier principal */}
          <div className="lg:col-span-2">
            {/* Filtre salle */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {gymOptions.map(gym => (
                <button
                  key={gym}
                  onClick={() => setSelectedGym(gym)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${selectedGym === gym ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'}`}
                >
                  {gym}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Header mois */}
              <div className="flex items-center justify-between px-6 py-4 bg-teal-600 text-white">
                <button onClick={prevMonth} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="ri-arrow-left-s-line text-xl"></i>
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-bold">{monthNames[calMonth]} {calYear}</h3>
                  <p className="text-teal-200 text-xs">{reservations.length} réservations actives</p>
                </div>
                <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                  <i className="ri-arrow-right-s-line text-xl"></i>
                </button>
              </div>

              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 border-b border-gray-100">
                {dayNames.map(d => (
                  <div key={d} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{d}</div>
                ))}
              </div>

              {/* Grille des jours */}
              <div className="grid grid-cols-7">
                {cells.map((day, idx) => {
                  if (!day) return <div key={idx} className="min-h-[80px] border-b border-r border-gray-50 bg-gray-50/30"></div>;
                  const { reservations: dayRes, events: dayEvts } = getItemsForDay(day);
                  const hasItems = dayRes.length > 0 || dayEvts.length > 0;
                  const past = isPast(day);
                  const todayDay = isToday(day);
                  const selected = selectedDay === day;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDay(day)}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`min-h-[80px] p-2 border-b border-r border-gray-100 cursor-pointer transition-all ${selected ? 'bg-teal-50 border-teal-200' : past ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}
                    >
                      <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mb-1.5 ${todayDay ? 'bg-teal-600 text-white' : selected ? 'bg-teal-100 text-teal-700' : past ? 'text-gray-300' : 'text-gray-800'}`}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvts.slice(0, 1).map(evt => (
                          <div key={evt.id} className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded truncate font-medium">
                            <i className="ri-calendar-event-line mr-0.5"></i>{evt.title.split(' ').slice(0, 2).join(' ')}
                          </div>
                        ))}
                        {dayRes.slice(0, 2).map(res => {
                          const colors = sportColorMap[res.sport] || { light: 'bg-gray-100', text: 'text-gray-700' };
                          return (
                            <div key={res.id} className={`text-xs px-1.5 py-0.5 rounded truncate ${colors.light} ${colors.text}`}>
                              {res.firstName} — {res.sport.split(' ')[0]}
                            </div>
                          );
                        })}
                        {(dayRes.length + dayEvts.length) > 3 && (
                          <div className="text-xs text-gray-400 px-1">+{dayRes.length + dayEvts.length - 3}</div>
                        )}
                        {hasItems && dayRes.length + dayEvts.length <= 3 && (
                          <div className="flex gap-0.5 mt-0.5">
                            {dayRes.slice(0, 3).map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Légende */}
            <div className="mt-4 flex flex-wrap gap-3">
              {Object.entries(sportColorMap).slice(0, 4).map(([sport, colors]) => (
                <div key={sport} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></div>
                  <span className="text-xs text-gray-600">{sport}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <span className="text-xs text-gray-600">Événement</span>
              </div>
            </div>
          </div>

          {/* Panneau latéral - détail du jour sélectionné */}
          <div className="space-y-4">
            {/* Jour sélectionné */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900">
                  {selectedDay
                    ? `${dayNames[new Date(calYear, calMonth, selectedDay).getDay()]} ${selectedDay} ${monthNames[calMonth]}`
                    : 'Sélectionnez un jour'}
                </h3>
                {selectedDay && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedItems.reservations.length} réservation{selectedItems.reservations.length !== 1 ? 's' : ''} · {selectedItems.events.length} événement{selectedItems.events.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {selectedItems.events.map(evt => (
                  <div key={evt.id} className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 flex items-center justify-center bg-amber-400 rounded-lg flex-shrink-0">
                        <i className="ri-calendar-event-line text-white text-xs"></i>
                      </div>
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Événement</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{evt.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{evt.time} · {evt.location}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-amber-200 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(evt.registered / evt.spots) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-amber-700">{evt.registered}/{evt.spots}</span>
                    </div>
                  </div>
                ))}
                {selectedItems.reservations.map(res => {
                  const colors = sportColorMap[res.sport] || { light: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
                  return (
                    <div key={res.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                          <span className="text-sm font-semibold text-gray-900">{res.firstName} {res.lastName}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${res.status === 'confirmée' ? 'bg-green-100 text-green-700' : res.status === 'en attente' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                          {res.status}
                        </span>
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors.light} ${colors.text}`}>
                        {res.sport}
                      </div>
                      <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                        <div className="flex items-center gap-1"><i className="ri-map-pin-line text-teal-500"></i>{res.site}</div>
                        <div className="flex items-center gap-1"><i className="ri-time-line text-teal-500"></i>{res.pack}</div>
                        <div className="flex items-center gap-1 font-semibold text-teal-600"><i className="ri-money-cny-circle-line"></i>{res.prixTotal.toLocaleString('fr-FR')} FCFA</div>
                      </div>
                    </div>
                  );
                })}
                {selectedDay && selectedItems.reservations.length === 0 && selectedItems.events.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <i className="ri-calendar-line text-4xl block mb-2"></i>
                    <p className="text-sm">Aucune activité ce jour</p>
                  </div>
                )}
                {!selectedDay && (
                  <div className="text-center py-8 text-gray-400">
                    <i className="ri-cursor-line text-4xl block mb-2"></i>
                    <p className="text-sm">Cliquez sur un jour pour voir les détails</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats rapides */}
            <div className="bg-teal-600 rounded-2xl p-5 text-white">
              <h4 className="text-sm font-bold mb-4">Ce mois-ci</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-teal-200 text-sm">Réservations actives</span>
                  <span className="font-bold text-lg">{reservations.filter(r => r.status === 'confirmée').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-200 text-sm">En attente</span>
                  <span className="font-bold text-lg">{reservations.filter(r => r.status === 'en attente').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-200 text-sm">Événements</span>
                  <span className="font-bold text-lg">{events.length}</span>
                </div>
                <div className="pt-2 border-t border-teal-500">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-200 text-sm">Revenus estimés</span>
                    <span className="font-bold">{reservations.filter(r => r.status === 'confirmée').reduce((sum, r) => sum + r.prixTotal, 0).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prochains événements */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Prochains Événements</h4>
              <div className="space-y-3">
                {events.slice(0, 3).map(evt => (
                  <div key={evt.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 flex-shrink-0 bg-amber-100 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-amber-700">{new Date(evt.date).getDate()}</span>
                      <span className="text-xs text-amber-600">{monthNames[new Date(evt.date).getMonth()].slice(0, 3)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{evt.title}</p>
                      <p className="text-xs text-gray-500">{evt.time}</p>
                      <p className="text-xs text-teal-600">{evt.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sport');
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [coachHours, setCoachHours] = useState(1);
  const [selectedCoachSport, setSelectedCoachSport] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [productScroll, setProductScroll] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const today = new Date();
  const calendarDays = generateCalendarDays(calendarYear, calendarMonth);

  const handlePrevMonth = () => {
    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(calendarYear - 1); }
    else setCalendarMonth(calendarMonth - 1);
  };
  const handleNextMonth = () => {
    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(calendarYear + 1); }
    else setCalendarMonth(calendarMonth + 1);
  };

  const getSportPrice = () => {
    if (!selectedSport || !selectedPeriod) return 0;
    return selectedSport.prices[selectedPeriod] || 0;
  };

  const getCoachPrice = () => {
    if (!selectedCoach) return 0;
    return coachHours * 15000;
  };

  // Compute range of highlighted days
  const getHighlightedDays = () => {
    if (!selectedDate || !selectedPeriod) return { start: null, end: null, days: new Set() };
    const startDate = new Date(calendarYear, calendarMonth, selectedDate);
    const numDays = getDaysForPeriod(selectedPeriod);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numDays - 1);

    const highlighted = new Set();
    // Only highlight days in the current calendar month view
    const monthStart = new Date(calendarYear, calendarMonth, 1);
    const monthEnd = new Date(calendarYear, calendarMonth + 1, 0);

    const rangeStart = startDate < monthStart ? monthStart : startDate;
    const rangeEnd = endDate > monthEnd ? monthEnd : endDate;

    const cur = new Date(rangeStart);
    while (cur <= rangeEnd) {
      highlighted.add(cur.getDate());
      cur.setDate(cur.getDate() + 1);
    }
    return { start: startDate, end: endDate, days: highlighted };
  };

  const { days: highlightedDays } = getHighlightedDays();

  const handleSportReserve = () => {
    if (!selectedSport || !selectedPeriod || !selectedDate) return;
    const start = new Date(calendarYear, calendarMonth, selectedDate);
    const days = getDaysForPeriod(selectedPeriod);
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    const reservation = {
      id: Date.now(),
      sport: selectedSport.name,
      site: gyms[0].name,
      pack: selectedPeriod,
      abonnement: 'Standard',
      price: getSportPrice(),
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
    const existing = JSON.parse(localStorage.getItem('reservationCart') || '[]');
    localStorage.setItem('reservationCart', JSON.stringify([...existing, reservation]));
    navigate('/reservation-cart');
  };

  const handleCoachReserve = () => {
    if (!selectedCoach || !selectedCoachSport) return;
    const reservation = {
      id: Date.now(),
      sport: selectedCoachSport,
      coach: `${selectedCoach.firstName} ${selectedCoach.lastName}`,
      site: selectedCoach.gym,
      hours: coachHours,
      price: getCoachPrice(),
      startDate: new Date().toISOString().split('T')[0],
      type: 'coach',
    };
    const existing = JSON.parse(localStorage.getItem('reservationCart') || '[]');
    localStorage.setItem('reservationCart', JSON.stringify([...existing, reservation]));
    navigate('/reservation-cart');
  };

  const filteredCoaches = selectedCoachSport
    ? coaches.filter(c => c.specialty.toLowerCase().includes(selectedCoachSport.toLowerCase()) || c.status === 'active')
    : coaches.filter(c => c.status === 'active');

  const visibleProducts = products.slice(productScroll, productScroll + 4);
  const canScrollLeft = productScroll > 0;
  const canScrollRight = productScroll + 4 < products.length;

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes heroEntrance {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hero-text { animation: heroEntrance 0.8s ease-out forwards; }
        .hero-text-delay { animation: heroEntrance 0.8s ease-out 0.3s both; }
        .hero-btn { animation: heroEntrance 0.8s ease-out 0.6s both; }
        .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .bounce-in { animation: bounceIn 0.5s ease-out forwards; }
        .slide-in-left { animation: slideInLeft 0.5s ease-out forwards; }
        .calendar-range-day {
          background: linear-gradient(90deg, rgba(20,184,166,0.15), rgba(20,184,166,0.15));
          border-radius: 0;
          color: #0f766e;
          font-weight: 600;
        }
        .calendar-range-start {
          background: #14B8A6 !important;
          color: white !important;
          border-radius: 8px 0 0 8px !important;
        }
        .calendar-range-end {
          background: rgba(20,184,166,0.3) !important;
          color: #0f766e !important;
          border-radius: 0 8px 8px 0 !important;
        }
        .calendar-range-single {
          background: #14B8A6 !important;
          color: white !important;
          border-radius: 8px !important;
        }
        .period-btn-active {
          background: linear-gradient(135deg, #14B8A6, #0d9488);
          color: white;
          transform: scale(1.05);
        }
        .sport-card-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .sport-card-hover:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .product-card-hover {
          transition: all 0.3s ease;
        }
        .product-card-hover:hover {
          transform: translateY(-6px);
        }
        @keyframes scrollSponsor {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sponsor-scroll {
          animation: scrollSponsor 20s linear infinite;
        }
        .sponsor-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes floatSport {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.08; }
          25% { transform: translateY(-20px) rotate(5deg); opacity: 0.12; }
          50% { transform: translateY(-10px) rotate(-3deg); opacity: 0.06; }
          75% { transform: translateY(-25px) rotate(8deg); opacity: 0.1; }
        }
        @keyframes floatSport2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.07; }
          33% { transform: translateY(-15px) rotate(-6deg) scale(1.05); opacity: 0.11; }
          66% { transform: translateY(-30px) rotate(4deg) scale(0.95); opacity: 0.08; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        .sport-float { animation: floatSport var(--dur, 8s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .sport-float2 { animation: floatSport2 var(--dur, 10s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .pulse-glow { animation: pulseGlow var(--dur, 4s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-white text-lg"></i>
            </div>
            <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>GymManager</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className={`text-sm font-medium hover:text-teal-500 transition-colors whitespace-nowrap ${scrolled ? 'text-gray-700' : 'text-white'}`}>Accueil</a>
            <a href="/boutique" className={`text-sm font-medium hover:text-teal-500 transition-colors whitespace-nowrap ${scrolled ? 'text-gray-700' : 'text-white'}`}>Boutique</a>
            <a href="/a-propos" className={`text-sm font-medium hover:text-teal-500 transition-colors whitespace-nowrap ${scrolled ? 'text-gray-700' : 'text-white'}`}>À Propos</a>
            <a href="/contact" className={`text-sm font-medium hover:text-teal-500 transition-colors whitespace-nowrap ${scrolled ? 'text-gray-700' : 'text-white'}`}>Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-500/20 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}><i className="ri-facebook-fill"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-500/20 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}><i className="ri-instagram-line"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-500/20 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}><i className="ri-twitter-x-line"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-500/20 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}><i className="ri-youtube-line"></i></a>
            </div>
            <a href="/client/login" className="bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold whitespace-nowrap">Connexion</a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center">
            <i className={`ri-menu-line text-2xl ${scrolled ? 'text-gray-900' : 'text-white'}`}></i>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
            <a href="/" className="block text-sm font-medium text-gray-700 py-2">Accueil</a>
            <a href="/boutique" className="block text-sm font-medium text-gray-700 py-2">Boutique</a>
            <a href="/a-propos" className="block text-sm font-medium text-gray-700 py-2">À Propos</a>
            <a href="/contact" className="block text-sm font-medium text-gray-700 py-2">Contact</a>
            <a href="/client/login" className="block text-sm font-medium text-teal-600 py-2">Connexion</a>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-600"><i className="ri-facebook-fill"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-600"><i className="ri-instagram-line"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center text-gray-600"><i className="ri-twitter-x-line"></i></a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[750px] flex items-center justify-center overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=energetic%20fitness%20training%20scene%20with%20diverse%20athletes%20working%20out%20in%20modern%20gym%2C%20dynamic%20movement%2C%20professional%20sports%20facility%2C%20motivational%20atmosphere%2C%20bright%20natural%20lighting%2C%20people%20exercising%20with%20determination%2C%20contemporary%20athletic%20center%20interior&width=1920&height=1080&seq=hero1&orientation=landscape"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <SportPatterns />

        <div className="relative z-10 text-center px-4 w-full max-w-4xl pt-16">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 px-4 py-2 rounded-full text-sm font-medium mb-6 hero-text">
            <i className="ri-fire-line"></i>
            <span>4 salles à Abidjan — Rejoignez-nous !</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight hero-text-delay">
            Votre Fitness,<br />
            <span className="text-teal-400">Notre Passion</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto hero-text-delay">
            Réservez vos séances, choisissez votre coach et atteignez vos objectifs dans nos salles modernes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-btn">
            <a href="#reservation" className="bg-teal-500 text-white px-8 py-4 rounded-full hover:bg-teal-600 transition-all text-base font-semibold whitespace-nowrap hover:scale-105 transform">
              Réserver Maintenant
            </a>
            <a href="#video" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all text-base font-semibold border border-white/30 whitespace-nowrap flex items-center justify-center gap-2 hover:scale-105 transform">
              <i className="ri-play-circle-line"></i> Voir la Vidéo
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto hero-btn">
            {[
              { value: '4', label: 'Salles' },
              { value: '2500+', label: 'Membres' },
              { value: '15+', label: 'Coachs' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Réservation */}
      <section id="reservation" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-4 border-teal-200"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border-4 border-teal-200"></div>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Réservation en ligne</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Réservez Votre Séance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choisissez votre sport ou votre coach personnel en quelques clics
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => { setActiveTab('sport'); setSelectedSport(null); setSelectedPeriod(null); setSelectedDate(null); }}
                className={`flex-1 py-4 text-sm font-semibold text-center transition-all whitespace-nowrap ${activeTab === 'sport' ? 'bg-teal-50 text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <i className="ri-run-line mr-2"></i>Sport
              </button>
              <button
                onClick={() => { setActiveTab('coach'); setSelectedCoach(null); setSelectedCoachSport(null); setCoachHours(1); }}
                className={`flex-1 py-4 text-sm font-semibold text-center transition-all whitespace-nowrap ${activeTab === 'coach' ? 'bg-teal-50 text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <i className="ri-user-star-line mr-2"></i>Coach
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'sport' ? (
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Choisissez votre sport</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {sports.map((sport) => (
                        <button
                          key={sport.id}
                          onClick={() => { setSelectedSport(sport); setSelectedPeriod(null); setSelectedDate(null); }}
                          className={`p-4 rounded-xl border-2 transition-all text-left sport-card-hover ${selectedSport?.id === sport.id ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'}`}
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-2 ${selectedSport?.id === sport.id ? 'bg-teal-500' : 'bg-teal-100'}`}>
                            <i className={`${sport.icon} text-xl ${selectedSport?.id === sport.id ? 'text-white' : 'text-teal-600'}`}></i>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{sport.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{sport.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2 */}
                  {selectedSport && (
                    <div className="fade-in-up">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Choisissez la période</h3>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
                        {periodKeys.map((key) => (
                          <button
                            key={key}
                            onClick={() => { setSelectedPeriod(key); setSelectedDate(null); }}
                            className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border ${selectedPeriod === key ? 'period-btn-active border-teal-500 shadow-md' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50'}`}
                          >
                            {periodLabels[key]}
                          </button>
                        ))}
                      </div>
                      {selectedPeriod && (
                        <div className="mt-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
                          <p className="text-xs text-teal-700">
                            <i className="ri-information-line mr-1"></i>
                            Période sélectionnée : <strong>{periodLabels[selectedPeriod]}</strong> — {getDaysForPeriod(selectedPeriod)} jour{getDaysForPeriod(selectedPeriod) > 1 ? 's' : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Calendrier avec surlignage de période */}
                  {selectedPeriod && (
                    <div className="fade-in-up">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Choisissez la date de début</h3>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 max-w-sm mx-auto border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                            <i className="ri-arrow-left-s-line text-gray-600"></i>
                          </button>
                          <span className="text-sm font-bold text-gray-900">{monthNames[calendarMonth]} {calendarYear}</span>
                          <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                            <i className="ri-arrow-right-s-line text-gray-600"></i>
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-0.5">
                          {dayNames.map((d) => (
                            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1.5">{d}</div>
                          ))}
                          {calendarDays.map((day, idx) => {
                            if (!day) return <div key={idx} className="h-9"></div>;
                            const dateObj = new Date(calendarYear, calendarMonth, day);
                            const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            const isStart = selectedDate === day;
                            const isInRange = highlightedDays.has(day) && !isStart;
                            const isToday = day === today.getDate() && calendarMonth === today.getMonth() && calendarYear === today.getFullYear();

                            let dayClass = 'h-9 w-full text-sm font-medium transition-all cursor-pointer flex items-center justify-center ';
                            if (isPast) {
                              dayClass += 'text-gray-300 cursor-not-allowed';
                            } else if (isStart) {
                              dayClass += 'calendar-range-start text-white font-bold';
                            } else if (isInRange) {
                              dayClass += 'calendar-range-day';
                            } else if (isToday) {
                              dayClass += 'bg-teal-100 text-teal-700 rounded-lg font-bold';
                            } else {
                              dayClass += 'text-gray-700 hover:bg-teal-100 hover:text-teal-700 rounded-lg';
                            }

                            return (
                              <button
                                key={idx}
                                disabled={isPast}
                                onClick={() => setSelectedDate(day)}
                                className={dayClass}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                        {selectedDate && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <div className="w-3 h-3 bg-teal-500 rounded-sm flex-shrink-0"></div>
                              <span>Début : <strong>{selectedDate} {monthNames[calendarMonth]}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                              <div className="w-3 h-3 bg-teal-200 rounded-sm flex-shrink-0"></div>
                              <span>Durée : <strong>{getDaysForPeriod(selectedPeriod)} jours</strong> ({periodLabels[selectedPeriod]})</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Prix et bouton */}
                  {selectedDate && (
                    <div className="bounce-in flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{selectedSport.name} — {periodLabels[selectedPeriod]}</p>
                        <p className="text-3xl font-bold text-teal-600">{getSportPrice().toLocaleString('fr-FR')} <span className="text-lg">FCFA</span></p>
                      </div>
                      <button
                        onClick={handleSportReserve}
                        className="px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all font-semibold text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer hover:scale-105 transform shadow-lg"
                      >
                        <i className="ri-calendar-check-line"></i>Réserver
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Step 1 Coach */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Choisissez le sport</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {sports.map((sport) => (
                        <button
                          key={sport.id}
                          onClick={() => { setSelectedCoachSport(sport.name); setSelectedCoach(null); }}
                          className={`p-4 rounded-xl border-2 transition-all text-left sport-card-hover ${selectedCoachSport === sport.name ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'}`}
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-2 ${selectedCoachSport === sport.name ? 'bg-teal-500' : 'bg-teal-100'}`}>
                            <i className={`${sport.icon} text-xl ${selectedCoachSport === sport.name ? 'text-white' : 'text-teal-600'}`}></i>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">{sport.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2 Coach */}
                  {selectedCoachSport && (
                    <div className="fade-in-up">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Choisissez votre coach</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredCoaches.map((coach) => (
                          <button
                            key={coach.id}
                            onClick={() => setSelectedCoach(coach)}
                            className={`p-4 rounded-xl border-2 transition-all text-left sport-card-hover ${selectedCoach?.id === coach.id ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <img src={coach.photo} alt={coach.firstName} className="w-12 h-12 rounded-full object-cover border-2 border-teal-100" />
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{coach.firstName} {coach.lastName}</p>
                                <p className="text-xs text-gray-500">{coach.specialty}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><i className="ri-star-fill text-amber-400"></i>{coach.rating}</span>
                              <span className="flex items-center gap-1 truncate"><i className="ri-map-pin-line"></i>{coach.gym}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3 Heures */}
                  {selectedCoach && (
                    <div className="fade-in-up">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Nombre d&apos;heures</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setCoachHours(Math.max(1, coachHours - 1))} className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors text-lg font-bold">
                          <i className="ri-subtract-line text-gray-600"></i>
                        </button>
                        <span className="text-3xl font-bold text-gray-900 w-14 text-center">{coachHours}</span>
                        <button onClick={() => setCoachHours(coachHours + 1)} className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors text-lg font-bold">
                          <i className="ri-add-line text-gray-600"></i>
                        </button>
                        <span className="text-sm text-gray-500">heure{coachHours > 1 ? 's' : ''}</span>
                        <span className="text-sm text-gray-400">× 15 000 FCFA/h</span>
                      </div>
                    </div>
                  )}

                  {/* Prix et bouton coach */}
                  {selectedCoach && (
                    <div className="bounce-in flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{selectedCoach.firstName} {selectedCoach.lastName} — {coachHours}h</p>
                        <p className="text-3xl font-bold text-teal-600">{getCoachPrice().toLocaleString('fr-FR')} <span className="text-lg">FCFA</span></p>
                      </div>
                      <button
                        onClick={handleCoachReserve}
                        className="px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all font-semibold text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer hover:scale-105 transform shadow-lg"
                      >
                        <i className="ri-calendar-check-line"></i>Réserver
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Vidéo */}
      <section id="video" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Visite virtuelle</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Découvrez Nos Installations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Une visite virtuelle de nos salles modernes et équipées</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-900 group cursor-pointer">
            <img
              src="https://readdy.ai/api/search-image?query=modern%20luxury%20gym%20interior%20wide%20angle%20view%2C%20state%20of%20the%20art%20fitness%20equipment%2C%20bright%20contemporary%20design%2C%20clean%20athletic%20facility%2C%20professional%20architectural%20photography%2C%20spacious%20workout%20area%20with%20natural%20lighting&width=1280&height=720&seq=video1&orientation=landscape"
              alt="Vidéo démo"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center hover:bg-teal-600 transition-all cursor-pointer hover:scale-110 transform shadow-2xl">
                <i className="ri-play-fill text-white text-3xl ml-1"></i>
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-sm font-medium bg-black/40 px-3 py-1 rounded-full">Visite virtuelle — GymManager</span>
              <span className="text-sm bg-black/40 px-3 py-1 rounded-full">02:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Calendrier de la Salle */}
      <GymCalendar />

      {/* Section Événements */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Agenda</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Événements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Rejoignez nos compétitions, masterclasses et événements communautaires</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all product-card-hover">
                <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover object-top" />
                  <div className="absolute top-3 left-3 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">{event.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><i className="ri-calendar-line text-teal-500"></i>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                    <span className="flex items-center gap-1"><i className="ri-time-line text-teal-500"></i>{event.time}</span>
                    <span className="flex items-center gap-1"><i className="ri-map-pin-line text-teal-500"></i>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-teal-600">{event.registered}</span> / {event.spots} inscrits
                    </div>
                    <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer">S&apos;inscrire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Sponsors */}
      <section className="py-12 md:py-16 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Nos Partenaires</h2>
            <p className="text-gray-600">Ils nous font confiance</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-12 sponsor-scroll" style={{ width: 'max-content' }}>
              {[...sponsors, ...sponsors].map((sponsor, i) => (
                <div key={i} className="grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 flex-shrink-0">
                  <img src={sponsor.logo} alt={sponsor.name} className="h-10 md:h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits Carousel */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Boutique</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nos Produits</h2>
              <p className="text-gray-600">Équipements et accessoires de sport</p>
            </div>
            <a href="/boutique" className="hidden md:flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm whitespace-nowrap hover:gap-3 transition-all">
              Voir tout <i className="ri-arrow-right-line"></i>
            </a>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all product-card-hover group">
                  <div className="relative h-52 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {product.stock < 5 && product.stock > 0 && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Stock faible</div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Rupture</div>
                    )}
                    {/* Overlay avec bouton voir détail */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <a
                        href={`/produit/${product.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-3 group-hover:translate-y-0 bg-white text-teal-600 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-teal-600 hover:text-white flex items-center gap-2 whitespace-nowrap"
                      >
                        <i className="ri-eye-line"></i>Voir détail
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
                    <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-teal-600">{product.price.toLocaleString('fr-FR')} <span className="text-xs text-gray-500">FCFA</span></p>
                      <a
                        href={`/produit/${product.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs font-semibold whitespace-nowrap"
                      >
                        <i className="ri-shopping-bag-line"></i>Acheter
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={() => setProductScroll(Math.max(0, productScroll - 1))}
                disabled={!canScrollLeft}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-30 cursor-pointer"
              >
                <i className="ri-arrow-left-line text-gray-600"></i>
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(products.length / 4) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProductScroll(i * 4)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${Math.floor(productScroll / 4) === i ? 'bg-teal-600 w-6' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setProductScroll(Math.min(products.length - 4, productScroll + 1))}
                disabled={!canScrollRight}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-30 cursor-pointer"
              >
                <i className="ri-arrow-right-line text-gray-600"></i>
              </button>
            </div>

            <div className="text-center mt-6">
              <a href="/boutique" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm md:hidden">
                Voir tous les produits <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Contact</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contactez-Nous</h2>
              <p className="text-lg text-gray-600 mb-8">Une question ? Besoin d&apos;aide pour choisir votre formule ? Notre équipe est là pour vous.</p>
              <div className="space-y-6">
                {[
                  { icon: 'ri-phone-line', title: 'Téléphone', value: '+225 07 XX XX XX XX' },
                  { icon: 'ri-mail-line', title: 'Email', value: 'contact@gymmanager.ci' },
                  { icon: 'ri-map-pin-line', title: 'Adresse', value: 'Abidjan, Côte d\'Ivoire' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-xl flex-shrink-0">
                      <i className={`${item.icon} text-xl text-teal-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form data-readdy-form action="https://readdy.ai/api/form/d7lqdgtnkhlbktri2rcg" method="POST" className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input type="text" name="prenom" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input type="text" name="nom" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="Kouassi" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input type="tel" name="telephone" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm" placeholder="+225 07 XX XX XX XX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" required maxLength={500} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none" placeholder="Votre message..."></textarea>
                  <p className="text-xs text-gray-400 mt-1">Maximum 500 caractères</p>
                </div>
                <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                  <i className="ri-send-plane-line"></i>Envoyer le message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-700 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold">GymManager</span>
              </div>
              <p className="text-white/80 text-sm">La solution complète pour gérer vos salles de sport à Abidjan</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-white/80 hover:text-white transition-colors text-sm">Accueil</a></li>
                <li><a href="/boutique" className="text-white/80 hover:text-white transition-colors text-sm">Boutique</a></li>
                <li><a href="/a-propos" className="text-white/80 hover:text-white transition-colors text-sm">À Propos</a></li>
                <li><a href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Nos Salles</h4>
              <ul className="space-y-2">
                {gyms.map((gym) => (
                  <li key={gym.id} className="text-white/80 text-sm">{gym.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Suivez-Nous</h4>
              <div className="flex items-center gap-3 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-facebook-fill text-white"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-instagram-line text-white"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-twitter-x-line text-white"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"><i className="ri-youtube-line text-white"></i></a>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/80 text-sm"><i className="ri-phone-line"></i><span>+225 07 XX XX XX XX</span></li>
                <li className="flex items-center gap-2 text-white/80 text-sm"><i className="ri-mail-line"></i><span>contact@gymmanager.ci</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/80 text-sm">© 2025 GymManager. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
