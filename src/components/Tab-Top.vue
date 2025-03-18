<script setup>
import { ref } from 'vue'
const Tab = [
  { name: '充钻石', icon: 'icon-biaoqianlan_jingxuan' },
  { name: '客户端', icon: 'icon-xiazai' },
  { name: '通知', icon: 'icon-tongzhizhongxin' },
  { name: '私信', icon: 'icon-sixin' },
  { name: '投稿', icon: 'icon-tianjia' },
]
let isfocus = ref(false)
const handleFocus = () => {
  isfocus.value = true
}
const handleBlur = () => {
  isfocus.value = false
}
</script>
<template>
  <div id="app" class="tab">
    <div class="logo">
      <img src="../assets/image.png" alt="" />
      <span class="tab-title">抖音</span>
    </div>

    <div class="search" ref="search" :class="{ focus: isfocus }">
      <input
        type="text"
        name=""
        id=""
        placeholder="搜索你感兴趣的内容"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <hr />
      <span>
        <i class="iconfont icon-sousuo"></i>
        搜索
      </span>
    </div>

    <div class="down-box">
      <div
        v-for="(item, index) in Tab"
        :key="index"
        @click="activeTab = item.name"
        class="down"
      >
        <i class="iconfont" :class="item.icon"></i>
        <div class="icon-text">{{ item.name }}</div>
      </div>
    </div>

    <div class="pic-box">
      <img src="../assets/image.ico" alt="" class="pic" />
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.tab {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 12vh;
  display: flex;
  background-color: rgb(25, 27, 38);
  /* background-color: transparent; */
  padding: 1vh 2vw;
  justify-content: space-between;
  text-align: center;
  flex-wrap: nowrap;
  align-items: center;
}

.logo,
.search,
.pic-box,
.down-box,
.down {
  /* flex布局使元素垂直居中 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* logo */
.logo {
  width: 6vw;
}
.tab-title {
  font-size: 4vh;
  font-weight: bold;
  color: #fff;
}
.logo img {
  width: 5vh;
}

/* search */
.search {
  height: 8vh;
  width: 35vw;
  margin: 0 12vw;
  background-color: #ffffff28;
  border-radius: 5vh;
  padding: 0 2vw;
}
.focus {
  border: #fff 0.3vw solid;
}
input {
  width: 20vw;
  margin: 0 1vw;
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 3vh;
  color: #fff;
}
hr {
  width: 0;
  height: 4vh;
  margin: 0 1vw;
  border: 0.1vw solid #ffffff3a;
}
.search span {
  font-size: 3vh;
  color: #fff;
}
.search span:hover {
  cursor: pointer;
}

/* down */
.down-box {
  width: 20vw;
  height: 10vh;
}
.down {
  height: 100%;
  justify-content: center;
  width: 3vw;
  flex-wrap: wrap;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 4vh;
  color: #fff;
}
.icon-text {
  font-size: 2vh;
  color: #fff;
}

/* pic */
.pic {
  width: 8vh;
  border-radius: 8vh;
}
</style>
