<script setup lang="ts">
import { KEY_2014_COLLAPSE, KEY_2014_START, KEY_2023_COLLAPSE } from '@/helpers/timelineKeyframes';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const props = defineProps({
  keyframe: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    required: true,
  },
})
const open = ref<Boolean>(false)

let visible = computed(() => {
  return props.keyframe >= KEY_2014_COLLAPSE && props.progress < 1;
})

/**
 * Fixes a bug in iOS Safari where the bubble SVGs
 * did not appear. This is probably because the <use>
 * tags reference a path id that isn't yet available
 * in the DOM because the source svg hasn't loaded.
 *
 * We use this property to prevent the legend from
 * being mounted on the DOM until the user reaches
 * the timeline. By then, hopefully, the source SVG
 * file will be mounted.
 */
let delayedMount = computed(() => {
  return props.keyframe >= KEY_2014_START
})
</script>

<template>
  <button
    v-if="delayedMount"
    class="timeline-legend fade"
    :class="[
      open ? 'timeline-legend-open' : 'timeline-legend-closed',
      visible ? 'fade-in' : 'fade-out'
    ]"
    @click="open = !open"
    aria-hidden="true"
  >
    <div class="timeline-legend-content">
      <h2
        class="timeline-legend-heading"
      >
        <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
          <use xlink:href="#bubble-ineffect-1" />
        </svg>
        <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
          <use xlink:href="#bubble-dead-1" />
        </svg>
        <span class="timeline-legend-heading-text">Legend</span>
      </h2>
      <div class="timeline-legend-details">
        <div class="timeline-legend-section">
          <h3>
            Status of Legislation
            <span class="timeline-legend-section-header-small">
              as of 2023
            </span>
          </h3>
          <ul class="timeline-legend-items">
            <li class="timeline-legend-item nowrap">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-ineffect-1" />
              </svg>
              In Effect
            </li>
            <li class="timeline-legend-item">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-pending-1" />
              </svg>
              Pending
            </li>
            <li class="timeline-legend-item">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-dead-1" />
              </svg>
              Dead
            </li>
            <li class="timeline-legend-item timeline-legend-item-struck-down">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-defeated-1" />
              </svg>
              Struck Down in Court
            </li>
          </ul>
        </div>
        <div class="timeline-legend-section">
          <h3>
            Targets of Anti-Boycott Legislation
          </h3>
          <ul class="timeline-legend-items timeline-legend-items-two-cols">
            <li class="timeline-legend-item timeline-legend-item-israel">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-ineffect-1" />
              </svg>
              Israel Boycott (BDS)
            </li>
            <li class="timeline-legend-item timeline-legend-item-fossil">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-ineffect-2" />
              </svg>
              Fossil Fuel Boycott
            </li>
            <li class="timeline-legend-item timeline-legend-item-guns">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-ineffect-3" />
              </svg>
              Gun Lobby Boycott
            </li>
            <li class="timeline-legend-item timeline-legend-item-esg">
              <svg viewBox="0 0 26.458333 26.458333" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#bubble-ineffect-4" />
              </svg>
              Multiple types of boycotts and/or sustainable investment
            </li>
          </ul>
        </div>
        <div class="timeline-legend-close">
          Close
          <svg width="128" height="128" viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M87.3658 -2.94636e-05H122.195C125.412 -2.94636e-05 128 2.63342 128 5.90676V41.3475C128 43.7348 126.597 45.9007 124.42 46.8113C122.243 47.7219 119.752 47.2297 118.083 45.5315L108.65 35.933L86.9634 58L71 41.7809L92.687 19.7139L83.254 10.0907C81.5851 8.39254 81.1014 5.85754 81.9963 3.64249C82.8912 1.42744 85.0197 -2.94636e-05 87.3658 -2.94636e-05Z"/>
            <path d="M20.152 11.5151C15.5447 6.82831 8.06263 6.82831 3.45541 11.5151C-1.1518 16.2018 -1.1518 23.8132 3.45541 28.4999L42.3034 67.9812L3.49227 107.5C-1.11495 112.187 -1.11495 119.798 3.49227 124.485C8.09949 129.172 15.5816 129.172 20.1888 124.485L59 84.9661L97.848 124.447C102.455 129.134 109.937 129.134 114.545 124.447C119.152 119.761 119.152 112.149 114.545 107.463L20.152 11.5151Z"/>
          </svg>
        </div>
      </div>
    </div>
  </button>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.timeline-legend {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  max-width: 26rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: var(--color-white);
  background: var(--color-dark-blue);
  border: 1px dashed var(--color-white);
  border-radius: 0.5rem;
  z-index: 999;
  text-align: left;
  overflow: hidden;

  & svg {
    width: 0.75rem;
    height: auto;
  }
}

.timeline-legend-heading {
  display: flex;
  gap: 0.125rem;
  height: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: var(--txt-black);
  text-transform: uppercase;
  letter-spacing: 0.1em;

  & svg {
    width: 1rem;
    fill: var(--color-blue);
  }
}

.timeline-legend-heading-text {
  margin-inline-start: 0.25rem;
}

.timeline-legend-section {
  margin-top: 2rem;

  & h3 {
    font-size: 0.875rem;
    font-weight: var(--txt-black);
    text-transform: uppercase;

    & .timeline-legend-section-header-small {
      display: block;
      font-size: 0.65rem;
      font-weight: var(--txt-medium);
      text-transform: none;
    }
  }
}

.timeline-legend-items {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-inline-start: 0;
  font-size:  0.75rem;
}

.timeline-legend-items-two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.timeline-legend-item {
  display: grid;
  grid-template-columns: 1rem auto;
  gap: 0.25rem;
  list-style: none;
  font-weight: var(--txt-medium);

  &:first-child() {
    white-space: nowrap;
  }
}

.timeline-legend-items svg {
  width: 1rem;
  fill: var(--color-white);
}

.timeline-legend-item-struck-down svg {
  fill: var(--color-red);
}

.timeline-legend-item-israel svg {
  fill: var(--color-blue)
}

.timeline-legend-item-fossil svg {
  fill: var(--color-purple)
}

.timeline-legend-item-guns svg {
  fill: var(--color-green)
}

.timeline-legend-item-esg svg {
  fill: var(--color-orange)
}

.timeline-legend-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-legend-closed {
  width: 8rem;
  height: 3rem;
  transition: all 0.3s 0.3s;

  & .timeline-legend-details {
    opacity: 0;
    transition: all 0.3s;
  }
}

.timeline-legend-open {
  width: calc(100vw - 1rem);
  height: 21rem;
  overflow: visible;
  transition: all 0.3s;

  & .timeline-legend-details {
    opacity: 1;
    transition: all 0.3s 0.3s;
  }
}

@media (min-width: 380px) {
  .timeline-legend-section h3 {
    font-size: 1rem;
  }
}

@media
  (orientation: portrait) and (--tablets-sm),
  (orientation: landscape) and (--tablets-landscape)
  {

  @media (--tablets-sm) {
    .timeline-legend {
      max-width: 40rem;

      & svg {
        width: 1rem;
      }
    }

    .timeline-legend-open {
      height: 30rem;
    }

    .timeline-legend-heading {
      font-size: 1rem;
    }

    .timeline-legend-closed {
      width: 9rem;
    }

    .timeline-legend-section {
      margin-top: 4rem;

      & h3 {
        font-size: 1.5rem;

        & .timeline-legend-section-header-small {
          font-size: 1rem;
        }
      }
    }

    .timeline-legend-items {
      font-size:  1.25rem;
      gap: 2rem;
    }

    .timeline-legend-item {
      grid-template-columns: 1.5rem auto;
      gap: 0.5rem;

      & svg {
        width: 1.5rem;
      }
    }
  }
}
</style>