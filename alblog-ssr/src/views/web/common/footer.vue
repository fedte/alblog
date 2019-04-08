<template>
  <footer class="footer ptb20 mt15" id="footer" :class="footBottom ? 'bottom' : ''">
    <div class="copyRight c-999 tac">
      <span>Copyright &copy; 2011 - 2018 code & design by </span>
      <a href="https://github.com/falost" target="_blank">Falost</a>
      <span> Powered by </span>
      <a href="https://github.com/fedte/alblog" target="_blank">Alblog.</a>
    </div>
    <div class="expressGratitude mt10 tac">
      <span>感谢</span>
      <a href="https://portal.qiniu.com/signup?code=3lpzf4df56ogi" target="_blank">七牛云</a> 
      <span>提供静态储存,API服务托管于</span>
      <a href="https://s.click.taobao.com/t?e=m%3D2%26s%3DO2MYoKPuhjMcQipKwQzePCperVdZeJviEViQ0P1Vf2kguMN8XjClAh%2BCBB4KsQrduN7SIkF%2FOPrEkAMOsPieoaOK6aiYzIS%2BCQR0RvYlGHPmLsgZ5JksZTDVuRn8ddiDsEVVC24eqozO54LQ%2FVw1L9X5LHh3Z8M%2BWS6ALZVeqlk9XUfbPSJC%2F06deTzTIbffYpyF7ku%2BxKhmP4RbR9G21%2FOCIjQ5MjhgxgxdTc00KD8%3D" target="_blank">阿里云</a>
      <span>ESC,前端页面储存在</span>
      <a href="https://github.com/falost/falost.github.io" target="_blank">Github.</a>
    </div>
    <div class="icp">
    </div>
    <div class="toolbar">
      <div class="go-top tac hLh30 bgc-fff" @click="goTop" v-show="showGoTop" title="返回顶部">
        <span class="fui-font fui-gotop c-999"></span>
        <span>TOP</span>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      showGoTop: false,
      footBottom: false
    }
  },
  watch: {
    $route() {
    }
  },
  methods: {
    init() {
      let that = this
      let innerHeight = window.innerHeight
      let bodyHeight = document.body.clientHeight
      console.log('-----------------')
      console.log(innerHeight, bodyHeight)
      console.log(innerHeight < bodyHeight)
      console.log('-----------------')
      if (bodyHeight < innerHeight) {
        that.$data.footBottom = true
      } else {
        that.$data.footBottom = false
      }
    },
    goTop() {
      let second = 5
      let scrollY = window.scrollY
      let rollingHeight = scrollY / second
      window.requestAnimationFrame(function fn() {
        let height = window.scrollY
        if (height > 0) {
          height -= rollingHeight
          window.scrollTo(0, height)
          window.requestAnimationFrame(fn)
        }
      })
    }
  },
  created() {
  },
  mounted() {
    let that = this
    if (window.scrollY > 500) {
      that.$data.showGoTop = true
    }
    document.onscroll = function () {
      if (window.scrollY > 500) {
        that.$data.showGoTop = true
      } else {
        that.$data.showGoTop = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
  position: relative;
  background-color: rgba(255, 255, 255, 0.6);
  &.bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .toolbar {
    position: fixed;
    right: 5%;
    bottom: 20%;
    z-index: 999;
    .go-top{
      border-radius: 50%;
      height: 30px;
      width: 30px;
      line-height: 30px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 0 5px 1px #ccc;
    }
  }
}
</style>

