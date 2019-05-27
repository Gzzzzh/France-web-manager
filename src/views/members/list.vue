<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="中文姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.chName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="中文职位">
        <template slot-scope="scope">
          <span>{{ scope.row.chPos }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="中文介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.chDes }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="法文姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.frName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="法文职位">
        <template slot-scope="scope">
          <span>{{ scope.row.frPos }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="法文介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.frDes }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="展示优先级">
        <template slot-scope="scope">
          <span>{{ scope.row.showPriority }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="人物图片">
        <template slot-scope="scope">
          <img style="width:80px;height:80px" :src="`http://huangchaoweb.cn/${scope.row.imgPath}`" alt="">
          
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="180">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="danger" size="small" icon="el-icon-edit">
              删除
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination style="text-align:center" v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>

import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      
      this.list = [{"id":0,"showPriority":2,"imgPath":"/file/img/6174b78c-cda1-46ea-a8f3-fd70420968db.jpg","chPos":"班长","chName":"洪泽钦","chDes":"哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇","frName":"hongzeqin","frPos":"banzhang","frDes":"woww oww oww ow woww oww oww o ww ow wowwo wwoww owwow","frLanguage":"French","chLanguage":"Chinese"}]
      console.log(this.list);
      this.total = 24
      /* fetchList().then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      }) */
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
