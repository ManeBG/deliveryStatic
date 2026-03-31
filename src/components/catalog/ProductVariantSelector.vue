<template>
  <div class="d-flex gap-2 flex-wrap">
    <button
      v-for="variant in variants"
      :key="variant.id"
      type="button"
      class="btn btn-sm"
      :class="modelValue === variant.id ? 'btn-primary' : 'btn-outline-secondary'"
      @click="$emit('update:modelValue', variant.id)"
    >
      {{ variant.label }}
      <span class="ms-1 fw-bold">${{ variant.precio_web }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  variants:    { type: Array,  required: true },
  modelValue:  { type: String, default: null  }
})
defineEmits(['update:modelValue'])
</script>
