<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <h4 class="desc">请根据机检技术人员在服务态度、响应时间、业务能力三个方面评价。</h4>
    <div>
      <div
        v-for="(user,idx) in users"
        :key="idx"
      >
        <div class="card">
          <div class="card-header">
            <span>{{idx+1}}</span>.{{user.name}}
            <span class="depart">{{user.dept}}</span>
          </div>
          <div class="card-content">
            <div class="vote">
              <div class="title">
                <span class="type">服务态度</span>
                <el-rate
                  v-model="user.attitude"
                  :texts="scoreList"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  show-text
                  :max="4"
                  :icon-classes="iconClasses"
                  void-icon-class="icon-rate-face-off"
                >
                </el-rate>
              </div>

              <div class="title">
                <span class="type">响应时间</span>
                <el-rate
                  v-model="user.response"
                  :texts="scoreList"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  show-text
                  :max="4"
                  :icon-classes="iconClasses"
                  void-icon-class="icon-rate-face-off"
                >
                </el-rate>
              </div>

              <div class="title">
                <span class="type">业务能力</span>
                <el-rate
                  v-model="user.power"
                  :texts="scoreList"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  show-text
                  :max="4"
                  :icon-classes="iconClasses"
                  void-icon-class="icon-rate-face-off"
                >
                </el-rate>
              </div>

            </div>
            <!-- 
            <p class="votenum">
              优秀:<span>{{curLimit.excellent}}</span>,
              良好:<span>{{curLimit.good}}</span>
            </p> -->
          </div>
        </div>
      </div>
      <div class="submit">
        <button
          class="button"
          @click="submit"
        >提交</button>
        <button
          type="default"
          class="button"
          @click="back"
        >返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import userList from "../assets/js/userList";
import app from "../assets/js/common";
import * as db from "../assets/js/db";

let vote = {
  name: "customer",
  data() {
    return {
      title: "",
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      scoreList: ["较差", "较好", "良好", "优秀"]
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    voteStep() {
      return this.$store.state.voteStep;
    },
    // curLimit() {
    //   return this.$store.state.curLimit;
    // },
    showDesc() {
      return this.$store.state.voteType == 0;
    }
  },
  // watch: {
  //   users: {
  //     handler() {
  //       this.$store.state.curLimit = this.$store.getters.scoreLimit;
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    back() {
      this.$router.push("/login");
    },
    async submit() {
      let votes = [];
      // 、较差、较好、良好、优秀
      let rate2Score = [0, 4, 6, 8, 10];
      const dateName = app.getDate();
      const voteTime = app.getDate(1);
      //姓名，部门，得分，用户身份，是否领导评分，活动id，投票日期,提交时间
      votes = this.$store.state.users.map((item, idx) => ({
        user: item.name,
        dpt: "机检建模",
        attitude: rate2Score[item.attitude],
        response: rate2Score[item.response],
        power: rate2Score[item.power],
        usertype: this.title.slice(0, 5),
        isgm: 2, // 客户评价
        sportid: this.$store.state.voteType,
        votedate: dateName,
        votetime: voteTime,
        uid: this.$store.state.custom.uid
      }));

      // console.log(votes);
      // return;

      let {
        data: [res]
      } = await db.addCbpcPerformancePrintMachinecheck(votes).catch(e => {
        this.$message({
          message: "数据提交失败",
          type: "error"
        });
      });

      if (res.affected_rows == 0) {
        this.$message({
          message: "数据提交失败",
          type: "error"
        });
        return;
      }

      this.back();
      this.$message({
        message: "提交数据成功",
        type: "success"
      });

      app.saveInfo({
        step: this.$store.state.voteStep + 1,
        type: this.$store.state.voteType
      });
      this.$store.state.voteStep = this.$store.state.voteStep + 1;
    }
  },
  beforeMount() {
    let custom = this.$store.state.custom;
    if (custom.dept_id == 0) {
      this.$router.push({
        name: "login"
      });
      return;
    }

    // 转换数据
    let userInfo = {
      limit: {},
      data: custom.users.map(name => ({
        attitude: 2,
        response: 2,
        power: 2,
        desc: "",
        dept: custom.providerName,
        name
      })),
      title: custom.providerName + "客户满意度评价"
    };
    this.$store.state.users = userInfo.data;
    this.title = userInfo.title;
  }
};
export default vote;
</script>

<style lang="less">
@import "../less/vote.less";
@import "../less/rate.less";
.title {
  font-size: 22px;
}
.desc {
  font-weight: 200;
  font-size: 14px;
}
.vote {
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 20px;
    font-size: 15px;
    margin-bottom: 8px;
    .type {
      padding-right: 15px;
      font-size: 13px;
    }
  }
}
</style>