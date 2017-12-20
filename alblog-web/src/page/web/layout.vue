<template>
  <div class="wrapper">
    <!--heaer-->
      <header id="header">
        <!--nav-->
        <span class="line"></span>
        <nav>
            <ul class="box">
              <li v-for="(item,index) in navList">
                <a v-if="item.target" target="_blank" :href="item.href">{{item.name}}</a>
                <router-link :to="item.href" v-else>{{item.name}}</router-link>
              </li>
            </ul>
        </nav>
        <!--nav End-->
      </header>
    <!-- Content Wrapper. Contains page content -->
    <section class="content-wrapper">
      <router-view></router-view>
    </section>
    <!-- <div class='control-sidebar-bg'></div> -->
    <!-- /.content-wrapper -->
    <!-- <footer class="main-footer" id="footer">

    </footer> -->
  </div>
  <!-- ./wrapper -->
</template>
<script>
  export default {
    data() {
      return {
        navList: [
          {name: 'Falost Home', href: '/', target: false},
          {name: '博客', href: '/blog', target: false},
          {name: '小窝', href: 'https://www.fedte.cc', target: true}
        ]
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
#header{
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
          font-family: Handlee,"华文行楷","Microsoft Yahei",arial,sans-serif;

        }

    }
  }
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
  width: $maxWidth;
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
#footer{
  position: relative;
  background-color: rgba(255, 255, 255, 0.6);
  .main{
    height: 100px;
  }
}
</style>
