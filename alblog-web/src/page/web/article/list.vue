<template>
  <div class="article-content">
    <div class="article-list">
      <div class="article-item  bgc-fff flex" v-for="(item, index) in articles" :key="index">
        <div class="content-img" v-if="item.thumb">
          <router-link :to="'/article/' + item.id">
            <img src="~assets/images/bg/bg1.jpg" alt="" :title="item.name">
          </router-link>
        </div>
        <div class="content-text">
          <div class="article-header">
            <router-link :to="'/catetory/' + item.catetory_id" class="catetory-name c-333" title="分类">[{{item.catetory.alias}}]</router-link>
            <router-link :to="'/article/' + item.id" class="article-title c-333" :title="item.title">{{item.title}}</router-link>
          </div>
          <div class="article-tags flex" v-if="item.tag.length > 0">
            <span class="fui-font fui-tag c-666 mr10" title="标签"></span>
            <router-link :to="'/tags/' + item" class='tag mr10' v-for="(item, index) in item.tag" :key="index" v-if="index < 5" :style="'background-color:' + bgColor()" :title="item">{{item}}</router-link>
          </div>
          <div class="article-desc">
            <router-link :to="'/article/' + item.id" class="c-666" title="简介">{{item.content | spliceDesc}}</router-link>
          </div>
          <div class="article-footer flex">
            <div class="footer-left fx1">
              <div class="mr10 create-time c-999" title="发表时间">
                <span class="fui-font fui-time"></span>
                <span>{{formatDate(item.create_at)}}</span>
              </div>
            </div>
            <div class="footer-rigt flex-right tar fx1">
              <div class="mr10 visit-count c-999" title="点击数">
                <span class="fui-font fui-visit"></span>
                <span>{{item.visit_count || 0}}</span>
              </div>
              <div class="mr10 digg-count c-999" :class="isDigg(item.id)" title="点赞数" @click="digg" :data-id="item.id" :data-index="index">
                <span class="fui-font fui-digg"></span>
                <span>{{item.digg_count || 0}}</span>
              </div>
              <div class="mr10 comment-count c-999" title="评论数">
                <span class="fui-font fui-comment"></span>
                <span>{{item.reply_count || 0}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        articles: [],
        page: {},
        diggList: [],
        loadMore: false
      }
    },
    filters: {
      spliceDesc(val) {
        return val.replace(/```javascript/g, '```').replace(/```/g, '').slice(0, 260)
      }
    },
    watch: {
      '$route'() {
        this.getArticleList()
      },
      'loadMore' (val) {
        let that = this
        if (val) {
          if (that.$data.currentPage < that.$data.page.pageCount) {
            that.$data.currentPage++
            that.getComments()
          }
        }
      },
      'diggList' (val) {
        if (val) {
          this.$STORE.set('digg', this.$data.diggList)
        }
      }
    },
    methods: {
      formatDate(val) {
        return this.$utils.formatDate(val)
      },
      bgColor() {
        return this.$utils.randomColor()
      },
      getArticleList() {
        let that = this
        let route = that.$route
        let params = route.params
        let data = {}

        if (route.name === 'tags') {
          data = {
            type: 'tag',
            tags: params.tag
          }
        } else if (route.name === 'catetory') {
          data = {
            type: 'catetory',
            catetory: params.id
          }
        }
        that.$API.getArticleList({
          data: data,
          method: 'POST',
          success(res) {
            let result = res.data
            if (result.code === 10000) {
              that.$data.page = result.entity.page
              if (that.$data.loadMore) {
                that.$data.articles = [...that.$data.articles, ...result.entity.data]
              } else {
                that.$data.articles = result.entity.data
              }

              if (that.$data.currentPage >= that.$data.page.pageCount) {
                that.$data.loadAll = true
              } else {
                that.$data.loadAll = false
                that.$data.loadMore = false
              }
            }
          }
        })
      },
      digg(e) {
        let that = this
        let dataset = e.currentTarget.dataset
        if (that.$data.diggList.indexOf(dataset.id) !== -1) {
          return that.$message({
            message: '把下一个赞留给别人吧',
            type: 'info'
          })
        }
        that.$API.updateDigg({
          data: {
            id: dataset.id,
            type: 'article'
          },
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              that.$data.articles[parseInt(dataset.index)].digg_count ++
              that.$data.diggList.push(dataset.id)
              console.log('----------------')
              console.log(that.$data.articles[parseInt(dataset.index)], dataset.index)
              console.log('------ End------')
            } else {
              that.$message({
                message: data.message,
                type: 'error'
              })
            }
          }
        })
      },
      isDigg(id) {
        let active
        if (this.$data.diggList.indexOf(id) !== -1) {
          active = 'active'
        } else {
          active = ''
        }
        return active
      }
    },
    created () {
      let that = this
      that.$data.diggList = that.$STORE.get('digg') || []
      that.getArticleList()
    }
  }
</script>
<style lang="scss" scoped>
  @import "src/scss/common.scss";
  .article-list {
    width: $maxWidth;
    margin: 30px auto;
  }
  .article-item {
    position: relative;
    color: #333;
    overflow: hidden;
    box-sizing: border-box;
    margin-bottom: 30px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
    .content-img {
      position: relative;
      min-width: 40%;
      max-width: 40%;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .content-text {
      position: relative;
      width: 100%;
      min-height: 200px;
      padding: 15px 20px;
      .article-header {
        font-weight: 300;
        font-size: 24px;
      }
      .article-tags {
        font-size: 16px;
        padding: 4px 0;
        color: #999;
        padding: 12px 0;
        .tag {
          padding: 2px 6px;
          line-height: 20px;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
          opacity: 0.75;
          &:hover {
            opacity: 1
          }
        }
      }
      .article-desc {
        line-height: 1.6em;
        position: relative;
        font-size: 16px;
        overflow: hidden;
        margin: 5px 0 10px 0;
      }
      .article-footer {
        position: absolute;
        bottom: 15px;
        left: 20px;
        right: 20px;
      }
    }
  }
  @media (max-width: 768px) {
    .article-list {
      width: 100%;
      margin: 15px auto;
    }
    .article-item {
      display: inherit;
      margin-bottom: 15px;
      .content-img {
        // display: none;
        min-width: 92%;
        max-width: 92%;
        height: 130px;
        margin: 0 auto;
        img {
           transform: translate(-50%, -50%) scale(1, 0.4);
        }
      }
      .content-text {
        min-height: auto;
        width: 92%;
        margin: auto;
        padding: 10px 0;
        .article-header {
          font-size: 18px;
        }
        .article-tags {
          font-size: 14px;
          padding: 6px 0;
        }
        .article-footer {
          position: static;
        }
      }
    }
  }
</style>
