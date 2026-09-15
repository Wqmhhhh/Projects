// 导入数据库操作模块
const db=require('../db/index')
// 导入bcryptjs模块对用户密码进行加密
const bcrtyptjs=require("bcryptjs")
// 导入生成Token的包
const jwt=require('jsonwebtoken')
// 导入全局的配置文件
const config=require('../config')

// 注册的处理函数
exports.regUser=function(req,res){
  // 获取客户端提交到用户的信息
  const userinfo=req.body
  // 对表单中的数据进行合法性校验
  // if(!userinfo.username||!userinfo.password){
  //   return res.send({status:1,msg:'用户名或密码不合法！'})
  // }

  // 定义SQL语句查询用户是否被占用
  const sqlStr='select * from ev_users where username=?'
  db.query(sqlStr,[userinfo.username],(err,results)=>{
    // 执行SQL语句失败
    if(err){
      // return res.send({status:1,msg:err.message})
      return res.cc(err)
    }
    // 判断用户名是否被占用
    if(results.length>0){
      // return res.send({status:1,msg:'用户名已被占用，换个名字'})
      return res.cc('用户名已被占用，换个名字')
    }
    // 调用bcryptjs.hashSync()对密码进行加密
    userinfo.password=bcrtyptjs.hashSync(userinfo.password,10)

    // 定义插入新用户的sql语句
    const sql='insert into ev_users set ?'
    db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
      if(err){
        // return res.send({status:1,msg:err.message})
        return res.cc(err)
      }
      // 影响行数不为1
      if(results.affectedRows!==1){
        // return res.send({status:1,msg:'注册用户失败，稍后再试'})
        return res.cc('注册用户失败，稍后再试')
      }
      // 注册成功
      res.send({status:0,msg:'注册成功'})
    })
  })
}

// 登录处理函数
exports.logIn=function(req,res){
  // 接收表单数据
  const userInfo=req.body
  // 定义SQL数据
  const sql=`select * from ev_users where username=?`
  // 执行SQL语句，根据用户查询用户信息
  db.query(sql,userInfo.username,(err,results)=>{
    // 执行SQL语句失败
    if(err) return res.cc(err)
    // 执行SQL语句成功，但获取的数据条数不等于1
    if(results.length!==1) return res.cc('登录失败')

    // 判断密码是否正确
    const compareResult=bcrtyptjs.compareSync(userInfo.password,results[0].password)
    if(!compareResult) return res.cc('登录失败')

    // 在服务器端生成Token字符串
    const user ={...results[0],password:'',user_pic:''}
    // 对用户信息进行加密，返回token字符串
    const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
    res.send({
      status:0,
      message:'登录成功',
      token:'Bearer '+tokenStr
    })
  })
}