<template>
  <section>
      <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        全局
        <small>基本设置</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 全局 </a></li>
        <li class="active">基本设置</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content basic">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <form action="/{adminpath}?action=settingnew" onsubmit="return submitNew(event);" class="form-horizontal" method="post"
            id="setting">
            {#each setting}
            <div class="panel panel-default">
              <div class="panel-heading">基本配置</div>
              <div class="panel-body">
                <input type="hidden" name="settingnew[basic]" value="1" />
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">站点名称：</span>
                      <input type="text" class="form-control" value="{bbname}" placeholder="请输入站点名称" aria-describedby="sizing-addon1" name="settingnew[bbname]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      站点名称，将显示在浏览器窗口标题等位置
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">网站名称：</span>
                      <input type="text" class="form-control" value="{sitename}" placeholder="" aria-describedby="sizing-addon1" name="settingnew[sitename]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      网站名称，将显示在页面底部的联系方式处
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">网站 URL：</span>
                      <input type="text" class="form-control" value="{siteurl}" placeholder="" aria-describedby="sizing-addon1" name="settingnew[siteurl]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      网站 URL，将作为链接显示在页面底部
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">联系邮箱：</span>
                      <input type="text" class="form-control" value="{adminemail}" placeholder="" aria-describedby="sizing-addon1" name="settingnew[adminemail]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      管理员 E-mail，将作为系统发邮件的时候的发件人地址
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">客服 Q Q ：</span>
                      <input type="text" class="form-control" value="{siteqq}" placeholder="" aria-describedby="sizing-addon1" name="settingnew[siteqq]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      QQ在线客服号码
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">备案信息：</span>
                      <input type="text" class="form-control" value="{icp}" placeholder="" aria-describedby="sizing-addon1" name="settingnew[icp]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      页面底部可以显示 ICP 备案信息，如果网站已备案，在此输入您的授权码，它将显示在页面底部，如果没有请留空
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">高级配置</div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">统计代码：</span>
                      <textarea class="form-control" placeholder="" aria-describedby="sizing-addon1" name="settingnew[statcode]">{statcode}</textarea>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      页面底部可以显示第三方统计
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group input-group-md">
                      <span class="input-group-addon">后台地址：</span>
                      <input type="text" class="form-control" value="{adminpath}" placeholder="" aria-describedby="sizing-addon1" name="settingnew[adminpath]">
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      网站后台管理地址 默认为 admin ,无需修改其他文件，即可更改管理后台地址，确保安全，修改后台路径之后，需要重新启动服务
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="panel panel-info">
                      <div class="panel-heading">关闭站点</div>
                      <div class="panel-body closeSite">
                        <div class="checkbox">
                          <div class="slideThree">
                            <input type="checkbox" value="true" id="slideThree" name="settingnew[bbclosed]">
                            <label for="slideThree"></label>
                          </div>
                        </div>
                        <div class="closeSiteTips">
                          <p class="alert-warning">关闭站点的原因:</p>
                          <textarea placeholder="请在此输入关闭原因！" aria-describedby="sizing-addon1" name="settingnew[closedreason]">{closedreason}</textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      暂时将站点关闭，其他人无法访问，但不影响管理员访问
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <button type="submit" name="Submit" class="btn btn-success">保存</button>
                  </div>
                </div>
              </div>
            </div>
            {/each}
          </form>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </section>
</template>
<script>
  var bbclosed = '{bbclosed}'
  // console.log(bbclosed)
  if (bbclosed == 'true') {
    console.log('网站关闭')
    /* eslint-disable */
    $('#slideThree')
      .attr('checked', true)
      .parents('.closeSite')
      .find('.closeSiteTips')
      .show()
    /* eslint-endable */
  }
</script>
