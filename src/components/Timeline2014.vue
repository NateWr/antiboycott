<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import { DEAD, INEFFECT } from '../helpers/billStatus'
import {
  KEY_2014_INTRO,
  KEY_2014_INTRO_BUBBLES,
  KEY_2014_INEFFECT,
  KEY_2014_INEFFECT_BUBBLES,
  KEY_2014_DEAD,
  KEY_2014_YEAREND,
  KEY_2014_YEAREND_BUBBLES,
  KEY_2014_COLLAPSE,
} from '../helpers/timelineKeyframes'

const props = defineProps({
  keyframe: {
    type: Number,
    required: true,
  },
  triggeredKeyframes: {
    type: Array<Number>,
    required: true,
  },
})

const bubbles = [
  DEAD,
  DEAD,
  DEAD,
  DEAD,
  INEFFECT,
  DEAD,
  INEFFECT,
  DEAD,
  DEAD,
  DEAD,
  INEFFECT,
  DEAD,
  DEAD,
  DEAD,
  DEAD,
  INEFFECT,
  DEAD,
  DEAD,
]

const currentBubbles = computed(() => {
  if (props.triggeredKeyframes.includes(KEY_2014_YEAREND_BUBBLES)) {
    return bubbles.slice()
  } else if (props.triggeredKeyframes.includes(KEY_2014_INEFFECT_BUBBLES)) {
    return bubbles.slice(0, 5)
  } else if (props.triggeredKeyframes.includes(KEY_2014_INTRO_BUBBLES)) {
    return Array(5).fill(DEAD)
  }
  return []
})
</script>

<template>
  <div class="timeline-year">
    <div class="timeline-arrow" aria-hidden="true" />
    <h3 class="timeline-date fade">
      2014
    </h3>
    <div class="timeline-text" :class="keyframe >= KEY_2014_COLLAPSE ? 'timeline-text-hidden' : ''">
      <span class="fade" :class="keyframe >= KEY_2014_INTRO ? 'fade-in' : 'fade-out'">
        Five bills are introduced in January.
      </span>
      <span class="fade" :class="keyframe >= KEY_2014_INEFFECT ? 'fade-in' : 'fade-out'">
        Two of them — in Maryland and Pennsylvania — are voted in and remain in effect today.
      </span>
      <span class="fade" :class="keyframe >= KEY_2014_DEAD ? 'fade-in' : 'fade-out'">
        The rest are defeated or withdrawn without a vote.
      </span>
      <span class="fade" :class="keyframe >= KEY_2014_YEAREND ? 'fade-in' : 'fade-out'">
        By the end of the year 18 anti-boycott bills have been introduced
      </span>
    </div>
    <BubbleGroup :bubbles="currentBubbles" />
    <div class="timeline-text">
      <div class="bubble-pointer fade" :class="keyframe >= KEY_2014_INEFFECT_BUBBLES && keyframe <= KEY_2014_DEAD ? 'fade-in' : 'fade-out'"
        style="position: relative; left: 13vw">
        In Effect
      </div>
      <div class="bubble-pointer fade" :class="keyframe >= KEY_2014_DEAD && keyframe <= KEY_2014_YEAREND ? 'fade-in' : 'fade-out'"
        style="position: relative; left: 26vw">
        Dead
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
</style>