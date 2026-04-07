<template>
  <!-- Launch Announcement Banner -->
  <div class="bg-warning text-dark text-center py-2 px-3 small fw-bold">
    🎉 ¡Nuevo! Ahora ya puedes hacer tu pedido en línea desde tu celular.
  </div>

  <!-- Hero Banner -->
  <div class="py-5 mb-4 text-center text-white position-relative overflow-hidden"
    style="background: linear-gradient(135deg, var(--mg-red) 0%, var(--mg-red-dark) 100%);">
    <div class="container px-3 position-relative z-1">
      <h1 class="display-5 fw-bold mb-3" style="font-family: var(--mg-font-title);">
        Miscelánea García
      </h1>
      <p class="lead mb-4 mx-auto fw-medium" style="max-width: 600px; opacity: 0.95;">
        Pide carnes, bebidas, botanas y más desde tu celular. <br class="d-none d-md-block"> 
        Recoge en tienda o recibe a domicilio en Atoyac.
      </p>
      
      <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
        <button class="btn btn-light btn-lg fw-bold px-4 shadow-sm" @click="scrollToCatalog">
          🍽️ Pedir ahora
        </button>
        <button class="btn btn-outline-light btn-lg px-4 fw-medium" @click="scrollToHowToOrder">
          ¿Cómo funciona?
        </button>
      </div>
    </div>
  </div>

  <!-- Quick Benefits Section -->
  <div class="container mb-5">
    <div class="row g-2 justify-content-center text-center">
      <div class="col-12 col-md-4">
        <div class="py-2 px-3 bg-light border rounded-3 h-100 d-flex align-items-center justify-content-center gap-2">
          <span class="fs-4">🛵</span>
          <span class="fw-semibold small text-muted text-uppercase" style="letter-spacing: 0.5px;">Entrega a domicilio</span>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="py-2 px-3 bg-light border rounded-3 h-100 d-flex align-items-center justify-content-center gap-2">
          <span class="fs-4">🏪</span>
          <span class="fw-semibold small text-muted text-uppercase" style="letter-spacing: 0.5px;">Recoge en tienda</span>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="py-2 px-3 bg-light border rounded-3 h-100 d-flex align-items-center justify-content-center gap-2">
          <span class="fs-4">📱</span>
          <span class="fw-semibold small text-muted text-uppercase" style="letter-spacing: 0.5px;">Fácil por WhatsApp</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Barra de filtros por categoría -->
  <div id="catalogo" class="filter-bar-wrapper bg-white border-bottom sticky-top" style="z-index: 100; scroll-margin-top: 20px;">
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

  <!-- ===== Cómo pedir ===== -->
  <div id="como-pedir" class="how-to-order py-5 border-top" style="scroll-margin-top: 70px;">
    <div class="container px-3">
      <h2 class="h3 fw-bold text-center mb-2">¿Cómo pedir?</h2>
      <p class="text-center text-muted mb-4">Es muy fácil y rápido. ¡Sin registros complicados!</p>
      
      <div class="row g-3 justify-content-center text-center">

        <div class="col-6 col-md-3">
          <div class="step-card p-3 p-md-4 rounded-4 shadow-sm h-100 bg-white">
            <div class="step-icon fs-1 mb-2">🛒</div>
            <div class="step-number text-primary fw-bold text-uppercase mb-1" style="font-size: 0.75rem; letter-spacing: 1px;">Paso 1</div>
            <p class="small fw-semibold mb-0 text-dark">Agrega productos</p>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <div class="step-card p-3 p-md-4 rounded-4 shadow-sm h-100 bg-white">
            <div class="step-icon fs-1 mb-2">📋</div>
            <div class="step-number text-primary fw-bold text-uppercase mb-1" style="font-size: 0.75rem; letter-spacing: 1px;">Paso 2</div>
            <p class="small fw-semibold mb-0 text-dark">Completa tus datos</p>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <div class="step-card p-3 p-md-4 rounded-4 shadow-sm h-100 bg-white">
            <div class="step-icon fs-1 mb-2">💬</div>
            <div class="step-number text-primary fw-bold text-uppercase mb-1" style="font-size: 0.75rem; letter-spacing: 1px;">Paso 3</div>
            <p class="small fw-semibold mb-0 text-dark">Lanza tu WhatsApp</p>
          </div>
        </div>

        <div class="col-6 col-md-3">
          <div class="step-card p-3 p-md-4 rounded-4 shadow-sm h-100 bg-white">
            <div class="step-icon fs-1 mb-2">🏠</div>
            <div class="step-number text-primary fw-bold text-uppercase mb-1" style="font-size: 0.75rem; letter-spacing: 1px;">Paso 4</div>
            <p class="small fw-semibold mb-0 text-dark">Recibe o recoge</p>
          </div>
        </div>

      </div>
    </div>
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

const scrollToCatalog = () => {
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToHowToOrder = () => {
  document.getElementById('como-pedir')?.scrollIntoView({ behavior: 'smooth' })
}
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

/* Tarjetas de pasos "Cómo pedir" */
.step-card {
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.step-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.08) !important;
}
.step-icon {
  line-height: 1;
}
</style>
