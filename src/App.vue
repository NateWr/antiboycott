<script setup lang="ts">
import scrollama from 'scrollama';
import { onMounted, ref } from 'vue';
import BoycottHistory from './components/BoycottHistory.vue'
import TimeLine from './components/TimeLine.vue';

const stepsStarted = ref<string[]>([])
const stepsCompleted = ref<string[]>([])
const step = ref<string>('')
const progress = ref<number>(0)
const initialized = ref<boolean>(false)

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
}

onMounted(() => {
  /**
   * Load the scroll observer
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
      if (!initialized.value) {
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
   * Show the scroll button when the app is loaded
   */
  const scroll = document.getElementById('hero-scroll');
  if (scroll) {
    const className = 'hero-scroll';
    scroll.className = `${className} ${className}-enter`;
    scroll.removeAttribute('hidden');
    setTimeout(() => {
      scroll.className = 'hero-scroll';
    }, 1000);
  }
})
</script>

<template>
  <div class="wrapper">
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
    <div data-step="end" aria-hidden="true">THE END</div>
  </div>
</template>

<style lang="postcss">
.hero-scroll {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-orange);
  text-transform: uppercase;
  transition: all 0.5s;
  opacity: 1;

  & svg {
    width: 2rem;
    height: auto;
  }
}

.hero-scroll-enter {
  opacity: 0;
}

[data-step="end"] {
  display: flex;
  justify-content: center;
  font-size: 3rem;
  padding-bottom: 200rem;
}
</style>
