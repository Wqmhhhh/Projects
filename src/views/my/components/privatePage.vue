<script setup>
import VideoBoxSmall from '@/components/video/VideoBox-small.vue'
</script>
<template>
  <div class="UperWorksVideosContainer">
    <div class="UperWorksVideosBox">
      <VideoBoxSmall :IntroShow="true"></VideoBoxSmall>
    </div>
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
  /* background-color: #ffffff38; */
}

.UperWorksVideosBox {
  width: 14%;
  height: 50%;
  border-radius: 2.5vh;
  margin: 2vh 1vw;
}
</style>
