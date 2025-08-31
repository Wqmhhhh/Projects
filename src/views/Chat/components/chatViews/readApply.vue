<script setup>
import { onMounted, ref, watch } from 'vue'

import { useChatUserInfo } from '@/stores'
import { storeToRefs } from 'pinia'
const { id } = storeToRefs(useChatUserInfo())

// 导入接口
import { acceptApplication, rejectApplication } from '@/api/chat'
import { ElMessage } from 'element-plus'

const props = defineProps({
  item: {
    type: Object,
  },
})

const buttonText = ref()
const ifDisabled = ref(false)
const ifRejectShow = ref(false)
const ifAgreeshow = ref(true)

const handleButtonText = () => {
  if (id.value === props.item.account_id_2) {
    buttonText.value = props.item.status

    if (props.item.status === '已同意') {
      ifRejectShow.value = false
      ifDisabled.value = true
      return
    } else if (props.item.status === '已拒绝') {
      ifRejectShow.value = false
      ifAgreeshow.value = true
      ifDisabled.value = true
      return
    } else if (props.item.status === '等待验证') {
      buttonText.value = '同意申请'
      ifRejectShow.value = true
      ifDisabled.value = false
      ifAgreeshow.value = true
      return
    }
  } else {
    buttonText.value = '已发送申请'
    ifDisabled.value = true
    ifRejectShow.value = false
  }
}

// 处理同意申请
const handleAgree = async () => {
  if (ifDisabled.value) {
    return
  }

  try {
    const res = await acceptApplication(props.item.account_id_1, props.item.create_at)
    console.log('同意申请返回值', res)

    buttonText.value = '已同意'
    ifDisabled.value = true
    ifRejectShow.value = false
  } catch (e) {
    console.log('同意申请失败', e)
    ElMessage.error('同意申请失败，请稍后再试')
    return
  }
}

// 处理拒绝好友申请
const handleReject = async () => {
  if (ifDisabled.value) {
    return
  }

  try {
    const res = await rejectApplication(props.item.account_id_1, props.item.create_at)
    console.log('拒绝申请返回值', res)

    buttonText.value = '已拒绝'
    ifDisabled.value = true
    ifRejectShow.value = false
  } catch (e) {
    console.log('拒绝申请失败', e)
    ElMessage.error('拒绝申请失败，请稍后再试')
    return
  }
}

// item更新再次调用函数
watch(
  () => props.item,
  () => {
    handleButtonText()
  }
)

onMounted(() => {
  handleButtonText()
})
</script>

<template>
  <div class="container">
    <!-- 信息列表区域 -->
    <div class="info-list space-y-6">
      <!-- 头像信息项 -->
      <div class="info-item">
        <span class="info-label">头像</span>
        <div class="info-content">
          <div class="userPic">
            <img :src="props.item.avatar" class="avatar" />
          </div>
        </div>
      </div>

      <!-- 用户名信息项 -->
      <div class="info-item flex">
        <span class="info-label">名称</span>
        <div class="info-content user-name">
          {{ props.item.name }}
        </div>
      </div>

      <!-- 用户ID信息项（不可编辑） -->
      <div class="info-item">
        <span class="info-label">申请信息</span>
        <div class="info-content user-id">
          {{ props.item.apply_msg }}
        </div>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="buttons">
      <div
        class="dialog-footer"
        @click="handleAgree"
        :class="{ disabled: ifDisabled }"
        v-show="ifAgreeshow"
      >
        {{ buttonText }}
      </div>
      <div
        class="dialog-footer"
        @click="handleReject"
        v-show="ifRejectShow"
        :class="{ reject: ifRejectShow && ifAgreeshow }"
      >
        拒绝申请
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-weight: normal;
  color: #ffffffcb;
}

/* flex */
.info-item,
.info-item:first-of-type .info-content,
.userPic {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  width: 90%;
  height: 50%;
  margin: 0 auto;
}

.info-list {
  width: 100%;
  margin: 30px auto;
  font-size: 16px;
}
.userPic {
  height: 80px;
  aspect-ratio: 1;
  border: 2px dashed rgba(0, 0, 0, 0.247);
  justify-content: center;
  align-items: start;
  border-radius: 10px;
  overflow: hidden;
}
.userPic img {
  width: 100%;
}
.iconfont {
  font-family: 'iconfont';
}
.info-item {
  margin: 25px 0;
}

.buttons {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog-footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  background-color: rgb(0, 102, 204);
}
.dialog-footer:hover {
  cursor: pointer;
  background-color: rgba(0, 102, 204, 0.712);
}
.disabled {
  background-color: rgba(0, 102, 204, 0.712);
  cursor: alias;
}
.reject {
  margin-left: 150px;
}
</style>
