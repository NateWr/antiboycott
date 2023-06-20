<script setup lang="ts">
import scrollama from 'scrollama';
import debounce from 'debounce'
import { onMounted, ref } from 'vue';
import BoycottHistory from './components/BoycottHistory.vue'
import TimeLine from './components/TimeLine.vue';
import ModelBills from './components/ModelBills.vue';
import TemplateRepression from './components/TemplateRepression.vue';
import CreditsBlock from './components/CreditsBlock.vue';
import ProgressBar from './components/ProgressBar.vue';

const stepsStarted = ref<string[]>([])
const stepsCompleted = ref<string[]>([])
const step = ref<string>('')
const progress = ref<number>(0)
const totalProgress = ref<number>(0)
let initialized : boolean = false

/**
 * If the page is already scrolled down the page when scrollama
 * is initiated, update the state with the steps that have
 * already been started or completed.
 *
 * Adjusts the document's `scrollTop` a bit to show the current
 * progress within a step.
 */
const init = () => {
  const $steps = document.querySelectorAll('[data-step]');
  let reachedStep = false
  for (const [i, $step] of $steps.entries()) {
    if (reachedStep) {
      break;
    }
    stepsStarted.value.push($step.dataset.step)
    if ($step.dataset.step !== step.value) {
      stepsCompleted.value.push($step.dataset.step)
    } else {
      reachedStep = true
    }
  }
  document.documentElement.scrollTop += 4
  initialized = true
}

/**
 * Calculate the total progress of the reader based
 * on scroll position in the document
 */
const setTotalProgress = () => {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  const viewportHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  totalProgress.value= Math.round((scrollTop / viewportHeight) * 100)
}

onMounted(() => {
  /**
   * Load the step-by-step scroll observer
   */
  scrollama()
    .setup({
      step: '[data-step]',
      progress: true,
    })
    .onStepEnter(res => {
      if (!res.element.dataset.step || step.value === res.element.dataset.step) {
        return
      }
      step.value = res.element.dataset.step
      progress.value = 0
      if (!stepsStarted.value.includes(step.value)) {
        if (stepsStarted.value.length) {
          stepsCompleted.value.push(stepsStarted.value.slice(-1)[0])
        }
        stepsStarted.value.push(step.value)
      }
      if (!initialized) {
        init();
      }
    })
    .onStepExit(res => {
      if (!res.element.dataset.step) {
        return
      }
    })
    .onStepProgress(res => {
      if (res.element.dataset.step !== step.value) {
        return;
      }
      progress.value = res.progress
    })

  /**
   * Update the totalProgress whenever the user scrolls
   */
  window.onscroll = debounce(setTotalProgress, 200)

  /**
   * Show the scroll button when the app is loaded
   */
  setTimeout(() => {
    const scroll = document.getElementById('hero-scroll');
    if (scroll) {
        scroll.removeAttribute('hidden');
    }
  }, 4000)
})
</script>

<template>
  <div class="wrapper">
    <ProgressBar :progress="totalProgress" />
    <BoycottHistory
      :progress="progress"
      :step="step"
      :steps-completed="stepsCompleted"
      :steps-started="stepsStarted"
    />
    <TimeLine
      :progress="progress"
      :step="step"
      :steps-completed="stepsCompleted"
      :steps-started="stepsStarted"
    />
    <ModelBills
      :progress="progress"
      :step="step"
      :steps-completed="stepsCompleted"
      :steps-started="stepsStarted"
    />
    <TemplateRepression
      :progress="progress"
      :step="step"
      :steps-completed="stepsCompleted"
      :steps-started="stepsStarted"
    />
    <CreditsBlock
      :progress="progress"
      :step="step"
      :steps-completed="stepsCompleted"
      :steps-started="stepsStarted"
    />
  </div>
</template>

<style lang="postcss">
@import './assets/css/variables.css';

.wrapper {
  background-color: var(--color-dark-blue);
  background-image: url('../img/background.jpg');
  background-repeat: repeat-both;
}

.hero-scroll {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-orange);
  font-size: 0.6rem;
  font-weight: var(--txt-black);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: opacity 0.5s;

  & svg {
    width: 1rem;
    height: auto;
  }

  &:not([hidden]) {
    opacity: 1;
  }
}

@media (--tablets-sm) {
  .hero-scroll {
    font-size: 1rem;

    & svg {
      width: 1.5rem;
    }
  }
}

@media (orientation: landscape) and (max-width: 992px) {
  .hero-scroll {
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 0.25em;
    left: 4vh;
    transform: none;
  }
}
</style>
