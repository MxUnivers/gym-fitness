import { useState } from 'react';
import { messages as initialMessages } from '../../../mocks/messages';

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMsg, setSelectedMsg] = useState(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [msgToDelete, setMsgToDelete] = useState(null);

  const filtered = messages.filter(m => filterStatus === 'tous' || m.status === filterStatus);

  const handleSelectMsg = (msg) => {
    setSelectedMsg(msg);
    setMessages(messages.map(m => m.id === msg.id && m.status === 'non lu' ? { ...m, status: 'lu' } : m));
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    const newReply = {
      id: `REP${Date.now()}`, author: 'Admin', message: replyText, date: new Date().toISOString(),
    };
    setMessages(messages.map(m => m.id === selectedMsg.id ? { ...m, status: 'répondu', replies: [...m.replies, newReply] } : m));
    setSelectedMsg({ ...selectedMsg, status: 'répondu', replies: [...selectedMsg.replies, newReply] });
    setReplyText('');
  };

  const handleDelete = () => {
    setMessages(messages.filter(m => m.id !== msgToDelete.id));
    if (selectedMsg?.id === msgToDelete.id) setSelectedMsg(null);
    setShowDeleteModal(false);
    setMsgToDelete(null);
  };

  const statusColors = {
    'non lu': 'bg-red-100 text-red-700',
    'lu': 'bg-gray-100 text-gray-700',
    'répondu': 'bg-green-100 text-green-700',
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-200px)]">
      <div className="w-80 flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
            <option value="tous">Tous les messages</option>
            <option value="non lu">Non lus</option>
            <option value="lu">Lus</option>
            <option value="répondu">Répondus</option>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(msg => (
            <div key={msg.id} onClick={() => handleSelectMsg(msg)} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMsg?.id === msg.id ? 'bg-teal-50 border-l-2 border-l-teal-500' : ''}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className={`text-sm font-medium text-gray-900 ${msg.status === 'non lu' ? 'font-bold' : ''}`}>{msg.senderName}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${statusColors[msg.status]}`}>{msg.status}</span>
              </div>
              <p className="text-xs font-medium text-gray-700 mb-1 truncate">{msg.subject}</p>
              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(msg.date)}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <i className="ri-mail-line text-3xl block mb-2"></i>
              <p className="text-sm">Aucun message</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
        {selectedMsg ? (
          <>
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedMsg.subject}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium">{selectedMsg.senderName}</span>
                    <span>•</span>
                    <span>{selectedMsg.email}</span>
                    <span>•</span>
                    <span>{selectedMsg.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <i className="ri-building-line"></i>
                    <span>{selectedMsg.site}</span>
                    <span>•</span>
                    <span>{formatDate(selectedMsg.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[selectedMsg.status]}`}>{selectedMsg.status}</span>
                  <button onClick={() => { setMsgToDelete(selectedMsg); setShowDeleteModal(true); }} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"><i className="ri-delete-bin-line text-sm"></i></button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full flex-shrink-0"><i className="ri-user-line text-gray-600"></i></div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl rounded-tl-none p-4"><p className="text-sm text-gray-800">{selectedMsg.message}</p></div>
                  <p className="text-xs text-gray-400 mt-1 ml-1">{formatDate(selectedMsg.date)}</p>
                </div>
              </div>
              {selectedMsg.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3 flex-row-reverse">
                  <div className="w-9 h-9 flex items-center justify-center bg-teal-600 rounded-full flex-shrink-0"><i className="ri-admin-line text-white text-sm"></i></div>
                  <div className="flex-1">
                    <div className="bg-teal-50 rounded-xl rounded-tr-none p-4"><p className="text-sm text-gray-800">{reply.message}</p></div>
                    <p className="text-xs text-gray-400 mt-1 mr-1 text-right">{formatDate(reply.date)} — Admin</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-3">
                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Écrire une réponse..." rows={3} maxLength={500} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none" />
                <button onClick={handleReply} disabled={!replyText.trim()} className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 flex items-center gap-2 self-end">
                  <i className="ri-send-plane-line"></i>Envoyer
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <i className="ri-mail-open-line text-5xl block mb-3"></i>
              <p>Sélectionnez un message</p>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><i className="ri-delete-bin-line text-2xl text-red-600"></i></div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Supprimer le message</h3>
              <p className="text-gray-600 text-center mb-6">Supprimer le message de <strong>{msgToDelete?.senderName}</strong> ?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Annuler</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}