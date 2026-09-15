<script setup>
// import Son1Com from './components/Son1Com.vue';
// import Son2Com from './components/Son2Com.vue';
import { useCountStore } from './store/counter';
import { useChannelStore } from './store/channel';

const counter=useCountStore()
console.log(counter.count)
const channel=useChannelStore()
console.log(channel.channelList)
channel.getList()
</script>

<template>
  <div>App.vue根组件
    <!-- <Son1Com></Son1Com>
    <Son2Com></Son2Com> -->
  </div>
</template>

<style scoped></style>
