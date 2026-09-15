<script setup>
import { articleChannelService } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])
const emit = defineEmits(['update:modelValue'])
const getChannelList = async () => {
  const res = await articleChannelService()
  channelList.value = res.data.data
}
getChannelList()

defineProps({
  modelValue: {
    type: [Number, String],
  },
  width: {
    type: String,
  },
})
</script>


<template>
  <el-form-item>
    <el-select
      :style="{ width }"
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <el-option
        :label="item.cate_name"
        :value="item.id"
        v-for="item in channelList"
        :key="item.id"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
