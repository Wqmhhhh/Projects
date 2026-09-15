// 处理背景视频铺不满画面的情况
const video=document.querySelector('.video')
window.addEventListener('resize',function(){
  if(this.window.innerWidth<1163){
    video.style.width='1163px'
  }
  else{
    video.style.width='100%'
  }
})
// 循环添加热门视频
const video_down=document.querySelector('.video-down')
for(let i=0;i<5;i++){
  const li=document.createElement('li')
  li.innerHTML=`
              <div class="video-down-left">
                <img src="../../pics/pic2.png">
              </div>
              <div class="video-down-right">
                <div>你好，我是五条悟</div>
                <span>1亿次观看</span>
                <span>哇酷哇酷</span>
              </div>
  `
  video_down.appendChild(li)
}
// 滑动搜索栏
const move=document.querySelector('.move')
const show =document.querySelector('.show')
const hide=document.querySelector('.lift .hide1')
const lift= document.querySelector('.up-lift')
window.addEventListener('scroll',function(){
  const n=this.document.documentElement.scrollTop
  if(n>=(280)){
    move.style.top='0'
    lift.style.top='0px'
    hide.style.visibility='visible'
    lift.style.opacity='1'
  }
  else{
    move.style.top='-64px'
    lift.style.top='60px'
    lift.style.opacity='1'
    hide.style.visibility='hidden'
  }
})
window.addEventListener('scroll',function(){
  const n=this.document.documentElement.scrollTop
  if(n>1700){
    show.style.opacity='1'
  }else{
    show.style.opacity='0'
  }
})
hide.addEventListener('click',()=>{
  document.scrollingElement.scrollTop=0
})

// 今日要闻的时间
const date=document.querySelector('.date')
const now=new Date()
let day=''
switch(now.getDay()){
  case 1:day='一';break
  case 2:day='二';break
  case 3:day='三';break
  case 4:day='四';break
  case 5:day='五';break
  case 6:day='六';break
  case 0:day='日';break
}
date.innerHTML=`${now.getFullYear()}. ${now.getMonth()+1}. ${now.getDate()} 星期${day}`

// 登录弹框
const button=document.querySelectorAll('.button')
const modal=$('.fade')
button[0].addEventListener('click',function(){
  modal.modal('show')
})
button[1].addEventListener('click',function(){
  modal.modal('show')
})
button[2].addEventListener('click',function(){
  modal.modal('show')
})
const phone=document.querySelector('.log input')
phone.addEventListener('input',function(){
  const word=phone.value
  const last=word.substring(word.length-1)
  if((!Number(last)&&Number(last)!==0)||word.length>11){
    phone.value=''
  }  
})
const select=document.querySelector('select')
const test=document.querySelector('.haha input')
const submit=document.querySelector('.red-button')
submit.addEventListener('click',function(){
  if(phone.value==''||test.value==''){
    alert('两个框框都填不全，罚你重填')
  }
  else if(phone.value.length!==11){
    alert('手机号长度不正确')
    phone.value=''
  }
  else if(test.value!='123456'){
    alert('告诉你验证码了还填不对')
    test.value=''
  }
  else if(select.value==='选择'){
    alert('没选登录方式')
  }
  else{
    alert(`欢迎来到${select.value}`)
    phone.value=''
    test.value=''
    select.value='选择'
  }
})
const zhiwu=document.querySelector('.icon-zhiwu')
zhiwu.addEventListener('click',()=>{
  alert('你要选择植物登录吗？')
  alert('哈哈 没有跳转哦')
})
const bird=document.querySelector('.icon-birdxiaoniao')
bird.addEventListener('click',()=>{
  alert('你要选择鸟类登录吗？')
  alert('哈哈 没有跳转哦')
})
const yu=document.querySelector('.icon-yu')
yu.addEventListener('click',()=>{
  alert('你要选择鱼类登录吗？')
  alert('哈哈 没有跳转哦')
})

// 轮播图
const before=document.querySelector('.safety-change div:first-child')
const next=document.querySelector('.safety-change div:last-child')
const lun=document.querySelector('.lun')
let instan=0
if(instan===0){
  before.style.opacity='0'
  before.classList.remove('see')
}
before.addEventListener('click',function(){
  if(instan===0){
    return
  }
  instan+=163
  lun.style.transform=`translateX(${instan}px)`
  next.style.opacity='1'
  next.classList.add('see')
  if(instan===0){
    before.style.opacity='0'
    before.classList.remove('see')
  }
})
next.addEventListener('click',function(){
  if(instan<=-652){
    return
  }
  instan-=163
  lun.style.transform=`translateX(${instan}px)`
  before.style.opacity='1'
  before.classList.add('see')
  if(instan===-652){
    next.style.opacity='0'
    next.classList.remove('see')
  }
})

// 循环添加新闻
const ul=document.querySelector('.news')
let m=1
function Addnews(){
  for(i=0;i<10;i++){
    const li=document.createElement('li')
    li.innerHTML=`<li>
                  <div class="news_w">
                    <div class="news_w_title">震惊！西安某邮电高校暑假竟做出这事！</div>
                    <div class="news_w_small">
                      <div>不靠谱新闻网</div>
                      <div>评论 ${m}</div>
                      <div>今天 8:00</div>
                      <div>×</div>
                    </div>
                  </div>
                  <div class="pic">
                    <img src="./20131024143050-1333958491.jpg">
                  </div>
              </li>`
    m++
    ul.appendChild(li)
  }
}
Addnews()
window.addEventListener('scroll',function(){
  if (window.innerHeight + window.scrollY+5 >= document.body.offsetHeight){
    this.setTimeout(function(){
      console.log(1)
      Addnews()
    },700)
  }
})