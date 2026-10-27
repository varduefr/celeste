import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Clock, User, MessageCircle, Copy, Check, ShoppingBag, MapPin } from 'lucide-react';
import { CartItem, generateWhatsAppMessage } from '../types/cart';
import { RESTAURANT_INFO } from '../data/menuData';

interface TakeAwayCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const TakeAwayCartDrawer: React.FC<TakeAwayCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [pickupTime, setPickupTime] = useState('Lo antes posible (20-30 min)');
  const [customTimeInput, setCustomTimeInput] = useState('');
  const [extraNotes, setExtraNotes] = useState('');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const finalPickupTime = customTimeInput.trim() ? customTimeInput.trim() : pickupTime;

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage(cart, customerName, finalPickupTime, extraNotes, total);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleCopySummary = async () => {
    const message = generateWhatsAppMessage(cart, customerName, finalPickupTime, extraNotes, total);
    try {
      await navigator.clipboard.writeText(message);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2000);
    } catch {
      // fallback
    }
  };

  const quickTimes = [
    'Lo antes posible (20-30 min)',
    '13:30',
    '14:00',
    '14:30',
    '20:30',
    '21:00',
    '21:30',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer content */}
      <div className="relative w-full max-w-lg bg-stone-900 border-l border-stone-800 text-stone-100 h-full flex flex-col shadow-2xl z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-lg text-white">Tu Pedido Take Away</h2>
              <p className="text-xs text-stone-400">Recogida en {RESTAURANT_INFO.address}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Cerrar pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-800 flex items-center justify-center text-stone-500">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-stone-300 text-base">Tu pedido está vacío</h3>
              <p className="text-xs text-stone-500 max-w-xs">
                Añade deliciosas pizzas, empanadas recién horneadas, milanesas o el menú del día de hoy desde La Carta.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-sky-400 text-xs font-bold rounded-xl"
              >
                Ver platos de la carta
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-1">
                  <span>Platos seleccionados ({cart.reduce((s, c) => s + c.quantity, 0)})</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-red-400 text-xs transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Vaciar
                  </button>
                </div>

                {cart.map((ci) => {
                  const lineTotal = (ci.item.price * ci.quantity).toFixed(2);
                  return (
                    <div
                      key={ci.id}
                      className="p-3 rounded-xl bg-stone-850 border border-stone-800 space-y-2 hover:border-stone-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-stone-100 text-sm">{ci.item.name}</h4>
                          {ci.selectedOption && (
                            <p className="text-xs text-sky-400 font-medium">{ci.selectedOption}</p>
                          )}
                          {ci.customDetails && (
                            <div className="text-[11px] text-stone-400 space-y-0.5 mt-1 border-l-2 border-amber-500/50 pl-2">
                              {ci.customDetails.firstCourse && <p>1º: {ci.customDetails.firstCourse}</p>}
                              {ci.customDetails.secondCourse && <p>2º: {ci.customDetails.secondCourse}</p>}
                              {ci.customDetails.beverage && <p>Bebida: {ci.customDetails.beverage}</p>}
                              {ci.customDetails.dessert && <p>Postre: {ci.customDetails.dessert}</p>}
                            </div>
                          )}
                        </div>
                        <span className="font-mono font-bold text-amber-400 text-sm shrink-0">
                          {lineTotal}€
                        </span>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center justify-between pt-1 border-t border-stone-800/60">
                        <span className="text-[11px] text-stone-400 font-mono">
                          {ci.item.price.toFixed(2)}€ / ud
                        </span>

                        <div className="flex items-center gap-1 bg-stone-900 rounded-lg p-0.5 border border-stone-700/60">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.id, -1)}
                            className="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                            aria-label="Restar unidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-stone-100">
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.id, 1)}
                            className="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                            aria-label="Añadir unidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pickup Time & Customer Info */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                {/* Customer name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Tu Nombre para la recogida:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Martín"
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Pickup time selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> ¿A qué hora pasas a recoger?:
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {quickTimes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setPickupTime(t);
                          setCustomTimeInput('');
                        }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                          pickupTime === t && !customTimeInput
                            ? 'bg-sky-600 text-white font-bold'
                            : 'bg-stone-850 border border-stone-700 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Custom time optional input */}
                  <input
                    type="text"
                    value={customTimeInput}
                    onChange={(e) => setCustomTimeInput(e.target.value)}
                    placeholder="O escribe otra hora personalizada (ej. 21:15)"
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3.5 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Extra comments / notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Comentarios o notas (opcional):
                  </label>
                  <input
                    type="text"
                    value={extraNotes}
                    onChange={(e) => setExtraNotes(e.target.value)}
                    placeholder="Ej. Salsita chimichurri aparte, sin cebolla..."
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Pickup location notice */}
              <div className="bg-stone-850 rounded-xl p-3 border border-stone-800 flex items-start gap-2.5 text-xs text-stone-300">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-100">Punto de Recogida Take Away:</p>
                  <p className="text-stone-400">{RESTAURANT_INFO.address} (Barcelona)</p>
                  <p className="text-[11px] text-amber-400 mt-0.5">El pago se realiza en el local (Efectivo, Tarjeta o Bizum).</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-900 space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Subtotal platos:</span>
                <span className="font-mono">{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Empaque térmico take away:</span>
                <span className="text-emerald-400 font-bold">Gratis</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-1 border-t border-stone-800">
                <span>Total a pagar en local:</span>
                <span className="font-mono text-amber-400 text-lg">{total.toFixed(2)}€</span>
              </div>
            </div>

            {/* Direct WhatsApp button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer transition-all active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Pedido por WhatsApp ({total.toFixed(2)}€)</span>
            </button>

            {/* Copy summary button */}
            <button
              onClick={handleCopySummary}
              className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Resumen de pedido copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-400" />
                  <span>Copiar resumen para enviar o guardar</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
