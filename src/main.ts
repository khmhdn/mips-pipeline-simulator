import { createApp } from "vue";
import "./assets/styles/main.scss";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(router).use(Toast).mount("#app");
