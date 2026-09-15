// 包的入口文件
const data=require('./src/dataFormat')
const escape=require('./src/html')

// 向外暴露需要的成员
module.exports={
  ...data,
  ...escape
}