<script setup lang="ts">
import { computed } from '@vue/reactivity';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true,
  },
  step: {
    type: String,
    required: true,
  },
  stepsCompleted: {
    type: Array<String>,
    required: true
  }
})

let completed = computed(() => {
  return props.stepsCompleted.includes(props.name);
})

let height = computed(() => {
  return (!completed.value && props.step === props.name)
    ? Math.round(props.progress * 100)
    : 0;
})
</script>

<template>
  <div
    class="spacer"
    :class="completed ? 'spacer-done' : ''"
    :data-step="name"
    aria-hidden="true"
  >
    <div
      class="spacer-line"
      :style="height ? `height: ${height}%` : ''"
    />
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.spacer {
  display: flex;
  justify-content: center;
  height: 30rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.spacer-line {
  height: 0;
  width: 0;
  border-left: 1px dashed var(--color-white);
}
.spacer-done .spacer-line {
  height: 100%;
}
</style>