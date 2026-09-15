<script setup>
// 借助编译器宏接收子组件传递的数据
const emit=defineEmits('changeMoney')
const buy = ()=>{
  emit('changeMoney',5)
}
</script>

<template>
  <div>{{ com }}</div>
  <button @click="buy">花钱</button>
</template>

<style>
</style>
