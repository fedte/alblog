<template>
  <div class="wrapper">
    <!-- Content Wrapper. Contains page content -->
     <div class="row">
        <div class="center-block ">
          <form class="form-signin" method="post" id="login" :class="loginError ? 'animated shake' : ''">
            <div class="panel panel-default">
              <div class="panel-heading">欢迎回来</div>
              <div class="panel-body">
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input class="form-control" v-model="userName"  @blur="checks" type="text" placeholder="请输入用户名/邮箱" name="user" style="width:100%" data-id="userName">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon fs_17">
                      <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <input class="form-control" v-model="userPass" @blur="checks" type="password" placeholder="请输入密码" name="pwd" style="width:100%" data-id="userPass" v-on:keyup.enter="goLogin">
                  </div>
                </div>
                <el-button class="btn btn-primary btn-block" type="primary" @click="goLogin" :disabled="isSubmit">登录</el-button>
              </div>
            </div>
          </form>
        </div>
        <p class="text-center">
          <strong>Copyright &copy; 2015-2016
            <a href="http://www.fedte.cc" target="_blank">FEDTE 工作室
            </a>.</strong>
          保留所有权利.</p>
      </div>
  </div>
</template>

<style scoped>
  .box {
    background-color: #ecf0f5;
    margin: 0;
  }

  .row {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 360px;
    margin-left: -180px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .error input,
  .error > span,
  .error input:focus {
    border-color: #a94442 !important;
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

  @media screen and (max-width: 360px) {
    .row {
      width: 95%;
      margin-left: -47.5%;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        userName: '',
        userPass: '',
        errorCount: 0,
        loginError: false
      }
    },
    watch: {
      user(val) {

      },
      loginError(val) {
        let that = this
        if (val) {
          setTimeout(() => {
            that.$data.loginError = !that.$data.loginError
          }, 1000)
        }
      }
    },
    computed: {
      isSubmit() {
        let that = this
        if (that.$data.userName !== '' && that.$data.userName.length >= 3 && that.$data.userPass !== '' && that.$data.userPass.length >= 6) {
          return false
        }
        return true
      }
    },
    methods: {
      checks(e) {
        let that = this
        let target = e.currentTarget.dataset
        let val = that.$data[target.id]
        let message = ''
        if (target.id === 'userName') {
          if (val == '') {
            message = '用户名不能为空'
          } else if (val.length < 3) {
            message = '用户名的长度不能小于 3'
          }
        } else if (target.id === 'userPass') {
          if (val == '') {
            message = '密码不能为空'
          } else if (val.length < 6) {
            message = '密码的长度不能小于 6'
          }
        }
        if (message !== '') {
          that.$message({
            showClose: true,
            message: message,
            type: 'warning'
          })
        }
      },
      goLogin() {
        let that = this
        let message = ''
        if (that.$data.userName == '') {
          message = '用户名不能为空'
        } else if (that.$data.userName.length < 3) {
          message = '用户名的长度不能小于 3'
        } else if (that.$data.userPass == '') {
          message = '密码不能为空'
        } else if (that.$data.userPass.length < 6) {
          message = '密码的长度不能小于 6'
        }
        if (message !== '') {
          return that.$message({
            showClose: true,
            message: message,
            type: 'warning'
          })
        }
        that.$API.userLogin({
          data: {
            name: that.$data.userName,
            pass: that.$data.userPass
          },
          method: 'POST',
          success(res) {
            let data = res.data
            console.log('--------------')
            console.log(data)
            console.log('--------------')
            if (data.code === 10000) {
              that.$message({
                showClose: true,
                message: data.message,
                type: 'success'
              })
              that.$data.user = data.entity.user
              that.$STORE.set('user', data.entity.user)
              that.$store.dispatch('setLogin', true)
              that.checkAuth()
              console.log('--------------')
              console.log('登录成功')
              console.log('--------------')
            } else {
              that.$data.loginError = true
              that.$message({
                showClose: true,
                message: data.message,
                type: 'error'
              })
            }
          }
        })
      },
      checkAuth() {
        let that = this
        if (that.$data.user && that.$data.user.uuid) {
          that.$API.isAdmin({
            data: {},
            method: 'POST',
            success(res) {
              let data = res.data
              let query = that.$route.query
              if (data.code === 10000) {
                that.$store.dispatch('setAdmin', true)
                if (query.from && query.from !== '/admin/login') {
                  that.$router.push(query.from)
                } else {
                  that.$router.push('/admin/index')
                }
              } else {
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
        }
      }
    },
    created() {
      let that = this
      that.$data.user = that.$STORE.get('user')
      that.checkAuth()
    },
    mounted() {
    }
  }
</script>

