import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Mail, Navigation, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: 'Consulta general o pedido',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Simulate sending / WhatsApp handoff
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        reason: 'Consulta general o pedido',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-stone-900 text-stone-100 scroll-mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span>Ubicación & Atención</span>
            <span aria-hidden="true">·</span>
            <span>Estamos en Carrer Torns 22</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white mt-2">
            Contacto & Dónde Encontrarnos
          </h2>
          <p className="text-stone-300 text-base mt-2">
            Ven a recoger tu pedido recién hecho a nuestro local o ponte en contacto con nosotros para cualquier consulta o encargo especial.
          </p>
        </div>

        {/* Main Grid: Info Cards + Map + Form */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 space-y-4 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-100 text-base">Dirección del Local</h3>
                  <p className="text-stone-200 font-semibold text-lg mt-0.5">{RESTAURANT_INFO.address}</p>
                  <p className="text-stone-400 text-xs mt-1">
                    Barrio: {RESTAURANT_INFO.neighborhood} · Metro cercano: {RESTAURANT_INFO.metro}
                  </p>
                </div>
              </div>

              {/* Direct Google Maps link */}
              <a
                href="https://maps.google.com/?q=Carrer+Torns+22+Barcelona"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors pt-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir cómo llegar en Google Maps</span>
              </a>
            </div>

            {/* Direct Phone & WhatsApp card */}
            <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 space-y-4 shadow-lg">
              <h3 className="font-bold text-stone-100 text-base flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                Llamadas & Pedidos por WhatsApp
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneCall}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-stone-900 border border-stone-700 hover:border-sky-500 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase font-semibold">Teléfono Fijo</p>
                    <p className="text-xs font-bold text-stone-200 group-hover:text-sky-400">
                      {RESTAURANT_INFO.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent('¡Hola Celeste! Quiero hacer un pedido para recoger en Carrer Torns 22.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-300 uppercase font-semibold">WhatsApp Directo</p>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-300">
                      {RESTAURANT_INFO.whatsapp}
                    </p>
                  </div>
                </a>
              </div>
              <p className="text-[11px] text-stone-400">
                Atendemos mensajes de WhatsApp al instante durante los turnos de servicio.
              </p>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 space-y-3 shadow-lg">
              <h3 className="font-bold text-stone-100 text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Horarios de Apertura
              </h3>
              <div className="space-y-2.5 text-xs text-stone-300 divide-y divide-stone-700/60">
                {RESTAURANT_INFO.schedule.map((sch, i) => (
                  <div key={i} className={`pt-2 flex justify-between items-center ${i === 0 ? 'pt-0' : ''}`}>
                    <span className="font-medium text-stone-200">{sch.days}</span>
                    <span className="text-stone-400 font-mono">
                      {sch.lunch} {sch.dinner ? `· ${sch.dinner}` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map & Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Embedded Map */}
            <div className="bg-stone-800/90 rounded-2xl border border-stone-700/80 overflow-hidden shadow-lg">
              <div className="p-4 bg-stone-850 border-b border-stone-700/80 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  Mapa de Carrer Torns 22, Barcelona
                </span>
                <span className="text-stone-400 text-[11px]">Entre Badal y Sants</span>
              </div>
              {/* Responsive interactive OpenStreetMap frame with marker at Carrer Torns 22, Barcelona */}
              <div className="relative h-64 sm:h-72 w-full bg-stone-950">
                <iframe
                  title="Ubicación de Celeste Take Away en Carrer Torns 22 Barcelona"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.1240%2C41.3730%2C2.1380%2C41.3810&layer=mapnik&marker=41.3768%2C2.1310"
                />
              </div>
              <div className="p-3 bg-stone-850 text-[11px] text-stone-400 flex items-center justify-between">
                <span>📍 Carrer Torns 22, 08028 Barcelona</span>
                <a
                  href="https://maps.google.com/?q=Carrer+Torns+22+Barcelona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline font-bold"
                >
                  Abrir mapa completo →
                </a>
              </div>
            </div>

            {/* Quick Contact & Event Inquiry Form */}
            <div className="bg-stone-800/90 rounded-2xl p-6 sm:p-7 border border-stone-700/80 shadow-lg space-y-4">
              <div>
                <h3 className="font-serif font-black text-xl text-stone-100">
                  ¿Preguntas o Encargos Especiales?
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  ¿Necesitas encargar varias docenas de empanadas para una fiesta, reunión de empresa o partido de fútbol? Escríbenos y te responderemos en seguida.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/60 border border-emerald-700 rounded-xl p-4 flex items-center gap-3 text-emerald-200 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold">¡Mensaje recibido con éxito!</p>
                    <p className="text-stone-300 text-xs">Te responderemos a la brevedad por teléfono o WhatsApp.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Tu Nombre *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Martín González"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ej. 612 34 56 78"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Email (opcional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Motivo</label>
                      <select
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="Consulta general o pedido">Consulta general de carta</option>
                        <option value="Encargo de empanadas para fiesta">Encargo grande de empanadas</option>
                        <option value="Menú corporativo de empresa">Menú para oficina / empresa</option>
                        <option value="Alergias o ingredientes">Consulta sobre ingredientes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Mensaje o Detalle</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos fecha, cantidad aproximada o cualquier detalle especial..."
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-400">
                      * O escríbenos directamente por WhatsApp para respuesta inmediata.
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Consulta</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
