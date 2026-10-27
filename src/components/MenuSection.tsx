import React, { useState, useMemo } from 'react';
import { Search, FileDown, Plus, Check, Sparkles, Filter, Leaf, Info } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../data/menuData';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, selectedOption?: string) => void;
  onOpenMenuModal: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenMenuModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyVegetarian, setOnlyVegetarian] = useState<boolean>(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Vegetarian filter
      if (onlyVegetarian && !item.isVegetarian) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesHighlight = item.highlight?.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesHighlight;
      }
      return true;
    });
  }, [selectedCategory, onlyVegetarian, searchQuery]);

  const handleOptionChange = (itemId: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: option }));
  };

  const handleAdd = (item: MenuItem) => {
    const chosenOption = selectedOptions[item.id] || (item.options ? item.options[0] : undefined);
    onAddToCart(item, chosenOption);

    // Feedback tick
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="carta" className="py-16 sm:py-24 bg-stone-100 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
              <span>Nuestra Carta Completa</span>
              <span aria-hidden="true">·</span>
              <span>Take Away Carrer Torns 22</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-stone-900 mt-2">
              La Carta de Celeste
            </h2>
            <p className="text-stone-600 text-base max-w-2xl mt-2">
              Recetas auténticas del Río de la Plata elaboradas al momento. Selecciona tus platos para recoger o descarga nuestra carta en PDF para consultarla siempre que quieras.
            </p>
          </div>

          {/* Download PDF button CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenMenuModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Ver y Descargar Carta PDF</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="pt-8 pb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search & Vegetarian Toggle */}
            <div className="flex items-center gap-2.5">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar pizza, milanesa, fainá..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Veg toggle */}
              <button
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  onlyVegetarian
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
                title="Mostrar solo opciones vegetarianas"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Veggie</span>
              </button>
            </div>
          </div>

          {/* Results count text */}
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>
              Mostrando {filteredItems.length} {filteredItems.length === 1 ? 'plato' : 'platos'} disponibles
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyVegetarian(false);
                  setSearchQuery('');
                }}
                className="text-sky-700 hover:underline font-medium"
              >
                Restablecer filtros
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3 my-8">
            <Info className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-lg font-bold text-stone-800">No encontramos ningún plato con ese criterio</h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Prueba buscando por palabras clave como "empanada", "muzzarella", "napolitana" o quita los filtros aplicados.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setOnlyVegetarian(false);
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg"
            >
              Ver toda la carta
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              const selectedOption = selectedOptions[item.id] || (item.options ? item.options[0] : null);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Image container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Highlight text (Anti-slop: clean text badge with subtle contrast) */}
                    {item.highlight && (
                      <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                        ★ {item.highlight}
                      </div>
                    )}

                    {/* Vegetarian tag */}
                    {item.isVegetarian && (
                      <div className="absolute top-3 right-3 bg-emerald-900/90 text-emerald-200 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <Leaf className="w-3 h-3 text-emerald-300" />
                        <span>Vegetariano</span>
                      </div>
                    )}

                    {/* Price floating badge */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-stone-950 font-black text-base px-3 py-1 rounded-lg shadow-md border border-stone-200/60">
                      {item.price.toFixed(2)}€
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name */}
                      <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug group-hover:text-sky-800 transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Options selector (e.g. Ternera / Pollo) */}
                      {item.options && item.options.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-stone-100">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                            Variedad / Opción:
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {item.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleOptionChange(item.id, opt)}
                                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                                  selectedOption === opt
                                    ? 'bg-sky-100 border border-sky-400 text-sky-900 font-bold'
                                    : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer of Card: Allergens + Add to cart */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      {/* Allergens quiet text */}
                      <div className="text-[11px] text-stone-400 truncate max-w-[140px]" title={item.allergens?.join(', ')}>
                        {item.allergens && item.allergens.length > 0 ? (
                          <span>Contiene: {item.allergens.join(', ')}</span>
                        ) : (
                          <span>Sin alérgenos comunes</span>
                        )}
                      </div>

                      {/* Add button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-900 hover:bg-sky-700 text-white active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>¡Añadido!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Añadir al pedido</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner inside La Carta */}
        <div className="mt-14 bg-gradient-to-r from-sky-900 via-stone-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-sky-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
              Formato Físico / Digital
            </span>
            <h3 className="text-2xl font-serif font-black">
              ¿Quieres tener la carta siempre a mano en tu móvil o imprimirla?
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              Descarga la carta en PDF con todos los precios, números de teléfono para pedidos rápidos y la ubicación de nuestro local en Carrer Torns 22.
            </p>
          </div>
          <button
            onClick={onOpenMenuModal}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-white text-stone-950 hover:bg-sky-50 font-black text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-sky-700" />
            <span>Descargar Carta Completa (PDF)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
