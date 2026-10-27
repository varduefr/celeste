import { MenuItem } from '../data/menuData';

export interface CartItem {
  id: string; // unique cart line id (e.g. item.id + selectedOption)
  item: MenuItem;
  quantity: number;
  selectedOption?: string;
  notes?: string;
  customDetails?: {
    firstCourse?: string;
    secondCourse?: string;
    beverage?: string;
    dessert?: string;
  };
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  customerName: string,
  pickupTime: string,
  extraNotes: string,
  total: number
): string {
  const lines: string[] = [];
  lines.push(`🇺🇾 *PEDIDO TAKE AWAY - CELESTE*`);
  lines.push(`📍 Recogida en: *Carrer Torns 22, Barcelona*`);
  if (customerName.trim()) {
    lines.push(`👤 Cliente: *${customerName.trim()}*`);
  }
  lines.push(`⏰ Hora deseada de recogida: *${pickupTime || 'Lo antes posible (20-30 min)'}*`);
  lines.push(``);
  lines.push(`🛒 *Detalle del Pedido:*`);

  cart.forEach((ci) => {
    const itemTotal = (ci.item.price * ci.quantity).toFixed(2);
    let itemLine = `• ${ci.quantity}x ${ci.item.name}`;
    if (ci.selectedOption) {
      itemLine += ` (${ci.selectedOption})`;
    }
    itemLine += ` - ${itemTotal}€`;
    lines.push(itemLine);

    if (ci.customDetails) {
      if (ci.customDetails.firstCourse) lines.push(`   └ 1º: ${ci.customDetails.firstCourse}`);
      if (ci.customDetails.secondCourse) lines.push(`   └ 2º: ${ci.customDetails.secondCourse}`);
      if (ci.customDetails.beverage) lines.push(`   └ Bebida: ${ci.customDetails.beverage}`);
      if (ci.customDetails.dessert) lines.push(`   └ Postre: ${ci.customDetails.dessert}`);
    }

    if (ci.notes) {
      lines.push(`   └ Nota: ${ci.notes}`);
    }
  });

  lines.push(``);
  lines.push(`💰 *Total a pagar en local:* *${total.toFixed(2)}€*`);
  if (extraNotes.trim()) {
    lines.push(`📝 *Comentarios adicionales:* ${extraNotes.trim()}`);
  }
  lines.push(``);
  lines.push(`¡Muchas gracias! Aguardo confirmación de tiempo de preparación.`);

  return lines.join('\n');
}
