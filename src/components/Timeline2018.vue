<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  TRIGGERS,
  KEY_2018_COLLAPSE,
  KEY_2018_START,
  KEY_2018_INTRO_BUBBLES,
  KEY_2018_INTRO
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types';
import TimelineArrow from './TimelineArrow.vue';
import TimelineDate from './TimelineDate.vue';
import TimelineText from './TimelineText.vue';

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
  return props.allLaws.filter(law => law.year === 2018)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2018_INTRO_BUBBLES)) {
    return laws.value.slice()
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2018_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2018_COLLAPSE)
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
    <TimelineDate :keyframe="keyframe" :target="KEY_2018_START">
      2018
    </TimelineDate>
    <div class="timeline-text-group">
      <TimelineText :keyframe="keyframe" :start="KEY_2018_START" :end="KEY_2018_COLLAPSE">
        <span class="fade" :class="keyframe >= KEY_2018_INTRO ? 'fade-in' : 'fade-out'">
          Democratic and Republican legislators continue to introduce anti-boycott bills to shield Israel from accountability.
        </span>
      </TimelineText>
    </div>
    <BubbleGroup :laws="currentLaws" />
  </div>
</template>

<style lang="postcss">
</style>