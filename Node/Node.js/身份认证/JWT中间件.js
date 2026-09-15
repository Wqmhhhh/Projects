// 导入模块、中间件
const express=require('express')
const jwt=require('jsonwebtoken')
const expressJWT=require('express-jwt')

const app=express()

// 允许跨域资源共享
const cors=require('cors')
app.use(cors())

// 解析POST表单数据的中间件
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// 定义secret密钥
const secretKey='wqmhhhh'

// 注册将JWT字符串还原为JSON对象的中间件
// expressJWT 用于指定解析Token的中间件
// .unless({path:[/^\/api\//]}) 指定哪些接口不需要访问权限
app.use(expressJWT.expressjwt({secret:secretKey,algorithms:["HS256"]}).unless({path:[/^\/api\//]}))

// 登录的API接口
app.post('/api/login',(req,res)=>{
  // 将req.body请求体中的数据转换为userinfo常量
  const userinfo=req.body

  // 登录失败
  if(req.body.username!=='admin'||req.body.password!=='000000'){
    return res.send({
      status:400,
      msg:'登录失败'
    })
  }
  // 登录成功后调用jwt.sign()方法生成JWT字符串，并通过Token属性发送给客户端
  // 千万不要将密码加密到Token字符中
  const tokenStr=jwt.sign({username:userinfo.username},secretKey,{expiresIn:'30s'})
  res.send({
    status:200,
    msg:'登录成功',
    token:tokenStr
  })
})

// 有权限的API接口
app.get('/admin/getinfo',function(req,res){
  // 使用req.user获取用户信息，使用Data属性将用户信息发送给客户端
  res.send({
    status:200,
    message:'获取用户信息成功',
    data:req.auth    // 要发送给客户端的用户信息
  })
}) 

// 使用全局错误处理中间件，捕获解析 JWT失败后产生的错误
app.use((err,req,res,next)=>{
  // 错误是由Token解析失败导致的
  if(err.name==='UnauthorizedError'){
    return res.send({
      status:401,
      message:'无效Token'
    })
  }
  res.send({
    status:500,
    message:'未知错误'
  })
})

// 调用app.listen方法指定端口号并启动web服务器
app.listen(8888,function(){
  console.log('Express server running at http://127.0.0.1:8888')
})