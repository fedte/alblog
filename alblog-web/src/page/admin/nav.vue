<template>
  <section>
    <header class="main-header">
      <!-- Logo -->
      <router-link :to="adminpath" class="logo">
        <!-- 对于侧边栏迷你50x50像素迷你标志 -->
        <span class="logo-mini"><b>F</b>ED</span>
        <!-- 正常状态和移动设备标识 -->
        <span class="logo-lg">网站后台管理</span>
      </router-link>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">切换导航</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages: style can be found in dropdown.less-->
            <li>
              <router-link to="/" target="_blank" title="网站首页"><i class="fa fa-home"></i></router-link>
            </li>

            <li v-if="false" class="dropdown messages-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success">4</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">你有4条短信</li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <!-- start message -->
                      <router-link to="#">
                        <div class="pull-left">
                          <img src="/static/AdminLTE/default/img/user2-160x160.jpg" class="img-circle" alt="User Image" />
                        </div>
                        <h4>
                          支持团队
                          <small><i class="fa fa-clock-o"></i> 5分钟</small>
                        </h4>
                        <p>为什么不买一个新的令人敬畏的主题？</p>
                      </router-link>
                    </li>
                    <!-- end message -->
                    <li>
                      <router-link to="#">
                        <div class="pull-left">
                          <img src="/static/AdminLTE/default/img/user3-128x128.jpg" class="img-circle" alt="user image" />
                        </div>
                        <h4>
                          AdminLTE 设计团队
                          <small><i class="fa fa-clock-o"></i> 2小时</small>
                        </h4>
                        <p>为什么不买一个新的令人敬畏的主题？</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="#">
                        <div class="pull-left">
                          <img src="/static/AdminLTE/default/img/user4-128x128.jpg" class="img-circle" alt="user image" />
                        </div>
                        <h4>
                          开发商
                          <small><i class="fa fa-clock-o"></i> 今天</small>
                        </h4>
                        <p>为什么不买一个新的令人敬畏的主题？</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="#">
                        <div class="pull-left">
                          <img src="/static/AdminLTE/default/img/user3-128x128.jpg" class="img-circle" alt="user image" />
                        </div>
                        <h4>
                          卖场部
                          <small><i class="fa fa-clock-o"></i> 昨天</small>
                        </h4>
                        <p>为什么不买一个新的令人敬畏的主题？</p>
                      </router-link>
                    </li>
                    <li>
                      <router-link to="#">
                        <div class="pull-left">
                          <img src="/static/AdminLTE/default/img/user4-128x128.jpg" class="img-circle" alt="user image" />
                        </div>
                        <h4>
                          审稿人
                          <small><i class="fa fa-clock-o"></i>2天</small>
                        </h4>
                        <p>为什么不买一个新的令人敬畏的主题？</p>
                      </router-link>
                    </li>
                  </ul>
                </li>
                <li class="footer">
                  <router-link to="#">看到所有的消息</router-link>
                </li>
              </ul>
            </li>
            <!-- Notifications: style can be found in dropdown.less -->
            <li v-if="false" class="dropdown notifications-menu">
              <router-link to="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">10</span>
              </router-link>
              <ul class="dropdown-menu">
                <li class="header">你有10的通知</li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <router-link to="#">
                        <i class="fa fa-users text-aqua"></i> 5名新成员加入了今天
                      </router-link>
                    </li>
                    <li>
                      <router-link to="#">
                        <i class="fa fa-warning text-yellow"></i> 很长的描述，可能不适合页面，可能导致设计问题
                      </router-link>
                    </li>
                    <li>
                      <router-link to="#">
                        <i class="fa fa-users text-red"></i> 5名新成员加入
                      </router-link>
                    </li>

                    <li>
                      <router-link to="#">
                        <i class="fa fa-shopping-cart text-green"></i> 25的盐。
                      </router-link>
                    </li>
                    <li>
                      <router-link to="#">
                        <i class="fa fa-user text-red"></i> 你改变你的用户名
                      </router-link>
                    </li>
                  </ul>
                </li>
                <li class="footer">
                  <router-link to="#">查看所有</router-link>
                </li>
              </ul>
            </li>
            <!-- Tasks: style can be found in dropdown.less -->
            <li v-if="false" class="dropdown tasks-menu">
              <router-link to="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger">9</span>
              </router-link>
              <ul class="dropdown-menu">
                <li class="header">你有9个任务</li>
                <li>
                  <!-- inner menu: contains the actual data -->
                  <ul class="menu">
                    <li>
                      <!-- Task item -->
                      <router-link to="#">
                        <h3>
                          设计一些按钮
                          <small class="pull-right">20%</small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">20% 完成</span>
                          </div>
                        </div>
                      </router-link>
                    </li>
                    <!-- end task item -->
                    <li>
                      <!-- Task item -->
                      <router-link to="#">
                        <h3>
                          创造一个好的主题
                          <small class="pull-right">40%</small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">40% 完成</span>
                          </div>
                        </div>
                      </router-link>
                    </li>
                    <!-- end task item -->
                    <li>
                      <!-- Task item -->
                      <router-link to="#">
                        <h3>
                          有些任务需要我去做
                          <small class="pull-right">60%</small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">60% 完成</span>
                          </div>
                        </div>
                      </router-link>
                    </li>
                    <!-- end task item -->
                    <li>
                      <!-- Task item -->
                      <router-link to="#">
                        <h3>
                          让美丽的转变
                          <small class="pull-right">80%</small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0"
                            aria-valuemax="100">
                            <span class="sr-only">80% 完成</span>
                          </div>
                        </div>
                      </router-link>
                    </li>
                    <!-- end task item -->
                  </ul>
                </li>
                <li class="footer">
                  <router-link to="#">查看所有任务</router-link>
                </li>
              </ul>
            </li>
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <router-link to="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="/static/AdminLTE/default/img/user2-160x160.jpg" class="user-image" alt="User Image" />
                <span class="hidden-xs">admin</span>
              </router-link>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img src="/static/AdminLTE/default/img/user2-160x160.jpg" class="img-circle" alt="User Image" />

                  <p>
                    admin-网站管理员
                    <small>会员于2015-11</small>
                  </p>
                </li>
                <!-- Menu Body -->
                <li class="user-body">
                  <div class="col-xs-4 text-center">
                    <router-link to="#">追随者</router-link>
                  </div>
                  <div class="col-xs-4 text-center">
                    <router-link to="#">销售</router-link>
                  </div>
                  <div class="col-xs-4 text-center">
                    <router-link to="#">朋友</router-link>
                  </div>
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <router-link to="#" class="btn btn-default btn-flat">简介</router-link>
                  </div>
                  <div class="pull-right" @click="loginOut">
                    <router-link to="" class="btn btn-default btn-flat">退出</router-link>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="/static/AdminLTE/default/img/user2-160x160.jpg" class="img-circle" alt="User Image" />
          </div>
          <div class="pull-left info">
            <p>falost</p>
            <router-link to="#"><i class="fa fa-circle text-success"></i> 在线</router-link>
          </div>
          <div class="logout" @click="loginOut">
            <router-link to=""><i class="fa fa-sign-out"></i></router-link>
          </div>
        </div>
        <!-- search form -->
        <form method="get" class="sidebar-form">
          <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search..." />
            <span class="input-group-btn">
              <button type='submit' name='search' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <li class="header">主导航</li>
          <li class="active treeview">
            <router-link exact active-class="active" :to="adminpath + '/index'">
              <i class="fa fa-dashboard"></i> <span>控制面板</span> <span class="label label-primary pull-right"></span>
            </router-link>
          </li>
          <!-- 全局设置 -->
          <li class="treeview" v-if="false">
            <a href="javascript:;">
              <i class="fa fa-files-o"></i> <span>全局</span> <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li v-if="false">
                <router-link exact active-class="active" :to="adminpath + '/setting/access'"><i class="fa fa-circle-o"></i>基本设置</router-link>
              </li>
              <li v-if="false">
                <router-link exact active-class="active" :to="adminpath + '/setting/member'"><i class="fa fa-circle-o"></i>注册与访问</router-link>
              </li>
              <li v-if="false">
                <router-link exact active-class="active" :to="adminpath + '/setting/seo'"><i class="fa fa-circle-o"></i>SEO设置</router-link>
              </li>
            </ul>
          </li>
          <!-- 界面管理 -->
          <li class="treeview" v-if="false">
            <a href="javascript:;">
              <i class="fa fa-th"></i>
              <span>界面</span>
              <span class="label label-primary pull-right"></span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link exact active-class="active" :to="adminpath + '/setting/nav'"><i class="fa fa-circle-o"></i>导航设置</router-link>
              </li>
              <li v-if="false"><router-link exact active-class="active" :to="adminpath + '/setting/templates'"><i class="fa fa-circle-o"></i>模板管理</router-link></li>
              <li>
                <router-link exact active-class="active" :to="adminpath + '/setting/edit'"><i class="fa fa-circle-o"></i>编辑器设置</router-link>
              </li>
            </ul>
          </li>
          <li v-if="false">
            <router-link to="pages/widgets.html">
              <i class="fa fa-th"></i> <span>窗口小部件</span>
              <small class="label pull-right bg-green">新的</small>
            </router-link>
          </li>
          <li>
            <router-link exact active-class="active" :to="adminpath + '/catetory/list'">
              <i class="fa fa-database"></i>
              <span>分类管理</span>
            </router-link>
          </li>
          <!-- 文章内容管理 -->
          <li class="treeview">
            <a href="javascript:;">
              <i class="fa fa-edit"></i>
              <span>内容</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link exact active-class="active" :to="adminpath + '/article/new'"><i class="fa fa-circle-o"></i>文章发布</router-link>
              </li>
              <li>
                <router-link exact active-class="active" :to="adminpath + '/article/list'"><i class="fa fa-circle-o"></i>文章管理</router-link>
              </li>
            </ul>
          </li>
          <!-- 视频内容管理 -->
          <li class="treeview" v-if="false">
            <a href="javascript:;">
              <i class="fa fa-youtube-play"></i> <span>视频</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link exact active-class="active" :to="adminpath + '/video/new'"><i class="fa fa-circle-o"></i>视频发布</router-link>
              </li>
              <li>
                <router-link exact active-class="active" :to="adminpath + '/video/list'"><i class="fa fa-circle-o"></i>视频管理</router-link>
              </li>
            </ul>
          </li>
          <!-- 用户管理 -->
          <li class="treeview">
            <a href="javascript:;">
              <i class="fa fa-user"></i>
              <span>用户</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link exact active-class="active" :to="adminpath + '/member/admin'"><i class="fa fa-circle-o"></i>用户管理</router-link>
              </li>
              <li>
                <router-link exact active-class="active" :to="adminpath + '/member/statis'"><i class="fa fa-circle-o"></i>用户统计</router-link>
              </li>
            </ul>
          </li>
          <!-- 商务管理 -->
          <li class="treeview">
            <a href="javascript:;">
              <i class="fa fa-laptop"></i>
              <span>商务</span>
              <i class="fa fa-angle-left pull-right"></i>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link exact active-class="active" :to="adminpath + '/setting/link'"><i class="fa fa-circle-o"></i>友情链接</router-link>
              </li>
              <li v-if="false">
                <router-link exact active-class="active" :to="adminpath + '/setting/ad'"><i class="fa fa-circle-o"></i>广告管理</router-link>
              </li>
            </ul>
          </li>
          <li class="header">标签</li>
          <li>
            <router-link to="#"><i class="fa fa-circle-o text-red"></i> <span>重要</span></router-link>
          </li>
          <li>
            <router-link to="#"><i class="fa fa-circle-o text-yellow"></i> <span>警告</span></router-link>
          </li>
          <li>
            <router-link to="#"><i class="fa fa-circle-o text-aqua"></i> <span>问询处</span></router-link>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        adminpath: '/admin'
      }
    },
    props: {
      path: {
        type: String,
        default() {
          return '/admin'
        }
      }
    },
    methods: {
      loginOut() {
        let that = this
        that.$STORE.remove('user')
        that.$router.go(0)
      }
    },
    created() {
      let that = this
      that.$data.adminpath = that.path.indexOf('/') === -1 ? '/' + that.path : that.path
    },
    mounted() {
      /* eslint-disable */
      $('li.treeview').removeClass('active')
      $('li > a.active').parents('li.treeview').addClass('active')
      var menuLi =  $(".sidebar-menu li")
      menuLi.click(function(){
        var li = $(this)
        var target = li.children('a').attr('href');
        if(this.nodeName=='LI'){
          $(".sidebar-menu li").removeClass('active')
          li.addClass('active').parents('li').addClass('active')
        }
        return false
      })
      var t = $(".content-header .breadcrumb li.active").text(),
          reg = new RegExp(t)
      $.each(menuLi, function(i){
        if(($(menuLi[i]).text()).length == t.length){
          if(reg.test($(menuLi[i]).text())){
            $(".sidebar-menu li").removeClass('active')
            $(menuLi[i]).addClass('active').parents('li').addClass('active')
            return false;
          }
        }
      })
      /* eslint-enable */
    }
  }
</script>
<style lang="" scoped>
  .logout{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .sidebar-collapse .logout {
    transform: translate(0%,60%);
    right: 0;
    width: 100%;
    text-align: center;
  }
  .sidebar-collapse .user-panel {
    height: 70px;
  }
</style>
