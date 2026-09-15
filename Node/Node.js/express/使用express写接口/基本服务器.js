const express=require('express')
// 导入解决跨域问题的中间件
const cors=require('cors')

const app=express()

// 配置JSONP的接口必须在CORS之前
app.get('/get/jsonp',(req,res)=>{
  // 定义 JSONP 接口实现的过程
  // 得到函数名称
  const funcName=req.query.callback
  // 定义要发送到客户端的数据对象
  const data={name:'wzy',age:21}
  // 拼接一个函数的调用
  const scriptstr=`${funcName}(${JSON.stringify(data)})`
  // 将拼接的字符串响应给客户端
  res.send(scriptstr)
})


// 配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))
// 配置解决跨域问题的中间件
app.use(cors())

// 导入路由模块
const router=require('./APIRouter')
// 将路由模块注册到app上，只有带前缀 /api 时才会调用路由
app.use('/api',router)

app.listen(80,function(){
  console.log('http://127.0.0.1')
})