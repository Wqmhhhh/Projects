<script setup>
import VideoSmallBox from './VideoSmallBox.vue'
</script>
<template>
  <div class="UperWorksVideosContainer">
    <VideoSmallBox></VideoSmallBox>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.UperWorksVideosContainer {
  width: 100%;
  height: 99%;
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
}
</style>
