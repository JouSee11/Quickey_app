<script setup lang="ts">
interface Props {
  text: string
}

const props = defineProps<Props>()

// const repeatedText = Array(5).fill(`${props.text}`).join(' ')
const repeatedText = props.text
</script>

<template>
  <div class="scroll-container">
    <div class="scroll-wrapper">
      <div class="scroll-content">
        <span>{{ repeatedText }}</span>
      </div>
      <div class="scroll-content" aria-hidden="true">
        <span>{{ repeatedText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  width: 100%;
  max-width: 1500px;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  margin-top: 30px;
}

.scroll-wrapper {
  display: flex;
  width: fit-content;
  animation: scroll-left 40s linear infinite;
  will-change: transform;
}

.scroll-content {
  display: flex;
  flex-shrink: 0;
}

.scroll-content span {
  display: inline-block;
  white-space: nowrap;
  font-size: 3em;
  font-weight: 100;
  color: white;
  padding-right: 2rem;
}
  
@keyframes scroll-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
