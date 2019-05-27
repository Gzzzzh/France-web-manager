<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <h1>中文网页</h1>
      <el-form-item label="成员名字" prop="ChName">
        <el-input v-model="form.ChName" />
      </el-form-item>
      <el-form-item label="展示优先级">
         <el-input-number v-model="form.showPriority" :min="1" :max="9"></el-input-number>
         <p style="color:red">数字越小，展示的时候越靠前</p>
      </el-form-item>
      <el-form-item label="协会职位" prop="ChPos">
        <el-input v-model="form.ChPos" />
      </el-form-item>
      <el-form-item label="人物介绍" prop="ChDes">
        <el-input v-model="form.ChDes" type="textarea" />
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/acef/user/mi"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          list-type="picture-card"
          name="picture"
          :data="{
            ...form
            }"
          :limit=1
          :multiple="false"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" style="color:red" class="el-upload__tip">只能1个上传jpg/png文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
      <br/><br/>
      <h1>法文网页</h1>
      <el-form-item label="成员名字" prop="FrName">
        <el-input v-model="form.FrName" />
      </el-form-item>
      <el-form-item label="协会职位" prop="FrPos">
        <el-input v-model="form.FrPos" />
      </el-form-item>
      <el-form-item label="人物介绍" prop="FrDes">
        <el-input v-model="form.FrDes" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    isEdit:Boolean
  },
  data() {
    return {
      fileList:[],
      form: {
        ChName: '',
        ChPos: '',
        ChDes: '',
        showPriority:1,
        FrName:'',
        FrPos:'',
        FrDes:''
      },
      rules:{
        ChName:[
          {required: true, message: '请填写中文姓名', trigger: 'blur'}
        ],
        ChPos:[
          {required: true, message: '请填写中文职位', trigger: 'blur'}
        ],
        ChDes:[
          {required: true, message: '请填写中文介绍', trigger: 'blur'}
        ],
        FrName:[
          {required: true, message: '请填写法文姓名', trigger: 'blur'}
        ],
        FrPos:[
          {required: true, message: '请填写法文职位', trigger: 'blur'}
        ],
        FrDes:[
          {required: true, message: '请填写法文介绍', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitUpload()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.level = 1
      this.$refs.upload.clearFiles();
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response , file) {
      console.log(response);
      this.$message.success('保存成功')
    },
    handleError(error , file) {
      console.log(error);
      this.$message.error('保存失败，请稍后重试')
    }
  },
  created() {
    if(this.isEdit) {
      alert('进入了编辑页面')
    }
  }
}
</script>

<style scoped>
h1{
  color: #304156;
}
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

