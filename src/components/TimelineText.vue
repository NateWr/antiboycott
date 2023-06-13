<script setup lang="ts">
defineProps({
  keyframe: {
    type: Number,
    required: true,
  },
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="timeline-text" :class="keyframe <= start || keyframe >= end ? 'timeline-text-out' : 'timeline-text-in'">
    <slot />
  </div>
</template>


<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-text {
  font-size: 1.25rem;
  line-height: 1.4;
}

.timeline-text-in {
  max-height: 50rem;
  opacity: 1;
  margin-bottom: 1rem;
  transition-property: opacity, max-height, margin;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-delay: 0.3s, 0s, 0s;
}

.timeline-text-out {
  max-height: 0;
  opacity: 0;
  margin: 0;
  transition-property: opacity, max-height, margin;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-delay: 0s, 0.3s, 0.3s;
}
</style>