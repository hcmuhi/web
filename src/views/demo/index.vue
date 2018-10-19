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
      <my-table v-bind="tableProps">
        <!-- 列表item 自定义显示 -->
        <template slot-scope="scope" slot='columnSlot1'>
          <span>
            <img v-if="scope.row.headImageUrl" :src="scope.row.headImageUrl" width="40">
            <img v-else src="../../../static/images/defaultImg_icon.png" width="40">
          </span>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import { page } from '@/api/demo'
import waves from '@/directive/waves' // 水波纹指令
import { MyTable } from '@/components/Table'

export default {
  name: 'demo',
  components: {
    MyTable
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
        columns: [ // 表头定义:(width)  列固定(fixed: 'left') 列样式(class) 突出列(showBg: true)
          { label: '头像', prop: 'tx', slotName: 'columnSlot1' },
          { label: '组织机构代码', prop: 'orgCode' },
          { label: '单位名称', prop: 'name' },
          { label: '法人', prop: 'legalPerson' },
          { label: '手机号码', prop: 'mobilePhone' },
          { label: '操作', slotName: 'columnSlotBtns', width: 260 }
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
        this.tableProps.tableData = response.data.rows
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
