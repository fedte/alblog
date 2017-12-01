/**
 * Created by Falost on 2016/7/24.
 */
//全局 基本设置
//关闭站点

$(".basic .slideThree").change(function () {
  if ($(".basic #slideThree").is(':checked')) {
    //console.log(1)
    $(this).parents('.closeSite').find('.closeSiteTips').show()
  } else {
    $(this).parents('.closeSite').find('.closeSiteTips').hide()
    $('.basic #slideThree').removeAttr('checked')
    console.log(2)
  }
})
//注册与访问控制
$(".toggle input").change(function () {
  if ($(this).val() > 0) {
    console.log(1)
    $(this).parents('.toggle').find('.maildomainlist').show()
  } else {
    $(this).parents('.toggle').find('.maildomainlist').hide()
  }
})

function submitNew(e) {
  var e = e.target || e;
  //console.log(e)
  //console.log(settingnew)
  if (url == "undefined") {
    url = window.location.href;
  }
  console.log("ajax开始")
  $.ajax({
    url: e.action,
    type: 'post',
    data: $(e).serialize(),
    processData: false,
    success: function (data) {
      //console.log(data)
      console.log($(e).serialize())
      $(".content-wrapper").html(data);
      //console.log(url)
      $("#target").attr('href', url)
    }
  })
  console.log("ajax结束")
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
  return false
}

function showImage(url){
  var active_pop = null;
  if(active_pop){
    return
  }
  active_pop = UI.pop({
    'width' : 600,
    'easyClose' : true,
    'mask' : false,
    'html' : '<div style="height:340px;background:url('+url+') no-repeat center;background-size:contain"></div>'
  });
  active_pop.on('destroy', function(){
    active_pop = null;
  });
  return false
}
$('.del').click(function (e) {
  var active_confirm = null;
  var target = $(e.target),
      id = target.data('id'),
      action = target.data('action'),
      path = target.data('path')
  tr = $('.item-id-' + id);
  console.log(tr);
  if (active_confirm) {
    return;
  }
  active_confirm = UI.confirm({
    'text': '确定要删除吗？',
    'btns': ['删除', '不删除'],
    'easyClose': true,
    'mask': true,
    'callback': function () {
      $.ajax({
        type: 'DELETE',
        url: '/' + path + '?action=' + action + '&id=' + id
      })
          .done(function (res) {
            if (res.success === 1) {
              if (tr.length > 0) {
                tr.remove()
              }
            }
            console.log(res);
          })
    }
  });
  active_confirm.on('destroy', function () {
    active_confirm = null;
  });
})
function put(e) {
  var e = e.target || e;
  //console.log(e)
  var target = $(e).attr('href');
  if (target != "#" && target != '' && target != 'undefined') {
//      console.log('ok')
    $.ajax({
      url: target,
      type: 'PUT',
      success: function (data) {
        $(".content-wrapper").html(data + "<script>url='" + target + "'<\/script>");
        $('title').text($(e).text())
        $.getScript("/AdminLTE/dist/js/common.js");
        // $.getScript("dist/js/angularctr.js");
      }
    })
  }
  return false
}
function tips(val) {
  $("body").append('<div class="alert alert-danger" role="alert">' + val + '</div>');
  var alert = $(".alert");
  alert.css({
    position: 'absolute',
    top: '0',
    width: '100%',
    'z-index': 9999,
    'text-align': 'center'
  });
  alert.fadeOut(4000, function () {
    $(this).remove()
  })
}
function check(action, key, value, callback) {
  console.log("action:" + action)
  $.ajax({
    type: 'POST',
    url: '/api/check?action=' + action + '&key=' + key + '&value=' + value
  })
      .done(function (res) {
        callback(null, res)
      })
}