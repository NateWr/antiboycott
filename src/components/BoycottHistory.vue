<script setup lang="ts">
import SpacerLine from './SpacerLine.vue';

const props = defineProps({
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
  <div class="history">
    <div
      data-step="history-intro"
      :class="[
        'fade',
        stepsStarted.includes('history-intro') ? 'fade-in' : 'fade-out'
      ]"
    >
      <h2 class="sr-only">Boycotts in U.S. History</h2>
      <p>
        Boycotts are a time-honored tool of <strong>political expression</strong> in the U.S.
      </p>
    </div>
    <SpacerLine
      name="history-spacer-1"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-montgomery"
      class="fade"
      :class="[
        'fade',
        stepsStarted.includes('history-montgomery') ? 'fade-in' : 'fade-out'
      ]"
    >
      <h3>
        <span class="history-year">1956</span>
        <span class="history-name">Montgomery Bus Boycott</span>
      </h3>
      <p>After Rosa Parks was arrested for refusing to surrender her seat to a white person, a year-long boycott of the public transit system compelled the Supreme Court to declare the racist segregation of buses in Alabama unconstitutional.</p>
    </div>
    <SpacerLine
      name="history-spacer-2"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-anti-apartheid"
      class="fade"
      :class="[
        'fade',
        stepsStarted.includes('history-anti-apartheid') ? 'fade-in' : 'fade-out'
      ]"
    >
      <h3>
        <span class="history-year">1986</span>
        <span class="history-name">Anti-Apartheid Movement</span>
      </h3>
      <p>Americans launched economic, social and cultural boycotts of South Africa that led Congress to pass the Comprehensive Anti-Apartheid Act, overruling President Reagan’s veto to do so.</p>
    </div>
    <SpacerLine
      name="history-spacer-3"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-bds"
      class="fade"
      :class="[
        'fade',
        stepsStarted.includes('history-bds') ? 'fade-in' : 'fade-out'
      ]"
    >
      <h3>
        <span class="history-year">2014</span>
        <span class="history-name">Boycott, Divestment, Sanctions</span>
      </h3>
      <p>A growing number of Americans support Boycott, Divestment, and Sanctions (BDS) campaigns that target Israel’s regime of settler colonialism, military occupation, and apartheid over the Palestinian people.</p>
    </div>
    <SpacerLine
      name="history-spacer-4"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-outro"
      class="fade"
      :class="[
        'fade',
        stepsStarted.includes('history-outro') ? 'fade-in' : 'fade-out'
      ]"
    >
      <p>
        That year, Democrat and Republican lawmakers begin introducing anti-boycott bills to suppress boycotts that support
        <span class="txt-highlight txt-highlight-blue">Palestinian rights</span>
      </p>
    </div>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.history {
}
</style>
