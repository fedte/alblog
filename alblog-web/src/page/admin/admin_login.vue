<template>
  <div class="wrapper">
    <!-- Content Wrapper. Contains page content -->
     <div class="row">
        <div class="center-block ">
          <form class="form-signin" action="user/signin" method="post" id="login">
            <div class="panel panel-default">
              <div class="panel-heading">欢迎回来</div>
              <div class="panel-body">
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="glyphicon glyphicon-user"></i>
                    </span>
                    <input class="form-control" @blur="checks" v-model="name" type="text" placeholder="请输入用户名/邮箱" name="user" style="width:100%" data-id="user">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon fs_17">
                      <i class="glyphicon glyphicon-lock"></i>
                    </span>
                    <input class="form-control" @blur="checks" v-model="pass" type="password" placeholder="请输入密码" name="pwd" style="width:100%" data-id="pwd">
                  </div>
                </div>
                <button class="btn btn-primary btn-block" type="submit" disabled="disabled">登录</button>
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
<script>
   require('@/../static/default/css/animate.css')
</script>

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
        name: '',
        pass: ''
      }
    },
    methods: {
      checks(e) {
        let that = this

      }
    },
    created() {
    },
    mounted() {
      /* eslint-disable */
      $('#login input').blur(function() {
        Test($(this).attr('id'), this)
        $(this).keyup(function() {
          Test($(this).attr('id'), this)
        })
      })
      $('#login').submit(function() {
        var name = $('#user').val(),
          pwd = $('#pwd').val()
        //console.log(name)
        if (name != '' && pwd != '') {
          $.post(
            '/user/signin',
            { 'user[name]': name, 'user[password]': pwd, 'user[isSubmit]': 1 },
            function(res) {
              if (res.signin) {
                window.location.href = 'admin'
              } else {
                $('#login').addClass('animated shake')
                setTimeout(function() {
                  $('#login').removeClass('shake')
                }, 1000)
                if (res.err) {
                  $('#pwd')
                    .parent()
                    .addClass('error')
                    .removeClass('correct')
                  if (res.strat) {
                    $('#user')
                      .parent()
                      .addClass('error')
                      .removeClass('correct')
                  }
                }
              }
            },
            'json'
          )
        }
        return false
      })
      function Test(name, target) {
        var reg
        if (name == 'user') {
          reg = /^[\w\u4E00-\u9FA5]{4,20}$/.test($(target).val())
        } else if (name == 'pwd') {
          reg = $(target).val().length >= '{{pwlength}}'
        }
        if ($(target).attr('id') == name && !reg) {
          $(target)
            .parent()
            .addClass('error')
            .removeClass('correct')
        } else {
          $(target)
            .parent()
            .addClass('correct')
            .removeClass('error')
        }
        if (
          $('#login').find('.error').length <= 0 &&
          $('#login').find('.correct').length >= $('#login input').length
        ) {
          $('#login button').removeAttr('disabled')
        } else {
          $('#login button').attr('disabled', true)
        }
      }
    }

  }
</script>

