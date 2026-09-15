// 实现功能：将素材目录下的index.html页面拆分成3个页面，放入clock目录中


const path=require("path")
const fs=require('fs')

// 创建正则表达式，匹配页面中的style、script标签
// \s：空白字符，\S：非空白字符，*：匹配任意次，/：将\转义
const style=/<style>[\s\S]*<\/style>/
const script=/<script>[\s\S]*<\/script>/

// 读取文件
fs.readFile(path.join(__dirname,'../clock/index.html'),'utf-8',function(err,data){
  if(err){
    return console.log(err)
  }
  resolveCSS(data)
  resolveJS(data)
  resolveHTML(data)
})

// 自定义方法拆分CSS、script文件
function resolveCSS(data){
  // 通过正则表达式exec方法返回一个数组，数组索引为0的位置为目标CSS文件
  const Css=style.exec(data)
  // 将提取的字符串进行替换
  const newCSS=Css[0].replace('<style>','').replace('</style>','')
  // 写入文件
  fs.writeFile(path.join(__dirname,'/index.css'),newCSS,'utf-8',function(err){
    if(err)
      return console.log(err)
  })
}

function resolveJS(data){
  const JS=script.exec(data)
  const NewJS=JS[0].replace('<script>','').replace('</script>','')
  fs.writeFile(path.join(__dirname,'/index.js'),NewJS,'utf-8',function(err){
    if(err)
      return console.log(err)
  })
}

function resolveHTML(data){
  const NewHTML=data.replace(style,'<link rel="stylesheet" href="./index.css">')
                    .replace(script,'<script src="./index.js"></script>')
  fs.writeFile(path.join(__dirname,'/index.html'),NewHTML,'utf-8',function(err){
    if(err)
      return console.log(err)
  })
}


