<script setup lang="ts">
import { computed } from 'vue'
import {arrayMoveImmutable} from 'array-move'
import BubbleGroup from './BubbleGroup.vue'
import {
  TRIGGERS,
  KEY_2017_START,
  KEY_2017_UNCONSTITUTIONAL,
  KEY_2017_UNCONSTITUTIONAL_BUBBLES,
  KEY_2017_LAWS_CONTINUE,
  KEY_2017_LAWS_CONTINUE_BUBBLE,
  KEY_2017_COLLAPSE_TOP,
  KEY_2017_TARGET_ANYONE,
  KEY_2017_PUBLISHER,
  KEY_2017_PUBLISHER_HIGHLIGHT,
  KEY_2017_CASE_LOST,
  KEY_2017_SUPREME_COURT,
  KEY_2017_COLLAPSE_ALL,
KEY_2017_PUBLISHER_HIGHLIGHT_END,
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types';
import { DEFEATED } from '../helpers/billStatus';
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

const keyFired = (key : number) => {
  return !!props.fired.find(t => t.id === key);
}

const getLawIndex = (status : string) => {
  return laws.value.findIndex(l => l.status === status)
}

const getArkansasLawIndex = () => {
  return laws.value.findIndex(l => l.name === 'SB 513')
}

const laws = computed(() => {
  let laws : Law[] = props.allLaws.filter(law => law.year === 2017)
  const defeatedLawIndex = laws.findIndex(l => l.status === DEFEATED)
  return defeatedLawIndex
    ? arrayMoveImmutable(laws, defeatedLawIndex, 2)
    : laws
})

const currentLaws = computed(() => {
  if (keyFired(KEY_2017_LAWS_CONTINUE_BUBBLE)) {
    let currentLaws = laws.value.slice()
    if (keyFired(KEY_2017_PUBLISHER_HIGHLIGHT) && !keyFired(KEY_2017_PUBLISHER_HIGHLIGHT_END)) {
      let i = getArkansasLawIndex()
      if (i) {
        currentLaws[i] = {
          ...currentLaws[i],
          label: 'Arkansas Times LP v. Mark Waldrip',
        }
        return currentLaws
      }
    }
    return laws.value.slice()
  } else if (keyFired(KEY_2017_UNCONSTITUTIONAL_BUBBLES)) {
    let i = getLawIndex(DEFEATED)
    let currentLaws = laws.value.slice(0, i+1)
    if (!keyFired(KEY_2017_LAWS_CONTINUE)) {
      currentLaws[i] = {
        ...currentLaws[i],
        label: 'Struck Down',
      }
    }
    return currentLaws
  }
  return []
})

const start = TRIGGERS
  .find(t => t.id === KEY_2017_START)
  ?.progress
const end = TRIGGERS
  .find(t => t.id === KEY_2017_COLLAPSE_ALL)
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
    <TimelineDate :keyframe="keyframe" :target="KEY_2017_START">
      2017
    </TimelineDate>
    <TimelineText :keyframe="keyframe" :start="KEY_2017_START" :end="KEY_2017_COLLAPSE_TOP">
      <span class="fade" :class="keyframe >= KEY_2017_UNCONSTITUTIONAL ? 'fade-in' : 'fade-out'">
        Plaintiffs begin suing to protect their rights, leading federal courts to strike down several laws as <strong>unconstitutional</strong>.
      </span>
      <span class="fade" :class="keyframe >= KEY_2017_LAWS_CONTINUE ? 'fade-in' : 'fade-out'">
        But legislators keep revising and reintroducing them.
      </span>
    </TimelineText>
    <BubbleGroup :laws="currentLaws" class="bubble-group-2017" />
    <TimelineText :keyframe="keyframe" :start="KEY_2017_COLLAPSE_TOP" :end="KEY_2017_PUBLISHER_HIGHLIGHT">
      <span class="fade" :class="keyframe >= KEY_2017_TARGET_ANYONE ? 'fade-in' : 'fade-out'">
        The laws often target anyone who works with the state. Everyone from public school workers to software contractors are compelled to sign contracts giving up their <strong>right to boycott</strong>.
      </span>
    </TimelineText>
    <TimelineText :keyframe="keyframe" :start="KEY_2017_COLLAPSE_TOP" :end="KEY_2017_PUBLISHER_HIGHLIGHT">
      <span class="fade" :class="keyframe >= KEY_2017_PUBLISHER ? 'fade-in' : 'fade-out'">
        The publisher of Arkansas Times, a newspaper in Little Rock, is asked to sign the anti-boycott pledge before the local university will advertise in the paper. Instead, he launches a <strong>suit against the state</strong>.
      </span>
    </TimelineText>
    <TimelineText :keyframe="keyframe" :start="KEY_2017_PUBLISHER_HIGHLIGHT" :end="KEY_2017_COLLAPSE_ALL">
      <span class="fade" :class="keyframe >= KEY_2017_CASE_LOST ? 'fade-in' : 'fade-out'">
        The paper loses the case, wins on appeal, and loses again in a later appeal.
      </span>
    </TimelineText>
    <TimelineText :keyframe="keyframe" :start="KEY_2017_PUBLISHER_HIGHLIGHT" :end="KEY_2017_COLLAPSE_ALL">
      <span class="fade" :class="keyframe >= KEY_2017_SUPREME_COURT ? 'fade-in' : 'fade-out'">
        By 2023, it has reached the U.S. Supreme Court, but the justices <strong>decline to review the case</strong>, leaving it up to lower courts to decide whether or not to protect the right to boycott.
      </span>
    </TimelineText>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

/**
 * 12 bubbles per row, so the Arkansas law
 * is not too close to one side. This fixes
 * a bug where the label may appear
 * off-screen
 */
.bubble-group-2017 {
  max-width: 15rem;
}
</style>