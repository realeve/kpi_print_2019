<template>
  <div>
    <h2 class="title">月度绩效测评({{isLeader=='0'?'互评':'领导评分'}})</h2>
    <div class="list">
      <el-input
        v-model="username"
        placeholder="姓名"
        :maxlength="4"
        style="margin-bottom:10px;"
      ></el-input>
      <el-input
        v-model="card_no"
        type="number"
        placeholder="工作证号"
        :minlength="5"
        :maxlength="5"
      ></el-input>
      <div class="submit">
        <button
          class="button"
          @click="login"
        >登录</button>
      </div>
    </div>
    <el-footer />
  </div>
</template>

<script>
import ElFooter from "./Footer";
import app from "../assets/js/common";
import * as db from "../assets/js/db";
const dateName = app.getDate();

let lsKey = "customKpi";

let home = {
  name: "login",
  components: {
    ElFooter
  },
  data() {
    return {
      username: "",
      card_no: ""
    };
  },
  computed: {
    isLeader() {
      return this.$store.state.userType || "0";
    }
  },
  mounted() {
    console.log(this.$store.state.voteType);
    console.log(this.$store.state.userType);
  },
  methods: {
    location(idx = 0) {
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
    async login() {
      let params = { username: this.username, card_no: this.card_no };
      let { data, rows } = await db.getCbpcUserList(params);
      if (rows == 0) {
        return;
      }

      let { uid, dept_id } = data[0];
      localStorage.setItem(lsKey, JSON.stringify(params));
      let { data: users } = await db.getCbpcUserListByDept(dept_id);
      let providerName = "";
      switch (Number(dept_id)) {
        case 18:
          providerName = "胶凹机检组";
          break;
        case 19:
          providerName = "印码机检组";
          break;
        case 20:
        default:
          providerName = "检封机检组";
          break;
      }

      let custom = {
        uid,
        dept_id,
        providerName,
        users: users.map(item => item.username)
      };

      console.log(custom);
    }
  },
  beforeMount() {
    let userInfo = localStorage.getItem(lsKey);
    if (userInfo == null) {
      return;
    }
    let { username, card_no } = JSON.parse(userInfo);
    this.username = username;
    this.card_no = card_no;
  }
};
export default home;
</script>

<style lang="less">
@import "../less/common.less";

.list {
  margin: 40px 20px 40px 20px;
}
</style>