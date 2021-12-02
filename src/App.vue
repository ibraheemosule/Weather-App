<template>
  <div id="app">
    <Layout
      :data="data"
      :city="location"
      :fetching="isFetching"
      @fetch="fetch"
    />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import axios from "axios";
  import { getPosition, fetchWeather } from "./assets/functions/functions";
  import { reactive, toRefs } from "@vue/composition-api";

  interface Geo {
    [value: string]: any;
    coords: {
      [value: string]: any;
      longitude: number;
      latitude: number;
    };
  }

  export default Vue.extend({
    name: "App",
    components: {
      Layout: () => import("./components/Layout.vue"),
    },
    setup() {
      const apiKey: number = process.env.VUE_APP_API_KEY;
      const state = reactive({
        location: "",
        data: {},
        isFetching: false,
      } as {
        location: string;
        count: number;
        data: Record<string, unknown>[];
        isFetching: boolean;
      });

      (() => {
        state.isFetching = !state.isFetching;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async position => {
              try {
                const data: any = await getPosition(position);
                fetch(data);
              } catch (err) {
                console.log(err);
              }
            },
            error => {
              state.isFetching = !state.isFetching;
              console.log(error.message);
            }
          );
        } else {
          state.isFetching = !state.isFetching;
        }
      })();

      const fetch = async (location: string) => {
        if (!state.isFetching) state.isFetching = !state.isFetching;
        try {
          const data = await fetchWeather(location);
          state.location = data?.city.name;
          state.data = data.list.filter((_val: any, i: number) => i % 8 === 0);
        } catch (err) {
          console.log(err);
        } finally {
          state.isFetching = !state.isFetching;
        }
      };

      return {
        ...toRefs(state),
        fetch,
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
