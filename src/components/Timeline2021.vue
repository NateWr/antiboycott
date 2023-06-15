<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  TRIGGERS,
  KEY_2021_START,
  KEY_2021_COLLAPSE,
  KEY_2021_TARGETS_EXPAND_BUBBLES,
  KEY_2021_TARGETS_EXPAND
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
  return props.allLaws.filter(law => law.year === 2021)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2021_TARGETS_EXPAND_BUBBLES)) {
    return laws.value.slice()
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2021_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2021_COLLAPSE)
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
    <TimelineDate :keyframe="keyframe" :target="KEY_2021_START">
      2021
    </TimelineDate>
    <TimelineText :keyframe="keyframe" :start="KEY_2021_START" :end="KEY_2021_COLLAPSE">
      <span class="fade" :class="keyframe >= KEY_2021_TARGETS_EXPAND ? 'fade-in' : 'fade-out'">
        Meanwhile, laws targetting boycotts of Israel become a <strong>template for attacking other movements</strong>, such as boycotts of the <span class="txt-highlight txt-highlight-purple">fossil</span><span class="txt-highlight txt-highlight-purple">fuels</span> and <span class="txt-highlight txt-highlight-green">firearms</span> industries.
      </span>
    </TimelineText>
    <BubbleGroup :laws="currentLaws" />
  </div>
</template>

<style lang="postcss">
</style>