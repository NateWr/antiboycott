<script setup lang="ts">
import { computed } from 'vue'
import {
  DEAD ,
  INEFFECT,
  PENDING,
  DEFEATED
} from '../helpers/billStatus'
import type { Law } from '@/helpers/types'

const props = defineProps({
  laws: {
    type: Array<Law>,
    required: true
  },
})

const BubblesDead = [
  'bubble-dead-1',
  'bubble-dead-2',
  'bubble-dead-3',
  'bubble-dead-4',
]

const BubblesDefeated = [
  'bubble-defeated-1',
  'bubble-defeated-2',
]

const BubblesIneffect = [
  'bubble-ineffect-1',
  'bubble-ineffect-2',
  'bubble-ineffect-3',
  'bubble-ineffect-4',
]

const BubblesPending = [
  'bubble-pending-1',
  'bubble-pending-2',
  'bubble-pending-3',
  'bubble-pending-4',
]

const bubbles = computed(() => {
  return props.laws.map((law, index) => {
    const i = index % 4
    let svgDef
    switch (law.status) {
      case DEAD:
        svgDef = BubblesDead[i % 4]
        break
      case DEFEATED:
        svgDef = BubblesDefeated[i % 2]
        break
      case INEFFECT:
        svgDef = BubblesIneffect[i % 4]
        break
      case PENDING:
        svgDef = BubblesPending[i % 4]
        break
    }
    return {
      ...law,
      svgDef,
    }
  })
})

let i = 0;

function onBeforeEnter(el : HTMLElement) {
  i++
  el.style['transition-delay'] = (i * 0.05) + 's'
}

function onBeforeLeave(el : HTMLElement) {
  i--
  el.style['transition-delay'] = (i * 0.025) + 's'
}
</script>

<template>
  <div class="bubble-group">
    <TransitionGroup name="bubble" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <span
        v-for="(bubble, index) in bubbles"
        :key="index"
        class="bubble"
        :class="[
          `bubble-${bubble.status}`,
          `bubble-${bubble.category}`,
        ]"
      >
        <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
          <use :xlink:href="`#${bubble.svgDef}`" />
        </svg>
        <transition name="bubble-label">
          <span
            v-if="bubble.label"
            class="bubble-label"
          >
            <span class="bubble-label-line" aria-hidden="true" />
            <span class="bubble-label-text">
              {{ bubble.label }}
            </span>
          </span>
        </transition>
      </span>
    </TransitionGroup>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.bubble-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.bubble {
  position: relative;
  width: 1rem;
  height: 1rem;
  transition: opacity 0.15s;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
}

.bubble-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 1rem);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.bubble-label-line {
  width: 0;
  height: 5rem;
  border-left: 1px solid var(--color-white);
  transition: height 0.3s;
}

.bubble-label-text {
  font-size: 0.75rem;
  font-weight: var(--txt-black);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s 0.3s;
}

.bubble-label-enter-from,
.bubble-label-leave-to {

  & .bubble-label-line {
    height: 0;
  }

  & .bubble-label-text {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}

.bubble-israel {
  fill: var(--color-blue);

  & .bubble-label-line {
    border-color: var(--color-blue);
  }
}

.bubble-esg {
  fill: var(--color-orange);

  & .bubble-label-line {
    border-color: var(--color-orange);
  }
}

.bubble-guns {
  fill: var(--color-green);

  & .bubble-label-line {
    border-color: var(--color-green);
  }
}

.bubble-fossil {
  fill: var(--color-purple);

  & .bubble-label-line {
    border-color: var(--color-purple);
  }
}

.bubble-defeated {
  fill: var(--color-red);

  & .bubble-label-line {
    border-color: var(--color-red);
  }
}
</style>