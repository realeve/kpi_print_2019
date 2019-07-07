<template>
  <div>
    <h3 class="title">印钞机检客户满意度评价</h3>
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
          :disabled="isAnswered"
          class="button"
          @click="login"
        >{{isAnswered?'已评价':'登录'}}</button>
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

export default {
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
    isAnswered() {
      let info = app.readInfo(this.$store.state.voteType);
      if (dateName.substr(0, 6) == info.date.substr(0, 6)) {
        this.$store.state.voteStep = info.data.step;
      }
      return this.$store.state.voteStep != "0";
    }
  },
  methods: {
    location() {
      this.$router.push({
        name: "customer"
      });
    },
    async login() {
      let params = { username: this.username, card_no: this.card_no };
      let { data, rows } = await db.getCbpcUserList(params);
      if (rows == 0) {
        this.$message({
          message: "登录信息有误",
          type: "error"
        });
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
      this.$store.commit("updateCustom", custom);
      this.location();
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
</script> 
<style lang="less">
@import "../less/common.less";

.list {
  margin: 40px 20px 40px 20px;
}
.title {
  font-size: 22px;
}
</style>