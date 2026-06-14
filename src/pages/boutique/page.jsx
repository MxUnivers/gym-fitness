import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../mocks/products';

const categories = ['Tous', 'Équipements', 'Vêtements', 'Compléments', 'Accessoires'];
const sortOptions = [
  { value: 'default', label: 'Par défaut' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom A-Z' },
];

export default function BoutiquePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    const cart = JSON.parse(localStorage.getItem('productCart') || '[]');
    setCartCount(cart.reduce((s, i) => s + i.quantity, 0));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  let filtered = products.filter((p) => {
    const matchCat = activeCategory === 'Tous' || p.category === activeCategory.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .product-card { animation: fadeInUp 0.4s ease-out forwards; }
        .product-card:hover { transform: translateY(-4px); transition: transform 0.3s ease; }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">GymManager</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">Accueil</a>
            <a href="/boutique" className="text-sm font-medium text-teal-600 border-b-2 border-teal-500 pb-0.5 whitespace-nowrap">Boutique</a>
            <a href="/a-propos" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">À Propos</a>
            <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-teal-500 transition-colors whitespace-nowrap">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="/client/login" className="bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold whitespace-nowrap">Connexion</a>
            <a href="/cart" className="relative w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <i className="ri-shopping-cart-line text-gray-700"></i>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center">
            <i className={`text-2xl text-gray-900 ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
            <a href="/" className="block text-sm font-medium text-gray-700 py-2">Accueil</a>
            <a href="/boutique" className="block text-sm font-medium text-teal-600 py-2">Boutique</a>
            <a href="/a-propos" className="block text-sm font-medium text-gray-700 py-2">À Propos</a>
            <a href="/contact" className="block text-sm font-medium text-gray-700 py-2">Contact</a>
            <a href="/client/login" className="block text-sm font-medium text-teal-600 py-2">Connexion</a>
            <a href="/cart" className="flex items-center gap-2 text-sm font-medium text-gray-700 py-2">
              <i className="ri-shopping-cart-line"></i>Panier {cartCount > 0 && `(${cartCount})`}
            </a>
          </div>
        )}
      </nav>

      {/* Hero boutique */}
      <div className="pt-20">
        <div className="relative bg-gradient-to-r from-teal-700 to-teal-500 py-14 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <i className="ri-shopping-bag-line absolute text-9xl text-white" style={{ top: '-20px', right: '5%' }}></i>
            <i className="ri-run-line absolute text-8xl text-white" style={{ bottom: '-10px', left: '3%' }}></i>
          </div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Notre Boutique</h1>
            <p className="text-white/80 max-w-xl mx-auto text-base md:text-lg">Équipements, vêtements et compléments alimentaires pour votre entraînement</p>
          </div>
        </div>
      </div>

      <div className="pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters bar */}
          <div className="py-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white"
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="text-sm text-gray-500 whitespace-nowrap">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-300 hover:text-teal-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => navigate(`/produit/${product.id}`)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.stock < 5 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">Stock faible</div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold">Rupture</div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center pb-4">
                    <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 bg-white text-teal-600 px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Voir détail
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-teal-600 font-semibold uppercase mb-1">{product.category}</p>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-teal-600">{product.price.toLocaleString('fr-FR')} <span className="text-xs font-normal text-gray-500">FCFA</span></p>
                    <div className="flex items-center gap-0.5">
                      <i className="ri-star-fill text-amber-400 text-xs"></i>
                      <i className="ri-star-fill text-amber-400 text-xs"></i>
                      <i className="ri-star-fill text-amber-400 text-xs"></i>
                      <i className="ri-star-fill text-amber-400 text-xs"></i>
                      <i className="ri-star-line text-amber-400 text-xs"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('Tous'); }} className="mt-4 text-teal-600 hover:text-teal-700 text-sm font-medium cursor-pointer">Réinitialiser les filtres</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}