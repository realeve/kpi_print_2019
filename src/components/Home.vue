<template>
  <div>
    <h2 class="title">月度绩效测评({{isLeader=='0'?'互评':'领导评分'}})</h2>
    <div class="list">
      <el-steps
        :space="100"
        direction="vertical"
        finish-status="success"
        :active="active"
      >
        <div
          v-for="(task,idx) in taskList"
          :key="idx"
        >
          <div @click="location(idx)">
            <el-step :title="(idx+1)+'.'+task"></el-step>
          </div>
        </div>
      </el-steps>
    </div>
    <el-footer />
    <!-- <div class="submit">
      <button class="button" @click="clear">清理缓存</button>
    </div> -->
  </div>
</template>

<script>
import ElFooter from "./Footer";
import app from "../assets/js/common";
const dateName = app.getDate();

// let needCheck = app.getUrlParam("check");
// needCheck = needCheck !== null ? 1 : 0;

let home = {
  name: "home",
  computed: {
    isLeader() {
      return this.$store.state.userType || "0";
    },
    taskList() {
      return this.$store.state.taskList;
    },
    active() {
      if (this.$store.state.voteStep == 0) {
        let info = app.readInfo(this.$store.state.voteType);
        if (dateName.substr(0, 6) == info.date.substr(0, 6)) {
          this.$store.state.voteStep = info.data.step;
        }
      }
      return this.$store.state.voteStep;
    }
  },
  methods: {
    location(idx) {
      if (idx == this.$store.state.voteStep) {
        this.$router.push({
          name: "vote",
          params: {
            id: idx,
            type: this.$store.state.voteType
          }
        });
      }
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
  components: {
    ElFooter
  }
};
export default home;
</script>

<style lang="less">
@import "../less/home.less";
</style>