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
  <div class="timeline-text" :class="keyframe < start || keyframe >= end ? 'timeline-text-out' : 'timeline-text-in'">
    <slot />
  </div>
</template>


<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-text {
  font-size: 1.1rem;
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

@media (--mobiles-normal) {
  .timeline-text {
    font-size: 1.25rem;
  }
}

@media (orientation: portrait) {

  @media (--tablets-sm) {
    .timeline-text {
      font-size: 1.8rem;
    }
    .timeline-text-in {
      margin-bottom: 2rem;
    }
  }
}

@media (orientation: landscape) {

  .timeline-text {
    padding-inline-start: 1rem;
    font-size: 0.85rem;
  }

  @media (--tablets-landscape) {

    .timeline-text {
      padding-inline-start: 2rem;
      font-size: 1.5rem;
    }
  }

  @media (--laptops) {

    .timeline-text {
      padding-inline-start: 3rem;
      font-size: 1.75rem;
    }
  }
}
</style>