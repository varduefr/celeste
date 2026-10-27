import React from 'react';
import { Flame, Heart, Sparkles, ShieldCheck, Clock, MapPin, PackageCheck, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const AboutSection: React.FC = () => {
  return (
    <section id="nuestro-local" className="py-16 sm:py-24 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
            <span>Tradición Rioplatense</span>
            <span aria-hidden="true">·</span>
            <span>Carrer Torns 22, Barcelona</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-stone-950 mt-2">
            Nuestro Local & Filosofía
          </h2>
          <p className="text-stone-600 text-base sm:text-lg mt-3 leading-relaxed">
            Celeste nació con una misión sencilla y apasionada: traer la auténtica cocina de bodegón, pizzería de barrio y carrito uruguayo al corazón de Barcelona.
          </p>
        </div>

        {/* Story Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed">
            <div className="space-y-4 text-sm sm:text-base">
              <p>
                En <strong>Carrer Torns 22</strong> no hacemos comida rápida industrial. Todo lo que sale de nuestra cocina se elabora a diario como en las casas de Canelones y Montevideo: masas con fermentación lenta de 48 horas para lograr una pizza al molde alta, esponjosa y con base crocante, empanadas con carne cortada a cuchillo sazonada con paciencia, y milanesas tiernas empanadas una a una.
              </p>
              <p>
                Diseñamos nuestro espacio específicamente como un <strong>Take Away de alta calidad</strong>. Al concentrarnos en pedidos para llevar y recogida en local, podemos garantizar que cada plato se prepare en el momento exacto en que lo necesitas, con ingredientes de primera y a precios justos para que puedas disfrutarlo a diario.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Horno a 320°C & Masa Madre</h4>
                <p className="text-xs text-stone-500">
                  Pizzas al molde con piso bien dorado y fainá de garbanzo con textura sedosa por dentro y crujiente por fuera.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Carne a Cuchillo & Relleno Real</h4>
                <p className="text-xs text-stone-500">
                  Nada de carne picada comercial. Cortamos el corte magro a mano para que cada bocado conserve su jugo y sabor.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Empaque Térmico Micro-Aireado</h4>
                <p className="text-xs text-stone-500">
                  Envases diseñados para que las milanesas y pizzas no suden ni se ablanden en el camino hasta tu mesa.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm">Dulce de Leche & Chajá</h4>
                <p className="text-xs text-stone-500">
                  Postres tradicionales con auténtico dulce de leche espeso rioplatense y merengue casero de Paysandú.
                </p>
              </div>
            </div>

            {/* Quote callout */}
            <div className="p-4 rounded-xl bg-sky-50/80 border-l-4 border-sky-600 text-xs sm:text-sm text-sky-950 font-serif italic">
              "Para nosotros, cocinar es tender un puente de recuerdos a través del Atlántico. Queremos que al abrir tu caja de Celeste en casa sientas el calor de una mesa uruguaya."
            </div>
          </div>

          {/* Right Visual Image Composition */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 group">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Cocina artesanal Celeste en Carrer Torns 22"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                    Carrer Torns 22, Barcelona
                  </span>
                  <p className="font-serif font-black text-xl">
                    Tu punto de encuentro take away
                  </p>
                  <p className="text-xs text-stone-300">
                    A pasos de Metro Badal y Plaça de Sants.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary small photo row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-36 border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=500&q=80"
                  alt="Empanadas caseras saliendo del horno"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Empanadas al Horno
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-36 border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
                  alt="Pizza al molde con muzzarella abundante"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Pizzas al Molde
                </div>
              </div>
            </div>

            {/* Quick takeaway pickup protocol */}
            <div className="bg-stone-900 text-stone-200 rounded-2xl p-4 text-xs space-y-2 border border-stone-800">
              <p className="font-bold text-amber-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> ¿Cómo funciona el Take Away en Celeste?
              </p>
              <ol className="list-decimal list-inside space-y-1 text-stone-300 pl-1">
                <li>Eliges tus platos en La Carta o el Menú del Día.</li>
                <li>Envías tu pedido por WhatsApp o nos llamas por teléfono.</li>
                <li>Te confirmamos en qué minuto exacto estará listo.</li>
                <li>Pasas por Carrer Torns 22 y recoges tu comida caliente sin esperas.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
