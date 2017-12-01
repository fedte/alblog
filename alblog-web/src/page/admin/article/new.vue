<template>
  <section>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        内容
        <small>内容发布</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-th"></i> 内容</a></li>
        <li class="active">内容发布</li>
      </ol>
    </section>
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <form action="/{adminpath}?action=newsnew" enctype="multipart/form-data" method="post" @submit="submitNew()"
            class="form-horizontal" id="news" name="form">
            <div class="panel panel-default videoNew">
              <div class="panel-heading">添加内容</div>
              <div class="panel-body">
                <input type="hidden" name='news[_id]' value="{_id}" />
                <div class="row">
                  <div class="col-xs-12">
                    <div class="input-group">
                      <span class="input-group-addon">标题：</span>
                      <input type="text" class="form-control" name="news[title]" value="{title}" placeholder="请输入标题" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12" style="z-index:9999">
                    <editor></editor>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="input-group">
                      <span class="input-group-addon">分类：</span>

                      <div class="form-control catetory">
                        <span class="catetory-name">请选择分类</span>
                        <i class="fa fa-sort-down"></i>

                        <div class="catetory-list">
                          {#each ../catetories}
                          <span data-name="catetory" data-value="{_id}">{name}</span> {/each}
                          <input type="hidden" name="news[catetory]" value="{catetory}" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="input-group">
                      <span class="input-group-addon">标签：</span>
                      <input type="text" class="form-control" name="news[tag]" value="{tag}" placeholder="每个标签之间请使用半角符号(,)隔开" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    {#if _id}
                    <button type="submit" name="Submit" class="btn btn-success">更新</button> {else}
                    <button type="submit" name="Submit" class="btn btn-success">保存</button> {/if}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <h3 class="text-center text-muted">尚未添加分类，请前往 “全局 - 分类管理” 中添加文章分类</h3>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </section>
</template>
<script>
  import Editor from '@/components/common/editor/editor'
  export default {
    data() {
      return {}
    },
    components: {
      Editor
    },
    methods: {
      submitNew() {
        console.log('--------------')
        console.log(111)
        console.log('--------------')
      }
    },
    created () {
    },
    mounted () {
      // 分类选择
      let catetoryName = $('.catetory-name')
      let catetoryList = $('.catetory-list')
      let catetory = '{catetory}'
      catetoryName.click(function() {
        catetoryList.toggle()
        catetoryList.find('span').removeClass('selected')
        catetoryList
          .find('span[data-value="' + catetoryList.find('input').val() + '"]')
          .addClass('selected')
      })
      if (catetory) {
        catetoryList.find('span[data-value="' + catetory + '"]').addClass('selected')
        // catetoryList.hide().find('input').val(_this.data('value'));
        catetoryName.text('{catetoryName}')
      }
      $('.catetory-list span').click(function() {
        var _this = $(this)
        catetoryName.text(_this.text())
        catetoryList
          .hide()
          .find('input')
          .val(_this.data('value'))
      })
    }
  }

  // var simplemde = new SimpleMDE({ element: document.getElementById("content") });
  /* eslint-disable */
  // var uniqueId = 'content'
  // var id = '{_id}'
  // if (id) {
  //   uniqueId = 'updata'
  // }
  // var simplemde = new SimpleMDE({
  //   autofocus: true,
  //   autosave: {
  //     enabled: true,
  //     uniqueId: uniqueId,
  //     delay: 5000
  //   },
  //   element: document.getElementById('content'),
  //   forceSync: true,
  //   promptURLs: true,
  //   placeholder: 'Type here...',
  //   renderingConfig: {
  //     singleLineBreaks: false,
  //     codeSyntaxHighlighting: true
  //   },
  //   shortcuts: {
  //     drawTable: 'Cmd-Alt-T'
  //   },
  //   showIcons: ['code', 'table'],
  //   spellChecker: false
  // })
  // console.log(simplemde.value())

  // $("button[type='submit']").click(function() {
  //   var title = $("input[name='news[title]']").val()
  //   var cat = $("input[name='news[catetory]']").val()
  //   if (title != '' && title != 'undefined' && cat != '' && cat != 'undefined') {
  //     //$("button").removeAttr('disabled')
  //     return true
  //   } else if (title == '') {
  //     tips('标题不能为空！')
  //   } else if (cat == '') {
  //     tips('请选择分类！')
  //   }
  //   return false
  // })


</script>
