<script setup>
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const visible = ref(false)

function openContextMenu(e) {
  e.preventDefault()
  visible.value = true
  document.addEventListener('click', closeContextMenu, { once: true })
}

function closeContextMenu() {
  visible.value = false
}
</script>

<template>
  <el-popover
    trigger="contextmenu"
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
    <template #reference>
      <div @contextmenu="openContextMenu">
        <slot></slot>
      </div>
    </template>
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
