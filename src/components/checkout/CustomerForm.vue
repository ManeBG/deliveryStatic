<template>
  <form @submit.prevent novalidate>
    <h5 class="fw-bold mb-3">👤 Tus datos</h5>

    <!-- Nombre -->
    <div class="mb-3">
      <label class="form-label small fw-semibold">Nombre completo *</label>
      <input
        ref="nameRef"
        v-model="form.name"
        type="text"
        class="form-control"
        :class="errors.name ? 'is-invalid' : ''"
        placeholder="Ej. María López"
        @input="clearError('name')"
      />
      <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
    </div>

    <!-- Teléfono -->
    <div class="mb-3">
      <label class="form-label small fw-semibold">Teléfono *</label>
      <input
        v-model="form.phone"
        type="tel"
        class="form-control"
        :class="errors.phone ? 'is-invalid' : ''"
        placeholder="744 123 4567"
        @input="clearError('phone')"
      />
      <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
    </div>

    <!-- Dirección (solo si es domicilio) -->
    <div v-if="showAddress" class="mb-3">
      <label class="form-label small fw-semibold">Dirección de entrega *</label>
      <textarea
        v-model="form.address"
        class="form-control"
        :class="errors.address ? 'is-invalid' : ''"
        rows="2"
        placeholder="Calle, colonia o referencia para encontrarte fácilmente"
        @input="clearError('address')"
      />
      <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
    </div>

    <!-- Notas (opcional) -->
    <div class="mb-1">
      <label class="form-label small fw-semibold">
        Indicaciones adicionales <span class="text-muted fw-normal">(opcional)</span>
      </label>
      <textarea
        v-model="form.notes"
        class="form-control"
        rows="2"
        placeholder="Ej. Si no hay un producto, puede cambiarlo por uno similar"
      />
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useDelivery } from '@/composables/useDelivery.js'

const { deliveryType } = useDelivery()

const form = reactive({ name: '', phone: '', address: '', notes: '' })
const errors = reactive({ name: '', phone: '', address: '' })

// ref al primer campo para scroll en caso de error
const nameRef = ref(null)

const showAddress = computed(() => deliveryType.value !== 'pickup')

function clearError(field) {
  errors[field] = ''
}

/**
 * Valida el formulario. Devuelve true si es válido.
 * Si hay errores, los pinta y hace scroll al primero.
 */
function validate() {
  // Limpiar errores previos
  errors.name    = ''
  errors.phone   = ''
  errors.address = ''

  let firstErrorEl = null

  if (!form.name.trim()) {
    errors.name = 'Por favor ingresa tu nombre.'
    firstErrorEl = firstErrorEl ?? nameRef.value
  }

  if (!form.phone.trim()) {
    errors.phone = 'Por favor ingresa tu número de teléfono.'
  }

  if (showAddress.value && !form.address.trim()) {
    errors.address = 'Necesitamos tu dirección para enviarte el pedido.'
  }

  const isValid = !errors.name && !errors.phone && !errors.address

  if (!isValid && firstErrorEl) {
    firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return isValid
}

defineExpose({ form, validate })
</script>
