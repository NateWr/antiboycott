<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { KEY_ENERGY_BILL, KEY_FIREARMS_BILL, KEY_SHOW_BILL, KEY_TITLE, TRIGGERS } from '../helpers/templateRepressionKeyframes';
import { ISRAEL, FOSSIL, GUNS } from '../helpers/categories'
import type { Trigger } from '@/helpers/types';
import QuotesSvg from '../assets/img/quotes.svg';

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

const stepProgress = computed(() => {
  // The check for props.progress fixes a bug in the
  // scrollama library. When scrolling "back" (up), the
  // step and progress are briefly out of sync. At the
  // "end" (bottom) of the `template` step it will report
  // a progress of `0`.
  if (props.step === 'template' && props.progress) {
    return props.progress
  } else if (props.stepsCompleted.includes('template')) {
    return 1
  }
  return 0
})

const pending = ref<Trigger[]>(TRIGGERS.slice())
const fired = ref<Trigger[]>([])
const keyframe = computed(() => {
  return fired.value.length
    ? fired.value[fired.value.length - 1].id
    : 0
})

watch(() => stepProgress.value, async(newVal, oldVal) => {
  // Add trigger(s) while scrolling down
  if (newVal > oldVal) {
    for (let trigger of pending.value) {
      if (trigger.progress <= newVal) {
        fired.value.push(trigger)
        pending.value.shift()
      } else {
        break
      }
    }
  // Remove trigger(s) while scrolling up
  } else if (newVal < oldVal) {
    for (let trigger of fired.value.slice().reverse()) {
      if (trigger.progress > newVal && !pending.value.includes(trigger)) {
        pending.value.unshift(trigger)
        fired.value.pop()
      } else {
        break
      }
    }
  }
})

const type = computed(() => {
  if (keyframe.value >= KEY_FIREARMS_BILL) {
    return GUNS
  } else if (keyframe.value >= KEY_ENERGY_BILL) {
    return FOSSIL
  }
  return ISRAEL
})

const offset = computed(() => {
  return 64 - Math.round(
    (stepProgress.value * 64)
  )
})
</script>

<template>
  <div
    data-step="template"
    class="template"
  >
    <div class="template-frame">
      <div class="template-header" :class="keyframe >= KEY_TITLE ? 'template-header-in' : 'template-header-out'">
        <h2 class="template-title">
          A <span class="txt-highlight txt-highlight-orange">template</span>
          <br>
          for repression
        </h2>
        <p class="template-desc">
          Texas’s three anti-boycott laws share <strong>almost identical language</strong>.
        </p>
      </div>
      <div
        aria-live="polite"
        class="template-bill"
        :class="keyframe >= KEY_SHOW_BILL ? 'template-bill-in' : 'template-bill-out'"
        :style="`transform: translateY(${offset}px)`"
      >
        <h3 class="template-bill-header">
          <Transition name="slide-up">
            <span class="template-bill-date" v-if="type === ISRAEL">
              2019
            </span>
          </Transition>
          <Transition name="slide-up">
            <span class="template-bill-date" v-if="type === FOSSIL">
              2021
            </span>
          </Transition>
          <Transition name="slide-up">
            <span class="template-bill-date" v-if="type === GUNS">
              2021
            </span>
          </Transition>
          <Transition name="slide-up">
            <span class="template-bill-id" v-if="type === ISRAEL">
              TX Senate Bill 793
            </span>
          </Transition>
          <Transition name="slide-up">
            <span class="template-bill-id" v-if="type === FOSSIL">
              TX Senate Bill 13
            </span>
          </Transition>
          <Transition name="slide-up">
            <span class="template-bill-id" v-if="type === GUNS">
              TX Senate Bill 19
            </span>
          </Transition>
        </h3>
        <blockquote class="template-bill-text">
          <QuotesSvg :class="`template-bill-quotes template-bill-quotes-${type}`"/>
          A governmental entity may not enter into a contract with a company [...] unless the contract contains a written verification from the company that it:
          <div class="template-bill-rule">
            <span class="template-bill-rule-index">
              (1)
            </span>
            <div class="template-bill-rule-text">
              does not
              <span v-if="type === GUNS">
                [discriminate]
              </span>
              <br>
              <Transition name="slide-up" appear>
                <span class="template-bill-target" v-if="type === ISRAEL">
                  <span class="txt-highlight txt-highlight-blue">Boycott</span>
                  <span class="txt-highlight txt-highlight-blue">Israel</span>
                </span>
                <span class="template-bill-target" v-else-if="type === FOSSIL">
                  <span class="txt-highlight txt-highlight-purple">Boycott</span>
                  <br>
                  <span class="txt-highlight txt-highlight-purple">Energy</span>
                  <span class="txt-highlight txt-highlight-purple">Companies</span>
                </span>
                <span class="template-bill-target" v-else-if="type === GUNS">
                  <span class="txt-highlight txt-highlight-green">Against</span>
                  <span class="txt-highlight txt-highlight-green">A</span>
                  <br>
                  <span class="txt-highlight txt-highlight-green">FIREARM</span>
                  <span class="txt-highlight txt-highlight-green">ENTITY</span>
                </span>
              </Transition>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.template {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0,0,0,0.5);
  height: 110rem;
  padding-top: 10rem;
}

.template-frame {
  position: sticky;
  top: 0;
  max-width: 90vw;
  padding: 1.5rem 0 10rem;
}

.template-header {
  transition: all 1s;
}

.template-header-in {
  opacity: 1;
}

.template-header-out {
  opacity: 0;
}

.template-title {
  font-size: 2rem;
  line-height: 0.9;
  font-weight: var(--txt-black);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.template-desc {
  font-size: 1.5rem;
  line-height: 1.2;
}

.template-bill {
  margin-top: 2rem;
  padding: 0.75rem;
  background: lightgoldenrodyellow;
  background: url('../img/paper-background-400w.webp');
  background-position: bottom center;
  background-size: cover;
  color: var(--color-black);
  padding-bottom: 2rem;
  transition: all 1s;

  @media (orientation: portrait) {

    @media (min-width: 445px) {
      background-image: url('../img/paper-background-600w.webp');
    }

    @media (--tablets-sm) {
      background-image: url('../img/paper-background-800w.webp');
    }

    @media (min-resolution: 2dppx) {
      background-image: url('../img/paper-background-800w.webp');

      @media (min-width: 445px) {
        background-image: url('../img/paper-background-1200w.webp');
      }
    }
  }

  @media (orientation: landscape) {

    @media (--tablets-sm) {
      background-image: url('../img/paper-background-600w.webp');
    }

    @media (min-width: 1134px) {
      background-image: url('../img/paper-background-800w.webp');
    }

    @media (min-resolution: 2dppx) {
      background-image: url('../img/paper-background-800w.webp');

      @media (--tablets-sm) {
        background-image: url('../img/paper-background-1200w.webp');
      }
    }
  }

}

.template-bill-out {
  opacity: 0;
  transform: translateY(4rem);
}

.template-bill-in {
  opacity: 1;
  transform: translateY(0);
}

.template-bill-header {
  position: relative;
  font-size: 1rem;
  font-weight: var(--txt-regular);
  padding-bottom: 0.5em;
  border-bottom: 1px solid var(--color-black);
  height: 2em;
}

.template-bill-date {
  position: absolute;
  top: 0;
  left: 0;
  font-weight: var(--txt-black);
  transition: all 0.25s;
}

.template-bill-id {
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.25s;
}

.template-bill-target {
  position: absolute;
  transition: all 0.5s;
}

.slide-up,
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-enter-from {
  transform: translateY(50%);
  opacity: 0;
}

.slide-up-leave-to {
  position: absolute;
  transform: translateY(-100%);
  opacity: 0;
}

.template-bill-header-enter-to,
.template-bill-header-leave-from {

  & .template-bill-date,
  & .template-bill-id {
    transform: translateY(0);
    opacity: 1;
  }
}

.template-bill-header-enter-from,
.template-bill-header-leave-to {

  & .template-bill-date,
  & .template-bill-id {
    transform: translateY(50%);
    opacity: 0;
  }
}

.template-bill-quotes {
  display: inline-block;
  position: relative;
  top: 0.125em;
  height: 1em;
  width: auto;
  margin-right: 0.25em;
  color: var(--color-blue);
  mix-blend-mode: color-burn;
}

.template-bill-quotes-fossil {
  color: var(--color-purple);
  mix-blend-mode: multiply;
}

.template-bill-quotes-guns {
  color: var(--color-green-dark);
}

.template-bill-text {
  margin-top: 1em;
  font-weight: var(--txt-medium);
  line-height: 1.5;
}

.template-bill-rule {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-height: 6em;
}

.template-bill-rule-text {
  font-weight: var(--txt-bold);
}

.template-bill-target {
  text-transform: uppercase;
  font-size: 1.25rem;
  line-height: 1.25;
}

@media (--mobiles-normal) {
  .template-bill-text,
  .template-bill-rule {
    font-size: 1.25rem;
  }

  .template-bill-target {
    font-size: 1.5rem;
  }
}

@media (orientation: portrait) {

  @media (--tablets-sm) {
    .template-title {
      font-size: 4rem;
    }

    .template-bill {
      padding: 3rem;
    }

    .template-desc,
    .template-bill-header,
    .template-bill-text,
    .template-bill-rule  {
      font-size: 2rem;
    }

    .template-bill-target {
      font-size: 2.5rem;
    }
  }

  @media (--tablets) {
    .template-frame {
      max-width: 740px;
    }
  }
}

@media (orientation: landscape) {

  .template-frame {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 1rem;
    padding-bottom: 5rem;
  }

  .template-title {
    font-size: 1.5rem;
  }

  .template-desc {
    font-size: 0.85rem;
  }

  .template-bill {
    margin-top: 0;
    padding: 0.75rem;
  }

  .template-bill-header,
  .template-bill-text,
  .template-bill-rule  {
    font-size: 0.85rem;
  }

  .template-bill-target {
    font-size: 1rem;
  }

  @media (--tablets-landscape) {

    .template-frame {
      padding-top: 5rem;
      gap: 2rem;
    }

    .template-title {
      font-size: 2.5rem;
    }

    .template-desc {
      font-size: 1.5rem;
    }

    .template-bill {
      padding: 1rem;
    }

    .template-bill-header,
    .template-bill-text,
    .template-bill-rule  {
      font-size: 1.75rem;
    }

    .template-bill-target {
      font-size: 2rem;
    }
  }

  @media (--laptops-sm) {

    .template-frame {
      max-width: 1200px;
      gap: 3rem;
    }

    .template-title {
      font-size: 3rem;
    }

    .template-desc {
      font-size: 1.75rem;
    }

    .template-bill {
      padding: 2rem;
    }

    .template-bill-header,
    .template-bill-text,
    .template-bill-rule  {
      font-size: 1.75rem;
    }

    .template-bill-target {
      font-size: 2.25rem;
    }
  }
}
</style>
