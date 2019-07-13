<template>
  <section>
    <!--header End-->
    <div class="mask"></div>
    <canvas id="bubble" width="300" height="563"></canvas>
    <section class="home">
      <div class="box">
        <section>
          <h1>
            <a href="">
              <img src="~assets/images/tuxiang.jpg" alt="I'm falost"/>
            </a>
            <span class="bg">
              <span class="radar"></span>
              <span class="radar"></span>
              <span class="radar"></span>
            </span>
          </h1>
          <h2>I'M Falost</h2>
          <p>专注于前端开发，前端安全研究！</p>
          <div class="tag">
            <span v-for="(item, index) in tag" :key="index" :style="'background-color:' + tagBgColor()">{{item.name}}</span>
          </div>
        </section>
      </div>
    </section>
    <section class="intr">
      <div class="box">
        <div>
          <h2>Falost's Introduce</h2>
          <p>梦想若在，路就在前方，踏上实现梦想的征途！</p>
          <div class="main">
            <div>
              <h3><span class="glyphicon glyphicon-map-marker"></span></h3>
              <p>一名有节操的90后前端程序员。家乡位于陕南美丽的山水太极城，汉水之滨的小山村中。</p>
              <a href="javascript:void(0)">More</a>
            </div>
            <div>
              <h3><span class="glyphicon glyphicon-star"></span></h3>
              <p>虽然身体有点胖，但是还是喜欢户外运动，正所谓，生命在于运动。喜欢出没于各大技术圈子中。</p>
              <a href="javascript:void(0)">More</a>
            </div>
            <div>
              <h3><span class="glyphicon glyphicon-heart"></span></h3>
              <p>一直希望和家人一起是去旅游，行走在山水之间。或沉寂于家乡山野之中，远离繁华喧嚣的都市，安安静静！</p>
              <a href="javascript:void(0)">More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="skill">
      <div class="box">
        <div>
          <h2>Get's Skill</h2>
          <p>追梦若冷，就用希望去暖!</p>
          <div class="main">
            <div class="left">
              <div id="skill" class="flex-center"></div>
            </div>
            <div class="right">
              <ul class="skill_list" >
                <li v-for="(item, index) in skills" :key="index"><span :style="'background-color:' + tagBgColor()  + (showSpot ? ';width:' + item.spot * 2 +'px' : '')">{{showSpot ? item.name : ''}}</span ><span v-show="showSpot">{{item.spot}}点</span></li>
              </ul>
            </div>
          </div>
          <p class="tac">注：技能成熟点仅供参考！</p>
        </div>
      </div>
    </section>
    <section class="case">
      <div class="box">
        <div>
          <h2>Get's Skill</h2>
          <p>如果你没有倒下，那么梦想依旧存在，继续追着Ta!</p>
          <div class="main" id="">
          </div>
        </div>
      </div>
    </section>
    <!-- 创意来自 mofei 的博客 https://www.zhuwenlong.com/ -->
    <section class="footprint tac">
      <h2>The Corner of the World</h2>
      <p>Call from the world!</p>
      <div class="main" id="world"></div>
    </section>
    <section class="contact">
      <div class="box">
        <div>
          <h2>Contact Me</h2>
          <p>如果你没有倒下，那么梦想依旧存在，继续追着Ta!</p>
          <div class="main">
              <a href="http://weibo.com/falost" target="_blank" class="btn">微博</a>
              <a href="http://wpa.qq.com/msgrd?v=3&uin=869432476&site=www.fedte.cc&menu=yes" target="_blank" class="btn">QQ</a>
              <a class="btn">Wechat</a>
              <a href="mailto:falost.cc@gmail.com" class="btn">Mail</a>
              <a href="https://github.com/falost" target="_blank" class="btn">Github</a>
              <a href="https://twitter.com/falost_cc" target="_blank" class="btn">Twitter</a>
              <a href="https://www.facebook.com/falost.cc" target="_blank" class="btn">Facebook</a>
              <a href="https://www.linkedin.com/in/falost" target="_blank" class="btn">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
  import echarts from 'echarts'
  import world from '@/../static/common/js/world.js'
  export default {
    data() {
      return {
        tag: [
          {name: 'javaScript'},
          {name: 'jQury'},
          {name: 'HTML(5)'},
          {name: 'CSS(3)'},
          {name: 'NodeJs'},
          {name: 'Bootstrap'},
          {name: 'Vue'},
          {name: 'wxapp'}
        ],
        skills: [
          {name: 'HTML(5)', spot: 99},
          {name: 'CSS(3)', spot: 95},
          {name: 'javaScript', spot: 96},
          {name: 'jQuery', spot: 95},
          {name: 'Vue', spot: 86},
          {name: 'WXApp', spot: 85},
          {name: 'Node', spot: 80},
          {name: 'Bootstrap', spot: 80},
          {name: 'php', spot: 65},
          {name: 'Less', spot: 50},
          {name: 'Sass', spot: 45},
          {name: 'Gulp', spot: 44},
          {name: 'Grunt', spot: 40},
          {name: 'webpack', spot: 40},
          {name: 'Angular', spot: 25}
        ],
        showSpot: false
      }
    },
    computed: {
    },
    created () {

    },
    methods: {
      // 随机切换tag背景
      tagBgColor() {
        return this.$utils.randomColor()
      },
      // 首页背景冒泡泡
      bubble() {
        let width, height, canvas, ctx, circles
        let bubble = document.getElementById('bubble')

        function initHeader() {
          try {
            canvas = document.getElementById('bubble')
            if (bubble) {
              width = window.innerWidth * 0.25 > 300 ? window.innerWidth * 0.25 : 300
              // height = window.innerHeight
              height = 255
              canvas.width = width
              canvas.height = height
              ctx = canvas.getContext('2d')
              circles = []
              for (var x = 0; x < width * 0.5; x++) {
                var c = new Circle()
                circles.push(c)
              }
              animate()
            }
          } catch (ex) {
            if (window.cosole && window.cosole.log) {
              console.log(ex)
            }
          }
        }

        function animate() {
          ctx.clearRect(0, 0, width, height)
          for (var i in circles) {
            circles[i].draw()
          }
          window.requestAFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 1000 / 60) }
          })()
          /* eslint-disable */
          requestAFrame(animate)
          /* eslint-enable */
        }

        // Canvas manipulation
        function Circle() {
          var _this = this;

          // constructor
          (function() {
            _this.pos = {}
            init()
          })()

          function init() {
            _this.pos.x = Math.random() * width
            _this.pos.y = height + Math.random() * 100
            _this.alpha = 0.1 + Math.random() * 0.3
            _this.scale = 0.1 + Math.random() * 0.3
            _this.velocity = Math.random()
          }

          this.draw = function() {
            if (_this.alpha <= 0) {
              init()
            }
            _this.pos.y -= _this.velocity
            _this.alpha -= 0.0005
            ctx.beginPath()
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false)
            ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')'
            ctx.fill()
          }
        }

        initHeader()
      },
      // 初始化首页技能数据
      indexInit() {
        // get skill
        // 各项技能数值
        let that = this
        let skillV = []
        let skill = []
        for (let i = 0; i < that.$data.skills.length; i++) {
          skill.push({text: that.$data.skills[i].name, max: 100})
          skillV.push(that.$data.skills[i].spot)
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('skill'))
        let trigger = 'item'
        console.log('----------------')
        console.log(document.body.clientWidth)
        console.log('------ End------')
        if (document.body.clientWidth < 768) {
          trigger = 'none'
        }
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '技能分布图',
            x: 'center'
          },
          tooltip: {
            trigger: trigger
          },
          color: ['#19a2de'],
          radar: [
            {
              indicator: skill,
              conter: ['50%', '50%'],
              radius: 100
            }
          ],
          series: [
            {
              type: 'radar',
              tooltip: {
                trigger: trigger
              },
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: []
            }
          ]
        }
        // 初始 化展示模块
        myChart.setOption(option)
        // 监听鼠标滚轮事件
        window.onscroll = function() {
          let skill = document.querySelector('.skill')
          if (!skill) {
            return false
          }
          let scrollTop
          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop
          } else if (document.body) {
            scrollTop = document.body.scrollTop
          }
          let scrollTopValue = scrollTop
          let skillHeight = skill.scrollHeight
          let skillTopHeight = skill.offsetTop
          // 当页面下滑到.skill的高度时，触发动画

          if ((scrollTopValue - skillTopHeight) >= -20 && (scrollTopValue - skillTopHeight) <= skillHeight / 2 + 380) {
            that.$data.showSpot = true
            // 延迟加载数据
            // 通过 setTimeout 模拟异步加载
            setTimeout(function () {
              myChart.setOption({
                series: [
                  {
                    data: [{
                      value: skillV,
                      name: '技能熟练度'
                    }]
                  }
                ]
              })
            }, 500)
          }
        }
        // Skill End
      },
      showWxImg() {

      },
      initMap () {
        // eslint-disable-next-line new-cap
        let _map = new world('world')

        let mapData = [
          [110, 19, '北京'],
          [106, 23, '西安'],
          [105, 24, '成都'],
          [105, 25, '大凉山'],
          [104, 26, '攀枝花'],
          [104, 28, '丽江'],
          [107, 21, '吕梁'],
          [108, 22, '晋城'],
          [110, 21, '石家庄'],
          [108, 25, '十堰']
        ]
        mapData.forEach(d => {
          _map.add([d[0], d[1]], {
            title: d[2]
          })
        })

        return () => {
          _map.destory()
        }
      }
    },
    mounted () {
      this.$store.dispatch('setSiteTitle', 'Falost 的小窝 - 非著名前端技术博客，记录生活中的点滴！')
      this.bubble()
      this.indexInit()
      this.initMap()
    }
  }
</script>
<style lang="scss" scoped>
@import "src/scss/common.scss";

#bubble{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.mask{
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: url(~assets/images/bg/bg9.jpg);
  background-position: center;
  background-size: cover;
  &.zoom-show {
    -webkit-mask-image: url(data:image/png;base64,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);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: 300%;
    -webkit-animation: circle_zoom 1.5s;
  }
  &:before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(~assets/images/mask_bg.png);
  }
}
section{
  overflow: hidden;
  min-height: 90vh;
  .box{
    section{
      &>p{
        line-height: 20px;
        font-size: 12pt;
      }
    }
  }
  &.home{
    position: relative;
    z-index: 2;
    text-align: center;
    background: rgba(255,255,255,.5);
    div.box{
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      section{
        padding: 25vh 0 25vh;
        h1{
          width: 100pt;
          height: 100pt;
          border-radius: 50%;
          margin: auto;
          a{
            position: relative;
            z-index: 2;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          span.bg{
            position: relative;
            top: -100%;
            width: 100%;
            height: 100%;
            display: inline-block;
            .radar {
              position: absolute;
              top: 50%;
              left: 50%;
              border-radius: 50%;
              border: 10px solid #fff;
              transform: translate(-50%,-50%);
              animation: radar 2s infinite;
              opacity: 0;
              &:nth-child(2){
                animation-delay: .2s;
              }
              &:nth-child(3){
                animation-delay: .5s;
              }
            }
          }
        }
        h2{
          font-size: 25pt;
          font-family:Handlee,"huawenxingkai","Microsoft Yahei",arial,sans-serif;
        }
        p{
          line-height: 15pt;
        }
        div.tag{
          span{
            position: relative;
            padding: 8px 10px;
            display: inline-block;
            margin: 10px 5px 10px 0;
            color: #ffffff;
            opacity: .8;
            border-radius: 3px;
            background: #19a2de;
            cursor: pointer;
            font-weight: 700;
            border: 1px solid transparent;
            &:hover{
              box-shadow: 0 0 12px 6px #ffffff;
              opacity: 1;
              z-index: 99;
            }
          }
        }
        &:before{
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          bottom: -2px;
          left: 0;
          border-style: solid;
          border-width: 3rem 50vw 0;
          border-color: transparent rgba(255,255,255,.6);
        }
      }
    }
  }
  &.intr,
  &.skill,
  &.case,
  &.contact{
    position: relative;
    z-index: 2;
    padding: 15vh 0;
    text-align: center;
    background: rgba(255,255,255,.8);
    .main{
      & > div{
        position: relative;
        float: left;
        width: 33.3%;
        min-height: 300px;
        padding: 20pt;
        &:hover{
          a{
            color: #fff;
            background-color: #19A2B4;
          }
          &:nth-child(2){
            a{
              color: #fff;
              background-color: #5cb85c;
            }
          }
          &:nth-child(3){
            a{
              color: #fff;
              background-color: #CE6664;
            }
          }
        }
        h3{
          text-align: center;
          font-size: 25pt;
          color: #19A2B4;
        }
        &:nth-child(2){
          h3{
            color: #5cb85c;
          }
        }
        &:nth-child(3){
          h3{
            color: #CE6664;
          }
        }
        p{
          text-align: left;
          text-indent: 35px;
          line-height: 30px;
          font-size: 16px;
        }
        a{
          position: absolute;
          bottom: 0;
          color: #19A2B4;
          padding: 10px 15px;
          border: 1px solid ;
          border-radius: 3px;
          margin-left: -31.5px;
          text-decoration: none;
          font-weight: 700;
          -webkit-transition: all .6s;
          -moz-transition: all .6s;
          -ms-transition: all .6s;
          -o-transition: all .6s;
          transition: all .6s;
        }
        &:nth-child(2){
          a{
            color: #5cb85c;
          }
        }
        &:nth-child(3){
          a{
            color: #CE6664;
          }
        }
      }

    }
  }
  &.skill{
    margin-top: 20px;
    .main{
      width: 790px;
      margin: 0 auto;
      //overflow: hidden;
      height: auto;
      .left{
        width: 400px;
        height: 400px;
        min-height: 400px;
        transform: translate(0%, 25%);
        &>div{
          width: 100%;
          height: 100%;
          margin-top: 10%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .right{
        .skill_list{
          width: 300px;
          li{
            margin: 8px 0;
            text-align: left;
            span{
              display: inline-block;
              min-width: 50px;
              width: 50px;
              line-height: 26px;
              color: #333;
              text-align: center;
              border-radius: 4px;
              transition: all .6s;
              &:first-child {
               color: #fff;
              }
              &:last-child{
                display: inline-block;
                padding: 0 5px;
                line-height: 26px;
              }
            }
          }
        }
      }
    }
    p:last-child{
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      color: #BDBDBC;
    }
  }
  &.case{
    display: none;
  }
  &.footprint {
    position: relative;
    padding: 10vh 0;
    background: #4a6ebc;
    overflow: hidden;
    color: #fff; 
    .main {
      padding-top: 5vh
    }
  }
  &.contact{
    color: #ffffff;
    background-color: #363941;
    .box{
      .main{
        padding: 15vh 0;
        a.btn{
          position: relative;
          transition: all 0.15s ease-in;
          width: 80px;
          height: 80px;
          display: inline-block;
          padding: 10px;
          margin: 5px 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          color: #333;
          line-height: 60px;
          text-align: center;
          text-decoration: none;
          &:after{
            border-width: 2px;
            border-radius: 50%;
          }
          &:hover{
            background: rgba(255, 255, 255, 0);
            color: #fff;
            &:after{
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              opacity: 1;
            }
          }
        }
        .btn{
          &:after{
            transition: all 0.15s ease-in;
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            content: ' ';
            opacity: 0;
            border: 1px solid #fff;
          }
        }
      }
    }
  }
}

@import "src/scss/response.scss";
/*广播扩散效果*/
@keyframes radar {
  0% {
    width: 150px;
    height: 150px;
    border: 40px solid #fff;
    opacity: 0
  }
  50% {
    opacity: .1
  }
  90% {
    width: 650px;
    height: 650px
  }
  90%, 100% {
    border: 2px solid #fff;
    opacity: 0
  }
  100% {
    width: 1300px;
    height: 1300px
  }
}
@-webkit-keyframes radar {
  0% {
    width: 150px;
    height: 150px;
    border: 40px solid #fff;
    opacity: 0
  }
  50% {
    opacity: .1
  }
  90% {
    width: 650px;
    height: 650px
  }
  90%, 100% {
    border: 2px solid #fff;
    opacity: 0
  }
  100% {
    width: 1300px;
    height: 1300px
  }
}
@-ms-keyframes radar {
  0% {
    width: 150px;
    height: 150px;
    border: 40px solid #fff;
    opacity: 0
  }
  50% {
    opacity: .1
  }
  90% {
    width: 650px;
    height: 650px
  }
  90%, 100% {
    border: 2px solid #fff;
    opacity: 0
  }
  100% {
    width: 1300px;
    height: 1300px
  }
}
@-moz-keyframes radar {
  0% {
    width: 150px;
    height: 150px;
    border: 40px solid #fff;
    opacity: 0
  }
  50% {
    opacity: .1
  }
  90% {
    width: 650px;
    height: 650px
  }
  90%, 100% {
    border: 2px solid #fff;
    opacity: 0
  }
  100% {
    width: 1300px;
    height: 1300px
  }
}
/*广播扩散效果end*/

</style>
