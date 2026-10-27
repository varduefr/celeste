import React from 'react';
import { ArrowDown, FileDown, Sparkles, MapPin, Phone, Clock, Flame, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onOpenMenuModal: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMenuModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-800">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Origin & Tagline */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <span className="flex items-center gap-1.5 bg-sky-950/60 border border-sky-800/50 px-3 py-1 rounded-full text-sky-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Rincón Rioplatense en Barcelona
              </span>
              <span className="text-stone-500">·</span>
              <span className="text-stone-300">Carrer Torns 22 (Les Corts / Sants)</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.1] text-stone-100">
              Pizzas al molde, empanadas y milanesas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-amber-200">
                al más puro estilo Celeste.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              El restaurante take away que traslada la magia de los carritos y pizzerías de Montevideo a Barcelona. Cada día preparamos un menú casero abundante, pizzas con piso crocante y muzzarella desbordante, y empanadas criollas recién salidas del horno.
            </p>

            {/* Key benefits list without pill slop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-stone-300 border-t border-stone-800/80">
              <div>
                <p className="font-bold text-stone-100 text-sm">Menú Diario</p>
                <p className="text-stone-400">1º + 2º + Pan + Bebida + Postre por 11,90€</p>
              </div>
              <div>
                <p className="font-bold text-stone-100 text-sm">Fainá & Muzza</p>
                <p className="text-stone-400">El maridaje oriental indiscutible</p>
              </div>
              <div>
                <p className="font-bold text-stone-100 text-sm">Empaque Térmico</p>
                <p className="text-stone-400">Llega a casa crujiente y caliente</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#carta"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explorar La Carta</span>
              </a>

              <a
                href="#menu-del-dia"
                className="px-6 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-300 border border-amber-500/30 font-bold text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Menú del Día (11,90€)</span>
              </a>

              <button
                onClick={onOpenMenuModal}
                className="px-5 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
                title="Descargar la carta en PDF para imprimir o compartir"
              >
                <FileDown className="w-4 h-4 text-sky-400" />
                <span>Descargar Carta PDF</span>
              </button>
            </div>

            {/* Quick takeaway address snippet */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Carrer Torns 22, Barcelona
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp: {RESTAURANT_INFO.whatsapp}
              </span>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500 via-amber-500/20 to-sky-600 opacity-30 blur-lg"></div>

              <div className="relative bg-stone-800/90 rounded-2xl border border-stone-700/80 p-5 shadow-2xl space-y-4">
                {/* Image showcase */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80"
                    alt="Milanesa Napolitana y Comida Uruguaya Celeste"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-100">
                    <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700/80 font-medium">
                      <span className="text-amber-400 font-bold">★ Milanesa Napolitana</span> · Con papas caseras
                    </div>
                    <div className="bg-sky-600 text-white font-extrabold px-2.5 py-1.5 rounded-lg shadow">
                      14,50€
                    </div>
                  </div>
                </div>

                {/* Micro mini features under photo */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="bg-stone-900/80 rounded-xl p-2.5 border border-stone-700/60">
                    <p className="text-[11px] text-stone-400">Pizza al Molde</p>
                    <p className="text-xs font-bold text-stone-100 mt-0.5">Muzza Dorada</p>
                  </div>
                  <div className="bg-stone-900/80 rounded-xl p-2.5 border border-stone-700/60">
                    <p className="text-[11px] text-stone-400">Empanadas</p>
                    <p className="text-xs font-bold text-stone-100 mt-0.5">Carne a Cuchillo</p>
                  </div>
                  <div className="bg-stone-900/80 rounded-xl p-2.5 border border-stone-700/60">
                    <p className="text-[11px] text-stone-400">Postres</p>
                    <p className="text-xs font-bold text-amber-300 mt-0.5">Chajá & Dulce Leche</p>
                  </div>
                </div>

                {/* Callout box */}
                <div className="bg-sky-950/40 border border-sky-800/40 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-sky-200">¿Tienes hambre ahora?</p>
                    <p className="text-stone-400">Preparamos tu pedido en 15-20 minutos para recoger.</p>
                  </div>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent('¡Hola Celeste! Quiero consultar para pedir Take Away en Carrer Torns 22.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
