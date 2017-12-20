<template>
  <section>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        分类
        <small>分类管理</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href=""><i class="fa fa-files-o"></i> 分类</a></li>
        <li class="active">分类管理</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-xs-12">
          <form action="" enctype="multipart/form-data" method="post"
                class="form-horizontal" id="setting" name="form">
            <div class="panel panel-default">
              <div class="panel-heading">分类管理</div>
              <div class="panel-body catetory">
                <div class="row">
                  <div class="col-xs-12">
                    <ul class="nav nav-pills" role="tablist">
                      <li role="presentation">
                        <router-link to="/admin/catetory">分类列表</router-link>
                      </li>
                      <li role="presentation" class="active"><a>{{ update ? '更新分类' : '新增分类' }}</a></li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group">
                      <span class="input-group-addon">名称：</span>
                      <input type="text" class="form-control" v-model="catetory.alias" placeholder="分类的名称"/>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                    分类的名称，必填项
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group">
                      <span class="input-group-addon">目录：</span>
                      <input type="text" class="form-control" v-model="catetory.name"
                            placeholder="分类的目录,可用于URL访问,不可重复"/>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      分类的目录，必填项，可用于URL访问,不可重复
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <div class="input-group">
                      <span class="input-group-addon">类型：</span>
                      <input type="text" class="form-control" v-model="catetory.type"
                            placeholder="分类的类型"/>
                    </div>
                  </div>
                  <div class="hidden-xs col-md-6">
                    <div class="right-tips-text">
                      分类的类型，可不填写
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 xs-md-6">
                    <el-button type="primary" plain :disabled="disabled" @click="save">{{update ? '更新' : '保存'}}</el-button>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section><!-- /.content -->
  </section>
</template>
<script>
  export default {
    data() {
      return {
        catetory: {},
        update: false
      }
    },
    watch: {},
    computed: {
      disabled () {
        let that = this
        if (that.$data.catetory.name && that.$data.catetory.alias) {
          that.$data.disabled = false
        } else {
          that.$data.disabled = true
        }
        console.log('---------that.$data.disabled -------')
        console.log(that.$data.disabled)
        console.log('------ End------')
        return that.$data.disabled
      }
    },
    component: {},
    methods: {
      getCatetoryInfo() {
        let that = this
        that.$API.adminCatetoryInfo({
          data: {
            id: that.$data.id
          },
          method: 'POST',
          success(res) {
            console.log('----------------')
            console.log(res)
            console.log('------ End------')
            let data = res.data
            if (data.code === 10000) {
              that.$data.catetory = data.entity.catetory
            } else {
              that.$message({
                message: data.message,
                type: 'warning'
              })
            }
          }
        })
      },
      save(e) {
        let that = this
        let method = 'POST'
        if (that.$data.update) {
          method = 'PUT'
        }
        if (that.$data.tmp === JSON.stringify(that.$data.catetory)) {
          return that.$message({
            message: '您还未做过更改',
            type: 'info'
          })
        }
        that.$data.disabled = true
        that.$API.adminSaveCatetory({
          data: {
            id: that.$data.id,
            name: that.$data.catetory.name,
            alias: that.$data.catetory.alias,
            type: that.$data.catetory.type
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
              that.$data.catetory = {}
              that.$data.id = undefined
              that.$data.update = false
              that.$data.tmp = ''
              that.$data.clearContent = true
              setTimeout(() => {
                that.$router.push('/admin/catetory/list')
              }, 500)
            } else {
              that.$message({
                message: data.message,
                type: 'warning'
              })
            }
          }
        })
      }
    },
    created() {
      let that = this
      let data = that.$route.params
      that.$data.dataType = 'catetory'
      if (data.id) {
        that.$data.id = data.id
        that.$data.update = true
        that.getCatetoryInfo()
      }
    },
    mounted () {}
  }
</script>
