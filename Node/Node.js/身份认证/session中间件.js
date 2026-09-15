// 导入模块、中间件
const session=require('express-session')
const express=require('express')

// 配置Session中间件
const app=express()
app.use(session(
  {
    secret:'itheima',
    resave:false,
    saveUninitialized:true
  }
))

// 托管静态页面
app.use(express.static('./pages'))
// 解析POST提交的表单数据
app.use(express.urlencoded({extended:false}))

// 登录的API接口
app.post('/api/login',(req,res)=>{
  // 判断用户提供的信息是否正确
  if(req.body.username!=='admin'||req.body.password!=='000000'){
    return res.send({
      status:1,
      msg:'登录失败'
    })
  }
  // 将登录成功的用户信息保存到Session中
  req.session.user=req.body
  req.session.islogin=true

  res.send({
    status:0,
    msg:'登录成功'
  })
})

// 从session中获取数据：获取用户姓名的接口
app.get('/api/username',(req,res)=>{
  if(!req.session.islogin){
    return res.send({
      status:1,
      msg:'fail'
    })
  }
  res.send({
    status:0,
    msg:'success',
    username:req.session.user.username
  })
})

//  清空session:退出登录的接口
app.post('/api/logout',(req,res)=>{
  req.session.destroy()
  res.send({
    status:0,
    msg:'退出登录成功'
  })
})

// 调用app.listen方法指定端口号并启动web服务器
app.listen(80,function(){
  console.log('Express server running at http://127.0.0.1:80')
})


