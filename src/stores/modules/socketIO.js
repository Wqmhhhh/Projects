import io from 'socket.io-client'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useChatUserInfo, useChatRoomInfo } from '@/stores/index'

// webSocket连接地址
const socketIOURL = 'ws://8.137.23.88:8080/chat'

export const useSocketStore = defineStore('socket', () => {
  // 状态
  let socket
  const reConnectTimer = ref(null)

  // 建立连接
  const connect = () => {
    const token = useChatUserInfo().accountToken

    // 清除之前的连接
    disconnect()

    try {
      // 服务器地址
      socket = io(socketIOURL, {
        query: {
          EIO: 3,
        },
        recovered: true,
      })

      //监听连接成功事件
      socket.on('connect', () => {
        console.log('websocket连接成功', socket)
        //发送认证消息
        socket.emit('auth', token)
      })

      //监听发送消息事件
      socket.on('send_msg', (data) => {
        console.log('消息返回值', data)

        // 添加到聊天记录列表

        useChatRoomInfo().addChatHis(data)
      })

      //监听断开连接事件
      socket.on('disconnect', (reason) => {
        console.log('连接已断开', reason)
        reConnectTimer.value = setTimeout(connect, 2000)
      })

      //监听撤回消息
      socket.on('update_msg_state', (data) => {
        console.log('撤回消息：', data)
      })
    } catch (e) {
      console.log('建立WebSocket失败', e)
      reConnectTimer.value = setTimeout(connect, 2000)
    }
  }

  // 断开连接
  const disconnect = () => {
    if (socket) {
      socket.disconnect()
      socket = null
      console.log('已手动关闭连接')

      if (reConnectTimer.value) {
        clearTimeout(reConnectTimer.value)
      }
    }
  }

  // 发送消息
  const sendMsg = (relation_id, msg_content) => {
    if (socket.disconnected) {
      console.warn('未连接到服务器，无法发送消息')
      reConnectTimer.value = setTimeout(connect, 2000)
    }
    socket.emit('send_msg', { relation_id, msg_content }, (res) => {
      console.log('发送消息返回值', res)
    })
  }

  return {
    connect,
    disconnect,
    sendMsg,
  }
})
