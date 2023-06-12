<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref, watch } from 'vue';
import Timeline2014 from './Timeline2014.vue';
import Timeline2015 from './Timeline2015.vue';
import {
  KEY_2015_START,
  TRIGGERS,
} from '../helpers/timelineKeyframes'
import type { Law, Trigger } from '../helpers/types'

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
  if (newVal === 1) {
    collapsed.value = true
    document.documentElement.scrollTop -= (outerFrame.value.scrollHeight - innerFrame.value.scrollHeight)
  }
})

const timelineStyle = computed(() => {
  if (fired.value.find(t => t.id === KEY_2015_START)) {
    return 'top: -50px';
  }
  return '';
})

onMounted(() => {
  fetch('laws.json')
    .then(r => r.json())
    .then(r => {
      laws.value = r
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
      <Timeline2014 :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
      <Timeline2015 :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" />
    </div>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline {
  position: relative;
  padding-left: 4vw;
  padding-right: 4vw;
  height: 700rem;
}

.timeline-frame {
  position: sticky;
  top: 0;
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

.timeline-text {
  margin-top: 1rem;
  height: auto;
  max-height: 50rem;
  opacity: 1;
  overflow: hidden;
  transition-property: opacity, max-height;
  transition-duration: 0.3s, 0.3s;
  transition-delay: 0s, 0.3s;
}

.timeline-text-hidden {
  max-height: 0;
  opacity: 0;
  margin: 0;
}
</style>