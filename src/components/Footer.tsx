import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, FileDown, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onOpenMenuModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenuModal }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center shadow-md">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-300"></div>
              </div>
              <div>
                <span className="text-2xl font-serif font-black tracking-tight text-white">
                  CELESTE
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-sky-400">
                  Comida Uruguaya · Take Away
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              El restaurante take away de comida uruguaya casera en Barcelona. Pizzas al molde con piso crujiente y abundante muzzarella, empanadas criollas, milanesas y menú casero cada día.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenMenuModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-sky-400 border border-stone-800 text-xs font-semibold transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar Carta en PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-bold uppercase tracking-wider text-white text-xs">Secciones</p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#carta" className="hover:text-sky-400 transition-colors">
                  La Carta de Platos
                </a>
              </li>
              <li>
                <a href="#menu-del-dia" className="hover:text-sky-400 transition-colors">
                  Menú del Día (11,90€)
                </a>
              </li>
              <li>
                <a href="#nuestro-local" className="hover:text-sky-400 transition-colors">
                  Nuestro Local
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-sky-400 transition-colors">
                  Contacto & Pedidos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-bold uppercase tracking-wider text-white text-xs">Contacto Take Away</p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address} (Les Corts / Sants)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneCall}`} className="hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300"
                >
                  WhatsApp: {RESTAURANT_INFO.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-bold uppercase tracking-wider text-white text-xs">Horario de Cocina</p>
            <div className="space-y-1.5 text-xs text-stone-400">
              <p className="text-stone-300 font-semibold">Martes a Viernes:</p>
              <p>12:30 a 16:00 · 19:30 a 23:30</p>
              <p className="text-stone-300 font-semibold pt-1">Sábados y Domingos:</p>
              <p>12:30 a 16:30 · 19:30 a 23:45</p>
              <p className="text-stone-500 pt-1">Lunes cerrado por descanso.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Celeste Take Away · Barcelona · Carrer Torns 22. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1">
            Hecho con alma uruguaya <Heart className="w-3.5 h-3.5 text-sky-400 inline fill-sky-400" /> en Barcelona.
          </p>
        </div>
      </div>
    </footer>
  );
};
