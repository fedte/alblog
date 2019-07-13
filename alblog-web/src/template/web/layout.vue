<template>
  <div class="wrapper">
    <!--heaer-->
    <fui-header></fui-header>
    <!-- Content Wrapper. Contains page content -->
    <section class="content-wrapper" :style="style">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
    <!-- <div class='control-sidebar-bg'></div> -->
    <!-- /.content-wrapper -->
  <fui-footer></fui-footer>
  </div>
  <!-- ./wrapper -->
</template>
<script>
  import { mapGetters } from 'vuex'
  import fuiFooter from './common/footer'
  import fuiHeader from './common/header'
  export default {
    data() {
      return {
        height: ''
      }
    },
    computed: {
      ...mapGetters({
        ISLOGIN: 'isLogin',
        INITSTATUS: 'initStatus',
        TITLE: 'title',
        SITETITLE: 'siteTitle',
        SHAREINFO: 'share'
      }),
      style() {
        let style = {
          'min-height': this.height - 125 + 'px'
        }
        return style
      }
    },
    components: {
      fuiHeader,
      fuiFooter
    },
    watch: {
      TITLE() {
        let that = this
        let to = that.$route
        if (to.meta && to.meta.title !== '' && to.meta.title !== undefined) {
          document.title = to.meta.title
        } else if (that.TITLE !== '') {
          document.title = that.TITLE
        }
      }
    },
    methods: {},
    mounted () {
      let that = this
      that.$data.height = window.innerHeight
      window.onresize = function () {
        that.$data.height = window.innerHeight
      }
    }
  }
</script>
<style lang="scss">
@import "src/scss/common.scss";

*{
  padding: 0;
  margin: 0;
  transition: all .3s;
}
body,html{
  background-color: #f7f7f7
}
a:focus, a:hover {
  color: $hover;
  text-decoration: none;
}
a{
  color: $ztColor;
}
.hover:hover,
.active{
  color: $hover;
  border-color: $hover !important;
}
.content-wrapper {
  padding-top: 40pt
}
.box{
  width: 100%;
  max-width: $maxWidth;
  margin: 0 auto;
}

.flex-center {
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  display: -webkit-box;
  display: flex;
}
@media (max-width: 768px) {
  .box{
    width: 100%;
  }
}
</style>
