<template>
  <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-9 0m0 0l-3-3m3 3l3-3" />
  </svg>
</template>

<script setup>
defineProps({
  class: {
    type: String,
    default: 'w-6 h-6'
  }
});
</script>

