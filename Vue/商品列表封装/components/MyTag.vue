<template>
  <div class="my-tag">
    <input 
      class="input" 
      type="text" 
      placeholder="输入标签" 
      v-if="isEdit" 
      v-focus 
      @blur="isEdit=false" 
      ref="inp"
      :value="value"
      @keyup.enter="handleEnter"
    />
    <div class="text" v-else @dblclick="handelclick">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props:{
    value:{
      type:String,
    }
  },
  data(){
    return{
      isEdit:false,

    }
  },
  methods:{
    handelclick(){
      this.isEdit=true
      // 自动聚焦写法一：
      // this.$nextTick(()=>{
      //   this.$refs.inp.Focus()
      // })
    },
    // 可以通过e获取监听对象的值
    handleEnter(e){
      if(e.target.value.trim()===''){
        return alert('标签内容不能为空！')
      }
      // 子传父，回车时将输入框内容交给父组件
      // 由于父组件为 v-model，需要触发 input 事件
      this.$emit('input',e.target.value)
      this.isEdit=false
    }
    
  }
};
</script>

<style lang="less" scoped>
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
</style>