<template>
  <div>
    <h2 class="title">月度绩效测评得分</h2>
    <p style="text-align;">建议横屏观看，点击得分维度自动排序(优秀:10分,良好:8分,较好:6分,较差:4分)</p>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <!-- <el-table-column
        prop="dpt"
        label="岗位"
      >
      </el-table-column> -->
      <el-table-column
        prop="username"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="leader"
        label="领导评分"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="other"
        label="互评得分"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="customer"
        label="客户评分"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="attitude"
        label="服务态度"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="response"
        label="响应时间"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="power"
        label="业务能力"
        sortable
      >
      </el-table-column>
    </el-table>

    <el-table
      :data="distribData"
      stripe
      class="margin-top-20"
      style="width: 100%"
    >
      <!-- <el-table-column
        prop="dpt"
        label="岗位"
      >
      </el-table-column> -->
      <el-table-column
        prop="username"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="scoreType"
        label="评分类型"
      >
      </el-table-column>
      <el-table-column
        prop="score5"
        label="较差"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="score7"
        label="较好"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="score8"
        label="良好"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="score10"
        label="优秀"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="总票数"
      >
      </el-table-column>
    </el-table>
    <div class="submit">
      <button
        class="button"
        @click="refresh"
      >刷新数据</button>
      <button
        class="button"
        @click="clear"
      >清理缓存</button>
    </div>
  </div>
</template>
<script>
import app from "../assets/js/common";
import * as db from "../assets/js/db";
export default {
  name: "score",
  data() {
    return {
      tableData: [],
      distribData: [],
      type: this.$store.state.voteType
    };
  },
  methods: {
    refresh() {
      db.getCbpcPerformancePrint(this.$store.state.voteType).then(
        ({ data }) => {
          this.tableData = data;
          this.$message({
            message: "数据刷新完毕",
            type: "success"
          });
        }
      );
      db.getCbpcPerformanceDetailPrint(this.$store.state.voteType).then(
        ({ data }) => {
          this.distribData = data;
          this.$message({
            message: "数据刷新完毕",
            type: "success"
          });
        }
      );
    },
    clear() {
      localStorage.removeItem("performance-0");
      localStorage.removeItem("performance-1");
      this.$message({
        message: "缓存清理完毕",
        type: "success"
      });
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

  <style lang="less">
@import "../less/vote.less";
</style>