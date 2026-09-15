const querystring=require('querystring')

const bodyParser=(req,res,next)=>{
  // 定义具体的业务逻辑:对数据进行拼接
  let str=''
  req.on('data',(chunk)=>{
    str+=chunk
  })

  // 在 end 事件中的str是完整的数据
  req.on('end',()=>{
    // 将字符串格式数据解析为对象格式
    const body=querystring.parse(str)
    req.body=body
    next()   // 将数据进行流转
  })
}

module.exports=bodyParser