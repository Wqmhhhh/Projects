// 传统方法格式化时间
function dataFormat(data){
  const dt=new Date(data)

  let y=dt.getFullYear()
  let m=dt.getMonth()+1
  let d=dt.getDate()

  let h=dt.getHours()
  let min=dt.getMinutes()
  let se=dt.getSeconds()

  y=padZero(y)
  m=padZero(m)
  d=padZero(d)
  h=padZero(h)
  min=padZero(min)
  se=padZero(se)

  return `${y}-${m}-${d} ${h}:${min}:${se}`
}

// 定义补零函数
function padZero(n){
  return n>9?n:'0'+n
}

const l=new Date()
console.log(dataFormat(l))

// 格式化时间的高级做法:
// 1.在项目中安装指定名称的包；2.使用require()方法导入包；3.查看使用方法进行操作
const moment=require('moment')
const p=moment().format('YYYY-MM-DD HH:mm:ss')
console.log(p)


// 使用自己发布的包格式化时间
const my_bao=require('./../my-bao')
const q=my_bao.dataFormat(new Date())
console.log(q)