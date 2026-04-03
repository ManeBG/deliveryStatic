<template>
  <div class="card card-mg h-100 fade-in-up">
    <!-- Imagen del producto -->
    <div class="position-relative overflow-hidden" style="height: 200px; background: #f5f0eb;">
      <img
        v-if="displayImage"
        :src="displayImage"
        :alt="product.name"
        class="w-100 h-100"
        style="object-fit: cover;"
        loading="lazy"
        @error="imgError = true"
      />
      <!-- Fallback cuando no hay imagen -->
      <div
        v-if="!displayImage || imgError"
        class="w-100 h-100 d-flex align-items-center justify-content-center"
      >
        <span style="font-size: 4rem;">{{ categoryIcon }}</span>
      </div>

      <!-- Badge disponibilidad -->
      <span
        v-if="!product.available"
        class="badge bg-secondary position-absolute top-0 end-0 m-2"
      >
        Agotado
      </span>
    </div>

    <!-- Cuerpo -->
    <div class="card-body d-flex flex-column gap-3">
      <div>
        <h3 class="card-title h6 fw-bold mb-1">{{ product.name }}</h3>
        <p class="card-text small text-muted mb-0">{{ product.description }}</p>
      </div>

      <!-- Selector de variante -->
      <ProductVariantSelector
        v-if="product.type === 'variable'"
        :variants="product.variants"
        v-model="selectedVariantId"
      />

      <!-- Precio dinámico -->
      <p class="fw-bold mb-0 text-brand fs-5">
        ${{ displayPrice?.toFixed(2) }}
      </p>

      <!-- Botón agregar -->
      <button
        class="btn btn-primary btn-sm mt-auto"
        :disabled="!product.available || (product.type === 'variable' && !selectedVariantId)"
        @click="handleAdd"
      >
        + Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ProductVariantSelector from './ProductVariantSelector.vue'
import { useCart } from '@/composables/useCart.js'
import catalogData from '@/data/products.json'

const props = defineProps({
  product: { type: Object, required: true }
})

const { addItem } = useCart()
const imgError = ref(false)

// Emoji de fallback desde la categoría del producto
const categoryIcon = catalogData.categories.find(c => c.id === props.product.categoryId)?.icon ?? '📦'

// Preselecciona la primera variante (solo productos variable)
const selectedVariantId = ref(
  props.product.variants?.length ? props.product.variants[0].id : null
)

// Calcula el precio a mostrar en la tarjeta
const displayPrice = computed(() => {
  if (props.product.type === 'simple') return props.product.precio_web
  const variant = props.product.variants?.find(v => v.id === selectedVariantId.value)
  return variant?.precio_web ?? 0
})

// Calcula la imagen a mostrar en la tarjeta
const displayImage = computed(() => {
  if (props.product.type === 'variable' && props.product.variants?.length) {
    const variant = props.product.variants.find(v => v.id === selectedVariantId.value)
    if (variant?.image) {
      return variant.image
    }
  }
  return props.product.image
})

// Reinicia el error de imagen si la imagen cambia
watch(displayImage, () => {
  imgError.value = false
})

function handleAdd() {
  if (props.product.type === 'simple') {
    // Producto simple: precio único desde precio_web
    addItem(props.product, { id: props.product.id, label: 'Unidad', price: props.product.precio_web })
  } else {
    const variant = props.product.variants.find(v => v.id === selectedVariantId.value)
    if (variant) addItem(props.product, variant)
  }
}
</script>
