import catalogData from '@/data/products.json'

const { whatsappNumber, storeName } = catalogData.meta

/**
 * Genera el mensaje de pedido formateado para WhatsApp
 * @param {Array}  items        - items del carrito
 * @param {number} total        - subtotal de productos
 * @param {number} shippingCost - costo de envío
 * @param {number} grandTotal   - total final
 * @param {string} deliveryLabel- etiqueta del tipo de entrega
 * @param {Object} customer     - { name, phone, address, notes }
 * @returns {void}              - abre WhatsApp en nueva pestaña
 */
export function useWhatsApp() {
  function sendOrder({ items, total, shippingCost, grandTotal, deliveryLabel, customer }) {
    const lines = [
      `*Nuevo pedido - ${storeName}*`,
      ``,
      `*Cliente:* ${customer.name}`,
      `*Telefono:* ${customer.phone}`,
      customer.address ? `*Direccion:* ${customer.address}` : null,
      customer.notes   ? `*Notas:* ${customer.notes}`     : null,
      ``,
      `------------------------------`,
      `*Productos:*`,
      ...items.map(i => {
        // Normalizamos fracciones raras que causan problemas en encoding
        const safeLabel = i.variantLabel ? i.variantLabel.replace('½', '1/2') : '';
        return `- ${i.name} (${safeLabel}) x ${i.qty} - $${(i.price * i.qty).toFixed(2)}`;
      }),
      `------------------------------`,
      ``,
      `*Subtotal:* $${total.toFixed(2)}`,
      `*Envio (${deliveryLabel}):* ${shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}`,
      `*TOTAL:* $${grandTotal.toFixed(2)}`,
      ``
    ].filter(l => l !== null).join('\n')

    const encoded = encodeURIComponent(lines)
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank')
  }

  return { sendOrder }
}
