<template>
  <div>
    <h2 class="title">月度绩效测评得分</h2>
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
      >
      </el-table-column>
      <el-table-column
        prop="other"
        label="互评得分"
      >
      </el-table-column>
      <el-table-column
        prop="customer"
        label="客户得分"
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
        v-if="type==0"
        prop="dpt"
        label="部门"
      >
      </el-table-column>
      <el-table-column
        prop="score5"
        label="较差"
      >
      </el-table-column>
      <el-table-column
        prop="score7"
        label="较好"
      >
      </el-table-column>
      <el-table-column
        prop="score8"
        label="良好"
      >
      </el-table-column>
      <el-table-column
        prop="score10"
        label="优秀"
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