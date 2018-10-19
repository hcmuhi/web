<template>
  <div class="app-container goods-table">
    <div class="l-table">
      <el-row class="th">
        <el-col class="is-center" v-for="(column, ci) in columns" :key="ci" :span="column.span">{{column.label}}</el-col>
      </el-row>
    </div>
    <template v-if="tableData.length !== 0">
      <div class="l-table" v-for="(item, index) in tableData" :key="item.id || index">
        <slot :row="item" name="columnSlotTop"></slot>
        <el-row class="td">
          <el-col v-for="(column, ci) in columns" :key="ci" :span="column.span">
            <div v-if="item.slotName" class="cell" :class="item.className" >
              <slot :row="item" :name="item.slotName"></slot>
            </div>
            <div else class="cell" v-html="item[column.prop] || '--'"></div>
          </el-col>
        </el-row>
      </div>
    </template>
    <template v-else>
      <div class="l-table">
        <el-row class="td">
          <el-col :span="24" class="text-center">暂无数据</el-col>
        </el-row>
      </div>
    </template>
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
  name: 'release',
  directives: {},
  data() {
    return {
      pageSizeList: [10, 20, 30, 50]
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
    }
  },
  created() {},
  computed: {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .goods-table {
    .l-table {
      border: 1px solid #ebeef5;
      position: relative;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      width: 100%;
      max-width: 100%;
      font-size: 14px;
      color: #606266;
      border-right: none;
      border-bottom: none;
      &+ .l-table{
        margin-top: 10px;
      }
      .th {
        font-weight: bold;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
      }
      .is-center {
        text-align: center;
      }
      .link-type {
        padding-left: 7px;
      }
      .td {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
      }
      .tr {
        background-color: #f0fafd;
      }
      .el-col {
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        padding: 12px 0;
        min-width: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
      }
      .cell {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .textl {
        text-align: left !important;
      }
      ._time {
        color: #d1d1d1 !important;
      }
    }
  }
</style>
