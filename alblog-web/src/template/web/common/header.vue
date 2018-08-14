<template>
  <header class="header" id="header">
    <!--nav-->
    <span class="line"></span>
    <nav>
      <ul class="box">
        <li v-for="(item,index) in navList" :key="index">
          <a v-if="item.target" target="_blank" :href="item.href">{{item.name}}</a>
          <router-link :to="item.href" v-else>{{item.name}}</router-link>
        </li>
      </ul>
    </nav>
    <!--nav End-->
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      navList: [
        {name: 'Falost Home', href: '/', target: false},
        {name: '博客', href: '/blog', target: false},
        {name: '小窝', href: 'https://www.fedte.cc', target: true}
      ]
    }
  },
  computed: {
    ...mapGetters({
      ISLOGIN: 'isLogin',
      INITSTATUS: 'initStatus',
      TITLE: 'title',
      SITETITLE: 'siteTitle',
      SHAREINFO: 'share'
    })
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
@import "src/scss/common.scss";

.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  span.line{
    display: block;
    width: 100%;
    height: 2px;
    background: $ztColor ;
  }
  nav{
    width: 100%;
    height: 40pt;
    background-color: $hdBgColor;
    border-bottom:1pt solid #cccccc ;
    box-shadow: 0 1px 17px 0 #cccccc;
      ul{
        li{
          float: left;
          padding: 5pt 10pt;
          line-height: 30pt;
          font-size: 18pt;
          font-family: Handlee,"huawenxingkai","Microsoft Yahei",arial,sans-serif;

        }

    }
  }
}
</style>
<style>
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #29d;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
