<template>
  <header class="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-1">
    <div class="container px-2 px-md-3">
      <!-- Logo + Nombre -->
      <RouterLink to="/" class="navbar-brand p-0 d-flex align-items-center text-decoration-none">
        <img 
          src="/logonavbar.png"
          alt="Miscelánea García"
          class="navbar-logo"
        />
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

<style scoped>
.navbar-logo {
  height: 50px; /* Mayor altura para mejor presencia en móvil */
  max-width: 180px; /* Evita que choque con el carrito en pantallas muy pequeñas */
  object-fit: contain;
  transition: all 0.2s ease;
}

@media (min-width: 576px) {
  .navbar-logo {
    height: 60px; /* Aún más grande en tablets y PC */
    max-width: 250px;
  }
}
</style>
