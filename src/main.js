import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Lib from "./lib";

const app = createApp(App);
app.use(Lib);
app.mount("#app");
