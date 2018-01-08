<template>
  <div class="">
    <div class="wrapper">
      <navbar :path="'admin'" v-if="ISADMIN"></navbar>
      <!-- Content Wrapper. Contains page content -->
      <section class="content-wrapper">
        <router-view/>
      </section>
      <div class='control-sidebar-bg'></div>
      <!-- /.content-wrapper -->
      <footer class="main-footer" v-if="ISADMIN">
        <div class="pull-right hidden-xs">
          <b>版本</b> 2.0
        </div>
        <strong>Copyright &copy; 2015-2016 <a href="http://www.fedte.cc" target="_blank">FEDTE 工作室</a>.</strong> 保留所有权利.
      </footer>
    </div>
    <!-- ./wrapper -->
  </div>
</template>
<script>
  // import '/static/libs/dialog/dialog.js'
  import '@/../static/common/bootstrap/js/bootstrap.min.js'
  import '@/../static/common/bootstrap/css/ionicons.min.css'
  import '@/../static/common/bootstrap/css/font-awesome.min.css'
  import nav from './nav'
  import { mapGetters } from 'vuex'

  require('@/../static/AdminLTE/default/css/AdminLTE.min.css')

  require('@/../static/AdminLTE/default/css/skins/_all-skins.min.css')

  export default {
    data() {
      return {
        title: ''
      }
    },
    watch: {
      $route() {
        let that = this
        // that.$router.go(0)
        if (that.$route.path === '/admin') {
          that.$router.replace('/admin/index')
        }
        /**
         * 路由被改变之后，进行重新检测权限
         */
        that.checkAuth()
      },
      ISADMIN(val) {
        let that = this
        that.loadingInit()
      }
    },
    computed: {
      ...mapGetters({
        ISLOGIN: 'isLogin',
        ISADMIN: 'isAdmin'
      })
    },
    components: {
      navbar: nav
    },

    methods: {
      /**
       * 初始化页面
       */
      init() {
        let that = this
        that.checkAuth()
        that.loadingInit()
      },
      /**
       * 校验管理权限
       */
      checkAuth() {
        let that = this
        console.log('--------------')
        console.log('校验管理中')
        console.log('--------------')
        /**
         * 如果当前页面为登录页面直接返回
         */
        that.$data.user = that.$STORE.get('user')
        if (that.$route.path == '/admin/login?from=' + that.$data.from) {
          return false
        }
        /**
         * 判断当前是否有用户登录信息
         */
        if (that.$data.user && that.$data.user.uuid) {
          that.$API.isAdmin({
            data: {},
            method: 'POST',
            success(res) {
              let data = res.data
              if (data.code === 10000) {
               /**
                *设置成为管理员的权限
                */
                that.$store.dispatch('setAdmin', true)
              } else {
                that.$store.dispatch('setAdmin', false)
              }
              /**
               * 如果登录超时 就重定向到登录页面
               * 并且删除用户信息
               * 如果没有管理权限，就重定向到网站首页
               */
              if (data.code === 10140) {
                that.$router.push('/admin/login?from=' + that.$data.from)
                that.$STORE.remove('user')
                that.$message({
                  showClose: true,
                  message: data.message,
                  type: 'warning'
                })
              } else if (data.code === 10151) {
                that.$message({
                  showClose: true,
                  message: data.message,
                  type: 'info'
                })
                that.$store.dispatch('setAdmin', false)
                that.$router.push('/')
              }
            }
          })
        } else {
          that.$message({
            showClose: true,
            message: '请先登录',
            type: 'warning'
          })
          that.$router.push('/admin/login?from=' + that.$data.from)
        }
      },
      /**
       * 重新加载js信息
       */
      loadingInit() {
        /* eslint-disable */
        if (this.ISADMIN) {
          $("body").addClass('skin-blue sidebar-mini')
        }
        // $('.sidebar-menu li').removeClass('active')
        // console.log('--------------')
        // console.log( document.querySelectorAll('.sidebar-menu'))
        // console.log('--------------')
        // $('.sidebar-menu li a.active').parents('.treeview').addClass('active')
        /*! AdminLTE app.js
        * ================
        * Main JS application file for AdminLTE v2. This file
        * should be included in all pages. It controls some layout
        * options and implements exclusive AdminLTE plugins.
        *
        * @Author  Almsaeed Studio
        * @Support <http://www.almsaeedstudio.com>
        * @Email   <support@almsaeedstudio.com>
        * @version 2.1.2
        * @license MIT <http://opensource.org/licenses/MIT>
        */

        //Make sure jQuery has been loaded before app.js
        if (typeof jQuery === "undefined") {
          throw new Error("AdminLTE requires jQuery");
        }
        /* AdminLTE
        *
        * @type Object
        * @description $.AdminLTE is the main object for the template's app.
        *              It's used for implementing functions and options related
        *              to the template. Keeping everything wrapped in an object
        *              prevents conflict with other plugins and is a better
        *              way to organize our code.
        */
        $.AdminLTE = {};

        /* --------------------
        * - AdminLTE Options -
        * --------------------
        * Modify these options to suit your implementation
        */
        $.AdminLTE.options = {
          //Add slimscroll to navbar menus
          //This requires you to load the slimscroll plugin
          //in every page before app.js
          navbarMenuSlimscroll: true,
          navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
          navbarMenuHeight: "200px", //The height of the inner menu
          //General animation speed for JS animated elements such as box collapse/expand and
          //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
          //'fast', 'normal', or 'slow'
          animationSpeed: 500,
          //Sidebar push menu toggle button selector
          sidebarToggleSelector: "[data-toggle='offcanvas']",
          //Activate sidebar push menu
          sidebarPushMenu: true,
          //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
          sidebarSlimScroll: true,
          //Enable sidebar expand on hover effect for sidebar mini
          //This option is forced to true if both the fixed layout and sidebar mini
          //are used together
          sidebarExpandOnHover: false,
          //BoxRefresh Plugin
          enableBoxRefresh: true,
          //Bootstrap.js tooltip
          enableBSToppltip: true,
          BSTooltipSelector: "[data-toggle='tooltip']",
          //Enable Fast Click. Fastclick.js creates a more
          //native touch experience with touch devices. If you
          //choose to enable the plugin, make sure you load the script
          //before AdminLTE's app.js
          enableFastclick: true,
          //Control Sidebar Options
          enableControlSidebar: true,
          controlSidebarOptions: {
            //Which button should trigger the open/close event
            toggleBtnSelector: "[data-toggle='control-sidebar']",
            //The sidebar selector
            selector: ".control-sidebar",
            //Enable slide over content
            slide: true
          },
          //Box Widget Plugin. Enable this plugin
          //to allow boxes to be collapsed and/or removed
          enableBoxWidget: true,
          //Box Widget plugin options
          boxWidgetOptions: {
            boxWidgetIcons: {
              //Collapse icon
              collapse: 'fa-minus',
              //Open icon
              open: 'fa-plus',
              //Remove icon
              remove: 'fa-times'
            },
            boxWidgetSelectors: {
              //Remove button selector
              remove: '[data-widget="remove"]',
              //Collapse button selector
              collapse: '[data-widget="collapse"]'
            }
          },
          //Direct Chat plugin options
          directChat: {
            //Enable direct chat by default
            enable: true,
            //The button to open and close the chat contacts pane
            contactToggleSelector: '[data-widget="chat-pane-toggle"]'
          },
          //Define the set of colors to use globally around the website
          colors: {
            lightBlue: "#3c8dbc",
            red: "#f56954",
            green: "#00a65a",
            aqua: "#00c0ef",
            yellow: "#f39c12",
            blue: "#0073b7",
            navy: "#001F3F",
            teal: "#39CCCC",
            olive: "#3D9970",
            lime: "#01FF70",
            orange: "#FF851B",
            fuchsia: "#F012BE",
            purple: "#8E24AA",
            maroon: "#D81B60",
            black: "#222222",
            gray: "#d2d6de"
          },
          //The standard screen sizes that bootstrap uses.
          //If you change these in the variables.less file, change
          //them here too.
          screenSizes: {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
          }
        };

        /* ------------------
        * - Implementation -
        * ------------------
        * The next block of code implements AdminLTE's
        * functions and plugins as specified by the
        * options above.
        */
        $(function () {
          //Extend options if external options exist
          if (typeof AdminLTEOptions !== "undefined") {
            $.extend(true,
                    $.AdminLTE.options,
                    AdminLTEOptions);
          }

          //Easy access to options
          var o = $.AdminLTE.options;

          //Set up the object
          _init();

          //Activate the layout maker
          $.AdminLTE.layout.activate();

          //Enable sidebar tree view controls
          $.AdminLTE.tree('.sidebar');

          //Enable control sidebar
          if (o.enableControlSidebar) {
            $.AdminLTE.controlSidebar.activate();
          }

          //Add slimscroll to navbar dropdown
          if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
            $(".navbar .menu").slimscroll({
              height: o.navbarMenuHeight,
              alwaysVisible: false,
              size: o.navbarMenuSlimscrollWidth
            }).css("width", "100%");
          }

          //Activate sidebar push menu
          if (o.sidebarPushMenu) {
            $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
          }

          //Activate Bootstrap tooltip
          if (o.enableBSToppltip) {
            $('body').tooltip({
              selector: o.BSTooltipSelector
            });
          }

          //Activate box widget
          if (o.enableBoxWidget) {
            $.AdminLTE.boxWidget.activate();
          }

          //Activate fast click
          if (o.enableFastclick && typeof FastClick != 'undefined') {
            FastClick.attach(document.body);
          }

          //Activate direct chat widget
          if (o.directChat.enable) {
            $(o.directChat.contactToggleSelector).on('click', function () {
              var box = $(this).parents('.direct-chat').first();
              box.toggleClass('direct-chat-contacts-open');
            });
          }

          /*
          * INITIALIZE BUTTON TOGGLE
          * ------------------------
          */
          $('.btn-group[data-toggle="btn-toggle"]').each(function () {
            var group = $(this);
            $(this).find(".btn").on('click', function (e) {
              group.find(".btn.active").removeClass("active");
              $(this).addClass("active");
              e.preventDefault();
            });

          });
        });

        /* ----------------------------------
        * - Initialize the AdminLTE Object -
        * ----------------------------------
        * All AdminLTE functions are implemented below.
        */
        function _init() {

          /* Layout
          * ======
          * Fixes the layout height in case min-height fails.
          *
          * @type Object
          * @usage $.AdminLTE.layout.activate()
          *        $.AdminLTE.layout.fix()
          *        $.AdminLTE.layout.fixSidebar()
          */
          $.AdminLTE.layout = {
            activate: function () {
              var _this = this;
              _this.fix();
              _this.fixSidebar();
              $(window, ".wrapper").resize(function () {
                _this.fix();
                _this.fixSidebar();
              });
            },
            fix: function () {
              //Get window height and the wrapper height
              var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
              var window_height = $(window).height();
              var sidebar_height = $(".sidebar").height();
              //Set the min-height of the content and sidebar based on the
              //the height of the document.
              if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
              } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                  $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                  postSetWidth = window_height - neg;
                } else {
                  $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                  postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                  if (controlSidebar.height() > postSetWidth)
                    $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }

              }
            },
            fixSidebar: function () {
              //Make sure the body tag has the .fixed class
              if (!$("body").hasClass("fixed")) {
                if (typeof $.fn.slimScroll != 'undefined') {
                  $(".sidebar").slimScroll({destroy: true}).height("auto");
                }
                return;
              } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                console.error("Error: the fixed layout requires the slimscroll plugin!");
              }
              //Enable slimscroll for fixed layout
              if ($.AdminLTE.options.sidebarSlimScroll) {
                if (typeof $.fn.slimScroll != 'undefined') {
                  //Destroy if it exists
                  $(".sidebar").slimScroll({destroy: true}).height("auto");
                  //Add slimscroll
                  $(".sidebar").slimscroll({
                    height: ($(window).height() - $(".main-header").height()) + "px",
                    color: "rgba(0,0,0,0.2)",
                    size: "3px"
                  });
                }
              }
            }
          };

          /* PushMenu()
          * ==========
          * Adds the push menu functionality to the sidebar.
          *
          * @type Function
          * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
          */
          $.AdminLTE.pushMenu = {
            activate: function (toggleBtn) {
              //Get the screen sizes
              var screenSizes = $.AdminLTE.options.screenSizes;

              //Enable sidebar toggle
              $(toggleBtn).on('click', function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                  $("body").toggleClass('sidebar-collapse');
                }
                //Handle sidebar push menu for small screens
                else {
                  if ($("body").hasClass('sidebar-open')) {
                    $("body").removeClass('sidebar-open');
                    $("body").removeClass('sidebar-collapse')
                  } else {
                    $("body").addClass('sidebar-open');
                  }
                }
              });

              $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                  $("body").removeClass('sidebar-open');
                }
              });

              //Enable expand on hover for sidebar mini
              if ($.AdminLTE.options.sidebarExpandOnHover
                      || ($('body').hasClass('fixed')
                              && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover();
              }

            },
            expandOnHover: function () {
              var _this = this;
              var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
              //Expand sidebar on hover
              $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini')
                        && $("body").hasClass('sidebar-collapse')
                        && $(window).width() > screenWidth) {
                  _this.expand();
                }
              }, function () {
                if ($('body').hasClass('sidebar-mini')
                        && $('body').hasClass('sidebar-expanded-on-hover')
                        && $(window).width() > screenWidth) {
                  _this.collapse();
                }
              });
            },
            expand: function () {
              $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
            },
            collapse: function () {
              if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
              }
            }
          };

          /* Tree()
          * ======
          * Converts the sidebar into a multilevel
          * tree view menu.
          *
          * @type Function
          * @Usage: $.AdminLTE.tree('.sidebar')
          */
          $.AdminLTE.tree = function (menu) {
            var _this = this;
            var animationSpeed = $.AdminLTE.options.animationSpeed;
            $("li a", $(menu)).on('click', function (e) {
              //Get the clicked link and the next element
              var $this = $(this);
              var checkElement = $this.next();

              //Check if the next element is a menu and is visible
              if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                //Close the menu
                checkElement.slideUp(animationSpeed, function () {
                  checkElement.removeClass('menu-open');
                  //Fix the layout in case the sidebar stretches over the height of the window
                  //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
              }
              //If the menu is not visible
              else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp(animationSpeed);
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown(animationSpeed, function () {
                  //Add the class active to the parent li
                  checkElement.addClass('menu-open');
                  parent.find('li.active').removeClass('active');
                  parent_li.addClass('active');
                  //Fix the layout in case the sidebar stretches over the height of the window
                  _this.layout.fix();
                });
              }
              //if this isn't a link, prevent the page from being redirected
              if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
              }
            });
          };

          /* ControlSidebar
          * ==============
          * Adds functionality to the right sidebar
          *
          * @type Object
          * @usage $.AdminLTE.controlSidebar.activate(options)
          */
          $.AdminLTE.controlSidebar = {
            //instantiate the object
            activate: function () {
              //Get the object
              var _this = this;
              //Update options
              var o = $.AdminLTE.options.controlSidebarOptions;
              //Get the sidebar
              var sidebar = $(o.selector);
              //The toggle button
              var btn = $(o.toggleBtnSelector);

              //Listen to the click event
              btn.on('click', function (e) {
                e.preventDefault();
                //If the sidebar is not open
                if (!sidebar.hasClass('control-sidebar-open')
                        && !$('body').hasClass('control-sidebar-open')) {
                  //Open the sidebar
                  _this.open(sidebar, o.slide);
                } else {
                  _this.close(sidebar, o.slide);
                }
              });

              //If the body has a boxed layout, fix the sidebar bg position
              var bg = $(".control-sidebar-bg");
              _this._fix(bg);

              //If the body has a fixed layout, make the control sidebar fixed
              if ($('body').hasClass('fixed')) {
                _this._fixForFixed(sidebar);
              } else {
                //If the content height is less than the sidebar's height, force max height
                if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                  _this._fixForContent(sidebar);
                }
              }
            },
            //Open the control sidebar
            open: function (sidebar, slide) {
              var _this = this;
              //Slide over content
              if (slide) {
                sidebar.addClass('control-sidebar-open');
              } else {
                //Push the content by adding the open class to the body instead
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
              }
            },
            //Close the control sidebar
            close: function (sidebar, slide) {
              if (slide) {
                sidebar.removeClass('control-sidebar-open');
              } else {
                $('body').removeClass('control-sidebar-open');
              }
            },
            _fix: function (sidebar) {
              var _this = this;
              if ($("body").hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($(".wrapper").height());
                $(window).resize(function () {
                  _this._fix(sidebar);
                });
              } else {
                sidebar.css({
                  'position': 'fixed',
                  'height': 'auto'
                });
              }
            },
            _fixForFixed: function (sidebar) {
              sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
              });
            },
            _fixForContent: function (sidebar) {
              $(".content-wrapper, .right-side").css('min-height', sidebar.height());
            }
          };

          /* BoxWidget
          * =========
          * BoxWidget is a plugin to handle collapsing and
          * removing boxes from the screen.
          *
          * @type Object
          * @usage $.AdminLTE.boxWidget.activate()
          *        Set all your options in the main $.AdminLTE.options object
          */
          $.AdminLTE.boxWidget = {
            selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
            icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
            animationSpeed: $.AdminLTE.options.animationSpeed,
            activate: function (_box) {
              var _this = this;
              if (! _box) {
                _box = document; // activate all boxes per default
              }
              //Listen for collapse event triggers
              $(_box).find(_this.selectors.collapse).on('click', function (e) {
                e.preventDefault();
                _this.collapse($(this));
              });

              //Listen for remove event triggers
              $(_box).find(_this.selectors.remove).on('click', function (e) {
                e.preventDefault();
                _this.remove($(this));
              });
            },
            collapse: function (element) {
              var _this = this;
              //Find the box parent
              var box = element.parents(".box").first();
              //Find the body and the footer
              var box_content = box.find("> .box-body, > .box-footer");
              if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                        .removeClass(_this.icons.collapse)
                        .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(_this.animationSpeed, function () {
                  box.addClass("collapsed-box");
                });
              } else {
                //Convert plus into minus
                element.children(":first")
                        .removeClass(_this.icons.open)
                        .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(_this.animationSpeed, function () {
                  box.removeClass("collapsed-box");
                });
              }
            },
            remove: function (element) {
              //Find the box parent
              var box = element.parents(".box").first();
              box.slideUp(this.animationSpeed);
            }
          };
        }

        /* ------------------
        * - Custom Plugins -
        * ------------------
        * All custom plugins are defined below.
        */

        /*
        * BOX REFRESH BUTTON
        * ------------------
        * This is a custom plugin to use with the component BOX. It allows you to add
        * a refresh button to the box. It converts the box's state to a loading state.
        *
        * @type plugin
        * @usage $("#box-widget").boxRefresh( options );
        */
        (function ($) {

          $.fn.boxRefresh = function (options) {

            // Render options
            var settings = $.extend({
              //Refresh button selector
              trigger: ".refresh-btn",
              //File source to be loaded (e.g: ajax/src.php)
              source: "",
              //Callbacks
              onLoadStart: function (box) {
              }, //Right after the button has been clicked
              onLoadDone: function (box) {
              } //When the source has been loaded

            }, options);

            //The overlay
            var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

            return this.each(function () {
              //if a source is specified
              if (settings.source === "") {
                if (console) {
                  console.log("Please specify a source first - boxRefresh()");
                }
                return;
              }
              //the box
              var box = $(this);
              //the button
              var rBtn = box.find(settings.trigger).first();

              //On trigger click
              rBtn.on('click', function (e) {
                e.preventDefault();
                //Add loading overlay
                start(box);

                //Perform ajax call
                box.find(".box-body").load(settings.source, function () {
                  done(box);
                });
              });
            });

            function start(box) {
              //Add overlay and loading img
              box.append(overlay);

              settings.onLoadStart.call(box);
            }

            function done(box) {
              //Remove overlay and loading img
              box.find(overlay).remove();

              settings.onLoadDone.call(box);
            }

          };

        })(jQuery);

        /*
        * EXPLICIT BOX ACTIVATION
        * -----------------------
        * This is a custom plugin to use with the component BOX. It allows you to activate
        * a box inserted in the DOM after the app.js was loaded.
        *
        * @type plugin
        * @usage $("#box-widget").activateBox();
        */
        (function ($) {

          $.fn.activateBox = function () {
            $.AdminLTE.boxWidget.activate(this);
          };

        })(jQuery);

        /*
        * TODO LIST CUSTOM PLUGIN
        * -----------------------
        * This plugin depends on iCheck plugin for checkbox and radio inputs
        *
        * @type plugin
        * @usage $("#todo-widget").todolist( options );
        */
        (function ($) {

          $.fn.todolist = function (options) {
            // Render options
            var settings = $.extend({
              //When the user checks the input
              onCheck: function (ele) {
              },
              //When the user unchecks the input
              onUncheck: function (ele) {
              }
            }, options);

            return this.each(function () {

              if (typeof $.fn.iCheck != 'undefined') {
                $('input', this).on('ifChecked', function (event) {
                  var ele = $(this).parents("li").first();
                  ele.toggleClass("done");
                  settings.onCheck.call(ele);
                });

                $('input', this).on('ifUnchecked', function (event) {
                  var ele = $(this).parents("li").first();
                  ele.toggleClass("done");
                  settings.onUncheck.call(ele);
                });
              } else {
                $('input', this).on('change', function (event) {
                  var ele = $(this).parents("li").first();
                  ele.toggleClass("done");
                  settings.onCheck.call(ele);
                });
              }
            });
          };
        }(jQuery));
      }
    },
    created() {
      let that = this
    },
    mounted () {
      let that = this
      console.log('----------------')
      console.log(that.$route.path)
      console.log('------ End------')
      that.$data.from = that.$route.path
      if (that.$route.path === '/admin') {
        that.$router.replace('/admin/index')
      }
      that.init()
    }
  }
</script>
<style lang="scss">
::-webkit-scrollbar{
  display: none;
}
.content-wrapper {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: block;
    width: 6px;
  }
  &::-webkit-scrollbar-track-piece {
    background: #ecf0f5;
  }
  &::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
  &::-moz-scrolled-page-sequence {
    display: none;
  }
}
.tips{
  position: fixed;
  top:50%;
  left: 50%;
  z-index:10;
}
.nav-pills>li>a {
  border-radius: 2px;
  padding:  5px 10px;
}
.error input,
.error>span,
.error input:focus{
  border-color: #a94442!important;
}
.error > span {
  color: #a94442;
  background-color: #f2dede;
}
.correct {
  color: #006600;
  background-color: transparent;
}
.btn[disabled] {
  pointer-events: auto;
  cursor: not-allowed;
}
.content {
  .panel-body {
    .row {
      margin: 15px -15px;
      .right-tips-text {
        line-height: 2;
      }
      input {
        font-weight: bold;
      }
      .checkbox {
        .slideThree {
          width: 80px;
          height: 26px;
          background: #333;
          position: relative;
          -moz-border-radius: 50px;
          -webkit-border-radius: 50px;
          border-radius: 50px;
          -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
          -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
          box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
        }
        .slideThree:after {
          content: 'OFF';
          color: #000;
          position: absolute;
          right: 10px;
          z-index: 0;
          font: 12px/26px Arial, sans-serif;
          font-weight: bold;
          text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
        }
        .slideThree:before {
          content: 'ON';
          color: #00bf00;
          position: absolute;
          left: 10px;
          z-index: 0;
          font: 12px/26px Arial, sans-serif;
          font-weight: bold;
        }
        .slideThree label {
          display: block;
          width: 34px;
          height: 20px;
          cursor: pointer;
          position: absolute;
          top: 3px;
          left: 3px;
          z-index: 1;
          background: #fcfff4;
          background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
          background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
          background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
          -moz-border-radius: 50px;
          -webkit-border-radius: 50px;
          border-radius: 50px;
          -moz-transition: all 0.4s ease;
          -o-transition: all 0.4s ease;
          -webkit-transition: all 0.4s ease;
          transition: all 0.4s ease;
          -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
          -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        }
        .slideThree input[type=checkbox] {
          visibility: hidden;
        }
        .slideThree input[type=checkbox]:checked + label {
          left: 43px;
        }
      }
      .closeSiteTips {
        display: none;
        p {
          margin: 10px 0 0;
          padding: 8px 4px;
          border-radius: 5px 5px 0 0;
        }
        textarea {
          width: 100%;
          height: 100px;
          padding: 5px 10px;
          border-color: #f39c12;
        }
      }
      /*会员注册*/
      .title-header {
        h4 {
          font-size: 18px;
          font-weight: 500;
          font-family: "微软雅黑";
          margin: 0;
        }
      }
      .panel-body {
        padding-left: 0;
        padding-right: 0;
        textarea {
          width: 100%;
          max-width: 100%;
        }
        .radio {
          label {
            margin-right: 15px;
          }
        }
        .maildomainlist {
          display: none;
          padding-left: 15px;
          padding-right: 0;
          .panel-body {
            padding-right: 0;
          }
        }
      }
    }
  }
  .xs-320 {
    display: none;
  }
  //表格样式
  .panel{
    .panel-body{
      td{
        vertical-align: middle;
        display: table-cell;
        overflow: hidden;
      }
    }
  }
  //seo
  .panel.seo {
    .panel-body {
      .row {
        .panel-body {
          .input-group {
            width: 100%;
            margin-bottom: 10px;
            span {
              width: 92px;
            }
          }
        }
      }
    }
  }
  //导航
  .row.nav {
    .panel-body {
      .row {
        margin: 0;
      }
      .tab-content {
        ul {
          padding: 0;
          margin: 0;
          li {
            list-style: none;
            border-bottom: 1px dotted #DEEFFB;
            padding: 10px 0;
            span {
              display: inline-block;
              margin-right: 1%;
              input {
                width: 100%;
              }
              &:nth-child(1) {
                width: 15px;
              }
              &:nth-child(2) {
                width: 45px;
                text-align: center;
              }
              &:nth-child(3) {
                width: 25%;
              }
              &:nth-child(4) {
                width: 25%;
              }
              &:nth-child(5) {
                width: 40px;
                text-align: center;
                input {
                  width: auto;
                }
              }
              &:nth-child(6) {
                width: 40px;
                text-align: center;
                input {
                  width: auto;
                }
              }
            }
          }
        }
      }
    }
  }
  //风格管理
  .panel.style {
    .row {
      margin: 0 -15px;
    }
    ul.list {
      padding: 0;
      li {
        list-style: none;
        float: left;
        h4 {
          line-height: 21px;
          font-weight: 700;
          font-size: 12px;
          color: #09C;
        }
        p {
          float: left;
          width: 110px;

          img {
            width: 100%;
            height: 120px;
            margin: 0 10px 10px 0;
            text-align: center;
            line-height: 120px;
            color: #DA5;
          }
          input {
            width: 100%;
          }
        }
        .right {
          float: left;
          padding-left: 10px;
          .radio {
            margin-bottom: 10px;
          }
          p {
            clear: left;
          }
        }
      }
    }
  }
  //列表
  .panel.list{
    .panel-body {
      .row {
        table {
          margin-bottom: 0;
          thead {
            tr {
              th {
                text-align: center;
                color: #878d99;
                line-height: 24px;
                padding: 12px 10px;
                &.img {
                  width: 50px;
                }
              }
            }
          }
          tbody {
            tr {
              text-align: center;
              td {
                vertical-align: middle;
                display: table-cell;
                overflow: hidden;
                a {
                  margin-bottom: 0;
                  img {
                    width: 80px;
                    height: 60px;
                  }
                }

              }
            }
          }
        }
      }
    }
  }
  //视频腹部
  .panel.videoNew {
    .row {
      .file {
        width: 50%;
      }
      .file-up {
        position: relative;
        display: inline-block;
        background: #05B3F3;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 6px 16px;
        overflow: hidden;
        color: #fff;
        text-decoration: none;
        text-indent: 0;
        vertical-align: middle;
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          right: 0;
          top: 0;
          opacity: 0;
        }
      }
      .show-file-name {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        //overflow: hidden;
        border: 1px solid transparent;
        background-color: #ccc;
        margin-left: -5px;
        border-radius: 0 4px 4px 0;
        //padding: 6px 10px;
        &:hover{
          img{
            display: block;
          }
        }
        img{
          display: none;
          position: absolute;
          top: -100%;
          left: 100%;
          z-index: 15;
          max-width: 400px;
          margin-left: 10px;
          box-shadow: 1px 1px 10px 5px #ccc;
          border-radius: 5px;
        }
      }
      label {
        margin: 0 5px;
      }
      .catetory{
        z-index: 3;
        padding: 0;
        .catetory-name{
          cursor: pointer;
          display: block;
          width: 100%;
          height: 100%;
          background: #ededed;
          padding-left: 10px;
          font-size: 14px;
          line-height: 30px;
          float: left;
        }
        i{
          position: absolute;
          right: 10px;
          width: 10px;
          font-size: 20px;
          font-weight: 600;
        }
        .catetory-list{
          position: absolute;
          top:100%;
          z-index: 10;
          width: 100%;
          background: #fff;
          border: 1px solid #999;
          border-top: 0;
          padding-bottom: 10px;
          margin-top: 1px;
          span{
            margin-top: 10px;
            margin-left: 10px;
            line-height: 25px;
            padding: 0 5px;
            min-width: 60px;
            float: left;
            text-align: center;
            font-size: 14px;
            border: 1px solid #fff;
            display: inline;
            color: #555;
            &:hover{
              cursor: pointer;
              background-color: #99CCEE;
              color: #fff;
              text-decoration: none;
            }
            &.selected{
              background-color: #f2f2f2;
              font-weight: bold;
              border: 1px solid #d3d3d3;
              color: #555;
            }
          }
        }
      }

    }
  }

}

@media screen and (max-width: 454px) {
  .main-header nav.navbar {
    position: fixed !important;
    top: 0;
    left: 0;
  }

  aside.main-sidebar {
    padding-top: 50px !important;
  }

  .content {
    .row.nav {
      .panel-body {
        .row {
          .col-xs-12 {
            padding: 0;
          }
        }
        .tab-content {
          ul {
            li {
              span {
                .form-control {
                  padding: 6px;
                }
                &:nth-child(2) {
                  width: 35px;
                  text-align: center;
                }
                &:nth-child(3) {
                  width: 35%;
                }
                &:nth-child(4) {
                  width: 40%;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 325px) {
  .content {
    .xs-320 {
      display: block;
    }
    .row.nav {
      display: none;
    }
  }
}
</style>
