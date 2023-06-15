<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onMounted, ref, watch } from 'vue'
import debounce from 'debounce'
import {
  KEY_2017_START,
  KEY_2021_START,
  KEY_2022_START,
  TRIGGERS,
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types'
import Timeline2014 from './Timeline2014.vue'
import Timeline2015 from './Timeline2015.vue'
import Timeline2016 from './Timeline2016.vue'
import Timeline2017 from './Timeline2017.vue'
import Timeline2018 from './Timeline2018.vue'
import Timeline2019 from './Timeline2019.vue'
import Timeline2020 from './Timeline2020.vue'
import Timeline2021 from './Timeline2021.vue'
import Timeline2022 from './Timeline2022.vue'
import Timeline2023 from './Timeline2023.vue'
import { KEY_2018_START } from '../helpers/timelineKeyframes'
import { KEY_2023_START } from '../helpers/timelineKeyframes'

const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
  step: {
    type: String,
    default: ''
  },
  stepsCompleted: {
    type: Array<String>,
    required: true
  },
})

const stepName: string = 'timeline'
const outerFrame = ref(null)
const innerFrame = ref(null)
const collapsed = ref<boolean>(false)
const laws = ref<Law[]>([])
const bubblesSvg = ref<string>('')

const timelineProgress = computed(() => {
  if (props.stepsCompleted.includes(stepName)) {
    return 1
  } else if (props.step === stepName) {
    return props.progress
  }
  return 0
})

const pending = ref<Trigger[]>(TRIGGERS.slice())
const fired = ref<Trigger[]>([])
const keyframe = computed(() => {
  return fired.value.length
    ? fired.value[fired.value.length - 1].id
    : 0
})

watch(() => timelineProgress.value, async(newVal, oldVal) => {
  // Don't fiddle with the keyframes when the timeline
  // has been collapsed
  if (collapsed.value) {
    return;
  }
  // Add trigger(s) while scrolling down
  if (newVal > oldVal) {
    for (let trigger of pending.value) {
      if (trigger.progress <= newVal) {
        fired.value.push(trigger)
        // triggered.value.push(trigger.id)
        pending.value.shift()
      } else {
        break;
      }
    }
  // Remove trigger(s) while scrolling up
  } else if (newVal < oldVal) {
    for (let trigger of fired.value.slice().reverse()) {
      if (trigger.progress > newVal && !pending.value.includes(trigger)) {
        pending.value.unshift(trigger)
        fired.value.pop()
      } else {
        break;
      }
    }
  }
  /**
   * Collapse the timeline after the user has stopped scrolling
   *
   * Scrolling has to stop on iOS before setting the scrollTop or
   * the value will be ignored. A "momentum" scroll (swipe) will
   * reset the scrollTop according to the values when the gesture
   * began.
   */
  if (newVal === 1) {
    const collapseTimeline = debounce(() => {
      collapsed.value = true
      let $scrollEl = document.scrollingElement
      if (!$scrollEl) {
        $scrollEl = document.documentElement
      }
      $scrollEl.scrollTop = $scrollEl.scrollTop - (outerFrame.value.scrollHeight - innerFrame.value.scrollHeight);
      removeEventListener('scroll', collapseTimeline)
    }, 100)
    addEventListener('scroll', collapseTimeline)
  }
})

const timelineStyle = computed(() => {
  if (fired.value.find(t => t.id === KEY_2023_START)) {
    return 'top: -68rem';
  } else if (fired.value.find(t => t.id === KEY_2022_START)) {
    return 'top: -60rem';
  } else if (fired.value.find(t => t.id === KEY_2021_START)) {
    return 'top: -50rem';
  } else if (fired.value.find(t => t.id === KEY_2018_START)) {
    return 'top: -30rem';
  } else if (fired.value.find(t => t.id === KEY_2017_START)) {
    return 'top: -22rem';
  }
  return '';
})

onMounted(() => {
  fetch('laws.json')
    .then(r => r.json())
    .then(r => {
      laws.value = r
    })
  fetch('img/bubbles.svg')
    .then(r => r.text())
    .then(r => {
      bubblesSvg.value = r
    })
})
</script>

<template>
  <div class="timeline" :class="collapsed ? 'timeline-collapsed' : ''" :data-step="stepName" ref="outerFrame">
    <h2 class="sr-only">Timeline</h2>
    <div
      class="timeline-frame"
      ref="innerFrame"
      :style="timelineStyle"
    >
      <Timeline2014 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2015 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2016 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2017 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2018 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2019 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2020 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2021 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2022 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2023 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
    </div>
    <span v-if="bubblesSvg" v-html="bubblesSvg" hidden aria-hidden="true"/>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline {
  position: relative;
  padding-left: 4vw;
  padding-right: 4vw;
  height: 1500rem;
}

.timeline-frame {
  position: sticky;
  top: 0;
  padding-top: 2rem;
  padding-bottom: 20rem;
  transition: top 0.5s;
}

.timeline-collapsed {
  height: auto;

  .timeline-frame {
    position: relative;
    top: auto !important;
  }
}

.timeline-year {
  position: relative;
  padding-top: 1rem;
  padding-left: 2rem;

  & .bubble-group {
    padding-bottom: 1rem;
  }
}
</style>