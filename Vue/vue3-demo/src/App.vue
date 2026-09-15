<!-- 加上setup允许在script中直接编写组合式API -->
<script setup>
import { ref} from 'vue'
// import { computed } from 'vue';

const Ref=ref(null)
const focus=()=>{
  Ref.value.focus()
}
</script>

<template>
  <input type="text" ref="Ref">
  <button @click="focus">点击聚焦输入框</button>

  <TextCom ref="Ref"></TextCom>
</template>


<style lang="sss" scoped></style>
