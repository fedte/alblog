<template>
  <section>
    <section class="content-detail bgc-fff">
      <template v-if="article">
        <header>
          <div class="title fs20 fwb">{{article.title}}</div>
          <div class="author-info flex" v-if="article.author">
            <img :src=" article.author.avatar_url || '~assets/images/tuxiang.jpg'" class="author-cover hidden-xs mr10" :alt="article.author.loginname">
            <div>
              <span class="time fs14">{{formatDate(article.create_at)}}</span>
              <router-link to="/" class="name fs18">{{article.author.loginname}}</router-link>
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
          <div class="article-tags flex pt15">
            <span class="fui-font fui-tag c-666 mr10" ></span>
            <router-link :to="'/tags/' + item" class='tag mr10' v-for="(item,index) in article.tag" :style="'background-color:' + bgColor()">{{item}}</router-link>
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
            <span class="fui-font fui-digg c-666 hover"></span>
            <span class="c-666 hover" v-popover:rewards>赏</span>
          </div>
        </section>
        <footer>
          <div class="count-bar flex">
            <div class="mr10 visit-count c-666">
              <span class="fui-font fui-visit"></span>
              <span>{{article.visit_count || 0}}</span>
            </div>
            <div class="mr10 digg-count c-666">
              <span class="fui-font fui-digg"></span>
              <span>{{article.digg_count || 0}}</span>
            </div>
            <div class="mr10 comment-count c-666">
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
        <content-placeholders-text :lines="3" />
      </content-placeholders>
    </section>
    <!-- 添加评论 -->
    <section class="content-comment mt10 bgc-fff">
      <div class="flex header bgc-fff">
        <div class="author">
          <div class="photo" @click="editMyInfo">
            <img src="~assets/images/tuxiang.jpg" alt="">
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
              <el-button type="primary" size="small">{{showPlaceholder ? '' : '点好了，'}}上茶</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 评论列表 -->
    <section class="content-comment mt10 bgc-fff">
      <div class="list">
        <div class="item flex line-b">
          <div class="author">
            <div class="photo">
              <img src="~assets/images/tuxiang.jpg" alt="">
            </div>
            <!-- <h3 class="fs16 tac">falost</h3> -->
          </div>
          <div class="content ml10">
            <div>
              <span class="fs16">falost</span>
            </div>
            <div class="mt10">
              <p>我是一个沙发呀</p>
            </div>
            <div class="flex toolsbar">
              <div class="flex-left">
                <div class="time mr10">
                  <span class="fui-font fui-time c-666 fs12"></span>
                  <span class="c-666 fs12">2017-01-01 03:30</span>
                </div>
              </div>
              <div class="flex-right fx1">
                <div class="digg c-999 fs14 hover mr10">
                  <span class="fui-font fui-digg"></span>
                  <span>0</span>
                </div>
                <div class="reply c-999 fs14 hover" data-name="falost" data-index="index" @click="replyBox">
                  <span class="fui-font fui-reply"></span>
                  <span class=""> 拼桌</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <span>江湖中的联系方式</span>
        <el-input size="small" v-model="userInfo.email" placeholder="有联系方式才能有头有脸">
          <template slot="prepend">邮箱</template>
        </el-input>
      </div>
      <div class="commentAuthor mt10">
        <span>在江湖上经常住的客栈</span>
        <el-input size="small" v-model="userInfo.website" placeholder="留下客栈，我才方便找你">
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
              <el-button type="primary" size="small">{{showReplyPlaceholder ? '' : '就这些，'}}上茶</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        article: null,
        copyrightUrl: window.location.href,
        comments: '',
        replyComment: '',
        showPlaceholder: true,
        showReplyPlaceholder: true,
        showEditUserInfo: false,
        userInfo: {},
        replyInfo: {},
        reply: false
      }
    },
    computed: {

    },
    watch: {
    },
    component: {},
    methods: {
      replyBox(e) {
        let that = this
        let data = e.currentTarget.dataset
        that.$data.replyInfo.name = data.name
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
            } else {
              that.$message({
                message: data.message,
                type: 'error'
              })
            }
          }
        })
      }
    },
    created() {
      let that = this
      let data = that.$route.params
      if (data.id) {
        that.$data.id = data.id
        that.getArticleInfo()
      }
      that.$data.userInfo = that.$STORE.get('userInfo') || {}
    },
    mounted () {

    }
  }
</script>
<style lang="scss">
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
      opacity: .75;
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
  .model-box {
    width: 20%;
  }
  .replybox {
    width: 30%;
    .editbox {
      .placeholder {
        font-size: 22px;
      }
    }
  }
  @import "src/scss/response.scss";


</style>
