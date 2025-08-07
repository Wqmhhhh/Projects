<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useShowFlags } from '@/stores'
import { Search } from '@element-plus/icons-vue'

const flagStore = useShowFlags()
const { ifChatHisShow } = storeToRefs(flagStore)

const searchInput = ref('')

// 关闭弹框
const handleClose = () => {
  ifChatHisShow.value = false
}

// 暂时信息
const name = 'wwwwww'
const time = '09:05'
const content =
  '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
const chatHis = ref([1, 1, 1, 1, 1, 1, 1, 1, 1, , 1])
</script>

<template>
  <el-dialog
    v-model="ifChatHisShow"
    class="el-dialog-chatHis--container"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <div class="header">
      <div>与“{{ name }}”的聊天记录</div>
      <i class="iconfont icon-guanbi" @click="handleClose"></i>
    </div>

    <template #footer>
      <div class="footer">
        <!-- 搜索框 -->
        <div class="search">
          <el-icon class="seachIcon"><Search></Search></el-icon>
          <input
            type="text"
            name=""
            id=""
            v-model="searchInput"
            class="searchInput"
          />
        </div>

        <!-- 聊天记录 -->
        <div class="chatHis">
          <div class="chatHisList" v-if="chatHis.length > 0">
            <div class="each" v-for="(item, index) in chatHis" :key="index">
              <div class="eachLeft">
                <img src="@/assets/pic2.png" alt="头像" />
              </div>
              <div class="eachRight">
                <div class="eachRTop">
                  <div class="name">{{ name }}</div>
                  <div class="time">{{ time }}</div>
                </div>
                <div class="eachRBottom">
                  {{ content }}
                </div>
              </div>
            </div>
          </div>

          <!-- 默认消息 -->
          <div class="default" v-else>没有你与“{{ name }}”的聊天记录</div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* 标题 */
.header {
  height: 15px;
  text-align: center;
  font-size: 15px;
  line-height: 15px;
  position: relative;
  color: black;
}
.iconfont {
  font-family: 'iconfont';
  font-size: 15px;
}
.icon-guanbi {
  position: absolute;
  right: 15px;
  top: 0;
  color: rgb(106, 106, 103);
}
.icon-guanbi:hover {
  cursor: pointer;
  color: rgb(0, 0, 0);
}

/* 搜索框 */
.search {
  margin: 0 auto;
  height: 30px;
  width: 500px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
}
.seachIcon {
  color: #53515197;
}
.searchInput {
  width: 93%;
  font-size: 14px;
  height: 100%;
  background-color: #ffffff;
  outline: none;
  border: 0;
}

/* 聊天记录 */
.chatHis {
  margin-top: 8px;
  height: calc(450px - 84px);
  width: 650px;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: #e0e0e0;
  padding: 0 1vw;
}
.each {
  margin: 1vh 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.eachLeft {
  width: 40px;
  height: 40px;
  background-color: #000000;
  overflow: hidden;
  border-radius: 0.5vh;
  margin-top: 1vh;
}
.eachLeft img {
  width: 100%;
  height: 100%;
}
.eachRight {
  width: 530px;
}
.eachRTop {
  display: flex;
  justify-content: space-between;
  color: #00000090;
  font-size: 13px;
  color: #6b6b6b;
}
.eachRBottom {
  font-size: 15px;
  text-align: left;
}
.default {
  font-size: 17px;
  color: #000000cb;
  text-align: center;
  margin-top: 130px;
}
</style>

<style>
.el-dialog-chatHis--container {
  background-color: #e9e9e9;
  height: 450px;
  width: 650px;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
}
</style>
