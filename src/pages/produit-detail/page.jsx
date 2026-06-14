import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../mocks/products';

export default function ProduitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Produit non trouvé</h2>
          <a href="/boutique" className="text-teal-600 hover:text-teal-700 font-medium">Retour à la boutique</a>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('productCart') || '[]');
    const existingItem = existing.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existing.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
      });
    }
    localStorage.setItem('productCart', JSON.stringify(existing));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">GymManager</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/boutique" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <i className="ri-arrow-left-line"></i> Boutique
            </a>
            <a href="/cart" className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors relative">
              <i className="ri-shopping-cart-line text-gray-700"></i>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-teal-600">Accueil</a>
          <i className="ri-arrow-right-s-line"></i>
          <a href="/boutique" className="hover:text-teal-600">Boutique</a>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full max-w-md h-80 object-contain" />
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-teal-600">{product.price.toLocaleString('fr-FR')} FCFA</span>
              {product.stock > 0 ? (
                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">En stock ({product.stock} disponibles)</span>
              ) : (
                <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">Rupture de stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Quantité</span>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-1 py-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
                      <i className="ri-subtract-line text-gray-600"></i>
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg cursor-pointer">
                      <i className="ri-add-line text-gray-600"></i>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={addToCart}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm whitespace-nowrap flex items-center justify-center gap-2 transition-colors cursor-pointer ${added ? 'bg-green-500 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                  >
                    {added ? <><i className="ri-check-line"></i>Ajouté au panier</> : <><i className="ri-shopping-cart-line"></i>Ajouter au panier</>}
                  </button>
                  <button
                    onClick={() => { addToCart(); navigate('/cart'); }}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold text-sm whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="ri-shopping-bag-line"></i>Acheter maintenant
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <i className="ri-truck-line text-teal-500"></i>
                <span>Livraison disponible à Abidjan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <i className="ri-shield-check-line text-teal-500"></i>
                <span>Garantie satisfait ou remboursé</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <i className="ri-refresh-line text-teal-500"></i>
                <span>Retour sous 7 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/produit/${p.id}`)}>
                  <div className="h-40 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-base font-bold text-teal-600">{p.price.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}