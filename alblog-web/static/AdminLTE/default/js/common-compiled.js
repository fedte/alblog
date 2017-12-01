/**
 * Created by Falost on 2016/7/24.
 */
//全局 基本设置
//关闭站点

$(".basic .slideThree").change(function () {
  if ($(".basic #slideThree").is(':checked')) {
    //console.log(1)
    $(this).parents('.closeSite').find('.closeSiteTips').show();
  } else {
    $(this).parents('.closeSite').find('.closeSiteTips').hide();
    $('.basic #slideThree').removeAttr('checked');
    console.log(2);
  }
});
//注册与访问控制
$(".toggle input").change(function () {
  if ($(this).val() > 0) {
    console.log(1);
    $(this).parents('.toggle').find('.maildomainlist').show();
  } else {
    $(this).parents('.toggle').find('.maildomainlist').hide();
  }
});

function submitSetting(e) {
  var e = e.target || e;
  //console.log(e)
  //console.log(settingnew)
  if (url == "undefined") {
    url = window.location.href;
  }
  console.log("ajax开始");
  $.ajax({
    url: e.action,
    type: 'post',
    data: $(e).serialize(),
    processData: false,
    success: function (data) {
      //console.log(data)
      console.log($(e).serialize());
      $(".content-wrapper").html(data);
      //console.log(url)
      $("#target").attr('href', url);
    }
  });
  console.log("ajax结束");
  //window.setTimeout(function(){
  //  $.ajax({
  //    url : url,
  //    type: 'PUT',
  //    success:function(data){
  //      $(".content-wrapper").html(data+"<script>url ='"+url+"'<\/script>");
  //      $.getScript("dist/js/common.js");
  //    }
  //  })
  //},3000)
  return false;
}

//# sourceMappingURL=common-compiled.js.map