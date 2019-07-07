// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import app from '../assets/js/common';
import taskList from '../assets/js/taskList';

let deptList = {
  all: 0, //所有
  paper: 1, //纸张
  print: 2 //印刷
};

let defaultDept = 'print';

// 默认部门/公司
let voteType = app.getUrlParam('type');

voteType =
  voteType == null ? deptList[defaultDept] : Number.parseInt(voteType, 10);

let userTypeStr = app.getUrlParam('usertype');
let userType = userTypeStr !== null ? 1 : userTypeStr || 0;

// http://localhost:8080/#/vote/0/1&usertype=1

//vuex中数据
const state = {
  voteType, //默认公司测试
  userType,
  voteStep: 0,
  users: [],
  curLimit: {
    excellent: 0,
    good: 0
  },
  taskList: taskList(voteType),
  custom: {
    uid: 0,
    dept_id: 0,
    users: [],
    providerName: ''
  }
};

//计算属性
const getters = {
  scoreLimit: (state) => {
    let obj = {
      excellent: 0,
      good: 0
    };
    state.users.forEach((item) => {
      obj.excellent += item.value == '4';
      obj.good += item.value == '3';
    });
    return obj;
  }
};

export default new Vuex.Store({
  state,
  mutations: {
    updateCustom(state, custom) {
      state.custom = custom;
    }
  },
  // actions,
  getters
});
