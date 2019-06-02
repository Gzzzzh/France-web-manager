<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
    @selection-change="handleSelectionChange"
    class="list"
    >

      <el-table-column
        type="selection"
        width="30"
      >
      </el-table-column>

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="发表时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="活动时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者(中文)">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者(法文)">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="标题(中文)">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="标题(法文)">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="180">
        <template slot-scope="scope">
          <router-link :to="'/about/members/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
            <el-button type="danger" size="small" icon="el-icon-edit" @click="deleteSelectMember(scope.row)">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-button type="danger" @click="deleteSelectMember(false)" >删除选中人员</el-button>
    <pagination style="text-align:center" v-show="total>0" :total="total" :page.sync="listQuery.page"  @pagination="getList" />
  </div>
</template>

<script>

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {fetchMembersList,deleteMembers} from '@/api/about-us'
export default {
  name: 'ArticleList',
  components: { Pagination },
  data() {
    return {
      list: [{id:0,timestamp:123456,author:'泽钦',title:'asd '}],
      total: 50,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      selectedList:[] //被选中的数组
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(val) {
      this.listLoading = true
      fetchMembersList(this.listQuery).then(response => {
        const {data} = response
        this.total = data.total
        this.list = data.list
        this.listLoading = false
      }).catch(error => {
        console.log(error);
        this.$message.error('网络错误')
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.selectedList = val  //选中的人员加入被选中数组
      console.log(this.selectedList);
    },
    deleteSelectMember (row) {
      let arrayId = []
      let idList = ''
      if(this.selectedList.length === 0) {
        this.$message.error('未勾选人员')
        return false 
      }
      if(row) {
        //单个删除
        if(this.selectedList.some(item => item.id == row.id)) { //判断当前被选中数组中有没有你点击删除的id

          idList = `?idList=${row.id}&imgPaths=${row.imgPath}`
        } else{
          this.$message.error('未勾选人员') //没有代表没有被勾选不能删除
          return false
        }
      } else { //这里是点击批量删除按钮进入的判断
        idList = '?'
        this.selectedList.forEach(item => {
          idList += `idList=${item.id}&imgPaths=${item.imgPath}&`
      });
          idList = idList.slice(0,idList.lastIndexOf('&'))
          
      }
      this.$confirm('确认删除？').then((result) => {
        deleteMembers(idList).then((result) => {
            console.log(result);
            this.getList()
          }).catch((err) => {
            console.log(err);
            this.$message('删除失败')
          });
      }).catch((err) => {
      });
      
    }
  }
}
</script>

<style scoped>

.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
