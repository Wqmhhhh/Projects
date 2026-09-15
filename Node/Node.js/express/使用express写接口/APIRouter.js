const express=require('express')

const router=express.Router()

// 挂载对应路由
router.get('/get',(req,res)=>{
  // 获取客户端的数据，通过查询字符串
  const query=req.query
  // 调用res.send向客户端响应处理结果
  res.send({
    status:0,
    msg:'GET请求成功',
    data:query
  })
})

router.post('/post',(req,res)=>{
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  const body=req.body
  res.send({
    status:0,
    msg:'POST 请求成功',
    data:body
  })
})

module.exports=router