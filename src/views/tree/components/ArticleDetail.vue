<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :className="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.language"/>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发表
        </el-button>
      <el-button v-loading="loading" type="warning" @click="draftForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item style="margin-bottom: 40px;" label-width="70px" label="组织者：">
                    <el-input v-model="postForm.author" :rows="1" type="textarea" class="article-textarea" autosize placeholder="请输入组织者" />
                  </el-form-item>
                </el-col> 

                <el-col :span="8">
                  <span>{{postForm.displayTime}}</span>
                  <el-form-item label-width="120px" label="发表时间：" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.displayTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="发表时间" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <span>{{postForm.activityTime}}</span>
                  <el-form-item label-width="120px" label="活动时间：" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.activityTime" 
                    type="daterange"  
                    range-separator="至"
                    value-format="yyyy-MM-dd" 
                    format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>

        <el-form-item prop="file" style="margin-bottom: 30px;width:300px;">
          <el-upload
          class="upload-demo"
          ref="upload"
          action="customize"
          :http-request="upLoad"
          :before-upload="beforeUpload"
          :on-change="picChange"
          list-type="text"
          :file-list="fileList"
          :limit=5
          :multiple="true"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" style="color:red" class="el-upload__tip">只能1个上传jpg/png文件，且不超过10M</div>
        </el-upload>
        </el-form-item>
        <p>{{postForm.content}}</p>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import Warning from './Warning'
import { CommentDropdown } from './Dropdown'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  displayTime: undefined, // 发表时间
  activityTime:undefined,//活动时间
  id: undefined,
  language: 'Chinese',
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Sticky, Warning, CommentDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
      },
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      //把时间换成时间戳方便请求
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
  },
  methods: {
   /*  fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        //this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    }, */
    picChange(){ //添加图片触发
      this.change = true
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
     draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (!isJpgOrPng) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isJpgOrPng && isLt10M;
      },
    handleSuccess(response , file) {
      this.$message.success('保存成功')
      this.resetForm('form')
    },
    handleError(error , file) {
      this.$message.error('保存失败，请稍后重试')
    } 
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
