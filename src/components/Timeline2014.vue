<script setup lang="ts">
import { computed } from 'vue';
import BubbleGroup from './BubbleGroup.vue';
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

const getLawIndex = (status : string) => {
  return laws.value.findIndex(l => l.status === status)
}

const currentLaws = computed(() => {
  if (keyFired(KEY_2014_YEAREND)) {
    let currentLaws = laws.value.slice();
    currentLaws[getLawIndex(DEAD)].label = '';
    return currentLaws;
  } else if (keyFired(KEY_2014_INTRO_BUBBLES)) {
    let currentLaws = laws.value.slice(0, 8);
    if (keyFired(KEY_2014_DEAD_HIGHLIGHT)) {
      currentLaws[getLawIndex(DEAD)].label = 'Dead';
    } else if (keyFired(KEY_2014_DEAD)) {
      currentLaws[getLawIndex(INEFFECT)].label = '';
    } else if (keyFired(KEY_2014_INEFFECT_HIGHLIGHT)) {
      currentLaws[getLawIndex(INEFFECT)].label = 'In Effect';
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
    <div class="timeline-arrow" :class="yearProgress > 0.05 ? 'timeline-arrow-active' : ''" :style="yearProgress > 0.05 ? `height: ${yearProgress * 100}%` : ''" aria-hidden="true" />
    <h3 class="timeline-date" :class="keyframe >= KEY_2014_START ? 'timeline-date-active' : ''">
      <span class="timeline-date-dot" aria-hidden="true" />
      <span class="timeline-date-marker" aria-hidden="true" />
      <span class="timeline-date-text">2014</span>
    </h3>
    <div class="timeline-text" :class="keyframe >= KEY_2014_COLLAPSE ? 'timeline-text-hidden' : ''">
      <span class="fade" :class="keyframe >= KEY_2014_INTRO ? 'fade-in' : 'fade-out'">
        Eight bills are introduced in January.
      </span>
      <span class="fade" :class="keyframe >= KEY_2014_INEFFECT ? 'fade-in' : 'fade-out'">
        Two of them — in Maryland and Pennsylvania — are voted in and remain in effect today.
      </span>
      <span class="fade" :class="keyframe >= KEY_2014_DEAD ? 'fade-in' : 'fade-out'">
        The rest are defeated or withdrawn without a vote.
      </span>
      <span class="fade" :class="keyframe >= KEY_2014_YEAREND ? 'fade-in' : 'fade-out'">
        By the end of the year 18 anti-boycott bills have been introduced
      </span>
    </div>
    <BubbleGroup :laws="currentLaws" :class="keyframe < KEY_2014_COLLAPSE ? 'bubble-group-large' : ''"/>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-year {
  position: relative;
  padding: 2rem;
}

.timeline-date {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: -2rem;
}

.timeline-arrow {
  position: absolute;
  top: 2.5rem;
  left: 0.5rem;
  width: 2px;
  height: 0;
  transform: translateX(-1px);
  background: var(--color-white);
  border-radius: 1px;

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    width: 0;
    left: -3px;
    transform: translateY(-1px);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid var(--color-white);
    opacity: 0;
    transition: opacity 0.3s;
  }
}

.timeline-arrow-active:after {
  opacity: 1;
}

.timeline-date-text {
  padding-left: 0.5em;
  font-size: 1.25rem;
  font-weight: var(--txt-regular);
  line-height: 1rem;
  opacity: 0;
  transform: translateX(-1em);
  transition: all 0.3s 0.3s;
}

.timeline-date-marker {
  width: 0;
  transform: translateY(-50%);
  border-top: 1px dashed var(--color-white);
  transition: width 0.5s 0.1s;
}

.timeline-date-dot {
  width: 0;
  height: 0;
  border-radius: 50%;
  transform: transateX(-50%);
  background: var(--color-white);
  transition: all 0.5s;
}

.timeline-date-active {

  .timeline-date-text {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-date-marker {
    width: 3.5rem;
  }

  .timeline-date-dot {
    width: 1rem;
    height: 1rem;
  }
}

.timeline-year .bubble-group {
  margin-top: 1rem;
}

.bubble-group-large .bubble {
  width: 2rem;
  height: 2rem;
}
</style>