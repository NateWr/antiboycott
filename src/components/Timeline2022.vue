<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import {
  TRIGGERS,
    KEY_2022_ESG_BUBBLES,
    KEY_2022_START,
    KEY_2022_COLLAPSE,
    KEY_2022_ESG
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
  return props.allLaws.filter(law => law.year === 2022)
})

const currentLaws = computed(() => {
  if (props.fired.find(t => t.id === KEY_2022_ESG_BUBBLES)) {
    return laws.value.slice()
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2022_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2022_COLLAPSE)
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
    <TimelineDate :keyframe="keyframe" :target="KEY_2022_START">
      2022
    </TimelineDate>
    <div class="timeline-text-group">
      <TimelineText :keyframe="keyframe" :start="KEY_2022_START" :end="KEY_2022_COLLAPSE">
        <span class="fade" :class="keyframe >= KEY_2022_ESG ? 'fade-in' : 'fade-out'">
          Legislators broaden the attack on activists with bills that prevent states from considering the
          <span class="txt-highlight txt-highlight-orange">Environmental,</span>
          <span class="txt-highlight txt-highlight-orange">Social,</span>
          <span class="txt-highlight txt-highlight-orange">and</span>
          <span class="txt-highlight txt-highlight-orange">Governance</span>
          <span class="txt-highlight txt-highlight-orange">(ESG)</span>
          standards of companies where public money is invested.
        </span>
      </TimelineText>
    </div>
    <BubbleGroup :laws="currentLaws" :delay="0.03" />
  </div>
</template>

<style lang="postcss">
</style>