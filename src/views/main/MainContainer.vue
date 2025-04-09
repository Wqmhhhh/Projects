<script setup>
import { onMounted, ref } from 'vue'
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
      document.querySelector('.el-col1').style.width = '50px'
      document.querySelector('.fix-box').style.width = '50px'
      document.querySelector('.fix-box').style.height = '100px'
    } else {
      isCollapse.value = false
      document.querySelector('.el-col1').style.width = '150px'
      document.querySelector('.fix-box').style.width = '150px'
      document.querySelector('.fix-box').style.height = '50px'
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
    <el-col span="3" class="el-col1">
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

      <el-menu class="fix-box" :collapse="isCollapse">
        <el-menu-item
          class="el-menu-item-fix"
          :index="index.toString()"
          v-for="(item, index) in TabFix"
          :key="index"
          span="3"
        >
          <i class="iconfont" :class="item.icon"></i>
        </el-menu-item>
      </el-menu>
    </el-col>

    <div class="router-view">
      <router-view></router-view>
    </div>
  </el-row>
</template>
<style scoped>
.tac {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.el-col1,
.el-col2,
.el-menu,
.space {
  background-color: transparent;
  background-color: rgb(22, 24, 35);
}

/* flex */
.el-menu-tab,
.el-menu-item-tab,
.space,
.fix-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}

.el-col1 {
  width: 150px;
  height: 100vh;
  display: flex;
  align-content: space-between;
}
.el-menu-tab {
  /* flex: 1; */
  width: 100%;
  height: 50%;
  border: 0;
  justify-content: center;
  overflow: scroll;
  scrollbar-width: none;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 23px;
}
.el-menu-item {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  background-color: transparent;
  color: #ffffff98;
  font-weight: 500;
  font-size: 17px;
}

/* Tab */
/* 正常大小 */
.el-menu-item-tab {
  width: 85%;
  height: 50px;
  line-height: 50px;
  margin: 20px auto;
  border-radius: 15px;
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
  padding-top: 10px;
}

/* Fix */
.fix-box {
  border: 0;
  position: fixed;
  bottom: 0px;
  width: 150px;
  height: 50px;
}
.el-menu-item-fix {
  width: 30px;
  height: 33px;
}
.el-menu-item-fix:hover {
  color: #fff;
}

/* router-view:自动占据除侧边tab栏以外的宽度 */
.router-view {
  flex: 1;
  height: calc(100vh - 56px);
  padding-left: 5px;
}
</style>
