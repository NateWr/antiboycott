<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue';
import Timeline2014 from './Timeline2014.vue';
import Timeline2015 from './Timeline2015.vue';
import {
  KEY_2015_START,
  KEYFRAMES,
  TRIGGERS,
} from '../helpers/timelineKeyframes'

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
const triggeredKeyframes = ref<number[]>([])
const keyframe = computed(() => {
  return triggeredKeyframes.value.length
    ? triggeredKeyframes.value[triggeredKeyframes.value.length - 1]
    : ''
})

const timelineProgress = computed(() => {
  if (props.stepsCompleted.includes(stepName)) {
    return 1
  } else if (props.step === stepName) {
    return props.progress
  }
  return 0
})

const currentKeyframes = KEYFRAMES.slice();
const currentTriggers = TRIGGERS.slice();

watch(() => timelineProgress.value, async(newVal, oldVal) => {
  // Don't fiddle with the keyframes when the timeline
  // has been collapsed
  if (collapsed.value) {
    return;
  }
  if (newVal > oldVal) {
    for (let trigger of currentTriggers) {
      if (trigger <= newVal) {
        const i = currentTriggers.findIndex(val => trigger)
        triggeredKeyframes.value.push(currentKeyframes[i].id)
        currentTriggers.shift()
        currentKeyframes.shift()
      } else {
        break;
      }
    }
  } else if (newVal < oldVal) {
    console.log('scrolling up', newVal, oldVal)
  }
  if (newVal === 1) {
    collapsed.value = true
    document.documentElement.scrollTop -= (outerFrame.value.scrollHeight - innerFrame.value.scrollHeight)
  }
})

const timelineStyle = computed(() => {
  if (triggeredKeyframes.value.includes(KEY_2015_START)) {
    return 'top: -50px';
  }
  return '';
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
      <Timeline2014 :keyframe="keyframe" :triggered-keyframes="triggeredKeyframes" />
      <Timeline2015 :keyframe="keyframe" :triggered-keyframes="triggeredKeyframes" />
    </div>
  </div>
</template>

<style lang="postcss">
.timeline {
  position: relative;
  height: 1000rem;
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
}
</style>