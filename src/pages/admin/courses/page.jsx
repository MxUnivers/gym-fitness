import { useState } from 'react';
import { courses as initialCourses } from '../../../mocks/courses';
import { coaches } from '../../../mocks/coaches';
import { gyms } from '../../../mocks/gyms';

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [view, setView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '', coachId: '', gymId: '', date: '', startTime: '', endTime: '', capacity: '', type: ''
  });

  const courseTypes = ['Yoga', 'Musculation', 'Cardio', 'CrossFit', 'Pilates', 'Boxe', 'Danse', 'Stretching', 'Spinning', 'Aérobic'];

  const handleAdd = () => {
    const coach = coaches.find(c => c.id === parseInt(formData.coachId));
    const gym = gyms.find(g => g.id === parseInt(formData.gymId));
    const newCourse = {
      id: courses.length + 1, name: formData.name, coach: coach ? `${coach.firstName} ${coach.lastName}` : '',
      coachId: parseInt(formData.coachId), gym: gym?.name || '', gymId: parseInt(formData.gymId),
      date: formData.date, startTime: formData.startTime, endTime: formData.endTime,
      capacity: parseInt(formData.capacity), enrolled: 0, type: formData.type, status: 'scheduled'
    };
    setCourses([...courses, newCourse]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    const coach = coaches.find(c => c.id === parseInt(formData.coachId));
    const gym = gyms.find(g => g.id === parseInt(formData.gymId));
    setCourses(courses.map(course => course.id === selectedCourse.id ? {
      ...course, name: formData.name, coach: coach ? `${coach.firstName} ${coach.lastName}` : '',
      coachId: parseInt(formData.coachId), gym: gym?.name || '', gymId: parseInt(formData.gymId),
      date: formData.date, startTime: formData.startTime, endTime: formData.endTime,
      capacity: parseInt(formData.capacity), type: formData.type
    } : course));
    setShowEditModal(false);
    resetForm();
  };

  const handleDelete = () => {
    setCourses(courses.filter(course => course.id !== selectedCourse.id));
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  const resetForm = () => {
    setFormData({ name: '', coachId: '', gymId: '', date: '', startTime: '', endTime: '', capacity: '', type: '' });
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name, coachId: course.coachId.toString(), gymId: course.gymId.toString(),
      date: course.date, startTime: course.startTime, endTime: course.endTime,
      capacity: course.capacity.toString(), type: course.type
    });
    setShowEditModal(true);
  };

  const renderCalendarView = () => {
    const today = new Date();
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-32 bg-gray-50"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const dayCourses = courses.filter(c => c.date === dateStr);
      const isToday = date.toDateString() === today.toDateString();
      days.push(
        <div key={day} className={`h-32 border border-gray-200 p-2 overflow-y-auto ${isToday ? 'bg-teal-50' : 'bg-white'}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-teal-600' : 'text-gray-900'}`}>{day}</div>
          <div className="space-y-1">
            {dayCourses.map(course => (
              <div key={course.id} className="text-xs bg-teal-100 text-teal-800 p-1 rounded cursor-pointer hover:bg-teal-200" onClick={() => openEditModal(course)}>
                <div className="font-medium truncate">{course.startTime} - {course.name}</div>
                <div className="truncate">{course.coach}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"><i className="ri-arrow-left-s-line text-lg"></i></button>
            <h3 className="text-lg font-bold text-gray-900">{selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h3>
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"><i className="ri-arrow-right-s-line text-lg"></i></button>
          </div>
          <button onClick={() => setSelectedDate(new Date())} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap">Aujourd'hui</button>
        </div>
        <div className="grid grid-cols-7 gap-0 border border-gray-200">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="bg-gray-50 border-b border-gray-200 p-2 text-center text-sm font-medium text-gray-700">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const upcomingCourses = courses.filter(course => new Date(course.date) >= new Date()).sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime());
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Coach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Salle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date & Heure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Capacité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {upcomingCourses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div><div className="text-sm font-medium text-gray-900">{course.name}</div><div className="text-xs text-gray-600">{course.type}</div></div></td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.coach}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.gym}</td>
                  <td className="px-6 py-4"><div className="text-sm text-gray-900">{new Date(course.date).toLocaleDateString('fr-FR')}</div><div className="text-xs text-gray-600">{course.startTime} - {course.endTime}</div></td>
                  <td className="px-6 py-4"><div className="text-sm text-gray-900">{course.enrolled}/{course.capacity}</div><div className="w-full bg-gray-200 rounded-full h-1.5 mt-1"><div className="bg-teal-600 h-1.5 rounded-full" style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}></div></div></td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${course.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{course.status === 'full' ? 'Complet' : 'Disponible'}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2"><button onClick={() => openEditModal(course)} className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"><i className="ri-edit-line"></i></button><button onClick={() => { setSelectedCourse(course); setShowDeleteModal(true); }} className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"><i className="ri-delete-bin-line"></i></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setView('calendar')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}><i className="ri-calendar-line mr-2"></i>Calendrier</button>
          <button onClick={() => setView('list')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}><i className="ri-list-check mr-2"></i>Liste</button>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2 cursor-pointer"><i className="ri-add-line"></i>Ajouter un cours</button>
      </div>
      {view === 'calendar' ? renderCalendarView() : renderListView()}

      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-900">{showAddModal ? 'Ajouter un cours' : 'Modifier le cours'}</h3></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Nom du cours</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Ex: Yoga Matinal" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Type de cours</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"><option value="">Sélectionner un type</option>{courseTypes.map(type => (<option key={type} value={type}>{type}</option>))}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Coach</label><select value={formData.coachId} onChange={(e) => setFormData({ ...formData, coachId: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"><option value="">Sélectionner un coach</option>{coaches.filter(c => c.status === 'active').map(coach => (<option key={coach.id} value={coach.id}>{coach.firstName} {coach.lastName} - {coach.specialty}</option>))}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Salle</label><select value={formData.gymId} onChange={(e) => setFormData({ ...formData, gymId: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"><option value="">Sélectionner une salle</option>{gyms.map(gym => (<option key={gym.id} value={gym.id}>{gym.name}</option>))}</select></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Date</label><input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Heure début</label><input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Heure fin</label><input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Capacité maximale</label><input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Ex: 20" min="1" /></div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); resetForm(); }} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
              <button onClick={showAddModal ? handleAdd : handleEdit} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">{showAddModal ? 'Ajouter' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-delete-bin-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer le cours</h3>
              <p className="text-gray-600 text-center mb-6">Êtes-vous sûr de vouloir supprimer le cours "{selectedCourse?.name}" ? Cette action est irréversible.</p>
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