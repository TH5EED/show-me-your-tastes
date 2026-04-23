<template>
  <div class="loader-wrap">
    <div class="loader">
      <div v-for="n in 9" :key="n" class="text"><span>{{ text }}</span></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<style scoped>
@import "../../assets/styles/sentence.css";

.loader-wrap {
  display: flex;
  justify-content: center;
  padding: 12px 0 6px;
}
</style>
