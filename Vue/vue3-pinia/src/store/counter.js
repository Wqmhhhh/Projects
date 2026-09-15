import { defineStore } from "pinia"
import {ref} from 'vue'

// 定义store
export const useCountStore=defineStore('counter',()=>{
  // 声明数据
  const count=ref(0)
  // 声明数据的方法:action异步实现
  


  // 声明getters

  // 需要使用时return
  return {
    count
  }
})

