<template>
  <div>
    <!-- Sin resultados (filtro activo sin productos) -->
    <div v-if="visibleCategories.length === 0" class="text-center py-5 text-muted">
      <p class="fs-1">😔</p>
      <p class="fw-semibold">Sin productos en esta categoría por el momento.</p>
    </div>

    <!-- Una sección por categoría visible -->
    <section
      v-for="cat in visibleCategories"
      :key="cat.id"
      class="py-4"
    >
      <!-- Encabezado de categoría -->
      <div class="d-flex align-items-center gap-2 mb-4">
        <span class="fs-4">{{ cat.icon }}</span>
        <h2 class="h5 fw-bold mb-0">{{ cat.label }}</h2>
        <span class="badge bg-brand-soft text-brand ms-1">{{ productsByCategory[cat.id]?.length ?? 0 }}</span>
      </div>

      <!-- Grid de productos -->
      <div class="row g-3">
        <div
          v-for="product in productsByCategory[cat.id]"
          :key="product.id"
          class="col-12 col-sm-6 col-lg-4"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import catalogData from '@/data/products.json'

const props = defineProps({
  filterBy: { type: String, default: null }   // null = "Ver todo"
})

// Mapa: categoryId -> productos disponibles
const productsByCategory = computed(() =>
  Object.fromEntries(
    catalogData.categories.map(cat => [
      cat.id,
      catalogData.products.filter(p => p.categoryId === cat.id && p.available !== false)
    ])
  )
)

// Categorías a mostrar según el filtro activo
const visibleCategories = computed(() =>
  props.filterBy
    ? catalogData.categories.filter(c => c.id === props.filterBy)
    : catalogData.categories
)
</script>
