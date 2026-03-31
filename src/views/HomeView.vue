<template>
  <!-- Hero Banner -->
  <div class="py-4 mb-3 text-center text-white"
    style="background: linear-gradient(135deg, var(--mg-red) 0%, var(--mg-red-dark) 100%);">
    <div class="container">
      <h1 class="mb-1 fw-bold" style="font-family: var(--mg-font-title);">Miscelánea García</h1>
      <p class="mb-0 opacity-75">Atoyac de Álvarez, Guerrero</p>
    </div>
  </div>

  <!-- Barra de filtros por categoría -->
  <div class="filter-bar-wrapper bg-white border-bottom sticky-top" style="z-index: 100;">
    <div class="container">
      <div class="filter-bar d-flex gap-2 py-2 overflow-auto">
        <!-- Ver todo -->
        <button
          class="filter-btn btn btn-sm flex-shrink-0"
          :class="activeFilter === null ? 'btn-primary active' : 'btn-outline-secondary'"
          @click="activeFilter = null"
        >
          🛍️ Ver todo
          <span class="badge ms-1" :class="activeFilter === null ? 'bg-white text-primary' : 'bg-secondary'">
            {{ totalProducts }}
          </span>
        </button>

        <!-- Categorías -->
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="filter-btn btn btn-sm flex-shrink-0"
          :class="activeFilter === cat.id ? 'btn-primary active' : 'btn-outline-secondary'"
          @click="activeFilter = cat.id"
        >
          {{ cat.icon }} {{ cat.label }}
          <span class="badge ms-1" :class="activeFilter === cat.id ? 'bg-white text-primary' : 'bg-secondary'">
            {{ productCountByCategory[cat.id] ?? 0 }}
          </span>
        </button>
      </div>
    </div>
  </div>

  <!-- Catálogo -->
  <div class="container pb-4 pt-3">
    <CatalogGrid :filterBy="activeFilter" />
  </div>

  <!-- ===== Secciones informativas ===== -->
  <div class="info-sections bg-light border-top py-5">
    <div class="container">
      <div class="row g-4">

        <!-- Sección 1: Sobre la tienda -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="info-card h-100 bg-white rounded-3 p-4 shadow-sm">
            <div class="mb-3 fs-2">🛍️</div>
            <h2 class="h6 fw-bold mb-2">Miscelánea García</h2>
            <p class="text-muted small mb-0">
              Tu tiendita de confianza en Atoyac. Carnes frescas, abarrotes, bebidas,
              botanas y más. Pedidos por WhatsApp con entrega a domicilio.
            </p>
          </div>
        </div>

        <!-- Sección 2: Horarios -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="info-card h-100 bg-white rounded-3 p-4 shadow-sm">
            <div class="mb-3 fs-2">🕐</div>
            <h2 class="h6 fw-bold mb-3">Horario de atención</h2>
            <ul class="list-unstyled text-muted small mb-0">
              <li class="d-flex justify-content-between py-1 border-bottom">
                <span>Lunes – Sábado</span>
                <span class="fw-semibold text-dark">8:00 – 20:00</span>
              </li>
              <li class="d-flex justify-content-between py-1">
                <span>Domingo</span>
                <span class="fw-semibold text-dark">9:00 – 14:00</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sección 3: Entrega a domicilio -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="info-card h-100 bg-white rounded-3 p-4 shadow-sm">
            <div class="mb-3 fs-2">🛵</div>
            <h2 class="h6 fw-bold mb-3">Entrega a domicilio</h2>
            <ul class="list-unstyled text-muted small mb-0">
              <li class="d-flex justify-content-between py-1 border-bottom">
                <span>Pedido mínimo</span>
                <span class="fw-semibold text-dark">${{ meta.minimumOrder }}</span>
              </li>
              <li class="d-flex justify-content-between py-1 border-bottom">
                <span>Costo de envío</span>
                <span class="fw-semibold text-dark">${{ meta.deliveryOptions.local.cost }}</span>
              </li>
              <li class="d-flex justify-content-between py-1">
                <span>Envío gratis desde</span>
                <span class="fw-semibold text-success">${{ meta.freeShippingThreshold }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sección 4: Ubicación -->
        <div class="col-12 col-md-6 col-lg-3">
          <div class="info-card h-100 bg-white rounded-3 p-4 shadow-sm d-flex flex-column">
            <div class="mb-3 fs-2">📍</div>
            <h2 class="h6 fw-bold mb-2">¿Dónde estamos?</h2>
            <p class="text-muted small mb-3">
              México 196 96, Silvestre Mariscal<br>
              40930 Atoyac de Álvarez, Guerrero
            </p>
            <a
              href="https://maps.app.goo.gl/oT1VsxdqVHyqK9Z29"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-primary btn-sm mt-auto"
            >
              📌 Ver en Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- FAB Carrito (mobile) -->
  <RouterLink
    v-if="itemCount > 0"
    to="/checkout"
    class="btn btn-primary position-fixed bottom-0 end-0 m-4 shadow-lg d-flex align-items-center gap-2"
    style="border-radius: 2rem; z-index: 999;"
  >
    🛒
    <span class="fw-bold">${{ total.toFixed(2) }}</span>
    <span class="badge bg-warning text-dark">{{ itemCount }}</span>
  </RouterLink>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import CatalogGrid   from '@/components/catalog/CatalogGrid.vue'
import { useCart }   from '@/composables/useCart.js'
import catalogData   from '@/data/products.json'

const { itemCount, total } = useCart()
const { categories, products, meta } = catalogData

const activeFilter = ref(null)

const totalProducts = computed(() => products.length)

const productCountByCategory = computed(() =>
  Object.fromEntries(
    categories.map(cat => [cat.id, products.filter(p => p.categoryId === cat.id).length])
  )
)
</script>

<style scoped>
/* Ocultar scrollbar manteniendo scroll funcional */
.filter-bar {
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE/Edge */
}
.filter-bar::-webkit-scrollbar {
  display: none;               /* Chrome/Safari */
}

.filter-btn {
  white-space: nowrap;
  transition: all 0.2s ease;
}
.filter-btn.active {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
