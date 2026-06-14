import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'ri-dashboard-line', path: '/admin' },
  { id: 'multisites', label: 'Gestion Multisites', icon: 'ri-building-line', path: '/admin/multisites' },
  { id: 'members', label: 'Membres', icon: 'ri-user-line', path: '/admin/members', section: 'Membres & Finance' },
  { id: 'payments', label: 'Paiements', icon: 'ri-bank-card-line', path: '/admin/payments', section: 'Membres & Finance' },
  { id: 'subscriptions', label: 'Abonnements', icon: 'ri-price-tag-3-line', path: '/admin/subscriptions', section: 'Membres & Finance' },
  { id: 'courses', label: 'Cours & Planning', icon: 'ri-calendar-line', path: '/admin/courses', section: 'Planning' },
  { id: 'coaches', label: 'Coachs', icon: 'ri-user-star-line', path: '/admin/coaches', section: 'Planning' },
  { id: 'sports', label: 'Sports & Tarifs', icon: 'ri-run-line', path: '/admin/sports', section: 'Planning' },
  { id: 'reservations', label: 'Réservations', icon: 'ri-calendar-check-line', path: '/admin/reservations', section: 'Réservations' },
  { id: 'calendar', label: 'Calendrier', icon: 'ri-calendar-2-line', path: '/admin/calendar', section: 'Réservations' },
  { id: 'clients', label: 'Clients', icon: 'ri-group-line', path: '/admin/clients', section: 'Clients' },
  { id: 'messages', label: 'Messages', icon: 'ri-message-3-line', path: '/admin/messages', section: 'Clients' },
  { id: 'shop', label: 'Boutique & Articles', icon: 'ri-shopping-bag-line', path: '/admin/shop', section: 'Boutique' },
  { id: 'orders', label: 'Commandes', icon: 'ri-shopping-cart-line', path: '/admin/orders', section: 'Boutique' },
  { id: 'events', label: 'Événements', icon: 'ri-calendar-event-line', path: '/admin/events', section: 'Boutique' },
  { id: 'statistics', label: 'Statistiques', icon: 'ri-bar-chart-line', path: '/admin/statistics', section: 'Rapports' },
  { id: 'accounts', label: 'Comptes & Accès', icon: 'ri-key-line', path: '/admin/accounts', section: 'Administration' },
  { id: 'profile', label: 'Mon Profil', icon: 'ri-user-settings-line', path: '/admin/profile', section: 'Administration' },
];

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem?.label || 'Tableau de bord';
  };

  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [{
      label: 'Revenus (FCFA)',
      data: [2500000, 2800000, 3200000, 3500000, 3800000, 4200000, 4500000, 4800000, 5100000, 5400000, 5700000, 6000000],
      borderColor: '#14B8A6',
      backgroundColor: 'rgba(20, 184, 166, 0.1)',
      tension: 0.4,
    }],
  };

  const gymRevenueData = {
    labels: ['FitZone Cocody', 'PowerGym Plateau', 'Elite Fitness Marcory', 'BodyShape Yopougon'],
    datasets: [{
      data: [1800000, 1500000, 1400000, 1300000],
      backgroundColor: ['#14B8A6', '#06B6D4', '#F59E0B', '#EC4899'],
    }],
  };

  const activities = [
    { id: 1, type: 'payment', member: 'Jean Kouassi', action: 'Paiement reçu', amount: '50,000 FCFA', time: 'Il y a 5 min' },
    { id: 2, type: 'subscription', member: 'Marie Diabaté', action: 'Nouvel abonnement', amount: 'Premium', time: 'Il y a 12 min' },
    { id: 3, type: 'member', member: 'Ibrahim Traoré', action: 'Nouveau membre', amount: 'FitZone Cocody', time: 'Il y a 25 min' },
    { id: 4, type: 'payment', member: 'Fatou Koné', action: 'Paiement reçu', amount: '35,000 FCFA', time: 'Il y a 1h' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Revenu Total', value: '6,000,000 FCFA', icon: 'ri-money-dollar-circle-line', color: 'bg-teal-100 text-teal-600', badge: '+12.5%', badgeColor: 'text-green-600 bg-green-50' },
          { label: 'Réservations', value: '342', icon: 'ri-calendar-check-line', color: 'bg-teal-50 text-teal-600', badge: '+8.2%', badgeColor: 'text-green-600 bg-green-50' },
          { label: 'Abonnements Actifs', value: '1,248', icon: 'ri-user-line', color: 'bg-amber-100 text-amber-600', badge: '+15.3%', badgeColor: 'text-green-600 bg-green-50' },
          { label: 'Paiements en Attente', value: '23', icon: 'ri-time-line', color: 'bg-orange-100 text-orange-600', badge: 'En attente', badgeColor: 'text-orange-600 bg-orange-50' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${kpi.color}`}>
                <i className={`${kpi.icon} text-xl`}></i>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${kpi.badgeColor}`}>{kpi.badge}</span>
            </div>
            <h3 className="text-xs text-gray-500 mb-1">{kpi.label}</h3>
            <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-4">Revenus Mensuels</h3>
          <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-4">Revenus par Salle</h3>
          <Pie data={gymRevenueData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4">Activités Récentes</h3>
        <div className="space-y-3">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activity.type === 'payment' ? 'bg-green-100' : activity.type === 'subscription' ? 'bg-amber-100' : 'bg-teal-100'}`}>
                  <i className={`text-base ${activity.type === 'payment' ? 'ri-money-dollar-circle-line text-green-600' : activity.type === 'subscription' ? 'ri-price-tag-3-line text-amber-600' : 'ri-user-add-line text-teal-600'}`}></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.member}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const section = item.section || '';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-building-line text-lg text-white"></i>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h1 className="text-base font-bold text-gray-900 whitespace-nowrap">GymManager</h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">Admin Dashboard</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`${sidebarOpen ? 'ml-auto' : 'hidden'} w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer flex-shrink-0`}>
            <i className="ri-menu-fold-line text-gray-500"></i>
          </button>
        </div>

        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className="mx-auto mt-3 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer">
            <i className="ri-menu-unfold-line text-gray-500"></i>
          </button>
        )}

        <nav className="flex-1 p-3 overflow-y-auto">
          {Object.entries(groupedMenuItems).map(([section, items]) => (
            <div key={section} className="mb-2">
              {section && sidebarOpen && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 mt-3">{section}</p>
              )}
              {section && !sidebarOpen && <div className="border-t border-gray-100 my-2"></div>}
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.path)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                    location.pathname === item.path
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${!sidebarOpen ? 'justify-center' : ''}`}
                >
                  <i className={`${item.icon} text-lg flex-shrink-0`}></i>
                  {sidebarOpen && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200">
          {sidebarOpen ? (
            <>
              <button onClick={() => navigate('/admin/profile')} className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 cursor-pointer mb-2">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20african%20man%20portrait%2C%20business%20attire%2C%20confident%20smile%2C%20clean%20simple%20background&width=100&height=100&seq=admin1&orientation=squarish"
                    alt="Admin"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 whitespace-nowrap">Kouamé Adou</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">Super Admin</p>
                </div>
              </button>
              <button onClick={() => navigate('/admin/login')} className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer">
                <i className="ri-logout-box-line"></i>
                Déconnexion
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => navigate('/admin/profile')} className="w-9 h-9 flex items-center justify-center cursor-pointer" title="Mon profil">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20african%20man%20portrait%2C%20business%20attire%2C%20confident%20smile%2C%20clean%20simple%20background&width=100&height=100&seq=admin1&orientation=squarish"
                  alt="Admin"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </button>
              <button onClick={() => navigate('/admin/login')} className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer" title="Déconnexion">
                <i className="ri-logout-box-line"></i>
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{getPageTitle()}</h2>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <i className="ri-notification-3-line text-lg text-gray-700"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={() => navigate('/')} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2 cursor-pointer">
                <i className="ri-home-line"></i>
                Site
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {location.pathname === '/admin' ? renderDashboard() : <Outlet />}
        </div>
      </main>
    </div>
  );
}