import React, { useState, useMemo } from 'react';
import { Sparkles, Check, Clock, Utensils, Coffee, Award, Plus, ChefHat } from 'lucide-react';
import { DAILY_MENUS, RESTAURANT_INFO, DailyMenuDay, MenuItem } from '../data/menuData';

interface DailyMenuSectionProps {
  onAddCustomDailyMenu: (menuDetails: {
    dayName: string;
    firstCourse: string;
    secondCourse: string;
    beverage: string;
    dessert: string;
    price: number;
  }) => void;
}

export const DailyMenuSection: React.FC<DailyMenuSectionProps> = ({
  onAddCustomDailyMenu,
}) => {
  // Determine current day of week (1 = Monday ... 6 = Saturday, 0 = Sunday)
  const todayIndex = useMemo(() => {
    const day = new Date().getDay();
    // If Sunday (0) or Monday (1), default to Tuesday or Monday
    return day === 0 ? 1 : day;
  }, []);

  const [activeDayIndex, setActiveDayIndex] = useState<number>(todayIndex > 6 ? 1 : todayIndex);

  const currentMenu: DailyMenuDay = useMemo(() => {
    const found = DAILY_MENUS.find((m) => m.dayIndex === activeDayIndex);
    return found || DAILY_MENUS[0];
  }, [activeDayIndex]);

  // Selections for the custom builder
  const [selectedFirst, setSelectedFirst] = useState<string>(currentMenu.firstCourse[0]);
  const [selectedSecond, setSelectedSecond] = useState<string>(currentMenu.secondCourse[0]);
  const [selectedBeverage, setSelectedBeverage] = useState<string>('Refresco frío');
  const [selectedDessert, setSelectedDessert] = useState<string>(currentMenu.desserts[0]);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Update selections when day changes
  const handleSelectDay = (dayIndex: number) => {
    setActiveDayIndex(dayIndex);
    const m = DAILY_MENUS.find((item) => item.dayIndex === dayIndex) || DAILY_MENUS[0];
    setSelectedFirst(m.firstCourse[0]);
    setSelectedSecond(m.secondCourse[0]);
    setSelectedDessert(m.desserts[0]);
  };

  const handleAddMenuToCart = () => {
    const isSaturday = activeDayIndex === 6;
    const price = isSaturday ? RESTAURANT_INFO.dailyMenuWeekendPrice : RESTAURANT_INFO.dailyMenuPrice;

    onAddCustomDailyMenu({
      dayName: currentMenu.dayName,
      firstCourse: selectedFirst,
      secondCourse: selectedSecond,
      beverage: selectedBeverage,
      dessert: selectedDessert,
      price: price,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const isToday = todayIndex === currentMenu.dayIndex;
  const priceDisplay = activeDayIndex === 6 ? '13,50€' : '11,90€';

  return (
    <section id="menu-del-dia" className="py-16 sm:py-24 bg-stone-900 text-stone-100 scroll-mt-20 border-t border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
            <ChefHat className="w-4 h-4 text-amber-400" />
            <span>Fresco del Día · Para Llevar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-stone-100">
            Menú del Día Casero
          </h2>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-serif italic text-amber-200/90">
            "Cada día preparamos un menú casero, abundante y delicioso"
          </p>

          <p className="text-sm text-stone-400 max-w-2xl mx-auto">
            Pensado especialmente para quienes trabajan o viven en el barrio y quieren comer comida casera de verdad, con ingredientes frescos y porciones rioplatenses generosas.
          </p>
        </div>

        {/* Days Selector */}
        <div className="mt-10 flex items-center justify-center gap-2 overflow-x-auto pb-3">
          {DAILY_MENUS.map((dm) => {
            const isSelected = dm.dayIndex === activeDayIndex;
            const isActualToday = dm.dayIndex === todayIndex;

            return (
              <button
                key={dm.dayIndex}
                onClick={() => handleSelectDay(dm.dayIndex)}
                className={`relative px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-b from-sky-500 to-blue-700 text-white shadow-lg shadow-sky-950/60 scale-105'
                    : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 border border-stone-700/60'
                }`}
              >
                <span>{dm.dayName}</span>
                {isActualToday && (
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold ${isSelected ? 'text-amber-300' : 'text-sky-400'}`}>
                    Hoy
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Day Menu Board */}
        <div className="mt-8 bg-stone-800/90 rounded-3xl border border-stone-700/80 shadow-2xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Menu Overview & Day Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Menú de {currentMenu.dayName}
                  </span>
                  {isToday && (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded">
                      Disponible hoy para recoger
                    </span>
                  )}
                </div>

                {currentMenu.badge && (
                  <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-md">
                    ★ {currentMenu.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-100">
                  {currentMenu.title}
                </h3>
                <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                  {currentMenu.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-700 flex items-center justify-between">
                <div>
                  <p className="text-xs text-stone-400 uppercase font-semibold">Precio Take Away Completo</p>
                  <p className="text-3xl font-serif font-black text-amber-400 mt-0.5">
                    {priceDisplay}
                  </p>
                </div>
                <div className="text-right text-xs text-stone-300 space-y-0.5">
                  <p className="font-semibold text-stone-100">Incluye:</p>
                  <p>1º Plato + 2º Plato o Guarnición</p>
                  <p>Pan de campo + Bebida + Postre casero</p>
                </div>
              </div>

              {/* Quality guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-stone-300">
                <div className="flex items-start gap-2 bg-stone-900/50 p-2.5 rounded-xl border border-stone-800">
                  <Award className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-200">100% Elaboración Casera</p>
                    <p className="text-stone-400 text-[11px]">Cocinamos cada mañana con producto de mercado.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-stone-900/50 p-2.5 rounded-xl border border-stone-800">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-200">Servicio Rápido</p>
                    <p className="text-stone-400 text-[11px]">Envasado térmico listo a la hora acordada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Menu Configurator */}
            <div className="lg:col-span-6 bg-stone-900/90 rounded-2xl border border-stone-700/80 p-5 sm:p-6 space-y-5">
              <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                <h4 className="font-bold text-stone-100 text-sm flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-sky-400" />
                  Personaliza tu Menú para Llevar
                </h4>
                <span className="text-xs text-stone-400 font-mono">Paso 1 de 4</span>
              </div>

              {/* 1. First Course Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-400">
                  1º Plato Principal:
                </label>
                <div className="space-y-1.5">
                  {currentMenu.firstCourse.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedFirst(opt)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedFirst === opt
                          ? 'bg-sky-950/80 border border-sky-400 text-sky-200 font-bold'
                          : 'bg-stone-800/80 border border-stone-700 text-stone-300 hover:bg-stone-750'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedFirst === opt && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Second Course Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-sky-400">
                  2º Plato / Guarnición:
                </label>
                <div className="space-y-1.5">
                  {currentMenu.secondCourse.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedSecond(opt)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedSecond === opt
                          ? 'bg-sky-950/80 border border-sky-400 text-sky-200 font-bold'
                          : 'bg-stone-800/80 border border-stone-700 text-stone-300 hover:bg-stone-750'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedSecond === opt && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Beverage & Dessert in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Beverage */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-400">
                    Bebida:
                  </label>
                  <select
                    value={selectedBeverage}
                    onChange={(e) => setSelectedBeverage(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="Agua mineral 50cl">Agua mineral 50cl</option>
                    <option value="Coca-Cola Normal">Coca-Cola Normal</option>
                    <option value="Coca-Cola Zero">Coca-Cola Zero</option>
                    <option value="Fanta Naranja">Fanta Naranja</option>
                    <option value="Refresco de Pomelo">Refresco de Pomelo</option>
                    <option value="Cerveza Lager fría (+0.50€)">Cerveza Lager fría (+0.50€)</option>
                  </select>
                </div>

                {/* Dessert */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-400">
                    Postre Casero o Café:
                  </label>
                  <select
                    value={selectedDessert}
                    onChange={(e) => setSelectedDessert(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    {currentMenu.desserts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Custom Menu Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddMenuToCart}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 active:scale-98'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>¡Menú del Día añadido a tu pedido!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 text-stone-950" />
                      <span>Añadir Menú del Día a tu Pedido ({priceDisplay})</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-2">
                  Incluye pan de campo y salsita. Podrás especificar hora de recogida al finalizar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed daily alternatives note */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-400">
          <div className="bg-stone-800/40 border border-stone-800 rounded-2xl p-4 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0"></span>
            <div>
              <p className="font-bold text-stone-200">Alternativa fija de empanadas:</p>
              <p>También puedes pedir el menú con 2 empanadas artesanas + ensalada mixta fresca + bebida + postre por 11,90€.</p>
            </div>
          </div>
          <div className="bg-stone-800/40 border border-stone-800 rounded-2xl p-4 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
            <div>
              <p className="font-bold text-stone-200">Alternativa fija de pizza & fainá:</p>
              <p>2 porciones de pizza de muzzarella al molde + porción de fainá dorada + bebida + postre por 11,90€.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
