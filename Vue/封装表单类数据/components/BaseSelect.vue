<template>
  <div>
    <!-- v-model不能和父组件传的数据绑定，需要进行功能的拆分 -->
    <select :value="value" @change="selectCity">
      <option value="101">北京</option>
      <option value="102">上海</option>
      <option value="103">武汉</option>
      <option value="104">广州</option>
      <option value="105">深圳</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  methods: {
    selectCity(e) {
      // 通过 e.target.value 拿到数据
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style>
</style>