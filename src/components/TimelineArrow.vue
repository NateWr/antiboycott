<script setup lang="ts">
defineProps({
  progress: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div
    class="timeline-arrow"
    :class="progress > 0.05 ? 'timeline-arrow-in' : ''"
    :style="progress > 0.05 ? `height: ${progress * 100}%` : ''"
    aria-hidden="true"
  />
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-arrow {
  position: absolute;
  top: 1.5rem;
  left: 0.5rem;
  width: 2px;
  height: 0;
  transform: translateX(-1px);
  background: var(--color-white);
  border-radius: 1px;

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    width: 0;
    left: -3px;
    transform: translateY(-1px);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid var(--color-white);
    opacity: 0;
    transition: opacity 0.3s;
  }
}

.timeline-arrow-in:after {
  opacity: 1;
}

@media (orientation: portrait) {

  @media (--tablets-sm) {
    .timeline-arrow {
      left: 0.75rem;
    }
  }
}

@media (orientation: landscape) {

  .timeline-arrow {
    top: 0.5rem;
    left: 50%;
  }

  @media (--tablets-landscape) {
    .timeline-arrow {
      top: 1rem;
    }
  }

  @media (--laptops) {
    .timeline-arrow {
      top: 1.5rem;
    }
  }
}

</style>