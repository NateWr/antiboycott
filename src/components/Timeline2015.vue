<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  KEY_2015_START,
  KEY_2015_COPYCAT,
  KEY_2015_COPYCAT_BUBBLES,
  KEY_2015_FEDERAL,
  KEY_2015_COLLAPSE,
  TRIGGERS
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types';

const props = defineProps({
  allLaws: {
    type: Array<Law>,
    required: true,
  },
  keyframe: {
    type: Number,
    required: true,
  },
  fired: {
    type: Array<Trigger>,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
})

const laws = computed(() => {
  return props.allLaws.filter(law => law.year === 2014)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2015_FEDERAL)) {
    return laws.value.slice()
  } else if (props.fired.find(t => t.id === KEY_2015_COPYCAT_BUBBLES)) {
    return laws.value.slice(0, 12)
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2015_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2015_COLLAPSE)
  ?.progress

const yearProgress = computed(() => {
  return Math.min(
    end && start ? (props.progress - start) / (end - start) : 1,
    1
  )
})
</script>

<template>
  <div class="timeline-year">
    <div class="timeline-arrow" :class="yearProgress > 0.05 ? 'timeline-arrow-active' : ''" :style="yearProgress > 0.05 ? `height: ${yearProgress * 100}%` : ''" aria-hidden="true" />
    <h3 class="timeline-date" :class="keyframe >= KEY_2015_START ? 'timeline-date-active' : ''">
      <span class="timeline-date-dot" aria-hidden="true" />
      <span class="timeline-date-marker" aria-hidden="true" />
      <span class="timeline-date-text">2015</span>
    </h3>
    <div class="timeline-text" :class="keyframe >= KEY_2015_COLLAPSE ? 'timeline-text-hidden' : ''">
      <span class="fade" :class="keyframe >= KEY_2015_COPYCAT ? 'fade-in' : 'fade-out'">
        Copycat bills are introduced in several states.
      </span>
      <span class="fade" :class="keyframe >= KEY_2015_FEDERAL ? 'fade-in' : 'fade-out'">
        Similar legislation is proposed and passed at the federal level.
      </span>
    </div>
    <BubbleGroup :laws="currentLaws" />
  </div>
</template>

<style lang="postcss">
</style>