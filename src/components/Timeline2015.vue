<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import { DEAD, INEFFECT } from '../helpers/billStatus'
import {
  KEY_2015_START,
  KEY_2015_COPYCAT,
  KEY_2015_COPYCAT_BUBBLES,
  KEY_2015_FEDERAL,
  KEY_2015_COLLAPSE
} from '../helpers/timelineKeyframes'
import type { Trigger } from '../helpers/timelineKeyframes';

const props = defineProps({
  keyframe: {
    type: Number,
    required: true,
  },
  fired: {
    type: Array<Trigger>,
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
  if (props.fired.find(t => t.id === KEY_2015_FEDERAL)) {
    return bubbles.slice()
  } else if (props.fired.find(t => t.id === KEY_2015_COPYCAT_BUBBLES)) {
    return bubbles.slice(0, 12)
  }
  return []
})
</script>

<template>
  <div class="timeline-year">
    <div class="timeline-arrow" aria-hidden="true" />
    <h3 class="timeline-date fade" :class="keyframe >= KEY_2015_START ? 'fade-in' : 'fade-out'">
      2015
    </h3>
    <div class="timeline-text" :class="keyframe >= KEY_2015_COLLAPSE ? 'timeline-text-hidden' : ''">
      <span class="fade" :class="keyframe >= KEY_2015_COPYCAT ? 'fade-in' : 'fade-out'">
        Copycat bills are introduced in several states.
      </span>
      <span class="fade" :class="keyframe >= KEY_2015_FEDERAL ? 'fade-in' : 'fade-out'">
        Similar legislation is proposed and passed at the federal level.
      </span>
    </div>
    <BubbleGroup :bubbles="currentBubbles" />
  </div>
</template>

<style lang="postcss">
</style>