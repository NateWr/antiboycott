<script setup lang="ts">
defineProps({
  progress: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div class="progress-bar" :style="`width: ${progress}vw`" aria-hidden="true" />
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--color-orange);
  transition: width 0.3s;
  z-index: 999;
}
</style>
