<template>
  <div class="card card-mg p-3">
    <!-- Resumen de items -->
    <div v-if="items.length > 0">
      <CartItem v-for="item in items" :key="item.variantId" :item="item" />
    </div>
    <p v-else class="text-muted text-center py-3 small mb-0">Tu carrito está vacío 🛒</p>

    <!-- Totales -->
    <div class="mt-3 pt-3 border-top">
      <!-- Alerta envío gratis -->
      <div
        v-if="deliveryType !== 'pickup' && remainingForFreeShipping > 0"
        class="alert alert-warning py-2 small mb-2"
      >
        🎁 Agrega <strong>${{ remainingForFreeShipping.toFixed(2) }}</strong> más para envío gratis.
      </div>

      <div class="d-flex justify-content-between small mb-1">
        <span class="text-muted">Subtotal</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
      <div class="d-flex justify-content-between small mb-2">
        <span class="text-muted">Envío</span>
        <span :class="shippingCost === 0 && deliveryType !== 'pickup' ? 'text-success fw-bold' : ''">
          {{ deliveryType === 'pickup' ? 'Recoges' : shippingCost === 0 ? 'GRATIS 🎉' : `$${shippingCost.toFixed(2)}` }}
        </span>
      </div>

      <!-- Mínimo -->
      <div v-if="!meetsMinimum && items.length > 0" class="alert alert-danger py-2 small mb-2">
        Pedido mínimo ${{ minimumOrder }}. Faltan ${{ (minimumOrder - total).toFixed(2) }}.
      </div>

      <div class="d-flex justify-content-between fw-bold border-top pt-2">
        <span>Total</span>
        <span class="text-brand">${{ grandTotal.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartItem   from './CartItem.vue'
import { useCart }     from '@/composables/useCart.js'
import { useDelivery } from '@/composables/useDelivery.js'

const { items, total }                                           = useCart()
const { shippingCost, grandTotal, meetsMinimum,
        remainingForFreeShipping, deliveryType, minimumOrder }  = useDelivery()
</script>
