import { reactive, computed } from 'vue'

const state = reactive({
  items: []
})

export function useCart() {
  /**
   * Calcula el total del carrito
   */
  const total = computed(() =>
    state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  /**
   * Número total de ítems en carrito
   */
  const itemCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.qty, 0)
  )

  /**
   * Agrega un item al carrito.
   * Si la variante ya existe, incrementa la cantidad.
   * @param {Object} product  - producto completo
   * @param {Object} variant  - { id, label, precio_web } para variable
   *                           | { id, label, price }    para simple (normalizado en ProductCard)
   */
  function addItem(product, variant) {
    const existing = state.items.find(i => i.variantId === variant.id)
    if (existing) {
      existing.qty++
    } else {
      state.items.push({
        productId:    product.id,
        variantId:    variant.id,
        name:         product.name,
        variantLabel: variant.label,
        price:        variant.precio_web ?? variant.price,  // variable → precio_web | simple → price
        qty:          1
      })
    }
  }

  /**
   * Elimina un item por variantId
   * @param {string} variantId
   */
  function removeItem(variantId) {
    const idx = state.items.findIndex(i => i.variantId === variantId)
    if (idx !== -1) state.items.splice(idx, 1)
  }

  /**
   * Actualiza cantidad. Si qty <= 0, elimina el item.
   * @param {string} variantId
   * @param {number} qty
   */
  function updateQty(variantId, qty) {
    if (qty <= 0) {
      removeItem(variantId)
      return
    }
    const item = state.items.find(i => i.variantId === variantId)
    if (item) item.qty = qty
  }

  /**
   * Vacía el carrito
   */
  function clearCart() {
    state.items.splice(0)
  }

  return {
    items:     state.items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQty,
    clearCart
  }
}
