import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  monthlyRevenue, revenueByGym, subscriptionsByPlan, attendanceRate, topMembers,
} from '../../../mocks/statistics';

const COLORS = ['#14B8A6', '#06B6D4', '#8B5CF6', '#F59E0B'];

export default function StatisticsPage() {
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleExport = () => {
    alert(`Export en ${exportFormat.toUpperCase()} en cours...`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(value);
  };

  const totalRevenue = revenueByGym.reduce((sum, gym) => sum + gym.value, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
          <p className="text-gray-600 mt-2">Rapports et analyses détaillées</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
          <button onClick={handleExport} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
            <i className="ri-download-line"></i>Exporter le rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-600 text-sm">Revenus totaux</p><p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalRevenue)}</p></div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center"><i className="ri-money-dollar-circle-line text-2xl text-teal-600"></i></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-600 text-sm">Membres actifs</p><p className="text-2xl font-bold text-gray-900 mt-1">475</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><i className="ri-user-line text-2xl text-blue-600"></i></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-600 text-sm">Taux fréquentation</p><p className="text-2xl font-bold text-gray-900 mt-1">74%</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><i className="ri-bar-chart-line text-2xl text-purple-600"></i></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-600 text-sm">Salles actives</p><p className="text-2xl font-bold text-gray-900 mt-1">4</p></div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><i className="ri-building-line text-2xl text-orange-600"></i></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenus mensuels (2024)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#14B8A6" strokeWidth={3} name="Revenus" dot={{ fill: '#14B8A6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenus par salle</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={revenueByGym} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} (${percentage}%)`} outerRadius={100} fill="#8884d8" dataKey="value">
                {revenueByGym.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Abonnements par formule</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subscriptionsByPlan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="plan" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="count" fill="#14B8A6" name="Nombre" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Taux de fréquentation par salle</h2>
          <div className="space-y-4 mt-6">
            {attendanceRate.map((gym) => (
              <div key={gym.gym}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{gym.gym}</span>
                  <span className="text-sm font-semibold text-gray-900">{gym.rate}% ({gym.members} membres)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-teal-600 h-3 rounded-full transition-all" style={{ width: `${gym.rate}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-900">Top membres actifs (ce mois)</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visites</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 font-bold">{index + 1}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{member.name}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-600">{member.gym}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${member.plan === 'Premium' ? 'bg-purple-100 text-purple-800' : member.plan === 'Standard' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{member.plan}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2"><i className="ri-calendar-check-line text-teal-600"></i><span className="text-sm font-semibold text-gray-900">{member.visits} visites</span></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}