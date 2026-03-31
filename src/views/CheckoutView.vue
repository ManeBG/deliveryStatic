<template>
  <div class="container py-4" style="max-width: 680px;">
    <RouterLink to="/" class="btn btn-link text-decoration-none text-muted ps-0 mb-3">
      ← Seguir comprando
    </RouterLink>

    <h1 class="h4 fw-bold mb-4">Confirmar pedido</h1>

    <!-- Resumen del carrito -->
    <CartSummary class="mb-4" />

    <!-- Sin items -->
    <div v-if="items.length === 0" class="text-center py-4">
      <p class="text-muted">No hay productos en tu carrito.</p>
      <RouterLink to="/" class="btn btn-primary">Ver catálogo</RouterLink>
    </div>

    <template v-else>
      <!-- Tipo de entrega -->
      <div class="card card-mg p-3 mb-4">
        <DeliverySelector />
      </div>

      <!-- Datos del cliente -->
      <div class="card card-mg p-3 mb-4">
        <CustomerForm ref="customerFormRef" />
      </div>

      <!-- Resumen de costos amigable -->
      <div class="card card-mg p-3 mb-4">
        <div class="d-flex justify-content-between mb-1">
          <span class="text-muted">Subtotal</span>
          <span class="fw-semibold">${{ total.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span class="text-muted">
            Envío
            <span v-if="deliveryType === 'delivery' && shippingCost > 0" class="text-muted small">(estimado)</span>
          </span>
          <span :class="shippingCost === 0 ? 'text-success fw-semibold' : 'fw-semibold'">
            {{ deliveryType === 'pickup' ? '—' : shippingCost === 0 ? '¡Gratis! 🎉' : `$${shippingCost.toFixed(2)}` }}
          </span>
        </div>
        <hr class="my-2" />
        <div class="d-flex justify-content-between">
          <span class="fw-bold">Total</span>
          <span class="fw-bold fs-5 text-brand">${{ grandTotal.toFixed(2) }}</span>
        </div>
      </div>

      <!-- CTA WhatsApp -->
      <button
        class="btn btn-whatsapp w-100 py-3 fs-5"
        :disabled="!meetsMinimum"
        @click="handleOrder"
      >
        📲 Enviar pedido por WhatsApp
      </button>

      <!-- Mensaje de mínimo amigable -->
      <p v-if="!meetsMinimum" class="text-center text-danger small mt-2">
        Te faltan <strong>${{ remainingForMinimum.toFixed(2) }}</strong> para poder realizar tu pedido
        (mínimo ${{ minimumOrder }}).
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink }   from 'vue-router'
import CartSummary      from '@/components/cart/CartSummary.vue'
import DeliverySelector from '@/components/checkout/DeliverySelector.vue'
import CustomerForm     from '@/components/checkout/CustomerForm.vue'
import { useCart }      from '@/composables/useCart.js'
import { useDelivery }  from '@/composables/useDelivery.js'
import { useWhatsApp }  from '@/composables/useWhatsApp.js'

const { items, total, clearCart }                                              = useCart()
const { deliveryType, shippingCost, grandTotal, meetsMinimum,
        remainingForMinimum, minimumOrder }                                    = useDelivery()
const { sendOrder }                                                            = useWhatsApp()

const customerFormRef = ref(null)

// Label humano para el mensaje de WhatsApp
const deliveryLabel = computed(() =>
  deliveryType.value === 'pickup' ? 'Recoger en tienda' : 'Envío a domicilio'
)

function handleOrder() {
  if (!meetsMinimum.value) return

  // Validar formulario antes de abrir WhatsApp
  const isValid = customerFormRef.value?.validate()
  if (!isValid) return

  const customer = customerFormRef.value?.form ?? {}

  sendOrder({
    items:        items,
    total:        total.value,
    shippingCost: shippingCost.value,
    grandTotal:   grandTotal.value,
    deliveryLabel: deliveryLabel.value,
    customer
  })

  clearCart()
}
</script>
