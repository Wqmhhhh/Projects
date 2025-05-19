<script setup>
import TabSide from './components/TabSide.vue'
</script>
<template>
  <div class="tac">
    <!-- 侧边栏 -->
    <TabSide></TabSide>

    <!-- router-view -->
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.tac {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

/* router-view:自动占据除侧边tab栏以外的宽度 */
.router-view {
  flex: 1;
  height: calc(100vh - 56px);
  padding-left: 5px;
  background-color: rgb(22, 24, 35);
}
</style>
