// 导入mysql模块
const mysql=require('mysql')

// 建立与 MySQL 数据库的联系
const db=mysql.createPool({
  host:'127.0.0.1',   // 数据库的ip地址
  user:'root',       // 登录数据库的账号
  password:'123456', // 登录数据库的密码
  database:'my_db_01'  // 指定要操作那个数据库
})

// 测试mysql模块是否正常工作
// db.query('select 1',(err,results)=>{
//   // 模块报错
  // if(err) return console.log(err.message)
  // // 能成功执行SQL语句
  // console.log(results)
// })

// 向 users 表中插入数据

// 定义插入数据的对象
// const users={username:'sb',password:'sb112233',id:2}
// // 待执行的SQL语句，英文 ？ 表示占位符
// const sqlStr1='insert into users (username,password) values (?,?,?)'
// // 执行SQL语句，使用数组形式，依次为 ？占位符指定具体值
// db.query(sqlStr1,[users.username,users.password,users.id],(err,results)=>{
//   if(err) return console.log(err.message)
//   // 使用INSERT INTO 插入语句，则results是一个对象
//   // 使用results的affectedRows属性判断是否插入成功
  // if(results.affectedRows===1){
  //   console.log('数据插入成功')
  // }
// })

// // 插入数据的简便写法
// const user={username:'s21b',password:'s112233'}
// const sqlStr2='insert into users set ?'
// db.query(sqlStr2,user,(err,results)=>{
//   if(err) return console.log(err.message)
//   if(results.affectedRows===1){
//     console.log('数据插入成功')
//   }
// })

// 更新用户信息
// const user={id:1,username:'aaa',password:'112233'}
// const sqlStr3='update users set username=?,password=? where id=?'
// db.query(sqlStr3,[user.username,user.password,user.id],(err,results)=>{
//   if(err) return console.log(err.message)
//   if(results.affectedRows===1){
//     console.log('更新成功')
//   }
// })

// // 更新的便捷方式
// const user={id:1,username:'aaa',password:'113333'}
// const sqlStr3='update users set ? where id=?'
// db.query(sqlStr3,[user,user.id],(err,results)=>{
//   if(err) return console.log(err.message)
//   if(results.affectedRows===1){
//     console.log('更新成功')
//   }
// })

// // 删除数据
// const sqlStr4='delete from users where id=?'
// db.query(sqlStr4,3,(err,results)=>{
  // if(err) return console.log(err.message)
  // if(results.affectedRows===1){
  //   console.log('更新成功')
  // }
// })

// 标记删除
const sqlStr5='update users set status=? where id=?'
db.query(sqlStr5,[1,11],(err,results)=>{
  if(err) return console.log(err.message)
  if(results.affectedRows===1){
    console.log('删除成功')
  }
})


// // 查询users表中的所有数据 
// const sqlStr='select * from users'
// db.query(sqlStr,(err,results)=>{
//   if(err) return console.log(err.message)
//   // 若执行的是SELECT查询语句，则执行的结果为数组
//   console.log(results)
// })


