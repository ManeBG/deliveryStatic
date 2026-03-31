<template>
  <header class="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
    <div class="container">
      <!-- Logo + Nombre -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
        <span class="fs-2">🏪</span>
        <div class="lh-1">
          <span class="fw-bold text-brand d-block" style="font-family: var(--mg-font-title); font-size: 1.15rem;">
            Miscelánea García
          </span>
          <small class="text-muted" style="font-size: 0.7rem;">Atoyac de Álvarez, Gro.</small>
        </div>
      </RouterLink>

      <!-- Carrito -->
      <RouterLink to="/checkout" class="btn btn-primary position-relative ms-auto">
        🛒
        <span v-if="itemCount > 0" class="position-absolute top-0 start-100 translate-middle cart-badge">
          {{ itemCount }}
        </span>
        <span class="ms-2 d-none d-sm-inline fw-semibold">
          ${{ total.toFixed(2) }}
        </span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart.js'

const { itemCount, total } = useCart()
</script>
