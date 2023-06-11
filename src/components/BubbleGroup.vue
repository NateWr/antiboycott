<script setup lang="ts">
const props = defineProps({
  bubbles: {
    type: Array<String>,
    required: true
  },
})

let i = 0;

function onBeforeEnter(el) {
  i++
  el.style['transition-delay'] = (i * 0.05) + 's'
}

function onBeforeLeave(el) {
  i--
  el.style['transition-delay'] = (i * 0.025) + 's'
}
</script>

<template>
  <div class="bubble-group">
    <TransitionGroup name="bubble" @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
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
    transition: all 0.15s;
}

.bubble-dead {
    border: 1vw solid var(--color-blue);
}

.bubble-ineffect {
    border: 1vw solid var(--color-blue);
    background: var(--color-blue);
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
}

.bubble-enter-to,
.bubble-leave-from {
  opacity: 1;
}
</style>