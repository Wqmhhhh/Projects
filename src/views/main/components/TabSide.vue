<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Tab栏信息
const Tab = [
  { path: '/main/recommend', name: '推荐', icon: 'icon-sijiaoxing' },
  { path: '/main/follow', name: '关注', icon: 'icon-wodeguanzhu' },
  { path: '/main/friends', name: '朋友', icon: 'icon-friend' },
  { path: '/main/my', name: '我的', icon: 'icon-wode' },
]
// 底部固定Tab栏信息
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

const activeIndex = ref()

const router = useRouter()

// 初始化路径为当前Tab栏路由路径
const initialActiveIndex = () => {
  activeIndex.value = router.currentRoute.value.path
  if (activeIndex.value.toString().includes('/main/my')) {
    activeIndex.value = '/main/my'
  }
}

// 点击Tab栏按钮router变化
const handleTabClick = (path) => {
  router.push(path)
  activeIndex.value = path
}

onMounted(() => {
  initialActiveIndex()
})
</script>
<template>
  <div class="el-col1">
    <!-- 侧边栏 -->
    <el-menu class="el-menu el-menu-tab" :default-active="activeIndex">
      <el-menu-item
        class="el-menu-item el-menu-item-tab"
        :class="{ activeIndexStyle: activeIndex === item.path }"
        v-for="(item, index) in Tab"
        :index="index.toString()"
        :key="index"
        @click="handleTabClick(item.path)"
      >
        <el-icon>
          <i class="iconfont" :class="item.icon"></i>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>

    <!-- 底部固定Tab栏 -->
    <el-menu class="fix-box">
      <el-menu-item
        class="el-menu-item-fix"
        :index="index.toString()"
        v-for="(item, index) in TabFix"
        :key="index"
      >
        <i class="iconfont" :class="item.icon"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.el-col1,
.el-menu,
.space {
  background-color: rgb(22, 24, 35);
}

/* flex */
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
  align-content: top;
}
.el-menu-tab {
  width: 100%;
  height: 63%;
  border: 0;
  justify-content: start;
  flex-direction: column;
  align-content: start;
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
.el-menu-tab > .activeIndexStyle {
  background-color: #ffffff27 !important;
  color: #fff !important;
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
</style>
