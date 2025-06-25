<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, onMounted, onUnmounted } from 'vue'

</script>

<template>
  <div class="unsupported-container">
    <div class="unsupported-content">
      <Icon icon="material-symbols:devices" class="unsupported-icon" />
      <h1 class="unsupported-title">Device Not Supported</h1>
      <p class="unsupported-message">
        This page is not supported by your device, or your screen width.
      </p>
      <p class="unsupported-details">
        Please use a desktop or tablet device with bigger screen width.
      </p>
      <!-- <div class="current-width">
        Current width: <span>{{ screenWidth }}px</span>
      </div> -->
    </div>
  </div>
</template>


<style scoped>
.unsupported-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background: linear-gradient(135deg, var(--primary-1000), var(--blue-dark)); */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.unsupported-content {
  text-align: center;
  max-width: 400px;
  background: var(--primary-800);
  padding: 40px 30px;
  border-radius: var(--border-rad-main);
  border: 1px solid var(--primary-600);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.unsupported-icon {
  width: 80px;
  height: 80px;
  color: var(--primary-50);
  margin-bottom: 20px;
}

.unsupported-title {
  font-size: var(--big-title-text);
  color: var(--primary-0);
  margin-bottom: 20px;
  font-weight: bold;
}

.unsupported-message {
  font-size: var(--bigger-text);
  color: var(--gray-bright);
  margin-bottom: 15px;
  line-height: 1.5;
}

.unsupported-details {
  font-size: var(--normal-text);
  color: var(--gray-main);
  margin-bottom: 20px;
  line-height: 1.4;
}

.current-width {
  font-size: var(--small-text);
  color: var(--primary-50);
  padding: 10px;
  background: var(--primary-600);
  border-radius: var(--border-rad-smaller);
}

.current-width span {
  font-weight: bold;
  color: var(--primary-0);
}
</style>