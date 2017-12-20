<template>
  <section>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        内容
        <small>文章发布</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href=""><i class="fa fa-th"></i> 内容</a></li>
        <li class="active">文章发布</li>
      </ol>
    </section>
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <form enctype="multipart/form-data" method="post"
            class="form-horizontal" id="news" name="form">
            <div class="panel panel-default videoNew">
              <div class="panel-heading">添加文章</div>
              <div class="panel-body">
                <input type="hidden" name='news[_id]' value="{_id}" />
                <div class="row">
                  <div class="col-xs-12 col-md-8">
                    <div class="input-group">
                      <span class="input-group-addon">标题：</span>
                      <input type="text" class="form-control" v-model="article.title" placeholder="请输入标题" />
                      <span class="input-group-addon">{{article.title && article.title.length || 0}}/100</span>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-4">
                    <div class="right-tips-text text-muted">
                      文章标题，为必填项，长度为(5-100个字符)
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-8" >
                    <editor uniqueId="article" :clear="clearContent" :content="article.content" @change="editCallback"></editor>
                  </div>
                  <div class="hidden-xs col-md-4">
                    <div class="right-tips-text text-muted">
                      文章正文，为必填项，长度最低为(10个字符)
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-8">
                    <div class="input-group">
                      <span class="input-group-addon">分类：</span>
                      <div class="form-control catetory" @mouseleave="showCatetoryList = false">
                        <span class="catetory-name" @click="changeCatetory">{{catetoryName}}</span>
                        <i class="fa fa-sort-down"></i>
                        <div class="catetory-list" v-show="showCatetoryList" >
                          <span data-name="catetory" v-for="(item,index) in catetoryList" @click="selected" :data-index="index" :class="item.checked ? 'selected' : ''">{{item.alias}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-4">
                    <div class="right-tips-text text-muted">
                      文章分类，不选则为默认分类-default
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-8">
                    <div class="input-group">
                      <span class="input-group-addon">标签：</span>
                      <input type="text" class="form-control" name="news[tag]" v-model="article.tag" placeholder="每个标签之间请使用半角符号(,)隔开" />
                    </div>
                  </div>
                  <div class="hidden-xs col-md-4">
                    <div class="right-tips-text text-muted">
                      文章标签，可以不填，每个标签之间请使用半角符号(,)隔开
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <el-button type="primary" plain :disabled="disabled" @click="save">{{update ? '更新' : '保存'}}</el-button>
                    <el-button type="primary" @click="cancel" v-if="update">取消</el-button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
      return {
        article: {},
        update: false,
        showCatetoryList: false,
        catetoryName: '请选择分类',
        catetoryList: [],
        contentIsOk: false,
        titleIsOk: false,
        clearContent: false
      }
    },
    components: {
      Editor
    },
    computed: {
      disabled: {
        // cache: false,
        get() {
          let that = this
          if (that.$data.titleIsOk && that.$data.contentIsOk) {
            that.$data.disabled = false
          } else {
            that.$data.disabled = true
          }
          return that.$data.disabled
        }
      }
    },
    watch: {
      'article.title': function(val) {
        let that = this
        if (!val) {
          return false
        }
        if (val.length > 100) {
          that.$data.article.title = that.$data.article.title.substring(0, 97) + '...'
        } else {
          that.$data.article.title = val
        }
        if (val.length >= 5) {
          that.$data.titleIsOk = true
        } else {
          that.$data.titleIsOk = false
        }
      }
    },
    methods: {
      changeCatetory(e) {
        let that = this
        that.$data.showCatetoryList = !that.$data.showCatetoryList
      },
      selected(e) {
        let that = this
        let data = e.currentTarget.dataset
        that.$data.article.catetory = that.$data.catetoryList[data.index].id

        that.$data.catetoryName = that.$data.catetoryList[data.index].alias

        if (that.$data.oldCheckedIndex) {
          that.$data.catetoryList[that.$data.oldCheckedIndex].checked = false
        }

        that.$data.catetoryList[data.index].checked = true

        that.$data.oldCheckedIndex = data.index
        that.$data.showCatetoryList = !that.$data.showCatetoryList
      },
      save(e) {
        let that = this
        let method = 'POST'
        if (that.$data.update) {
          method = 'PUT'
        }
        if (that.$data.tmp === JSON.stringify(that.$data.article)) {
          return that.$message({
            message: '您还未做过更改',
            type: 'info'
          })
        }
        that.$data.disabled = true
        that.$API.adminSaveArticle({
          data: {
            id: that.$data.id,
            title: that.$data.article.title,
            content: that.$data.article.content,
            tag: that.$data.article.tag,
            catetory: that.$data.article.catetory
          },
          method: method,
          success(res) {
            let data = res.data
            console.log('----------------')
            console.log(data)
            console.log('------ End------')
            if (data.code === 10000) {
              that.$message({
                message: data.message,
                type: 'success'
              })
              that.$data.article = {}
              that.$data.id = undefined
              that.$data.update = false
              that.$data.titleIsOk = false
              that.$data.contentIsOk = false
              that.$data.tmp = ''
              that.$data.clearContent = true
              setTimeout(() => {
                that.$router.push('/admin/article/new')
              }, 500)
            } else {
              that.$message({
                message: data.message,
                type: 'warning'
              })
            }
          }
        })
      },
      cancel() {
        this.$data.article = {}
        this.$data.clearContent = true
        this.$router.go(-1)
      },
      getArticleInfo() {
        let that = this
        that.$API.adminArticleInfo({
          data: {
            id: that.$data.id
          },
          method: 'POST',
          success(res) {
            console.log('--------------')
            console.log(res)
            console.log('--------------')
            let data = res.data
            if (data.code === 10000) {
              let article = data.entity.article
              article.tag = article.tag.join(',')
              that.$data.article = article
              that.$data.tmp = JSON.stringify(article)
            } else {
              that.$message({
                message: data.message,
                type: 'warning'
              })
            }
          }
        })
      },
      editCallback(val) {
        if (!val) {
          return false
        }
        this.$data.article.content = val
        if (val.length >= 10) {
          this.$data.contentIsOk = true
        } else {
          this.$data.contentIsOk = false
        }
      },
      getCatetoryList() {
        let that = this
        that.$API.adminCatetoryList({
          data: {},
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              let catetoryList = data.entity.catetory || []
              let articleCatetory = that.$data.article.catetory_id || ''
              for (let index = 0; index < catetoryList.length; index++) {
                let child = catetoryList[index]
                if (child.id == articleCatetory) {
                  catetoryList[index].checked = true
                  that.$data.oldCheckedIndex = index
                  that.$data.catetoryName = child.alias
                } else {
                  catetoryList[index].checked = false
                }
              }
              that.$data.catetoryList = catetoryList
            }
          }
        })
      }
    },
    created () {
      let that = this
      let params = that.$route.params
      console.log('--------------')
      console.log(params)
      console.log('--------------')
      if (params.id) {
        that.$data.id = params.id
        that.$data.update = true
        that.getArticleInfo()
      } else {
        that.$data.id = ''
      }
      that.getCatetoryList()
    },
    mounted () {
    }
  }
</script>
