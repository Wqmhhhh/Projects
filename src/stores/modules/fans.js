import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
import {
  followUperService,
  cancelFollowUperService,
  queryFansListService,
  queryIfFollowUperService,
  queryFollowListService,
} from '@/api/fans'

export const useFansStore = defineStore('fansStore', () => {
  const user = useUserStore().user

  // 粉丝列表
  const fansList = ref([])

  // 关注列表
  const followList = ref([])

  // 关注作者
  const followVloger = async (vlogerId) => {
    const res = await followUperService(user.id, vlogerId)
    console.log('关注作者操作返回值', res)
  }

  // 取消关注作者
  const cancelfFollowVloger = async (vlogerId) => {
    const res = await cancelFollowUperService(user.id, vlogerId)
    console.log('取消关注作者操作返回值', res)
  }

  // 查询是否关注作者
  const queryIfFollow = async (vlogerId) => {
    const res = await queryIfFollowUperService(user.id, vlogerId)
    console.log('查询是否关注作者操作返回值', res)
  }

  // 查询关注列表
  const queryFollowList = async (page, pageSize) => {
    const res = await queryFollowListService(user.id, page, pageSize)
    console.log('查询关注列表返回值', res)
  }

  // 查询粉丝列表
  const queryFansList = async (page, pageSize) => {
    const res = await queryFansListService(user.id, page, pageSize)
    console.log('查询粉丝列表返回值', res)
  }

  return {
    fansList,
    followList,

    followVloger,
    cancelfFollowVloger,
    queryIfFollow,
    queryFansList,
    queryFollowList,
  }
})
