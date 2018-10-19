<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-waves @keyup.enter.native="fetchData" style="width: 200px;" class="filter-item" clearable placeholder="账号" v-model.trim="filter.mobilePhone"></el-input>
      <el-button class="filter-item" type="primary" v-waves @click="fetchData" style="margin-left:5px;">搜索</el-button>
      <div class="right-button">
        <el-button class="filter-item" type="primary" v-waves>新增</el-button>
      </div>
    </div>
    <div class="table-box">
      <goods-table v-bind="tableProps">
        <!-- 列表item 自定义显示 -->
        <template slot-scope="props" slot='columnSlotTop'>
          <el-row class="tr">
            <el-col class="cell" :span="24">
              NO.{{props.row.orgCode}} &nbsp; &nbsp; <span class="_time">审核时间：{{props.row.crtTime}}</span>
              <div class="fr">                  
                <span class="link-type" @click="showDetails(props.row)">详情</span>
                <span class="link-type" @click="showDel(props.row)">删除</span>
              </div>
            </el-col>
          </el-row>
        </template>
      </goods-table>
    </div>
  </div>
</template>

<script>
import { page } from '@/api/demo'
import waves from '@/directive/waves' // 水波纹指令
import { GoodsTable } from '@/components/Table'

export default {
  name: 'demo',
  components: {
    GoodsTable
  }, // 组件
  computed: {}, // 计算属性
  filters: {}, // 过滤
  directives: { // 自定义指令
    waves
  },
  data() {
    return {
      // 列表过滤
      filter: {
        mobilePhone: ''
      },
      // table 组件传入参数
      tableProps: {
        indexOrder: true,
        loading: false,
        columns: [ // span 总和24
          { label: '货物', prop: 'orgCode', span: 4 },
          { label: '发货人', prop: 'orgCode', span: 3 },
          { label: '地址', prop: 'name', span: 5 },
          { label: '时间', prop: 'legalPerson', span: 5 },
          { label: '状态', prop: 'mobilePhone', span: 2 },
          { label: '备注', prop: 'mobilePhone', span: 5 }
        ],
        tableData: [], // 列表数据
        pageSize: 20,
        pageIndex: 1,
        totalCount: null,
        changeSize: (size) => {
          this.tableProps.pageSize = size
          this.fetchData()
        },
        changePageIndex: (pageIndex) => {
          this.tableProps.pageIndex = pageIndex
          this.fetchData()
        },
        rowClick: (currentRow, event, column) => {}
      }
    }
  },
  /** ***************************初始化  end  *************************** **/
  /** *************************生命周期钩子 start************************* **/
  created() {
    this.fetchData()
  },
  mounted() {},
  /** **************************生命周期钩子 end************************** **/
  /** ***************************methods start*************************** **/
  methods: {
    // -----其他方法 start-----
    // 详情
    showDetail(n) {
      // this.$router.push({ name: 'hzDetails', query: { id: n.id }})
    },
    // 删除
    showDel(n) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.del()
      }).catch(() => {
      })
    },
    // -----其他方法  end -----
    // -----增删改查 start-----
    // 请求数据
    fetchData() {
      this.tableProps.loading = true
      page(this.listQuery).then(response => {
        this.tableProps.loading = false
        this.tableProps.tableData = response.data.rows.map(n => ({
          ...n,
          name: n.name + '<br/>' + n.name
        }))
        this.tableProps.totalCount = response.data.total
      }).catch(() => {
        this.tableProps.loading = false
      })
    }
    // -----增删改查  end -----
  }
  /** ****************************methods end**************************** **/
}
</script>
