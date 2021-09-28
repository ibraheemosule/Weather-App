import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import VueCompositonAPI from "@vue/composition-api";

Vue.use(VueCompositonAPI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
