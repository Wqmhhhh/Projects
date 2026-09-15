// 定义格式化时间的函数
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
function padZero(n) {
  return n > 9 ? n : '0' + n
}