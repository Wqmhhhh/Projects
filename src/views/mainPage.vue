<script setup>
import { onMounted } from 'vue'
import { useUserStore, useFlagStore } from '@/stores'
import { storeToRefs } from 'pinia'

const flagStore = useFlagStore()
const userStore = useUserStore()
const { ifLogin } = storeToRefs(flagStore)
const { authorization, refreshToken } = storeToRefs(userStore)

onMounted(() => {
  if (authorization.value && refreshToken.value) {
    const res = userStore.refresh()
    if (res.PromiseResult === false) {
      ifLogin.value = false
      return
    }
    ifLogin.value = true
  } else {
    ifLogin.value = false
  }
})
</script>

<template>
  <div class="container">
    <!-- 主体内容 -->
    <div class="mainBox">
      <!-- poster -->
      <div class="poster">
        <!-- 流光文字 -->
        <div class="textContainer">
          <div class="lightText">
            <span>X</span>
            <span>U</span>
            <span>P</span>
            <span>T</span>
            <span>-</span>
            <span>S</span>
            <span>T</span>
            <span>A</span>
          </div>
        </div>
      </div>

      <!-- 协会介绍 -->
      <div class="intro">
        <!-- 协会历史、成绩 -->
        <div class="his">
          <h1>协会介绍</h1>
          <span>
            软件科技协会是计算机学院开设的实验室，成立于2010年4月。作为新型的学生课外学习的组织形式，以组织和培训学生参加国内外各种软件类竞赛为主要活动内容，培养学生的软件开发能力，塑造高水平软件人才。
            <br />
            软件科技协会秉承和传承分享(share)、开放(open)、竞争(competition)、协作(cooperation)、友爱(Friendly)、互助(Interdependent)理念，为计算机学院学风建设和校园文化建设注入了活力。
          </span>
        </div>

        <hr />

        <!-- 协会成绩 -->
        <div class="mark">
          <div>
            <h1>参与竞赛</h1>
            <span>
              ACM新生赛
              <br />
              ACM校赛
              <br />
              蓝桥杯
              <br />
              中国大学生程序设计天梯赛
              <br />
              大学生数学建模竞赛
              <br />
              互联网+
              <br />
              西邮汇编语言程序竞赛
              <br />
              科技立项
            </span>
          </div>

          <div>
            <h1>就业方向</h1>
            <div>
              阿里云
              <br />
              字节跳动
              <br />
              腾讯
              <br />
              小米
              <br />
              百度
              <br />
              小红书
              <br />
              深信服
            </div>
          </div>
        </div>

        <hr />

        <!-- 开设方向 -->
        <div class="direction">
          <h1>开设方向</h1>

          <div class="front">
            <h2>前端</h2>
            <div>
              或许你厌倦了黑框了吗？或许你想把你的创造力和想象力都展现的多姿多彩吗？Web前端开发，利用html5,cc3,javasrcript,结合jquery，bootstrap，vuejs等ui框架与js框架，建立良好的人机交互，让你的创造了全都展现在web平台上
              <br />
              <a
                href="https://www.bilibili.com/video/BV1BTP5euE75/?spm_id_from=333.1007.top_right_bar_window_history.content.click"
              >
                直观感受下 >
              </a>
            </div>
          </div>

          <div class="go">
            <h2>GO</h2>
            <div>
              Go小组是由一群对Go语言充满热情的成员组成，我们致力于探索这门现代、高效、并发性强的语言。在这里，我们分享知识，协作解决问题，不断提升技术实力。我们鼓励创新思维，崇尚团队合作，致力于在Web开发等领域发挥Go语言的强大潜力。这里不仅是技术交流的平台，更是梦想起航的地方。加入我们，你将与一群有才华、有激情的伙伴一起成长，共同开启编程的新篇章。
            </div>
          </div>

          <div class="java">
            <h2>Java</h2>
            <div>
              Java 方向聚焦于 Java 语言及其在软件开发中的核心技术与应用。学习内容涵盖JavaSE、 Java
              虚拟机（JVM）、关系型数据库（如Mysql）、无关系型数据库（如Redis）、并发编程、分布式系统、微服务架构以及企业级开发框架（如
              Spring Boot、MyBatis 等）的实践。
            </div>
          </div>
        </div>

        <hr />

        <div class="PS">学习路线指路：QQ频道搜索 "西安邮电大学 | 西邮码农"</div>

        <hr />

        <!-- 优势 -->
        <div class="advantage">
          <h1>加入我们，你将得到 ——</h1>

          <div>
            <div>
              <div>
                <i class="iconfont icon-dayi"></i>
                学长学姐带学答疑
              </div>
              <div>
                <i class="iconfont icon-route-fill"></i>
                系统化的学习路线
              </div>
              <div>
                <i class="iconfont icon-xuexi"></i>
                更好的学习氛围
              </div>
            </div>

            <div>
              <div>
                <i class="iconfont icon-tongxue"></i>
                更优秀的同学
              </div>
              <div>
                <i class="iconfont icon-huodong_huodongguanli"></i>
                丰富的团建活动
              </div>
              <div>
                <i class="iconfont icon-xiangmu"></i>
                实战驱动的项目经验
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="official">
        <h1>联系我们</h1>

        <div>
          <div>
            <h2>地理位置</h2>
            <span>长安校区逸夫楼fz129</span>
          </div>

          <div>
            <h2>微信公众号</h2>
            <img src="../assets/weixin.jpg" alt="" />
          </div>

          <div>
            <h2>QQ群</h2>
            <img src="../assets/QQ.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 署名 -->
    <div class="myName">@软件科技协会 - Wqmhhhh</div>
  </div>
</template>

<style scoped>
/* flex */
.register,
.regLeftBottom,
.timer,
.mark,
.front,
.go,
.java,
.advantage > div,
.advantage > div > div > div,
.official > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.his,
.advantage > div > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

hr {
  width: 90vw;
  border: 1px solid #dadada;
  margin: 2vw 0;
}

.iconfont {
  font-family: 'iconfont';
  color: #0000008a;
  font-size: 4vw;
}

/* 主体内容 */
.mainBox {
  width: 100%;
  background-color: #fff;
}

/* poster */
.poster {
  width: 100%;
  height: 100vh;
  background-color: #000000dd;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
/* 流光文字 */
.lightText span {
  font-size: 15vw;
  color: #444;
  text-shadow: 0 0 0 #444;
  animation-delay: 0s;
  animation: start 1.5s ease-in-out infinite alternate;
}
@keyframes start {
  to {
    text-shadow: 0 0 5px #fff, 0 0 5px #fff, 0 0 18px #126fcc, 0 0 20px #126fcc, 0 0 40px #126fcc;
    color: #fff;
  }
}
.lightText span:nth-child(1) {
  animation-delay: 0.1s;
}
.lightText span:nth-child(2) {
  animation-delay: 0.2s;
}
.lightText span:nth-child(3) {
  animation-delay: 0.3s;
}
.lightText span:nth-child(4) {
  animation-delay: 0.4s;
}
.lightText span:nth-child(5) {
  animation-delay: 0.5s;
}
.lightText span:nth-child(6) {
  animation-delay: 0.6s;
}
.lightText span:nth-child(7) {
  animation-delay: 0.7s;
}
.lightText span:nth-child(8) {
  animation-delay: 0.8s;
}

/* 协会介绍 */
.intro,
.official {
  width: 100%;
  padding: 0 5%;
}
.intro > div h1,
.official h1 {
  font-size: 2.5vw;
  margin-bottom: 2vw;
}
.intro > div span,
.intro > div div,
.PS {
  font-size: 1.5vw;
  line-height: 3vw;
}

/* 协会历史 */
.his {
  width: 100%;
  height: 50vh;
}

/* 协会成绩 */
.mark {
  align-items: start;
}
.mark > div {
  width: 50%;
}

/* 开设方向 */
.front,
.go,
.java {
  width: 100%;
  height: 30vh;
}
.front h2,
.go h2,
.java h2 {
  height: 80%;
  aspect-ratio: 1;
  text-align: center;
  position: relative;
  font-size: 2.5vw;
  align-content: center;
  background-image: url('../assets/前端.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 2vw;
  background-color: rgba(255, 255, 255, 0.5);
  /* 使用背景混合模式确保文字可见 */
  background-blend-mode: overlay;
}

.front div,
.go div,
.java div {
  width: 85%;
}
.go h2 {
  background-image: url('../assets/go.jpg');
}
.java h2 {
  background-image: url('../assets/java.jpg');
}

.front > div a {
  text-decoration: none;
  color: rgb(9, 6, 165);
}

/* 优势 */
.advantage {
  height: 60vh;
  margin-bottom: 3%;
}
.advantage > div {
  width: 100%;
  height: 80%;
  justify-content: space-between;
}
.advantage > div > div {
  width: 50%;
  height: 80%;
  justify-content: space-between;
}
.advantage > div > div > div {
  justify-content: start;
}
.advantage > div > div > div i {
  margin-right: 2vw;
}

/* 联系我们 */
.official {
  padding: 2vw 5%;
  height: 50vh;
  background-color: rgb(245, 245, 247);
}
.official h2 {
  font-size: 1.5vw;
  margin-bottom: 2vw;
}
.official span {
  font-size: 1.3vw;
}
.official > div {
  width: 100%;
  height: 80%;
  align-items: start;
}
.official > div > div {
  text-align: center;
  height: 100%;
}
.official > div > div img {
  height: 8vw;
}

/* 署名 */
.myName {
  height: 5vh;
  font-size: 1vw;
  text-align: center;
  line-height: 5vh;
  background-color: #bbbbbb75;
  color: #000000b7;
  user-select: none;
}

/* 移动端样式 */
@media (max-width: 768px) {
  /* 主体 */
  /* poster */
  .poster {
    height: 30vh;
  }

  .intro > div h1,
  .official h1 {
    font-size: 2vh;
  }
  .intro > div span,
  .intro > div div,
  .PS {
    font-size: 1.3vh;
    line-height: 2vh;
  }
  .his,
  .mark,
  .direction,
  .advantage,
  .official {
    padding: 2vh 0;
  }

  /* 协会历史 */
  .his {
    height: 25vh;
  }

  /* 方向 */
  .front,
  .go,
  .java {
    height: 17vh;
  }
  .front h2,
  .go h2,
  .java h2 {
    height: 40%;
    font-size: 2vh;
  }
  .front div,
  .go div,
  .java div {
    width: 80%;
  }
  .front > div a {
    display: block;
    margin-top: 1vh !important;
  }

  /* 优势 */
  .advantage {
    height: 25vh;
  }
  .advantage .iconfont {
    font-size: 3vh;
  }

  /* 联系我们 */
  .official {
    height: 20vh;
    padding: 2vh 5%;
  }
  .official h2 {
    font-size: 1.5vh;
  }
  .official span {
    font-size: 1.3vh;
  }
  .official > div > div img {
    height: 8vh;
  }

  /* 署名 */
  .myName {
    height: 3vh;
    line-height: 3vh;
    font-size: 1vh;
  }

  hr {
    transform: scaleY(0.5);
    margin: 2vh 0;
  }
}
</style>
