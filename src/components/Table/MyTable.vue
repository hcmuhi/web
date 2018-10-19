<template>
  <div class="tables">
    <el-table
      border
      stripe
      fit
      highlight-current-row
      :data="tableData"
      v-loading="loading"
      @row-click="rowClick"
      :max-height="height"
      :row-class-name="tableRowClassName"
      :key="height"
      @selection-change="handleSelectionChange"
      :empty-text="totalCount == 0 ? '暂无数据' : ' '"
    >
      <!-- 序号 start -->
      <el-table-column type="index" width="55" v-if="indexOrder" :fixed="indexFixed || false" class-name="table-first"></el-table-column>
      <!-- 多选 start -->
      <el-table-column type="selection" :selectable="selectable" width="55" v-if="selection" :fixed="selectionFixed || false" class-name="table-first" ></el-table-column>
      <!-- 表单 start -->
      <el-table-column
        v-for="(item, index) in columns"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :sortable="item.sortable"
        :width="item.width || ''"
        :fixed="item.fixed || false"
        :class-name="index == 0 || item.showBg || item.fixed ? `table-first ${item.class || ''}` : (item.class || '')"
        :label-class-name="item.child ? 'table-father' : '' "
        :key="index"
      >
        <!-- 内容处理 start -->
        <template slot-scope="scope" >
          <div class="table-td" :class="item.className" v-if="item.slotName">
            <slot v-bind="scope" :name="item.slotName"></slot>
          </div>
          <div class="table-td" :class="item.className" v-else>
            {{ scope.row[item.prop] == 0 && scope.row[item.prop] !== '' ? scope.row[item.prop] : (scope.row[item.prop] || '--') }}
          </div>
        </template>
        <!-- 内容处理  end  -->
      </el-table-column>
    </el-table>
    <!-- 分页处理 start -->
    <div class="page-list" v-if="pageShow">
      <el-pagination
        background
        v-if="pagination"
        :page-size="pageSize"
        :current-page="pageIndex"
        @size-change="changeSize"
        @current-change="changePageIndex"
        :page-sizes="pageSizeList"
        :pager-count="pageCount"
        :layout="paginationLayout"
        :total="totalCount || 0">
      </el-pagination>
    </div>
    <!-- 分页处理  end  -->
  </div>
      
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        pageSizeList: [10, 20, 30, 50],
        height: undefined
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      pageShow: {
        type: Boolean,
        default: true
      },
      indexOrder: {
        type: Boolean,
        default: false
      },
      indexFixed: {
        type: Boolean,
        default: false
      },
      selection: {
        type: Boolean,
        default: false
      },
      selectable: {
        type: Function,
        default: () => {
          return true
        }
      },
      selectionFixed: {
        type: String,
        default: ''
      },
      columns: {
        type: Array,
        default: []
      },
      tableData: {
        type: Array,
        default: null
      },
      pagination: {
        type: Boolean,
        default: true
      },
      paginationLayout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      pageCount: {
        type: Number,
        default: 7
      },
      pageSize: {
        type: Number,
        default: 15
      },
      pageIndex: {
        type: Number,
        default: 1
      },
      totalCount: {
        type: Number,
        default: null
      },
      flow: {
        type: Boolean,
        default: false
      },
      flowHeight: {
        type: Number,
        default: 0
      },
      rowClick: {
        type: Function,
        default: () => {}
      },
      tableRowClassName: {
        type: Function,
        default: null
      },
      changeSize: {
        type: Function,
        default: null
      },
      changePageIndex: {
        type: Function,
        default: null
      },
      handleSelectionChange: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      dealPageSizeList() {
        this.pageSize = Number(this.pageSize)
        var bool = this.pageSizeList.includes(this.pageSize)
        if (!bool) {
          this.pageSizeList.push(this.pageSize)
          this.pageSizeList = this.pageSizeList.sort((a, b) => { return a - b })
        }
      },
      dealTableHeight() {
        if (this.flowHeight) {
          this.height = this.flowHeight
        } else {
          const table = document.querySelector('.tables')
          const tableTop = this.offset(table).top
          const bottom = 0
          this.height = document.body.offsetHeight - tableTop - bottom
        }
      },
      getRowKey(row) {
        return row[this.rowKey]
      },
      offset(elem) {
        var obj = {
          left: elem.offsetLeft,
          top: elem.offsetTop,
          width: elem.offsetWidth,
          height: elem.offsetHeight
        }
        while (elem !== document.body) {
          elem = elem.offsetParent || document.body
          obj.left += elem.offsetLeft
          obj.top += elem.offsetTop
        }
        return obj
      }
    },
    watch: {
      totalCount() {
        if (this.tableData && this.tableData.length === 0 && this.pageIndex !== 1) {
          this.changePageIndex(1)
        }
      }
    },
    mounted() {
      // 处理外部传入的pageSize
      this.dealPageSizeList()
      // 处理table高度滚动条
      if (this.flow) {
        setTimeout(() => {
          this.dealTableHeight()
        }, 300)
      }
    }
  }
</script>


<style scoped>

.tables {
  margin: 0;
  min-height: 320px;
  position: relative;
}
.table-td {
  font-size: 14px;
  color: #666666;
}
.forLink .table-td{
  font-size: 14px;
  color: #05A6EF;
  cursor: pointer;
}
.forLink:hover .table-td{
  color: #05A6dd;
  text-decoration: underline;
  cursor: pointer; 
}
.page-list{
  overflow: hidden;
  margin-top: 30px;
}
</style>
<style>
  .el-table__body {
    box-sizing: border-box;
    margin-left: -1px;
  }
  .table-first{
    /* background: #F2FAFD; */
  }
  .table-father{
    text-align:center;
    background: #000;
  }
  td.nobg{
    background: #fff!important;
  }
  .bg2{
    background: #E4F7FF!important;
  }
  .bg3{
    background: #FFF8E9!important;
  }
  .bg4{
    background: #FFE9FF!important;
  }
  .table_child_nopadding > tr{
     background: #8adbff!important;
  }
  .el-table__row.green-row .table-first{
    background: #82D2B2
  }
    .el-table__row.red-row .table-first{
    background: #FF7777
  }
</style>
