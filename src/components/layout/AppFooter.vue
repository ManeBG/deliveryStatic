<template>
  <footer class="bg-dark text-white py-4 mt-5">
    <div class="container text-center">
      <p class="mb-1 fw-semibold">🛍️ Miscelánea García</p>
      <p class="mb-1 text-muted small">Atoyac de Álvarez, Guerrero</p>
      <p class="mb-0 text-muted small">© {{ year }} · Todos los derechos reservados</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
