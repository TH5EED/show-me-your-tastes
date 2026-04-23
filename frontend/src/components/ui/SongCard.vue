<template>
  <div class="song-card card-shadow" :style="cardStyle">
    <div class="song-card-bg" :style="cardStyle">
      <div class="song-card-bg-inner"></div>
    </div>

    <div class="song-card-center">
      <img class="cover-image" :src="cover" :alt="title" />
    </div>

    <div class="song-card-content">
      <div class="song-card-meta">
        <span class="song-title">{{ title }}</span>
        <span class="song-artist">{{ artist }}</span>
        <div class="song-year">{{ year }}</div>
      </div>

      <div class="song-side">
        <span>Album</span>
        <button class="arrow-btn" type="button" aria-label="add song">
          <svg viewBox="0 0 12 12" class="arrow-icon" aria-hidden="true">
            <path
              d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  artist: string;
  year: string;
  cover: string;
  fromColor: string;
  toColor: string;
}>();

const cardStyle = computed(() => ({
  background: `linear-gradient(145deg, ${props.fromColor}, ${props.toColor})`
}));
</script>

<style scoped>
@import "../../assets/styles/card-shadow.css";

.song-card {
  width: 240px;
  height: 240px;
  position: relative;
  border: 1px solid rgb(255 255 255 / 0.4);
  border-radius: 18px;
  overflow: hidden;
}

.song-card-bg {
  width: 100%;
  height: 100%;
  padding: 4px;
  position: absolute;
}

.song-card-bg-inner {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  border-top-right-radius: 64px;
  border-bottom-right-radius: 28px;
  background: rgb(22 22 26 / 0.52);
}

.song-card-center {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  border-radius: 18px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.06) contrast(1.03);
}

.song-card-content {
  width: 100%;
  height: 33.33%;
  padding: 8px 9px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(6px);
  background: rgb(9 9 12 / 0.38);
  border-top: 1px solid rgb(255 255 255 / 0.16);
}

.song-card-meta {
  width: 75%;
  padding: 2px 2px 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  color: #e5e7eb;
}

.song-title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
}

.song-artist {
  margin-top: 3px;
  font-size: 11px;
  color: #d0d0d4;
}

.song-year {
  width: 100%;
  margin-top: 6px;
  text-align: left;
  font-size: 10px;
  color: #d0d0d4;
}

.song-side {
  height: 100%;
  padding-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 10px;
  color: rgb(255 255 255 / 0.72);
}

.arrow-btn {
  width: 28px;
  height: 28px;
  margin-top: auto;
  border: 0;
  border-radius: 999px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: rgb(255 255 255 / 0.85);
  background: rgb(249 250 251 / 0.2);
  backdrop-filter: blur(10px);
}

.arrow-btn:hover {
  background: rgb(249 250 251 / 0.3);
}

.arrow-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
</style>
