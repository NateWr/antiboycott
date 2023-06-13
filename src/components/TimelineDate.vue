<script setup lang="ts">
defineProps({
  keyframe: {
    type: Number,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <h3 class="timeline-date" :class="keyframe >= target ? 'timeline-date-active' : ''">
    <span class="timeline-date-dot" aria-hidden="true" />
    <span class="timeline-date-marker" aria-hidden="true" />
    <span class="timeline-date-text">
      <slot />
    </span>
  </h3>
</template>


<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-date {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: -2rem;
  margin-bottom: 1rem;
}

.timeline-date-text {
  padding-left: 0.5em;
  font-size: 1.25rem;
  font-weight: var(--txt-regular);
  line-height: 1rem;
  opacity: 0;
  transform: translateX(-1em);
  transition: all 0.3s 0.3s;
}

.timeline-date-marker {
  width: 0;
  transform: translateY(-50%);
  border-top: 1px dashed var(--color-white);
  transition: width 0.5s 0.1s;
}

.timeline-date-dot {
  width: 0;
  height: 0;
  border-radius: 50%;
  transform: transateX(-50%);
  background: var(--color-white);
  transition: all 0.5s;
}

.timeline-date-active {

  .timeline-date-text {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-date-marker {
    width: 3.5rem;
  }

  .timeline-date-dot {
    width: 1rem;
    height: 1rem;
  }
}
</style>