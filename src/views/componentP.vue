<script setup>
const props = defineProps({
  header: {
    type: String,
  },
  content: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
})

const emit = defineEmits(['cancle', 'confirm'])

const handleCancle = () => {
  emit('cancle')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <div class="container" v-show="props.visible">
    <div class="box">
      <h1>{{ props.header }}</h1>
      <p>{{ props.content }}</p>
      <div class="footer">
        <button @click="handleCancle">取消</button>
        <button @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 40vw;
  height: 30vh;
  border: 1px solid black;
}

.footer {
  display: flex;
  justify-content: end;
}

.footer button:first-child {
  margin-right: 3vw;
}
</style>
