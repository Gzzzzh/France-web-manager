<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="成员名字">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="协会席位">
        <el-select v-model="form.region" placeholder="请选择席位">
          <el-option label="主席" value="chairman" />
          <el-option label="副主席" value="viceChairman" />
          <el-option label="会员" value="member" />
        </el-select>
      </el-form-item>
      <el-form-item label="人物介绍">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/acef/data/set"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          name="fileUpload"
          :data="{part:'testImg'}"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        desc: '',
        imageUrl:''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
     submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

