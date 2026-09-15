<template>
  <div>
    <h1 v-color="color1">指令的值1测试</h1>
    <h1 v-color="color2">指令的值2测试</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color1:'red',
      color2:'green'
    }
  },
  directives:{
    color:{
      // inserted提供的是元素被添加到页面中时触发，后续的值变化，dom不更新
      inserted(el,binding){
        el.style.color=binding.value
      },
      // update指令的值修改时触发，提供值的变化后，dom更新
      update(el,binding){
        el.style.color=binding.value
      },
    }
  }
}
</script>

<style>

</style>