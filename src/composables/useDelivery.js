import { ref, computed } from 'vue'
import catalogData from '@/data/products.json'
import { useCart } from './useCart.js'

const { total } = useCart()

const { freeShippingThreshold, minimumOrder } = catalogData.meta

// Costo fijo de envío a domicilio (tomado del JSON para consistencia)
const DELIVERY_COST = catalogData.meta.deliveryOptions.local.cost  // $30

// Estado compartido — solo 2 modos: 'pickup' | 'delivery'
const deliveryType = ref('pickup')

export function useDelivery() {
  /**
   * Costo de envío:
   * - 0 si es pickup
   * - 0 si el total alcanza el umbral de envío gratis
   * - DELIVERY_COST en caso contrario
   */
  const shippingCost = computed(() => {
    if (deliveryType.value === 'pickup') return 0
    if (total.value >= freeShippingThreshold) return 0
    return DELIVERY_COST
  })

  /** Total final = productos + envío */
  const grandTotal = computed(() => total.value + shippingCost.value)

  /** ¿El pedido supera el mínimo? */
  const meetsMinimum = computed(() => total.value >= minimumOrder)

  /** Cuánto falta para el mínimo de pedido */
  const remainingForMinimum = computed(() => {
    const diff = minimumOrder - total.value
    return diff > 0 ? diff : 0
  })

  /** Cuánto falta para envío gratis (solo en modo domicilio) */
  const remainingForFreeShipping = computed(() => {
    if (deliveryType.value === 'pickup') return 0
    const diff = freeShippingThreshold - total.value
    return diff > 0 ? diff : 0
  })

  /** Opciones simplificadas (para DeliverySelector) */
  const options = [
    { value: 'pickup',   label: '🏪 Recoger en tienda',   cost: 0            },
    { value: 'delivery', label: '🛵 Envío a domicilio',    cost: DELIVERY_COST }
  ]

  return {
    deliveryType,
    shippingCost,
    grandTotal,
    meetsMinimum,
    remainingForMinimum,
    remainingForFreeShipping,
    options,
    minimumOrder,
    freeShippingThreshold,
    DELIVERY_COST
  }
}
