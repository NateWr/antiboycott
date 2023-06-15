<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  TRIGGERS,
  KEY_2020_START,
  KEY_2021_START
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types';
import TimelineArrow from './TimelineArrow.vue';
import TimelineDate from './TimelineDate.vue';

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
  return props.allLaws.filter(law => law.year === 2020)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2020_START)) {
    return laws.value.slice()
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2020_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2021_START)
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
    <TimelineArrow :progress="yearProgress" />
    <TimelineDate :keyframe="keyframe" :target="KEY_2020_START">
      2020
    </TimelineDate>
    <BubbleGroup :laws="currentLaws" />
  </div>
</template>

<style lang="postcss">
</style>