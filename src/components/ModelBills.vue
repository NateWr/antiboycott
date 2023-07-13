<script setup lang="ts">
import SpacerLine from './SpacerLine.vue'

defineProps({
  progress: {
    type: Number,
    required: true,
  },
  step: {
    type: String,
    default: ''
  },
  stepsCompleted: {
    type: Array<String>,
    required: true
  },
  stepsStarted: {
    type: Array<String>,
    required: true
  }
})
</script>

<template>
  <div class="model-bill">
    <div class="model-bill-frame">
      <h2 class="sr-only">Model Bills</h2>
      <div
        data-step="model-bill-eba"
        :class="[
          'model-bill-text',
          'text-center',
          'fade',
          stepsStarted.includes('model-bill-eba') ? 'fade-in' : 'fade-out'
        ]"
      >
        How Does a
        <span class="txt-highlight txt-highlight-blue">Model</span>
        <span class="txt-highlight txt-highlight-blue">Bill</span>
        Work?
      </div>
      <SpacerLine
        name="model-bill-spacer-2"
        :step="step"
        :steps-completed="stepsCompleted"
        :progress="progress"
      />
      <div
        data-step="model-bill-copy"
        :class="[
          'model-bill-text',
          'text-center',
          'fade',
          stepsStarted.includes('model-bill-copy') ? 'fade-in' : 'fade-out'
        ]"
      >
        Model bills are drafted by special interest groups, who lobby lawmakers across the country to <strong>copy the language</strong> in order to quickly introduce the same policy across multiple legislatures.
      </div>
      <SpacerLine
        name="model-bill-spacer-3"
        :step="step"
        :steps-completed="stepsCompleted"
        :progress="progress"
      />
      <div
        data-step="model-bill-template"
        :class="[
          'model-bill-text',
          'text-center',
          'fade',
          stepsStarted.includes('model-bill-template') ? 'fade-in' : 'fade-out'
        ]"
      >
        Model bills pushed by ALEC and other right-wing groups have stripped Americans of their rights.
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.model-bill {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5))
}

.model-bill-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  max-width: 30rem;
}

.model-bill-text {
  font-size: 1.5rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(2rem);
  transition: 0.5s;

  & .txt-highlight {
    text-transform: uppercase;
  }
}

.model-bill-text.fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
