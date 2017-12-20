<template>
  <section>
    <markdown-editor v-model="contentText" :autoinit="true" :highlight="true" :configs="configs" ref="markdownEditor"></markdown-editor>
    <!-- <markdownEditor></markdownEditor> -->
    <div class="modal fade" id="showImage" style="z-index: 10000">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close cl" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                  class="sr-only">Close</span></button>
            <h4 class="modal-title">添加图片</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-3 btn-group">
                <button class="btn btn-primary" type="button">图片列表</button>
                <button class="btn" type="button">媒体库</button>
              </div>
              <div class="col-xs-9">
                <div class="list">
                  <div class="col-xs-4 up">
                    <button class="file-up" type="button"><i class="fa fa-plus"></i>
                        <input type="file" name="image" class="image" accept="image/*" @change="uploadImage"/>
                      </button>
                  </div>
                </div>
                <div class="media-list list">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary submit">插入</button>
            <button type="button" class="btn btn-default cl" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  /**
   * Created by Falost on 2016/10/2.
   */
  // import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import markdownEditor from './markdown-editor'
  import hljs from 'highlight.js'

  require('@/utils/simplemde/simplemde.css')
  require('highlight.js/styles/atom-one-dark.css')

  window.hljs = hljs

  // 组件 by falost

  export default {
    name: 'editor',
    data() {
      return {
        contentText: '',
        contents: {},
        configs: {
          // toolbar: ['bold', 'italic', 'heading', '|', 'quote', 'code']
          autofocus: true,
          autoDownloadFontAwesome: false,
          autosave: {
            enabled: false,
            uniqueId: this.uniqueId,
            delay: 3000,
            loaded: false
          },
          forceSync: true,
          promptURLs: true,
          placeholder: 'Type here...',
          renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true
          },
          shortcuts: {
            drawTable: 'Cmd-Alt-T'
          },
          showIcons: ['code', 'table'],
          spellChecker: false
        }
      }
    },
    props: {
      content: {
        type: String,
        default() {
          return ''
        }
      },
      uniqueId: {
        type: String,
        default() {
          return 'alblog'
        }
      },
      clearContent: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    watch: {
      contentText(val) {
        this.$data.contents = val
        this.$emit('change', this.$data.contents, this.simplemde)
        this.$STORE.set('alblog_' + this.uniqueId, val)
        return val
      },
      content(val) {
        this.contentText = val
      },
      clear(val) {
        if (val) {
          this.simplemde.clearAutosavedValue()
          this.$STORE.remove('alblog_' + this.uniqueId)
        }
      }
    },
    components: {
      markdownEditor
    },
    methods: {
      uploadImage(e) {
        /* eslint-disable */
        function checkedThis(e) {
          $(e)
            .find('.up-thumbnail')
            .toggleClass('checked')
        }
        console.log('--------------')
        console.log( e.target.files[0] )
        console.log('--------------')

        var uploadImage = $('#showImage')
        var file = e.target.files[0]
        var _this = $(this)
        // console.log(_this.val())
        var err = 0
        var imgs = [
          ['jpg', 'png', 'jpeg', 'gif', 'bmp'],
          [6677, 7173, 13780, 255216]
        ]
        var ids = []
        if (file) {
          console.log('--------------')
          console.log(file.name, file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length))
          console.log('--------------')

          var fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLowerCase()
          if (imgs[0].indexOf(fileType) == -1 || file.type.indexOf('image/') == -1) {
            console.log('类型错误')
            err++
            return say()
          }
          var reader = new FileReader()
          reader.readAsBinaryString(file)
          reader.onload = function(e) {
            console.log('--------------')
            console.log(e)
            console.log('--------------')

            var t = e.target.result
            var n = parseInt(t.charCodeAt(0) + '' + t.charCodeAt(1))
            if (imgs[1].indexOf(n) == -1) {
              _this.val('')
              err++
              console.log('上传文件类型错误！')
            }
            say()
          }
        }
        function say() {
          if (err > 0) {
            console.log('cuowu')
            $('body').append(
              '<div class="alert tips alert-danger" style="z-index: 99999" role="alert">只允许上传 ' +
                imgs[0] +
                ' 等类型的文件</div>'
            )
            var alert = $('.alert')
            alert.css('margin-left', alert.width() / -2)
            alert.fadeOut(4000, function() {
              $(this).remove()
            })
          } else {
            //console.log(_this.val())
            var src = createObjectURL(file)
            var files = new FormData()
            files.append(_this.attr('name'), file)
            uploadImage
              .find('.col-xs-4.up:last')
              .before(
                '<div class="col-xs-4 " onclick="checkedThis(this)"> ' +
                  '<div class="up-thumbnail"> ' +
                  '<span class="loadding"> ' +
                  '<i class="fa fa-spinner fa-spin"></i> ' +
                  '</span> ' +
                  '<img src="' +
                  src +
                  '" alt="' +
                  file.name +
                  '"/> ' +
                  '</div> ' +
                  '</div>'
              )
            function createObjectURL(blob) {
              if (window.URL) {
                return window.URL.createObjectURL(blob)
              } else if (window.webkitURL) {
                return window.webkitURL.createObjectURL(blob)
              }
              return null
            }

            function revokeObjectURL(blob) {
              if (window.URL) {
                return window.URL.revokeObjectURL(blob)
              } else if (window.webkitURL) {
                return window.webkitURL.revokeObjectURL(blob)
              }
            }
            $.ajax({
              url: '/api/upload/image',
              type: 'post',
              data: files,
              processData: false,
              contentType: false,
              success: function(data) {
                console.log(data)
                uploadImage
                  .find('.up-thumbnail:last img')
                  .attr('src', data.key)
                  .css({
                    '-webkit-filter': 'blur(0px)',
                    filter: 'blur(0px)'
                  })
                  .addClass('up')
                revokeObjectURL(file.name)
                ids.push(data.id)
                console.log(ids)
                uploadImage.find('.up-thumbnail:last span.loadding').hide()
              }
            })
          }
          err = 0
        }
      }
    },
    created() {
    },
    mounted () {
      this.$data.val = this.$STORE.get('alblog_' + this.uniqueId)
      if (this.$data.val !== '') {
        this.$data.contentText = this.$data.val
      }
      hljs.initHighlightingOnLoad()
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .editor-toolbar.fullscreen ,
  /deep/ .CodeMirror-fullscreen{
    z-index: 9999;
  }
  #showImage {
    .row {
      .btn {
        width: 100%;
        margin: 5px;
      }
      .btn-group {
        border-right: 1px solid #e5e5e5;
      }
      .col-xs-9 {
        padding: 0;
      }
      .list {
        .col-xs-4 {
          margin: 5px 0;
        }
        .file-up {
          position: relative;
          display: inline-block;
          border-radius: 4px;
          overflow: hidden;
          color: #fff;
          text-decoration: none;
          text-indent: 0;
          vertical-align: middle;
          padding-bottom: 75%;
          width: 100%;
          border: 1px dashed #ccc;
          cursor: pointer;
          text-align: center;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          background-image: none;
          background-color: #fff;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          &:hover {
            border: 1px dashed #337ab7;
          }
          .fa {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            font-size: 21px;
            color: #ccc;
            &:hover {
              color: #337ab7;
            }
          }
          input {
            position: absolute;
            width: 100%;
            height: 100%;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
          }
        }
        .up-thumbnail {
          position: relative;
          padding-bottom: 74%;
          background: #e5e5e5;
          overflow: hidden;
          width: 100%;
          border: 2px solid transparent;
          &.checked {
            border: 2px solid #3c8dbc;
          }

          span.loadding {
            position: absolute;
            z-index: 3;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            font-size: 20px;
            color: #e5e5e5;
          }
          img {
            position: absolute;
            z-index: 2;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
            -webkit-filter: blur(10px);
            filter: blur(10px);
            transition: -webkit-filter 0.3s ease-out;
            transition: filter 0.3s ease-out;
            transition: filter 0.3s ease-out, -webkit-filter 0.3s ease-out;
          }
        }
      }
    }
  }
</style>
