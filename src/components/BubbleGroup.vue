<script setup lang="ts">
import { computed } from 'vue'
import BubbleDead1 from '../assets/img/bubble-dead-1.svg'
import BubbleDead2 from '../assets/img/bubble-dead-2.svg'
import BubbleDead3 from '../assets/img/bubble-dead-3.svg'
import BubbleDead4 from '../assets/img/bubble-dead-4.svg'
import BubbleDefeated1 from '../assets/img/bubble-defeated-1.svg'
import BubbleDefeated2 from '../assets/img/bubble-defeated-2.svg'
import BubbleIneffect1 from '../assets/img/bubble-ineffect-1.svg'
import BubbleIneffect2 from '../assets/img/bubble-ineffect-2.svg'
import BubbleIneffect3 from '../assets/img/bubble-ineffect-3.svg'
import BubbleIneffect4 from '../assets/img/bubble-ineffect-4.svg'
import BubblePending1 from '../assets/img/bubble-pending-1.svg'
import BubblePending2 from '../assets/img/bubble-pending-2.svg'
import BubblePending3 from '../assets/img/bubble-pending-3.svg'
import BubblePending4 from '../assets/img/bubble-pending-4.svg'
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
  BubbleDead1,
  BubbleDead2,
  BubbleDead3,
  BubbleDead4,
]

const BubblesDefeated = [
  BubbleDefeated1,
  BubbleDefeated2,
]

const BubblesIneffect = [
  BubbleIneffect1,
  BubbleIneffect2,
  BubbleIneffect3,
  BubbleIneffect4,
]

const BubblesPending = [
  BubblePending1,
  BubblePending2,
  BubblePending3,
  BubblePending4,
]

const bubbles = computed(() => {
  return props.laws.map((law, index) => {
    const i = index % 4
    let component
    switch (law.status) {
      case DEAD:
        component = BubblesDead[i % 4]
        break
      case DEFEATED:
        component = BubblesDefeated[i % 2]
        break
      case INEFFECT:
        component = BubblesIneffect[i % 4]
        break
      case PENDING:
        component = BubblesPending[i % 4]
        break
    }
    return {
      component: component,
      category: law.category,
      status: law.status,
    }
  })
})

let i = 0;

function onBeforeEnter(el) {
  i++
  el.style['transition-delay'] = (i * 0.05) + 's'
}

function onBeforeLeave(el) {
  i--
  el.style['transition-delay'] = (i * 0.025) + 's'
}
</script>

<template>
  <div class="bubble-group">
    <TransitionGroup name="bubble" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
      <component
        v-for="(bubble, index) in bubbles"
        :is="bubble.component"
        :key="index"
        class="bubble"
        :class="[
          `bubble-${bubble.status}`,
          `bubble-${bubble.category}`,
        ]"
      />
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
  transition: none;
  opacity: 0;
}

.bubble-enter-to,
.bubble-leave-from {
  opacity: 1;
}
</style>