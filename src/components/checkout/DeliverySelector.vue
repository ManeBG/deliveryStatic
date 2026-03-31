<template>
  <div class="mb-1">
    <label class="form-label fw-semibold mb-2">¿Cómo quieres recibir tu pedido?</label>

    <div class="d-flex flex-column gap-2">
      <label
        v-for="option in options"
        :key="option.value"
        class="delivery-option d-flex align-items-center gap-3 p-3 rounded border"
        :class="deliveryType === option.value ? 'border-primary bg-brand-soft selected' : 'border-light'"
        style="cursor: pointer;"
      >
        <input
          type="radio"
          :value="option.value"
          v-model="deliveryType"
          class="form-check-input mt-0 flex-shrink-0"
        />
        <span class="flex-grow-1 fw-semibold">{{ option.label }}</span>
        <span class="fw-bold" :class="option.cost === 0 ? 'text-success' : 'text-brand'">
          {{ option.cost === 0 ? 'Gratis' : `+$${option.cost}` }}
        </span>
      </label>
    </div>

    <!-- Aviso amigable para domicilio -->
    <div
      v-if="deliveryType === 'delivery'"
      class="mt-2 px-3 py-2 rounded-2 d-flex align-items-start gap-2"
      style="background: #fff8e1; border: 1px solid #ffe082; font-size: 0.85rem;"
    >
      <span style="flex-shrink:0;">💬</span>
      <span class="text-muted">
        El costo estimado de envío en Atoyac es de <strong>${{ DELIVERY_COST }}</strong>.
        Si tu dirección está fuera de la zona habitual, confirmaremos el costo final por WhatsApp.
      </span>
    </div>

    <!-- Aviso de envío gratis disponible -->
    <div
      v-if="deliveryType === 'delivery' && remainingForFreeShipping > 0"
      class="mt-2 px-3 py-2 rounded-2 d-flex align-items-center gap-2"
      style="background: #e8f5e9; border: 1px solid #a5d6a7; font-size: 0.85rem;"
    >
      <span>🎉</span>
      <span class="text-muted">
        ¡Agrega <strong>${{ remainingForFreeShipping.toFixed(2) }}</strong> más y tu envío es gratis.
      </span>
    </div>
  </div>
</template>

<script setup>
import { useDelivery } from '@/composables/useDelivery.js'
const { deliveryType, options, DELIVERY_COST, remainingForFreeShipping } = useDelivery()
</script>

<style scoped>
.delivery-option {
  transition: border-color 0.2s ease, background 0.2s ease;
}
.delivery-option.selected {
  box-shadow: 0 0 0 2px var(--mg-red, #c0392b22);
}
</style>
