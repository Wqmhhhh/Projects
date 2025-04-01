<script setup>
import { onMounted, ref } from 'vue'
import LoginPopUp from '@/components/Login-PopUp.vue'
import { useRouter } from 'vue-router'

const Tab = [
  { path: '/main/recommend', name: '推荐', icon: 'icon-sijiaoxing' },
  { path: '/main/follow', name: '关注', icon: 'icon-wodeguanzhu' },
  { path: '/main/friends', name: '朋友', icon: 'icon-friend' },
  { path: '/main/my', name: '我的', icon: 'icon-wode' },
]
const TabFix = [
  {
    id: 'TabFix1',
    icon: 'icon-shezhi',
  },
  {
    id: 'TabFix2',
    icon: 'icon-gengduo',
  },
  {
    id: 'TabFix3',
    icon: 'icon-changjianwentixiangguanwenti',
  },
]

// 视口大小变换时Tab栏变化
let isCollapse = ref(false)
onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1100) {
      isCollapse.value = true
      document.querySelector('.author').style.display = 'none'
    } else {
      isCollapse.value = false
      document.querySelector('.author').style.display = 'inline-block'
    }
  })
})

// router变化
const router = useRouter()
let activeIndex = ref('/main/recommend')
router.push('/main/recommend')
const handleTabClick = (path) => {
  router.push(path)
  activeIndex.value = path
}
</script>
<template>
  <el-row class="tac">
    <el-col :span="3" class="el-col1">
      <el-menu
        class="el-menu el-menu-tab"
        :collapse="isCollapse"
        :default-active="activeIndex"
      >
        <el-menu-item
          class="el-menu-item el-menu-item-tab"
          :class="[
            { el_menu_tab_collapse: isCollapse },
            { activeIndex: activeIndex === item.path },
          ]"
          v-for="item in Tab"
          :index="item.path"
          :key="item.path"
          @click="handleTabClick(item.path)"
        >
          <el-icon><i class="iconfont" :class="item.icon"></i></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>

      <div class="space">
        <p class="author">@乌漆抹黑嘿嘿嘿</p>
      </div>

      <el-menu class="el-menu el-menu-fix" :collapse="isCollapse">
        <div class="fix-box">
          <div
            class="el-menu-item el-menu-item-fix"
            :index="index.toString()"
            v-for="(item, index) in TabFix"
            :key="index"
            :span="3"
          >
            <i class="iconfont" :class="item.icon"></i>
          </div>
        </div>
      </el-menu>
    </el-col>

    <el-col :span="21" class="el-col2">
      <div class="router-view">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
  <LoginPopUp></LoginPopUp>
</template>
<style scoped>
.tac {
  width: 100%;
  text-align: center;
}
.el-col1,
.el-col2,
.el-menu,
.space {
  background-color: rgb(25, 27, 38);
}
.el-col1 {
  overflow: auto;
  scrollbar-width: none;
}
.el-menu {
  width: 100%;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 5vh;
  line-height: 4vh;
}
.el-menu,
.el-menu-item,
.el-menu-item-tab,
.space,
.fix-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.el-menu-item {
  justify-content: center;
  background-color: rgb(25, 27, 38);
  color: #ffffff98;
  font-weight: 500;
  font-size: 3vh;
  width: 100%;
}
.el-menu {
  border: 0;
}

/* Tab */
/* 正常大小 */
.el-menu-item-tab {
  text-align: center;
  width: 65%;
  height: 100%;
  padding: 3% 10%;
  margin: 10% auto;
  border-radius: 3vh;
  display: flex;
  justify-content: space-between;
}
.el-menu-tab > .el-menu-item:hover {
  background-color: #b4b4b410;
  color: #fff;
}
.el-menu-tab > .el-menu-item:focus,
.el-menu-tab > .el-menu-item:active,
.el-menu-tab > .activeIndex {
  background-color: #ffffff27;
  color: #fff;
}
/* 折叠后 */
.el_menu_tab_collapse {
  width: 55%;
  height: 25vh;
  line-height: 25vh;
  display: block;
  text-align: center;
}

/* space */
.space {
  width: 100%;
  height: 50%;
  justify-content: center;
  color: #ffffff69;
  font-size: 2vh;
}

/* Fix */
.fix-box {
  position: fixed;
  bottom: 0;
  width: 12.5%;
  height: 10vh;
  border-top: #ffffff44 solid 0.1vh;
}
.el-menu-item-fix {
  justify-content: space-around;
  text-align: center;
  height: 100%;
  width: 33%;
  padding: 0;
  color: #ffffff6e;
}
.el-menu-item-fix:hover {
  color: #fff;
}

/* router-view */
.router-view {
  width: 86%;
  position: fixed;
  top: 10vh;
  left: 12.5vw;
}
</style>
