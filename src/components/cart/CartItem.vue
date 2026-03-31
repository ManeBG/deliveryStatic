<template>
  <div class="d-flex align-items-center gap-2 py-2 border-bottom">
    <!-- Info -->
    <div class="flex-grow-1">
      <p class="mb-0 fw-semibold small">{{ item.name }}</p>
      <p class="mb-0 text-muted" style="font-size: 0.75rem;">{{ item.variantLabel }} · ${{ item.price }}/u</p>
    </div>

    <!-- Controles de cantidad -->
    <div class="d-flex align-items-center gap-1">
      <button class="btn btn-outline-secondary btn-sm" style="width:28px;height:28px;padding:0;" @click="decrement">−</button>
      <span class="fw-bold small" style="min-width:1.2rem;text-align:center;">{{ item.qty }}</span>
      <button class="btn btn-outline-secondary btn-sm" style="width:28px;height:28px;padding:0;" @click="increment">+</button>
    </div>

    <!-- Subtotal -->
    <span class="fw-bold small text-brand" style="min-width:3.5rem;text-align:right;">
      ${{ (item.price * item.qty).toFixed(2) }}
    </span>

    <!-- Eliminar -->
    <button class="btn btn-link text-danger p-0 ms-1 small" @click="remove">✕</button>
  </div>
</template>

<script setup>
import { useCart } from '@/composables/useCart.js'

const props = defineProps({
  item: { type: Object, required: true }
})

const { updateQty, removeItem } = useCart()

const increment = () => updateQty(props.item.variantId, props.item.qty + 1)
const decrement = () => updateQty(props.item.variantId, props.item.qty - 1)
const remove    = () => removeItem(props.item.variantId)
</script>
