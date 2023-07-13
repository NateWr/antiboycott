<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  TRIGGERS,
  KEY_2016_INTRO_BUBBLES,
  KEY_2016_START,
  KEY_2016_COLLAPSE,
  KEY_2016_INTRO,
KEY_2017_UNCONSTITUTIONAL_BUBBLES
} from '../helpers/timelineKeyframes'
import { DEFEATED, INEFFECT } from '../helpers/billStatus'
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
  return props.allLaws.filter(law => law.year === 2016)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2017_UNCONSTITUTIONAL_BUBBLES)) {
    return laws.value.slice()
  } else if (props.fired.find(t => t.id === KEY_2016_INTRO_BUBBLES)) {
    return laws.value.slice().map(law => {
      return law.status === DEFEATED
        ? {...law, status: INEFFECT}
        : law
    })
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2016_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2016_COLLAPSE)
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
    <TimelineDate :keyframe="keyframe" :target="KEY_2016_START">
      2016
    </TimelineDate>
    <div class="timeline-text-group">
      <TimelineText :keyframe="keyframe" :start="KEY_2016_START" :end="KEY_2016_COLLAPSE">
        <span class="fade" :class="keyframe >= KEY_2016_INTRO ? 'fade-in' : 'fade-out'">
          The trend picks up pace as legislators across the country try to suppress Americans’ right to boycott against Israeli apartheid.
        </span>
      </TimelineText>
    </div>
    <BubbleGroup :laws="currentLaws" />
  </div>
</template>

<style lang="postcss">
</style>