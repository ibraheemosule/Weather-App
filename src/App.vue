<template>
  <div id="app">
    <Layout
      :data="data"
      :city="location"
      :fetching="isFetching"
      @fetch="fetch"
      :timezone="timezone"
    />
  </div>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from "vue";
  import { getPosition, fetchWeather } from "./assets/functions/functions";
  import { IWeatherData, IWeatherList } from "./assets/types/types";
  import { reactive, toRefs, provide } from "@vue/composition-api";

  export default Vue.extend({
    name: "App",
    components: {
      Layout: () => import("./components/Layout.vue"),
    },
    setup() {
      const apiKey: number = process.env.VUE_APP_API_KEY;
      const state = reactive({
        location: "",
        data: [],
        isFetching: false,
        timezone: 0,
        locationDetails: {
          country: "",
          population: NaN,
        },
      } as {
        location: string | undefined;
        data: IWeatherList[] | undefined;
        locationDetails: {
          country: string | undefined;
          population: number | undefined;
        };
        // data: Record<string, unknown>[];
        isFetching: boolean;
        timezone: number | undefined;
      });

      provide("locationInfo", state.locationDetails);
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
          const data: IWeatherData | undefined = await fetchWeather(location);
          state.location = data?.city.name;
          state.timezone = data?.city.timezone;
          (state.locationDetails.country = data?.city.country),
            (state.locationDetails.population = data?.city.population),
            (state.data = data?.list.filter(
              (_val: any, i: number) => i % 8 === 0
            ));
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
