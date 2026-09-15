// 导入express
const express=require('express')
// 创建web服务器
const app=express()


// 监听客户端的GET、POST请求，并向客户端响应具体内容
app.get('/user',(req,res)=>{
  res.send({
    name:'wzy',
    age:'20',
    gender:'woman'
  })
})
app.post('/user',(req,res)=>{
  res.send('一个字符串：请求成功！')
})


// 调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80,()=>{
  console.log('express server running at http://127.0.0.1')
})

