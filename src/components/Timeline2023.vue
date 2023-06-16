<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  KEY_2023_TARGETS_EXPAND_BUBBLES,
  KEY_2023_START,
  KEY_2023_COLLAPSE,
  KEY_2023_TARGETS_EXPAND,
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types';
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
  return props.allLaws.filter(law => law.year === 2023)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2023_TARGETS_EXPAND_BUBBLES)) {
    return laws.value.slice()
  }
  return []
})
</script>

<template>
  <div class="timeline-year timeline-year-2023">
    <TimelineDate :keyframe="keyframe" :target="KEY_2023_START">
      2023 <span class="partial-year-months">(JAN-MAR)</span>
    </TimelineDate>
    <div class="timeline-text-group">
      <TimelineText :keyframe="keyframe" :start="KEY_2023_START" :end="KEY_2023_COLLAPSE">
        <span class="fade" :class="keyframe >= KEY_2023_TARGETS_EXPAND ? 'fade-in' : 'fade-out'">
          Legislators use the
          <span class="txt-highlight txt-highlight-orange">Eliminate</span>
          <span class="txt-highlight txt-highlight-orange">Economic</span>
          <span class="txt-highlight txt-highlight-orange">Boycotts</span>
          <span class="txt-highlight txt-highlight-orange">Act,</span>
          a model bill drafted by a corporate lobbying group, to <strong>expand the legislative assault</strong> on trans rights, abortion access, and labor rights.
        </span>
      </TimelineText>
    </div>
    <BubbleGroup :laws="currentLaws" :delay="0.02" />
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-year-2023 {

  & .bubble-group {
    max-width: none;
  }
}

.partial-year-months {
  font-size: 0.75rem;
  font-weight: var(--txt-black);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1;
  position: relative;
  top: -0.25em;
  left: 0.5em;
}
</style>