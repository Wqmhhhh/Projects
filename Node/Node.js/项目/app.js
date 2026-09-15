// 导入express
const express=require("express")

// 创建服务器实例对象
const app=express()

const joi=require('joi')

// 导入、配置cors跨域中间件
const cors=require("cors")
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

// 在路由之前封装res.cc的函数：处理抛出错误的情况
app.use((req,res,next)=>{
  // status的值默认为1，表示失败的情况
  // err的值可能为一个错误对象，或一个错误的描述字符串
  res.cc=function(err,status=1){
    res.send({
      status,
      message:err instanceof Error?err.message:err
    })
  }
  next()
})

// 一定在路由之前配置解析Token的中间件
const expressJWT=require('express-jwt')
const config=require('./config')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))


// 导入并注册用户路由模块
const userRouter=require('./router/user')
// 添加前缀：使用时必须加前缀才能调用该路由
app.use('/api',userRouter)

// 导入、使用用户信息的路由模块
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter)

// 导入、使用文章分类的路由模块
const artCateRouter=require('./router/artcate')
app.use('/my/article',artCateRouter)

// 导入、使用文章的路由模块
const articleRouter=require('./router/article')
app.use('/my/article',articleRouter)

// 定义错误级别中间件
app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError){
    return res.cc(err)
  }
  if(err.name==='UnauthorizedError') return res.cc('身份认证失败')
  // 未知的错误
  res.cc(err)
})

// 调用app.listen方法指定端口号并启动web服务器
app.listen(3007,function(){
  console.log('Express server running at http://127.0.0.1:3007')
})