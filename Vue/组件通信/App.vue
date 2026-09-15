<template>
  <div class="app" style="border: 3px solid #000; margin: 10px">
    我是APP父组件
    <!-- 1.给组件标签以添加属性方式赋值 -->
    <Son :title="myTitle" @changeTitle="handleChange"></Son>
  </div>
</template>

<script>
import Son from './components/Son.vue'
export default {
  name: 'App',
  data() {
    return {
      myTitle: 'Father',
    }
  },
  components: {
    Son,
  },
  methods:{
    handleChange(newTitle){
      console.log(newTitle)
    }
  }
}
</script>

<style>
</style>