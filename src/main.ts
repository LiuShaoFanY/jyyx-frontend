import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/access";
import "bytemd/dist/index.css";
import request from "@/utils/request";

const app = createApp(App);
//使用 Arco Design 组件库
app.config.globalProperties.$request = request;
app.config.globalProperties.$baseUrl = process.env.VUE_APP_BASEURL;
console.log("Base URL:", process.env.VUE_APP_BASEURL);
createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
