<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    提示
    <small>控制面板</small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> 提示</a></li>
    <li class="active">设置</li>
  </ol>
</section>
<!-- Main content -->
<section class="content">
  <!-- Small boxes (Stat box) -->
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <h3 class="">{{body}}</h3>
        <p>正在自动跳转到之前页面，如没有反应，<a href="" id="target" onclick="return put(event)">请点击此处</a></p>
      </div>
    </div>
  </div>
</section><!-- /.content -->
<script>
  window.setTimeout(function(){
    $.ajax({
      url : url,
      type: 'PUT',
      success:function(data){
        $(".content-wrapper").html(data+"<script>url ='"+url+"'<\/script>");
        $.getScript("/AdminLTE/dist/js/common.js");
      }
    })
  },2500)
  '{{script}}'
</script>
<!-- Add the sidebar's background. This div must be placed
     immediately after the control sidebar -->
