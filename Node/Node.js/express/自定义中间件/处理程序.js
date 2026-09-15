const express=require('express')
const app=express()

// 导入中间件，并进行全局化注册
const bodyParser=require('./body-parse')
// app.use(bodyParser)

app.post('/user',bodyParser,(req,res)=>{
  console.log(req.body)
})


app.listen(80,()=>{
  console.log('express server running at http://127.0.0.1')
})