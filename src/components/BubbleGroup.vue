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
      </span>
    </TransitionGroup>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.bubble-group {
    display: flex;
    flex-wrap: wrap;
}

.bubble {
  width: 6vw;
  height: 6vw;
  transition: all 0.15s;
}

.bubble-israel {
  fill: var(--color-blue);
}

.bubble-esg {
  fill: var(--color-orange);
}

.bubble-guns {
  fill: var(--color-green);
}

.bubble-fossil {
  fill: var(--color-purple);
}

.bubble-defeated {
  fill: var(--color-red);
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
}

.bubble-enter-to,
.bubble-leave-from {
  opacity: 1;
}
</style>