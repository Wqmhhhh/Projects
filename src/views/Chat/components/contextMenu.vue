<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
})

const virtualRef = ref({
  getBoundingClientRect: () => ({
    x: props.position.x,
    y: props.position.y,
    width: 0,
    height: 0,
    top: props.position.y,
    right: props.position.x,
    bottom: props.position.y,
    left: props.position.x,
  }),
})
</script>

<template>
  <el-popover
    trigger="manual"
    virtual-triggering
    :virtual-ref="virtualRef"
    :visible="visible"
    placement="bottom"
    @contextmenu.prevent
    effect="dark"
    popper-class="contextMenu"
  >
    <ul class="context-menu">
      <li v-for="item in items" :key="item.label" @click="item.action">
        {{ item.label }}
      </li>
    </ul>

    <!-- <template #reference>
      <div
        :style="{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }"
        class="refer"
      ></div>
    </template> -->
  </el-popover>
</template>

<style scoped>
.context-menu {
  width: 100px;
  list-style: none;
  margin: 0;
}
.context-menu li {
  padding: 4px;
  padding-left: 10px;
  cursor: pointer;
  border-radius: 3px;
}
.context-menu li:hover {
  background-color: #f5f5f538;
}
.context-menu li:last-child {
  color: rgb(215, 25, 25);
}
.refer {
  position: fixed;
}
</style>

<style>
.el-popper.contextMenu {
  width: 100px !important;
  padding: 2px !important;
  margin: 0 !important;
  border: none !important;
  min-width: auto !important;
}
</style>
