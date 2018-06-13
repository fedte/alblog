<template>
  <section>
    <!-- 正文内容 -->
    <section class="content-detail bgc-fff">
      <template v-if="article !== null">
        <header>
          <div class="title fs20 fwb" :title="article.title">{{article.title}}</div>
          <div class="author-info flex" v-if="article.author">
            <img v-if="article.author.avatar_url" :src=" article.author.avatar_url" class="author-cover hidden-xs mr10" :alt="article.author.loginname" :title="article.author.loginname">
            <img v-else src="~assets/images/tuxiang.jpg" alt="" class="author-cover hidden-xs mr10" :title="article.author.loginname">
            <div>
              <span class="time fs14" title="创作时间">{{formatDate(article.create_at)}}</span>
              <router-link to="/" class="name fs18" title="作者">{{article.author.loginname}}</router-link>
            </div>
          </div>
        </header>
        <section class="content ptb20">
          <div v-html="article.content" v-highlight>
          </div>
          <div class="copyright pt15">
            <div class="copyright-info">
              <p class="fs14 c-666">作者：{{article.author.loginname}}</p>
              <p class="fs14 c-666">原文地址：<a class="c-666" :href="copyrightUrl" target="_blank">{{copyrightUrl}}</a></p>
            </div>
            <p class="fs12 c-999 mt10">转载请注明来源 !</p>
          </div>
          <div class="article-tags flex pt15" v-if="article.tag.length > 0">
            <span class="fui-font fui-tag c-666 mr10" title="标签"></span>
            <router-link :to="'/tags/' + item" class='tag mr10' v-for="item in article.tag" :key="item" :style="'background-color:' + bgColor()" :title="item">{{item}}</router-link>
          </div>
          <el-popover
            ref="rewards"
            placement="top"
            width="280"
            trigger="hover">
            <div class="flex tac">
              <div class="fx1">
                <img src="~assets/images/weixinpay.jpg" alt="微信打赏" data-mode="widthFix">
                <p>微信扫一扫打赏</p>
              </div>
              <div class="fx1">
                <img src="~assets/images/alipay.jpg" alt="支付宝打赏" data-mode="widthFix">
                <p>支付宝扫一扫打赏</p>
              </div>
            </div>
          </el-popover>
          <div class="digg flex-center mt10">
            <span class="fui-font fui-digg c-666 hover" :class="isDigg(article.id)" @click="articleDigg" title="内容不错,点个赞"></span>
            <span class="c-666 hover" v-popover:rewards title="打赏作者">赏</span>
          </div>
        </section>
        <footer>
          <div class="count-bar flex">
            <div class="mr10 visit-count c-666" title="点击数">
              <span class="fui-font fui-visit"></span>
              <span>{{article.visit_count || 0}}</span>
            </div>
            <div class="mr10 digg-count c-666" title="点赞数">
              <span class="fui-font fui-digg"></span>
              <span>{{article.digg_count || 0}}</span>
            </div>
            <div class="mr10 comment-count c-666" title="评论数">
              <span class="fui-font fui-comment"></span>
              <span>{{article.reply_count || 0}}</span>
            </div>
          </div>
        </footer>
      </template>
      <content-placeholders v-else>
        <content-placeholders-heading />
        <content-placeholders-heading :img="true" />
        <content-placeholders-text :lines="3" />
        <content-placeholders-img />
      </content-placeholders>
    </section>
    <!-- 添加评论 -->
    <section class="content-comment mt10 bgc-fff" ref="comment">
      <div class="flex header bgc-fff" v-if="commentsList !== null">
        <div class="author">
          <div class="photo" @click="editMyInfo" title="点击此处修改信息">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
            <img v-else src="~assets/images/tuxiang.jpg" alt="" >
          </div>
          <h3 class="fs14 tac">{{userInfo.name}}</h3>
        </div>
        <div class="editbox ml10" :class="!showPlaceholder ? 'open' : ''">
          <el-input
            ref="commentsBox"
            type="textarea"
            :rows="3"
            resize="none"
            autofocus
            focus
            placeholder="请输入你需要点的茶水"
            v-model="comments" @blur="checkComment">
          </el-input>
          <div class="placeholder flex-center" @click="placeholderShow">
            <span>看官，看了这么久，不妨来壶茶水</span>
          </div>
          <div class="flex submit">
            <div class="flex-right fx1">
              <el-button type="primary" size="small" @click="saveComment">{{showPlaceholder ? '' : '点好了，'}}上茶</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- <content-placeholders v-else>
        <content-placeholders-img />
      </content-placeholders> -->
    </section>
    <!-- 评论列表 -->
    <section class="content-comment mt10 bgc-fff">
      <div class="list" v-if="commentsList !== null" v-onlaod="loading">
        <template v-if="commentsList.length > 0">
          <div class="item line-b" :class="item.id ? 'flex' : ''" v-for="(item, index) in commentsList" :key="item.id" :id="item.id">
            <template v-if="item.id">
              <div class="author">
                <div class="photo">
                  <img v-if="item.avatar_url" :src="item.avatar_url" :alt="item.author_name" :title="item.author_name">
                  <img v-else src="~assets/images/tuxiang.jpg" alt="">
                </div>
                <!-- <h3 class="fs16 tac">falost</h3> -->
              </div>
              <div class="content ml10">
                <div v-if="item.author_website">
                  <a :href="item.author_website" target="_black" class="fs16 c-666" :title="item.author_name">{{item.author_name}}</a>
                </div>
                <div v-else>
                  <span class="fs16 c-666" :title="item.author_name">{{item.author_name}}</span>
                </div>
                <div class="mt10" v-html="item.content">
                  <p>我是一个沙发呀</p>
                </div>
                <div class="flex toolsbar">
                  <div class="flex-left">
                    <div class="time mr10">
                      <span class="fui-font fui-time c-666 fs12"></span>
                      <span class="c-666 fs12" title="评论时间">{{formatDate(item.create_at)}}</span>
                    </div>
                  </div>
                  <div class="flex-right fx1">
                    <div class="digg c-999 fs14 hover mr10" :class="isDigg(item.id)" title="点个赞呗" @click="commentDigg" :data-index="index"  :data-id="item.id">
                      <span class="fui-font fui-digg"></span>
                      <span>{{item.digg_count}}</span>
                    </div>
                    <div class="reply c-999 fs14 hover" :data-name="item.author_name" :data-index="index" :data-id="item.id" @click="replyBox" title="回复此评论">
                      <span class="fui-font fui-reply"></span>
                      <span class=""> 拼桌</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <content-placeholders v-else>
              <content-placeholders-heading :img="true" />
            </content-placeholders>
          </div>
          <div v-if="loadAll" class="item tac">
            <p class="fs12 c-666">没有更多了...</p>
          </div>
        </template>
        <div v-else class="item">
          <div class="sofa flex-center">
            <span class="fui-font fui-sofa c-999"></span>
            <span class="fs12 c-666 ml5">暂时还没有评论，快来抢沙发吧</span>
          </div>
        </div>
      </div>
      <!-- <content-placeholders v-else>
        <content-placeholders-heading :img="true" />
        <content-placeholders-heading :img="true" />
        <content-placeholders-heading :img="true" />
      </content-placeholders> -->
    </section>
    <!-- 个人信息记录 -->
    <el-dialog title="看官，英雄榜上留个大名呗"
      custom-class="model-box"
      :close-on-click-modal="false"
      :visible.sync="showEditUserInfo">
      <div class="commentAuthor">
        <span>行走江湖必须要有大名</span>
        <el-input size="small" v-model="userInfo.name" placeholder="行走江湖的ID">
          <template slot="prepend">大名</template>
        </el-input>
      </div>
      <div class="commentAuthor mt10">
        <span>联系方式</span>
        <el-input size="small" v-model="userInfo.email" placeholder="有联系方式才能有头有脸">
          <template slot="prepend">邮箱</template>
        </el-input>
      </div>
      <div class="commentAuthor mt10">
        <span>在江湖上经常住的客栈</span>
        <el-input size="small" v-model="userInfo.website" placeholder="留下客栈，我才方便回访您">
          <template slot="prepend">网址</template>
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="editMyInfo">记 录 完 成</el-button>
      </div>
    </el-dialog>
    <!-- 回复框 -->
    <el-dialog :title="'看友：' + replyInfo.name"
      custom-class="replybox"
      :close-on-click-modal="false"
      :visible.sync="reply">
      <div class="flex header bgc-fff">
        <div class="author">
          <div class="photo" @click="editMyInfo">
            <img src="~assets/images/tuxiang.jpg" alt="">
          </div>
          <h3 class="fs14 tac">{{userInfo.name}}</h3>
        </div>
        <div class="editbox ml10" :class="!showReplyPlaceholder ? 'open' : ''">
          <el-input
            ref="replyBox"
            type="textarea"
            :rows="3"
            resize="none"
            autofocus
            focus
            placeholder="拼桌最起码要有点东西吧"
            v-model="replyComment" @blur="checkReplyComment">
          </el-input>
          <div class="placeholder flex-center" @click="replyPlaceholderShow">
            <span>看官，先说说你的观点吧</span>
          </div>
          <div class="flex submit">
            <div class="flex-right fx1">
              <el-button type="primary" size="small" @click="saveComment">{{showReplyPlaceholder ? '' : '就这些，'}}上茶</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 点赞动画 -->
    <div class="barBox" v-show="digg">
      <div class="digg">
        <span class="fui-font fui-digg"></span>
        <span>+1</span>
      </div>
    </div>
  </section>
</template>
<script>
  import MD5 from '@/utils/md5'
  import _ from 'lodash'
  export default {
    data() {
      return {
        showLoading: true,
        article: null,
        copyrightUrl: window.location.href,
        digg: false,

        commentsList: null,
        comments: '',
        replyComment: '',
        showPlaceholder: true,
        showReplyPlaceholder: true,
        showEditUserInfo: false,
        userInfo: {},
        replyInfo: {},
        reply: false,

        page: {},
        currentPage: 1,
        loadMore: false,
        loadAll: false,
        diggList: []
      }
    },
    computed: {
    },
    watch: {
      'reply' (val) {
        if (!val) {
          this.$data.replyId = undefined
        }
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
      },
      'article.title'(val) {
        let that = this
        that.$store.dispatch('setSiteTitle', val)
        that.$store.dispatch('setShareInfo', {
          title: that.$data.article.title,
          desc: that.$data.article.content.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ').replace(/```javascript/g, '```').replace(/```/g, '').slice(0, 120),
          imgUrl: that.$data.article.thumbnail,
          link: window.location.href
        })
      }
    },
    component: {},
    methods: {
      defaultAvatar() {
        let url = ('https://gravatar.com/avatar/' + MD5.hex_md5(this.userInfo.email || '') + '?size=48')

        // www.gravatar.com 被墙
        url = url.replace('www.gravatar.com', 'gravatar.com')

        // 让协议自适应 protocol，使用 `//` 开头
        if (url.indexOf('http:') === 0) {
          url = url.slice(5)
        }

        // 如果是 github 的头像，则限制大小
        if (url.indexOf('githubusercontent') !== -1) {
          url += '&s=120'
        }

        return url
      },
      replyBox(e) {
        let that = this
        let data = e.currentTarget.dataset
        that.$data.replyInfo.name = data.name
        that.$data.replyId = data.id
        that.$data.reply = !that.$data.reply
      },
      editMyInfo() {
        let that = this
        let userInfo
        if (that.$data.showEditUserInfo) {
          that.$STORE.set('userInfo', that.$data.userInfo)
        } else {
          userInfo = that.$STORE.get('userInfo') || {}
          that.$data.userInfo = userInfo
        }
        that.$data.userInfo.avatar = that.defaultAvatar()
        that.$data.showEditUserInfo = !that.$data.showEditUserInfo
      },
      replyPlaceholderShow() {
        this.$data.showReplyPlaceholder = !this.$data.showReplyPlaceholder
        this.$refs.replyBox.focus()
      },
      placeholderShow() {
        this.$data.showPlaceholder = !this.$data.showPlaceholder
        this.$refs.commentsBox.focus()
      },
      checkReplyComment() {
        let that = this
        if (that.$data.replyComment === '' || that.$data.replyComment.length <= 0) {
          this.$data.showReplyPlaceholder = true
        }
      },
      checkComment() {
        let that = this
        if (that.$data.comments === '' || that.$data.comments.length <= 0) {
          this.$data.showPlaceholder = true
        }
      },
      formatDate(val) {
        return this.$utils.formatDate(val)
      },
      bgColor() {
        return this.$utils.randomColor()
      },
      getArticleInfo() {
        let that = this
        that.$API.getArticleInfo({
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
              that.$data.article = data.entity.article
              that.$nextTick().then(function() {
                scrollTo(0, 0)
              })
            } else {
              that.$message({
                message: data.message,
                type: 'error'
              })
            }
          }
        })
      },
      getComments() {
        let that = this
        if (_.isArray(that.$data.commentsList)) {
          // that.$data.commentsList.push({})
        }
        that.$API.getCommentsList({
          data: {
            id: that.$data.id,
            limit: that.$data.limit || 10,
            page: that.$data.currentPage || 1
          },
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              if (that.$data.loadMore) {
                if (!_.isArray(that.$data.commentsList)) {
                  that.$data.commentsList = []
                }
                that.$data.commentsList = [...that.$data.commentsList, ...data.entity.list]
              } else {
                that.$data.commentsList = data.entity.list
              }
              that.$data.page = data.entity.pages
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
      saveComment(e) {
        let that = this
        if (that.$utils.isEmpty(that.userInfo.name)) {
          return that.editMyInfo()
        }
        that.$API.saveComment({
          data: {
            'id': that.$data.id,
            'content': that.$data.comments || that.$data.replyComment,
            'author[name]': that.userInfo.name,
            'author[email]': that.userInfo.email,
            'author[website]': that.userInfo.website,
            'replyId': that.$data.replyId,
            'medrender': true
          },
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              that.$message({
                message: '你的观点正在入库中',
                type: 'success'
              })
              that.$data.commentsList.unshift({})
              that.$data.comments = ''
              that.$data.replyComment = ''
              that.$data.replyId = undefined
              that.$data.showPlaceholder = true
              setTimeout(() => {
                that.$data.article.reply_count++
                that.$data.commentsList.shift()
                that.$data.commentsList.unshift(data.entity.comment)
              }, 1000)

              that.goComment()
            } else {
              that.$message({
                message: data.message,
                type: 'error'
              })
            }
          }
        })
        if (that.$data.replyId) {
          that.$data.reply = false
        }
      },
      goComment() {
        scrollTo(0, this.$refs.comment.offsetTop - 100)
      },
      articleDigg() {
        let that = this
        if (that.$data.diggList.indexOf(that.$data.id) !== -1) {
          return that.$message({
            message: '把下一个赞留给别人吧',
            type: 'info'
          })
        }
        that.$API.updateDigg({
          data: {
            id: that.$data.id,
            type: 'article'
          },
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              that.$data.digg = true
              that.$data.article.digg_count ++
              that.$data.diggList.push(that.$data.id)
              setTimeout(() => {
                that.$data.digg = false
              }, 2500)
            } else {
              that.$message({
                message: data.message,
                type: 'error'
              })
            }
          }
        })
      },
      commentDigg(e) {
        let that = this
        let data = e.currentTarget.dataset
        if (that.$data.diggList.indexOf(data.id) !== -1) {
          return that.$message({
            message: '把下一个赞留给别人吧',
            type: 'info'
          })
        }
        console.log('----------------')
        console.log(data.index)
        console.log('------ End------')
        let index = data.index
        that.$API.updateDigg({
          data: {
            id: data.id,
            type: 'comment'
          },
          method: 'POST',
          success(res) {
            let data = res.data
            if (data.code === 10000) {
              // that.$data.digg = true
              that.$data.commentsList[index].digg_count ++
              that.$data.diggList.push(that.$data.commentsList[index].id)
              setTimeout(() => {
                // that.$data.digg = false
              }, 2500)
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
      },
      loading() {
        this.$data.loadMore = true
      }
    },
    async created() {
      let that = this
      let data = that.$route.params
      if (data.id) {
        that.$data.id = data.id
        await that.getComments()
        await that.getArticleInfo()
      }
      that.$data.userInfo = that.$STORE.get('userInfo') || {}
    },
    async mounted () {
      let that = this
      // that.goComment()
      that.$data.diggList = that.$STORE.get('digg') || []
      setTimeout(() => {
        that.$data.showLoading = false
      }, 100)
    }
  }
</script>
<style lang="scss" scoped>
  @import "src/scss/common.scss";
  .content-detail,
  .content-comment {
    width: $maxWidth;
    padding: 20px 40px;
    margin: 15px auto;
  }
  /* 内容详情 */
  .content-detail {
    header {
      .title {
        margin: 15px 0;
      }
      .author-cover{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
      .time {
        display: block;
        line-height: 25px;
      }
      .name {
        line-height: 25px;
        color: $hover;
        cursor: pointer;
      }
    }
    .article-tags .tag{
      display: block;
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
    .copyright {
      line-height: 20px;
      .copyright-info {
        border-left: 4px solid #ccc;
        padding: 2px;
        padding-left: 10px;
        background-color: #f7f7f7;
        word-wrap: break-word;
        p {
          margin: 0;
        }
      }
    }
    .digg {
      span{
        width: 50px;
        height: 50px;
        line-height: 45px;
        border-radius: 50%;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
  /* 内容评论 */
  .content-comment,
  .replybox {
    .author {
      min-width: 50px;
      max-width: 80px;
      .photo {
        width: 50px;
        margin: auto;
        cursor: pointer;
      }
      img {
        width: 100%;
        border-radius: 10px;
      }
      h3{
        margin: 5px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .editbox {
      position: relative;
      width: 100%;
      .placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        cursor: pointer;
        height: 75px;
        border: 1px solid #ccc;
        border-radius: 3px;
        background-color: #fff;
        text-align: center;
        line-height: 75px;
        font-size: 25px;
        color: #999;
      }
      .submit {
        // display: none;
        position: relative;
        height: 0;
        padding: 0;
        opacity: 0;
        transition: all .1s linear;
        -moz-transition: all .1s linear;
        -webkit-transition: all .1s linear;
        -o-transition: all .1s linear;
      }
      &.open {
        .placeholder {
          display: none;
        }
        .submit {
          height: 45px;
          padding-top: 10px;
          opacity: 1;
        }
      }
    }
    .list {
      .item {
        padding: 15px 0;
        .sofa {
          .fui-sofa {
            font-size: 30px;
          }
        }
      }
      .content {
        width: 100%;
        .reply,
        .digg{
          cursor: pointer;
        }
      }
    }
  }
  /* 弹框 */
  /deep/ .model-box {
    width: 20%;
  }
  /deep/ .replybox {
    width: 30%;
    .editbox {
      .placeholder {
        font-size: 22px;
      }
    }
  }
  .barBox {
    position: fixed;
    top: 40%;
    left: 45%;
    width: 150px;
    height: 150px;
    z-index: 99999;
    transform: translate(-50%,-50%);
    text-shadow: 2px 2px 10px #bbb;
    animation: Enlarge 2.5s forwards 1;
    div {
      span{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: 100%;
        font-size: 150px;
        line-height: 150px;
        color: $ztColor;
        text-align: center;
        transform: translate(-50%,-50%);
        &:last-child{
          transform: translate(-50%,-30%);
          font-size: 30px;
          color: #fff;
        }
      }
    }
  }
  @keyframes Enlarge {
    0% {
      opacity:0;
      transform:scale(.01);
    }
    25% {
      opacity:1;
      transform:scale(1);
    }
    85% {
      opacity:1;
      transform:scale(1);
    }
    100% {
      opacity:0;
      transform:scale(5);
    }
  }
  @import "src/scss/response.scss";

</style>
