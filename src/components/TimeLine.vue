<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onMounted, ref, watch, type Ref } from 'vue'
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
import TimelineLegend from './TimelineLegend.vue'
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

const emit = defineEmits(['loadError'])

const stepName: string = 'timeline'
const laws = ref<Law[]>([])
const bubblesSvg = ref<string>('')
const timelineOffset = ref<number>(0)
const year2014 = ref<InstanceType<typeof Timeline2014> | null>(null)
const year2015 = ref<InstanceType<typeof Timeline2015> | null>(null)
const year2016 = ref<InstanceType<typeof Timeline2016> | null>(null)
const year2017 = ref<InstanceType<typeof Timeline2017> | null>(null)
const year2018 = ref<InstanceType<typeof Timeline2018> | null>(null)
const year2019 = ref<InstanceType<typeof Timeline2019> | null>(null)
const year2020 = ref<InstanceType<typeof Timeline2020> | null>(null)
const year2021 = ref<InstanceType<typeof Timeline2021> | null>(null)
const year2022 = ref<InstanceType<typeof Timeline2022> | null>(null)
const year2023 = ref<InstanceType<typeof Timeline2023> | null>(null)

const timelineProgress = computed(() => {
  if (props.step === stepName && props.progress) {
    return props.progress
  } else if (props.stepsCompleted.includes(stepName)) {
    return 1
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

watch(
  () => timelineProgress.value,
  async(newVal, oldVal) => {
    // Add trigger(s) while scrolling down
    if (newVal > oldVal) {
      for (let trigger of pending.value.slice()) {
        if (trigger.progress <= newVal) {
          fired.value.push(trigger)
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
  }
)

const setTimelineOffset = (years : Ref[], delay : number = 300) => {
  delay = delay || 300
  setTimeout(() => {
    const height = years.reduce<number>((height, year) => {
      return height + year.value?.$el.clientHeight
    }, 0)
    timelineOffset.value = (height - 16) * -1
  }, delay)
}

watch(() => keyframe.value, async(newVal, oldVal) => {
  if (keyframe.value >= KEY_2023_START) {
    setTimelineOffset([
      year2014,
      year2015,
      year2016,
      year2017,
      year2018,
      year2019,
      year2020,
      year2021,
      year2022,
    ])
  } else if (keyframe.value >= KEY_2022_START) {
    setTimelineOffset([
      year2014,
      year2015,
      year2016,
      year2017,
      year2018,
      year2019,
      year2020,
      year2021,
    ])
  } else if (keyframe.value >= KEY_2021_START) {
    setTimelineOffset([
      year2014,
      year2015,
      year2016,
      year2017,
      year2018,
      year2019,
      year2020,
    ])
  } else if (keyframe.value >= KEY_2018_START) {
    setTimelineOffset([
      year2014,
      year2015,
      year2016,
      year2017
    ])
  } else if (keyframe.value >= KEY_2017_START) {
    setTimelineOffset([
      year2014,
      year2015,
      year2016,
    ])
  } else {
    timelineOffset.value = 0
  }
})

onMounted(() => {
  Promise.all(
    [
      fetch('laws.json')
        .then(r => r.json())
        .then(r => {
          laws.value = r
        }),
      fetch('img/bubbles.svg')
        .then(r => r.text())
        .then(r => {
          bubblesSvg.value = r
        })
    ]
  ).catch(() => {
    emit('loadError')
  })
})
</script>

<template>
  <div class="timeline" :data-step="stepName" ref="outerFrame">
    <h2 class="sr-only">Timeline</h2>
    <div
      class="timeline-frame"
      :style="`top: ${timelineOffset}px`"
    >
      <Timeline2014 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2014" />
      <Timeline2015 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2015" />
      <Timeline2016 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2016" />
      <Timeline2017 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2017" />
      <Timeline2018 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2018" />
      <Timeline2019 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2019" />
      <Timeline2020 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2020" />
      <Timeline2021 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2021" />
      <Timeline2022 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2022" />
      <Timeline2023 class="timeline-year" :keyframe="keyframe" :fired="fired" :all-laws="laws" :progress="timelineProgress" ref="year2023" />
    </div>
    <TimelineLegend :keyframe="keyframe" :progress="timelineProgress" />
    <span v-if="bubblesSvg" v-html="bubblesSvg" hidden aria-hidden="true"/>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 50rem;
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

.timeline-year {
  position: relative;
  padding-top: 1rem;
  padding-left: 2rem;
}

@media (orientation: portrait) {

  @media (--tablets-sm) {
    .timeline-year {
      padding-left: 3rem;
    }
  }
}

@media (orientation: landscape) {

  .timeline-frame {
    padding-top: 1rem;
  }

  .timeline-year {
    display: grid;
    grid-template-columns: [bubbles] 50% [text] 50% [end];
    grid-template-rows: [date] auto [content] auto [end];
    align-items: flex-start;
    padding: 0;
  }

  .timeline-date {
    grid-column-start: text;
    grid-row-start: date;
  }

  .timeline-text-group {
    grid-column-start: text;
    grid-row-start: content;
  }

  .bubble-group {
    grid-column-start: bubbles;
    grid-row-start: content;
    justify-self: end;
    transform-origin: right top;
    margin-inline-end: 1rem;
  }

  @media (--tablets-landscape) {
    .timeline {
        max-width: 60rem;
    }

    .timeline-frame {
      padding-top: 2rem;
    }

    .bubble-group {
      margin-inline-end: 2rem;
    }
  }

  @media (--laptops) {
    .timeline {
        max-width: 74rem;
    }

    .timeline-frame {
      padding-top: 8rem;
    }

    .bubble-group {
      margin-inline-end: 3rem;
    }
  }
}
</style>