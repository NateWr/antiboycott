<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps({
  bubbles: {
    type: Array<String>,
    required: true
  },
})

function onBeforeEnter(el) {
  el.style.opacity = 0
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    delay: el.dataset.index * 0.1,
    onComplete: done
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    delay: el.dataset.index * 0.1,
    onComplete: done
  })
}
</script>

<template>
  <div class="bubble-group">
    <TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div v-for="(bubble, index) in bubbles" class="bubble" :class="'bubble-' + bubble" :key="index"
        :data-index="index" />
    </TransitionGroup>
  </div>
</template>

<style lang="postcss">
.bubble-group {
    display: flex;
    flex-wrap: wrap;
}

.bubble {
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    border: 1vw solid var(--color-white);
}

.bubble-dead {
    border: 1vw solid var(--color-blue);
}

.bubble-ineffect {
    border: 1vw solid var(--color-blue);
    background: var(--color-blue);
}
</style>