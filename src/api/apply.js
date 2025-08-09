import request from '@/utils/request'

// 报名
export const applyAdd = (number, name, majorClass, telePhone, firstTime, intention) => {
  return request.post('/enroll/add', {
    number,
    name,
    majorClass,
    telePhone,
    firstTime,
    intention,
  })
}

// 修改报名信息
export const applyUpdate = (number, name, majorClass, telePhone, firstTime, intention) => {
  return request.put('/enroll/update', {
    number,
    name,
    majorClass,
    telePhone,
    firstTime,
    intention,
  })
}

// 获取报名信息
export const applyGetInfo = () => {
  return request.get('/enroll/get')
}

// 二面时间
export const applySecond = (timeId) => {
  return request.put(`/selectSecond/${timeId}`)
}

// 获取面试时间
export const applyGetTime = (type) => {
  return request.get(`/intervierTime/get/${type}`)
}
