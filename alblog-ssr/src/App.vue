<template>
  <router-view id="app"></router-view>
</template>

<script>
import Vue from 'vue'
// 骨架
import VueContentPlaceholders from 'vue-content-placeholders'
import hljs from 'highlight.js'

if (typeof window !== 'undefined') {
  // import '@/scss/element-variables.scss'
  // import 'highlight.js/styles/atom-one-dark.css' // 样式文件
  require('highlight.js/styles/atom-one-dark.css')
  require('./scss/element-variables.scss')
  let { Input, Button, Select, Pagination, Popover, Dialog, Message, MessageBox } = require('element-ui')
  // 组件

  Vue.component(Input.name, Input)
  Vue.component(Button.name, Button)
  Vue.component(Select.name, Select)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Popover.name, Popover)
  Vue.component(Dialog.name, Dialog)
  Vue.prototype.$message = Message
  Vue.prototype.$messageBox = MessageBox
}
// 插件
Vue.use(VueContentPlaceholders)
// 指令
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
export default {
  name: 'App',
  watch: {
  }
}
</script>

<style lang="scss">
  @font-face {
    font-family: "huawenxingkai";
    src: url('/public/fonts/huawenxingkai.ttf') format('opentype');
  }
  #app {
    min-height: 100%;
  }
  ul,li{
    list-style: none;
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
</style>
