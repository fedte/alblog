<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  store,
  created() {
    let that = this
    that.$STORE.set('author', 'falost@fedte')
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
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: "huawenxingkai";
    src: url('/static/common/fonts/huawenxingkai.ttf') format('opentype');
  }
  #app {
    min-height: 100%;
  }
  ul,li{
    list-style: none;
  }
  .h1, .h2, .h3, h1, h2, h3 {
    margin: 0; 
  }
  ::-webkit-scrollbar {
    width: 1px;
  }
  /* font */
  .fs12 {
    font-size: 12px;
  }
  .fs14 {
    font-size: 14px;
  }
  .fs16 {
    font-size: 16px;
  }
  .fs18 {
    font-size: 18px;
  }
  .fs20 {
    font-size: 20px;
  }

  .fwb {
    font-weight: 600;
  }
  .tac{
    text-align: center;
  }
  .tal {
    text-align: left;
  }
  .tal {
    text-align: right;
  }
  /* color */
  .c-fff {
    color: #fff;
  }
  .c-333 {
    color: #333;
  }
  .c-666 {
    color: #666;
  }
  .c-999 {
    color: #999;
  }

  .bgc-fff {
    background-color: #fff;
  }
  .bgc-f1 {
    background-color: #f1f1f1;
  }
  .bgc-f7 {
    background-color: #f7f7f7;
  }
  /* layout */
  .flex { display:-webkit-box;display:-webkit-flex;display:flex}

  .flex .fx1 { -webkit-box-flex: 1;-webkit-flex: 1;flex: 1;}
  .flex .fx2 { -webkit-box-flex: 2;-webkit-flex: 2;flex: 2;}
  .flex .fx3 { -webkit-box-flex: 3;-webkit-flex: 3;flex: 3;}
  .flex .fx4 { -webkit-box-flex: 4;-webkit-flex: 4;flex: 4;}
  .flex .fx5 { -webkit-box-flex: 5;-webkit-flex: 5;flex: 5;}
  .flex .fx10 { -webkit-box-flex: 10; -webkit-flex: 10;flex: 10;}
  .flex .fx12 { -webkit-box-flex: 12;-webkit-flex: 12;flex: 12;}

  .flex-left {justify-content: flex-start; align-items: center;display: -webkit-box;display: -webkit-flex;display: flex;}
  .flex-right {justify-content: flex-end; align-items: center;display: -webkit-box;display: -webkit-flex;display: flex;}
  .flex-center {justify-content: center; align-items: center;display: -webkit-box;display: -webkit-flex;display: flex;}
  .flex-cetenr-x {justify-content:space-around}

  .line-b {
    border-bottom: 1px solid $lineColor;
  }
  .ml10 {
    margin-left: 10px;
  }
  .ml5 {
    margin-left: 5px;
  }
  .mr10 {
    margin-right: 10px;
  }
  .mt10 {
    margin-top: 10px;
  }
  .pl10 {
    padding-left: 10px;
  }

  .ptb20 {
    padding: 20px 0;
  }
  .pt15 {
    padding-top: 15px;
  }
  img[data-mode="widthFix"]{
      width: 100%;
  }
  img[data-mode="aspectFit"]{
    width: 100%;
    height: 100%;
  }
  div[data-auto='auto'] {
    * {
      max-width: 100% !important;
      // width: auto !important;
    }

    img,
    video,
    iframe {
      max-width: 100% !important;
      height: auto !important;
    }

    pre {
      max-width: 100% !important;
      padding: 5px 10px;
      margin: 10px 0;
      overflow-x: auto;
      background-color: $bgcf1;
    }
  }
</style>
