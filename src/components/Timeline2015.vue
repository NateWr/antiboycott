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
  return props.allLaws.filter(law => law.year === 2015)
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
    <TimelineArrow :progress="yearProgress" />
    <TimelineDate :keyframe="keyframe" :target="KEY_2015_START">
      2015
    </TimelineDate>
    <div class="timeline-text-group">
      <TimelineText :keyframe="keyframe" :start="KEY_2015_START" :end="KEY_2015_COLLAPSE">
        <span class="fade" :class="keyframe >= KEY_2015_COPYCAT ? 'fade-in' : 'fade-out'">
          Similar measures are introduced in several states.
        </span>
        <span class="fade" :class="keyframe >= KEY_2015_FEDERAL ? 'fade-in' : 'fade-out'">
          A bill to restrict the right to boycott is also introduced at the federal level, but fails.
        </span>
      </TimelineText>
    </div>
    <BubbleGroup :laws="currentLaws" />
  </div>
</template>