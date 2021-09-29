<template>
  <div id="app">
    <Layout :data="data" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { reactive, toRefs } from "@vue/composition-api";

export default Vue.extend({
  name: "App",
  components: {
    Layout: () => import("./components/Layout.vue"),
  },
  setup() {
    const apiKey: number = process.env.VUE_APP_API_KEY;
    const state = reactive({
      location: "Lagos",
      count: 100,
      data: {},
    } as {
      location: string;
      count: number;
      data: Record<string, unknown>;
    });

    (async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${state.location}&units=metric&cnt=${state.count}&appid=${apiKey}`
      );
      state.data = await data;
      console.log(state.data);
    })();

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style>
* {
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  background: #92919170;
}
</style>
