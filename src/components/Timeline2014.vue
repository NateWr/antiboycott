<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
import TimelineArrow from './TimelineArrow.vue';
import {
  KEY_2014_START,
  KEY_2014_INTRO,
  KEY_2014_INTRO_BUBBLES,
  KEY_2014_INEFFECT,
  KEY_2014_INEFFECT_HIGHLIGHT,
  KEY_2014_DEAD,
  KEY_2014_DEAD_HIGHLIGHT,
  KEY_2014_YEAREND,
  KEY_2014_COLLAPSE,
  TRIGGERS,
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types';
import { INEFFECT, DEAD } from '../helpers/billStatus'
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
  return props.allLaws.filter(law => law.year === 2014)
})

const keyFired = (key : number) => {
  return !!props.fired.find(t => t.id === key);
}

const setLabel = (laws: Law[], status: string, label: string) : Law[] => {
  const i = laws.findIndex(l => l.status === status)
  if (i > -1) {
    laws[i].label = label
  }
  return laws
}

const currentLaws = computed(() => {
  if (keyFired(KEY_2014_YEAREND)) {
    let currentLaws = laws.value.slice()
    setLabel(currentLaws, DEAD, '')
    return currentLaws;
  } else if (keyFired(KEY_2014_INTRO_BUBBLES)) {
    let currentLaws = laws.value.slice(0, 8)
    if (keyFired(KEY_2014_DEAD_HIGHLIGHT)) {
      setLabel(currentLaws, DEAD, 'Dead')
    } else if (keyFired(KEY_2014_DEAD)) {
      setLabel(currentLaws, INEFFECT, '')
    } else if (keyFired(KEY_2014_INEFFECT_HIGHLIGHT)) {
      setLabel(currentLaws, INEFFECT, 'In Effect')
    }
    return currentLaws
  }
  return []
})

const end = TRIGGERS
  .find(t => t.id === KEY_2014_COLLAPSE)
  ?.progress

const yearProgress = computed(() => {
  return Math.min(
    end ? props.progress / end : 1,
    1
  )
})
</script>

<template>
  <div class="timeline-year">
    <TimelineArrow :progress="yearProgress" />
    <TimelineDate :keyframe="keyframe" :target="KEY_2014_START">
      2014
    </TimelineDate>
    <div class="timeline-text-group">
      <TimelineText :keyframe="keyframe" :start="KEY_2014_START" :end="KEY_2014_COLLAPSE">
        <span class="fade" :class="keyframe >= KEY_2014_INTRO ? 'fade-in' : 'fade-out'">
          Eight measures are introduced in January.
        </span>
        <span class="fade" :class="keyframe >= KEY_2014_INEFFECT ? 'fade-in' : 'fade-out'">
          Two of them — in Maryland and Pennsylvania — are adopted.
        </span>
        <span class="fade" :class="keyframe >= KEY_2014_DEAD ? 'fade-in' : 'fade-out'">
          The rest are defeated or withdrawn without a vote.
        </span>
        <span class="fade" :class="keyframe >= KEY_2014_YEAREND ? 'fade-in' : 'fade-out'">
          By the end of the year 18 anti-boycott measures have been introduced.
        </span>
      </TimelineText>
    </div>
    <BubbleGroup :laws="currentLaws" class="bubble-group-2014" :class="keyframe < KEY_2014_COLLAPSE ? 'bubble-group-2014-big' : ''"/>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.bubble-group-2014 {
  width: 9.8rem; /* 8 bubbles per row */
  transform: scale(1, 1);
  transform-origin: left top;
  transition: all 0.6s 0.6s;
}

.bubble-group-2014-big {
  transform: scale(1.7, 1.7);
  gap: 0.125rem;

  & .bubble-label-text {
    transform: scale(0.6, 0.6);
  }
}

@media (orientation: portrait) {

  @media (--tablets-sm) {
    .bubble-group-2014 {
      width: 19.6rem;
    }

    .bubble-group-2014-big {
      gap: 0.25rem
    }
  }
}

@media (orientation: landscape) {
  @media (--tablets-landscape) {
    .bubble-group-2014 {
      width: 16.5rem;
    }
  }
  @media (--laptops) {
    .bubble-group-2014 {
      width: 18.5rem;
    }
  }
}
</style>