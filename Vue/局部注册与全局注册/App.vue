<!-- 普通组件的注册和使用 -->
<template>
  <div class="App">
    <SheHeader></SheHeader>
    <SheMain></SheMain>
    <SheFooter></SheFooter>
  </div>
  
</template>

<script>
import SheHeader from './components/SheHeader.vue'
import SheMain from './components/SheMain.vue'
import SheFooter from './components/SheFooter.vue'

export default {
  components:{
    // "组件名"："组件对象"   遵循大驼峰命名
    SheFooter,
    SheHeader,
    SheMain
  }

}
</script>

<style>
.App{
  width: 50vw;
  height: 60vh;
}

</style>