<template>
  <section>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        内容
        <small>文章管理</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href=""><i class="fa fa-th"></i> 内容</a></li>
        <li class="active">文章管理</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row" v-if="dataList.length > 0 && dataList !== null">
        <div class="col-xs-12">
          <div class="panel panel-default list">
            <div class="panel-heading">文章列表</div>
            <div class="panel-body">
              <div class="row">
                <div class="table-responsive">
                  <table class="table table-hover table-bordered table-striped" v-if="true">
                    <thead>
                      <tr>
                        <!-- <th class="img">缩略图</th> -->
                        <th>序号</th>
                        <th>标题</th>
                        <th>分类</th>
                        <th>作者</th>
                        <th>发布时间</th>
                        <th>阅读量</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr :class="'item-id-' + item.id" v-for="(item,index) in dataList">
                        <!-- <td><a href="{poster}" onclick="return showImage(this.href)" class="thumbnail"><img src="{poster}" alt=""/></a></td> -->
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.catetory.alias }}</td>
                        <td>{{ item.author.loginname }}</td>
                        <td>{{ formatDate(item.create_at) }}</td>
                        <td>{{ item.visit_count }}</td>
                        <td>
                          <router-link class="el-button el-button--default el-button--mini" target = "_blank" :to="'/article/' + item.id">查看</router-link>
                          <router-link tag="button" class="el-button el-button--default el-button--mini" :to="'/admin/article/new/' + item.id">编辑</router-link>
                          <el-button size="mini" type="danger" :data-id="item.id" :data-index="index" @click="removeItem">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pages.currentPage || 1"
                :page-sizes="[10, 20, 30, 50, 100, 200]"
                :page-size="limit"
                layout="prev, pager, next, total, sizes"
                :total="pages.countTotal"
                :background="true"
                class="pagination">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-xs-12">
          <h3 class="text-center text-muted">暂时没有文章，请前往 “ 内容 - <router-link to="/admin/article/new">文章发布</router-link> ” 中添加发布文章</h3>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </section>
</template>
<script>
  export default {
    data() {
      return {
        dataList: [],
        pages: {},
        pageSize: 1,
        limit: 10
      }
    },
    methods: {
      formatDate(value) {
        return this.$utils.formatDate(value)
      },
      handleSizeChange(val) {
        console.log('----------------')
        console.log(val)
        console.log('------ End------')
        this.$data.limit = val
        this.getArticleList()
      },
      handleCurrentChange(val) {
        console.log('----------------')
        console.log(val)
        console.log('------ End------')
        this.$data.pageSize = val
        this.getArticleList()
      },
      getArticleList() {
        let that = this
        that.$API.adminArticleList({
          data: {
            catetory: that.$data.catetory || 'all',
            limit: that.$data.limit || 10,
            page: that.$data.pageSize || 1
          },
          method: 'POST',
          success(res) {
            let data = res.data
            console.log('----------------')
            console.log(data)
            console.log('------ End------')
            if (data.code === 10000) {
              that.$data.dataList = data.entity.data
              that.$data.pages = data.entity.pages
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
        that.$messageBox.confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
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
      that.$data.dataType = 'article'
      that.getArticleList()
    }
  }
</script>
