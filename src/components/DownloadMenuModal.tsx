import React from 'react';
import { X, Printer, Download, Sparkles, MapPin, Phone, ChefHat } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO, MENU_CATEGORIES } from '../data/menuData';

interface DownloadMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadMenuModal: React.FC<DownloadMenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTextVersion = () => {
    let content = `========================================================\n`;
    content += `         CELESTE - COMIDA URUGUAYA TAKE AWAY           \n`;
    content += `        Carrer Torns 22, 08028 Barcelona              \n`;
    content += `   Tel: ${RESTAURANT_INFO.phone} | WhatsApp: ${RESTAURANT_INFO.whatsapp} \n`;
    content += `========================================================\n\n`;

    content += `MENÚ DEL DÍA CASERO (Lunes a Viernes 11,90€ | Sábado 13,50€)\n`;
    content += `Cada día preparamos un menú casero, abundante y delicioso:\n`;
    content += `Incluye: 1º Plato + 2º Plato + Pan de campo + Bebida + Postre casero\n\n`;

    const categories = ['pizzas', 'empanadas', 'milanesas', 'chivitos', 'postres', 'bebidas'] as const;
    const catTitles: Record<string, string> = {
      pizzas: 'PIZZAS AL MOLDE & FAINÁ',
      empanadas: 'EMPANADAS CRIOLLAS ARTESANALES',
      milanesas: 'MILANESAS SUPREMAS AL PLATO Y AL PAN',
      chivitos: 'CHIVITOS URUGUAYOS TRADICIONALES',
      postres: 'POSTRES CASEROS RIOPLATENSES',
      bebidas: 'BEBIDAS & VINOS URUGUAYOS',
    };

    categories.forEach((cat) => {
      content += `--------------------------------------------------------\n`;
      content += `${catTitles[cat]}\n`;
      content += `--------------------------------------------------------\n`;
      const items = MENU_ITEMS.filter((i) => i.category === cat);
      items.forEach((item) => {
        content += `• ${item.name.toUpperCase()} ........... ${item.price.toFixed(2)}€\n`;
        content += `  ${item.description}\n`;
        if (item.allergens && item.allergens.length > 0) {
          content += `  [Alérgenos: ${item.allergens.join(', ')}]\n`;
        }
        content += `\n`;
      });
    });

    content += `\nCarrer Torns 22, Barcelona · ¡Haz tu pedido por WhatsApp y recoge caliente sin esperas!\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Carta-Celeste-Take-Away-Barcelona.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white text-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:rounded-none">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-stone-900 text-stone-100 p-4 sm:px-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <ChefHat className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">Carta Completa para Descargar o Imprimir</h3>
              <p className="text-xs text-stone-400">Restaurante Celeste · Carrer Torns 22, Barcelona</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow transition-colors cursor-pointer"
              title="Abrir diálogo de impresión para imprimir o guardar en PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={handleDownloadTextVersion}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition-colors cursor-pointer"
              title="Descargar copia de la carta en archivo de texto"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Descargar .txt</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Cerrar modal de carta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Menu Content */}
        <div id="printable-menu-area" className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-stone-50 print:bg-white print:p-4">
          {/* Printable Document Header */}
          <div className="border-b-2 border-stone-900 pb-6 text-center space-y-2">
            <div className="inline-block px-3 py-0.5 border border-sky-800 text-sky-800 font-bold text-xs uppercase tracking-widest rounded-sm mb-1">
              Restaurante Take Away
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-stone-950">
              CELESTE
            </h1>
            <p className="text-base font-serif italic text-stone-700">
              Auténtica Comida Uruguaya · Sabor Rioplatense en Barcelona
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-stone-600 pt-2 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-800" /> Carrer Torns 22, 08028 Barcelona
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-800" /> Tel: {RESTAURANT_INFO.phone}
              </span>
              <span>·</span>
              <span>WhatsApp: {RESTAURANT_INFO.whatsapp}</span>
            </div>
          </div>

          {/* Menú del Día Highlight Box in printable card */}
          <div className="bg-amber-50/80 border-2 border-dashed border-amber-500/60 rounded-2xl p-4 sm:p-5 text-stone-900 space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-black text-lg text-amber-950">
                MENÚ DEL DÍA CASERO
              </h2>
              <span className="font-serif font-black text-xl text-amber-900 bg-amber-200/80 px-3 py-0.5 rounded-lg">
                11,90€ (Sábados 13,50€)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 italic">
              "Cada día preparamos un menú casero, abundante y delicioso"
            </p>
            <p className="text-xs text-stone-600">
              Incluye: 1º Plato Principal + 2º Plato / Guarnición + Pan de campo + Bebida + Postre casero o café. Consulta los platos de cada día llamando o por WhatsApp.
            </p>
          </div>

          {/* Menu Sections in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Pizzas & Fainá */}
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-950 uppercase tracking-wide">
                  Pizzas al Molde & Fainá
                </h3>
                <span className="text-[11px] text-stone-500">Masa madre 48h</span>
              </div>
              <div className="space-y-3">
                {MENU_ITEMS.filter((i) => i.category === 'pizzas').map((item) => (
                  <div key={item.id} className="text-xs space-y-0.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                      <span className="font-mono font-bold text-stone-900 shrink-0">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>
                    <p className="text-stone-600 text-[11px] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Empanadas Caseras */}
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-950 uppercase tracking-wide">
                  Empanadas Criollas al Horno
                </h3>
                <span className="text-[11px] text-stone-500">Carne a cuchillo</span>
              </div>
              <div className="space-y-3">
                {MENU_ITEMS.filter((i) => i.category === 'empanadas').map((item) => (
                  <div key={item.id} className="text-xs space-y-0.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                      <span className="font-mono font-bold text-stone-900 shrink-0">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>
                    <p className="text-stone-600 text-[11px] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milanesas Supremas */}
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-stone-950 uppercase tracking-wide">
                  Milanesas Supremas
                </h3>
                <span className="text-[11px] text-stone-500">Con papas rústicas</span>
              </div>
              <div className="space-y-3">
                {MENU_ITEMS.filter((i) => i.category === 'milanesas').map((item) => (
                  <div key={item.id} className="text-xs space-y-0.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                      <span className="font-mono font-bold text-stone-900 shrink-0">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>
                    <p className="text-stone-600 text-[11px] leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chivitos Uruguayos & Postres */}
            <div className="space-y-6">
              {/* Chivitos */}
              <div className="space-y-4">
                <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-950 uppercase tracking-wide">
                    Chivitos Uruguayos
                  </h3>
                  <span className="text-[11px] text-stone-500">Lomo & jamón</span>
                </div>
                <div className="space-y-3">
                  {MENU_ITEMS.filter((i) => i.category === 'chivitos').map((item) => (
                    <div key={item.id} className="text-xs space-y-0.5">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                        <span className="font-mono font-bold text-stone-900 shrink-0">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Postres & Bebidas */}
              <div className="space-y-4 pt-2">
                <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-950 uppercase tracking-wide">
                    Postres Caseros & Bebidas
                  </h3>
                  <span className="text-[11px] text-stone-500">Dulce de leche & Tannat</span>
                </div>
                <div className="space-y-3">
                  {MENU_ITEMS.filter((i) => i.category === 'postres' || i.category === 'bebidas').map((item) => (
                    <div key={item.id} className="text-xs space-y-0.5">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                        <span className="font-mono font-bold text-stone-900 shrink-0">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Printable Footer Notice */}
          <div className="border-t-2 border-stone-300 pt-4 text-center text-xs text-stone-600 space-y-1">
            <p className="font-bold text-stone-900">
              RESTAURANTE CELESTE · TAKE AWAY · CARRER TORNS 22, BARCELONA
            </p>
            <p>
              Horarios: Martes a Domingo 12:30 a 16:00 y 19:30 a 23:30 (Lunes cerrado) · Tel: {RESTAURANT_INFO.phone} · WhatsApp: {RESTAURANT_INFO.whatsapp}
            </p>
            <p className="text-[11px] text-stone-500">
              Precios con IVA incluido. Consulta opciones para celíacos e información sobre alérgenos con nuestro equipo.
            </p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="no-print bg-stone-100 p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <span>* Puedes imprimir esta carta o guardarla como PDF desde el botón superior.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs"
          >
            Volver a la web
          </button>
        </div>
      </div>
    </div>
  );
};
