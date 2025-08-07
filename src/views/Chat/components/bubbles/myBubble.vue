<script setup></script>
<template>
  <div class="container">
    <div class="text">
      <slot name="text"></slot>
    </div>

    <!-- <div class="image">
      <slot name="image"></slot>
    </div> -->

    <div class="pic"></div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container {
  width: 830px;
  padding: 5px 15px;
  display: flex;
  justify-content: end;
  align-content: start;
}
.pic {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  margin-left: 10px;
  background-image: url(@/assets/pic2.png);
  background-size: cover;
  background-position: center;
}
.text {
  background-color: rgb(49, 49, 49);
  border-radius: 13px;
  font-size: 16px;
  min-height: 30px;
  min-width: 40px;
  max-width: 500px;
  line-height: 25px;
  font-weight: normal;
  color: #ffffffb2;
  padding: 5px 10px;
  word-wrap: break-word; /* 允许长单词或无法使用断点的URL强制换行 */
  word-break: break-all; /* 强制换行，即使单词太长也会换行 */
  white-space: normal;
}
</style>
