<template>
  <div class="son" style="border:3px solid #000;margin:10px">
    <!-- 3.直接使用props的值 -->
    我是Son组件 {{title}}
    <button @click="changeTitle"></button>
  </div>
</template>

<script>
export default {
  name: 'Son-Child',
  // 2.通过props来接受
  props:['title'],
  methods:{
    changeTitle(){
      this.$emit('changeTitle','改名')
    }
  }
}
</script>

<style>

</style>