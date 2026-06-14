import { useState } from 'react';
import { products as initialProducts } from '../../../mocks/products';

export default function ShopPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const [formData, setFormData] = useState({
    name: '', category: 'équipements', price: '', stock: '', image: '', description: ''
  });

  const categories = ['équipements', 'vêtements', 'compléments', 'accessoires'];

  const openModal = (type, product) => {
    setModalType(type);
    setSelectedProduct(product || null);
    if (type === 'edit' && product) {
      setFormData({
        name: product.name, category: product.category, price: product.price.toString(),
        stock: product.stock.toString(), image: product.image, description: product.description
      });
    } else if (type === 'add') {
      setFormData({ name: '', category: 'équipements', price: '', stock: '', image: '', description: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1, name: formData.name, category: formData.category,
        price: parseInt(formData.price), stock: parseInt(formData.stock), image: formData.image,
        description: formData.description, status: parseInt(formData.stock) > 0 ? 'disponible' : 'rupture'
      };
      setProducts([...products, newProduct]);
    } else if (modalType === 'edit' && selectedProduct) {
      setProducts(products.map(p => p.id === selectedProduct.id ? {
        ...p, name: formData.name, category: formData.category, price: parseInt(formData.price),
        stock: parseInt(formData.stock), image: formData.image, description: formData.description,
        status: parseInt(formData.stock) > 0 ? 'disponible' : 'rupture'
      } : p));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      closeModal();
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = filterCategory === 'all' || product.category === filterCategory;
    const statusMatch = filterStatus === 'all' || product.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => openModal('add')} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2">
          <i className="ri-add-line"></i>Ajouter un article
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Catégorie:</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="all">Toutes</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Statut:</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="all">Tous</option>
              <option value="disponible">Disponible</option>
              <option value="rupture">Rupture de stock</option>
            </select>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><i className="ri-grid-line text-lg"></i></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><i className="ri-list-check text-lg"></i></button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative w-full h-48">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.stock < 5 && product.stock > 0 && (<div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full whitespace-nowrap">Stock faible</div>)}
                {product.stock === 0 && (<div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full whitespace-nowrap">Rupture</div>)}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full whitespace-nowrap">{product.category}</span>
                </div>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-teal-600">{formatPrice(product.price)}</span>
                  <span className={`text-sm font-medium ${product.stock < 5 ? 'text-red-600' : 'text-gray-600'}`}>Stock: {product.stock}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('edit', product)} className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"><i className="ri-edit-line"></i></button>
                  <button onClick={() => openModal('delete', product)} className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm whitespace-nowrap"><i className="ri-delete-bin-line"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap"><div className="w-12 h-12 flex items-center justify-center"><img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" /></div></td>
                    <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">{product.name}</div><div className="text-xs text-gray-500 line-clamp-1">{product.description}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">{product.category}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`text-sm font-medium ${product.stock < 5 ? 'text-red-600' : 'text-gray-900'}`}>{product.stock}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.status === 'disponible' ? (<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">Disponible</span>) : (<span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full whitespace-nowrap">Rupture</span>)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button onClick={() => openModal('edit', product)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Modifier"><i className="ri-edit-line"></i></button>
                        <button onClick={() => openModal('delete', product)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer"><i className="ri-delete-bin-line"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'add' && 'Ajouter un article'}
                {modalType === 'edit' && "Modifier l'article"}
                {modalType === 'delete' && "Supprimer l'article"}
              </h2>
            </div>
            {modalType === 'delete' ? (
              <div className="p-6">
                <p className="text-gray-700 mb-6">Êtes-vous sûr de vouloir supprimer l'article <strong>{selectedProduct?.name}</strong> ? Cette action est irréversible.</p>
                <div className="flex gap-3 justify-end">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">Annuler</button>
                  <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">Supprimer</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'article *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" required>
                      {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prix (FCFA) *</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" required min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                    <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" required min="0" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image *</label>
                    <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" required placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" rows={3} required />
                  </div>
                </div>
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">{modalType === 'add' ? 'Ajouter' : 'Enregistrer'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}