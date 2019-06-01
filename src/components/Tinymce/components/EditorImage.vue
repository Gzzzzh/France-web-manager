<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      upload
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          Click upload
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        Confirm
      </el-button>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},//存放上传图片界面列表中的所有图片的属性对象
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() { //如果所有图片都是上传成功状态，就返回true
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      //const arr = Object.keys(this.listObj).map(v => this.listObj[v]) //深拷贝得到listObj
      const arr = Object.keys(this.listObj).map(v => this.listObj[v].uid)
      if (!this.checkAllSuccess()) {
        this.$message.error('请等待所有图片上传成功，如果有网络问题请刷新页面重新上传')
        return
      }
      //准备好uid准备发请求
      console.log(arr);
      return
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) { //每当图片上传成功后
      const uid = file.uid 
      console.log(file);
      console.log(response);
      const objKeyArr = Object.keys(this.listObj) // 将每个图片文件的对象的属性名(文件名，也是图片的uid)放进数组
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) { //当前遍历到的图片uid是否等于上传成功图片的uid
          this.listObj[objKeyArr[i]].url = response.files.file  //图片的64编码形式给到了url
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        } 
        console.log(img); //blob格式的图片连接
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
