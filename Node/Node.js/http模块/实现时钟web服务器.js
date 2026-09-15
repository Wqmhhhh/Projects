// 核心思路：将文件的实际存放路径作为每个资源请求的url地址

// 导入需要的模块
const http=require("http")
const fs=require("fs")
const path=require("path")

// 创建基本的web服务器
const server=http.createServer()

// 监听web服务器的request事件
server.on('request',function(req,res){

  // 将资源的请求url地址映射为本地的存放路径
  const url=req.url
  const local=path.join(__dirname,'../clock/',url)
  
  // 读取文件内容并响应给客户端
  fs.readFile(local,'utf-8',(err,data)=>{
    if(err)
      return console.log(err)
    res.end(data)
  })
})

// 启动web服务器
server.listen(80,()=>console.log('server listen at http://127.0.0.1'))