import { createApp } from "vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import TDesign from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import App from './App.vue';




createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(TDesign)
    .use(router)
    .mount("#app");
