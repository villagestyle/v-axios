import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import { VAxios } from "../src/index";

Vue.use(VueRouter);
Vue.use(Vuex);

const axios = new VAxios({
  // 设置默认值（不传值时生效）
  vConfig: {
    showLoading: true
  }
});

/** 注册请求拦截 */
axios.requestInterceptors = config => {
  return config;
};

/** 注册响应拦截 */
axios.responseInterceptors = config => {
  return config.data;
};

axios.vRequest<{ name: '老王', age: 12 }>({
  url: "127.0.0.1",
  method: "get",
  vConfig: {
    showLoading: false
  }
}).then(ret => {
  const { name, age } = ret.data;
  console.log(name, age);
});

axios.vGet(`127.0.0.1/test`, { vConfig: { showLoading: false } });

axios.vPost(`127.0.0.1/testPost`, {
  name: '老王',
  age: 15
}, {
  vConfig: {
    showLoading: false,
    formData: true
  }
});

axios.vDelete(`127.0.0.1/testDelete`, {
  vConfig: {
    showLoading: true
  }
})

axios.vPut(`127.0.0.1/testPut`, {
  id: '123',
  name: "测试"
}, {
  vConfig: {
    showLoading: false
  }
})

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("./views/home.vue")
    }
  ]
});

export const store = new Vuex.Store({
  state: {
    userInfo: {
      name: "老王",
      age: 10
    },
    num: 1
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
