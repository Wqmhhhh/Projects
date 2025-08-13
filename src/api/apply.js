import request from '@/utils/request'
import { useUserStore } from '@/stores'

// 报名
export const applyAdd = (number, name, majorClass, telephone, firstTime, intention) => {
  useUserStore().refresh()
  return request.post('/enroll/add', {
    number,
    name,
    majorClass,
    telephone,
    firstTime,
    intention,
  })
}

// 修改报名信息
export const applyUpdate = (number, name, majorClass, telephone, firstTime, intention) => {
  useUserStore().refresh()
  return request.put('/enroll/update', {
    number,
    name,
    majorClass,
    telephone,
    firstTime,
    intention,
  })
}

// 获取报名信息
export const applyGetInfo = () => {
  useUserStore().refresh()
  return request.get('/enroll/get')
}

// 二面时间
export const applySecond = (timeId) => {
  useUserStore().refresh()
  return request.put(`/selectSecond/${timeId}`)
}

// 获取面试时间
export const applyGetTime = (type) => {
  useUserStore().refresh()
  return request.get(`/interviewTime/get/${type}`)
}
