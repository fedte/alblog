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
          <div class="panel panel-default list">
              <div class="panel-heading">分类管理</div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12">
                    <ul class="nav nav-pills" role="tablist">
                      <li role="presentation" class="active"><a>分类列表</a></li>
                      <li role="presentation">
                        <router-link :to="'/admin/catetory/new'">新增分类</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="table-responsive">
                      <table class="table table-hover table-bordered table-striped">
                        <thead>
                        <tr>
                          <th>名称</th>
                          <th>目录</th>
                          <th>内容数量</th>
                          <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="'item-id-'+ item.id" v-for="(item,index) in dataList" :key="index">
                          <td>{{item.alias}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.content_count.length}}</td>
                          <td>
                            <router-link tag="button" class="el-button el-button--default el-button--mini" :to="'/admin/catetory/new/' + item.id">编辑</router-link>
                            <el-button size="mini" type="danger" :data-id="item.id" :data-index="index" @click="removeItem">删除</el-button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>
        </div>
      </div>
    </section><!-- /.content -->
  </section>
</template>
<script>
  export default {
    data() {
      return {
        dataList: []
      }
    },
    watch: {},
    computed: {
    },
    components: {},
    methods: {
      getCatetoryList() {
        let that = this
        that.$API.adminCatetoryList({
          data: {},
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              let catetoryList = data.entity.catetory
              that.$data.dataList = catetoryList
            } else {
              that.$message({
                message: data.message,
                type: 'info'
              })
            }
          }
        })
      },
      removeItem(e) {
        let that = this
        let data = e.currentTarget.dataset
        that.$messageBox.confirm('此操作将删除该分类，分类内容将移至默认目录，是否继续?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('----------------')
          console.log('ssss')
          console.log('------ End------')
          that.$data.deleteId = data.id
          that.$data.deleteIndex = data.index
          that.$data.deleteType = that.$data.dataType
          that.confirmRemove()
        }).catch(() => {
          console.log('----------------')
          console.log('取消了')
          console.log('------ End------')
        })
      },
      confirmRemove() {
        let that = this
        that.$API.adminDeleteItem({
          data: {
            deleteId: that.$data.deleteId,
            deleteType: that.$data.deleteType
          },
          method: 'DELETE',
          success(res) {
            console.log('----------------')
            console.log(res)
            console.log('------ End------')
            let data = res.data
            if (data.code === 10000) {
              that.$data.dataList.splice(that.$data.deleteIndex, 1)
              that.$message({
                message: data.message,
                type: 'success'
              })
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
      that.$data.dataType = 'catetory'
      that.getCatetoryList()
    },
    mounted() {}
  }
</script>
