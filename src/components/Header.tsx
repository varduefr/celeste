import React, { useState, useEffect } from 'react';
import { ShoppingBag, FileDown, Phone, MapPin, Clock, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenMenuModal: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenMenuModal,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      // Barcelona time (CET/CEST)
      const bcnTimeStr = now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' });
      const bcnDate = new Date(bcnTimeStr);
      const day = bcnDate.getDay(); // 0 = Sunday, 1 = Monday
      const hours = bcnDate.getHours();
      const minutes = bcnDate.getMinutes();
      const timeDecimal = hours + minutes / 60;

      // Closed Monday
      if (day === 1) {
        setIsOpenNow(false);
        return;
      }
      // Lunch: 12:30 to 16:00 (or 16:30 on weekends)
      const lunchEnd = (day === 0 || day === 6) ? 16.5 : 16.0;
      const isLunch = timeDecimal >= 12.5 && timeDecimal <= lunchEnd;
      // Dinner: 19:30 to 23:45
      const isDinner = timeDecimal >= 19.5 && timeDecimal <= 23.75;

      setIsOpenNow(isLunch || isDinner);
    };

    checkOpenStatus();
    const timer = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'La Carta', href: '#carta', id: 'carta' },
    { label: 'Menú del Día', href: '#menu-del-dia', id: 'menu-del-dia' },
    { label: 'Nuestro Local', href: '#nuestro-local', id: 'nuestro-local' },
    { label: 'Contacto & Ubicación', href: '#contacto', id: 'contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-amber-600/90 text-stone-950 px-4 py-1 text-xs font-semibold tracking-wide text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-stone-950 animate-pulse"></span>
        <span>Take Away en Carrer Torns 22 · Pedidos por WhatsApp al {RESTAURANT_INFO.whatsapp}</span>
        <span className="hidden sm:inline">· ¡Pide con antelación y recoge caliente sin colas!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              {/* Sun of May symbol simplified */}
              <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-amber-300 ring-2 ring-amber-100"></div>
                <div className="absolute w-7 h-7 border border-amber-300/60 rounded-full animate-spin-slow"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-black tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  CELESTE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 border border-sky-400/30 px-1.5 py-0.5 rounded">
                  Take Away
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium">Comida Uruguaya · Carrer Torns 22</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  activeSection === link.id
                    ? 'text-sky-400'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Actions: Download Menu & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Status indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/80 border border-stone-700/60 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              ></span>
              <span className="text-stone-300">
                {isOpenNow ? 'Abierto para recoger' : 'Abre a las 12:30 / 19:30'}
              </span>
            </div>

            {/* Download Menu Button */}
            <button
              onClick={onOpenMenuModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-stone-600 transition-all cursor-pointer shadow-sm"
              title="Ver y descargar la carta completa en PDF"
            >
              <FileDown className="w-4 h-4 text-sky-400" />
              <span>Descargar Carta</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-950/40 cursor-pointer transition-all active:scale-95"
              aria-label="Abrir pedido take away"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold">Tu Pedido</span>
              {cartCount > 0 ? (
                <span className="bg-white text-blue-900 font-extrabold text-xs px-2 py-0.5 rounded-full shadow-inner">
                  {cartCount} · {cartTotal.toFixed(2)}€
                </span>
              ) : (
                <span className="hidden sm:inline opacity-80 font-normal text-xs">0 items</span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-stone-800 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" /> Carrer Torns 22, Barcelona
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Clock className="w-3.5 h-3.5" /> {isOpenNow ? 'Abierto' : 'Consultar horario'}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-200 hover:bg-stone-800 hover:text-sky-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMenuModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-stone-800 text-stone-200 border border-stone-700"
            >
              <FileDown className="w-4 h-4 text-sky-400" />
              <span>Ver y Descargar Carta en PDF</span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phoneCall}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-800/60 text-stone-300"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Llamar al {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
