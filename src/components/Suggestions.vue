<template>
  <ul>
    <li
      ref="li"
      v-show="inputValue"
      v-for="num in 4"
      :key="num"
      @click="fetchData(returnValues[num - 1])"
      class="value"
    ></li>

    <li class="details" v-if="!inputValue && locationDetails.country">
      <h1>Country: {{ locationDetails.country }}</h1>
      <h1>Population: {{ locationDetails.population }}</h1>
    </li>
  </ul>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from "vue";
  import { locations } from "../assets/functions/functions";
  import {
    reactive,
    toRefs,
    watch,
    inject,
    ref,
    computed,
  } from "@vue/composition-api";
  import { IProps } from "../assets/types/types";

  export default Vue.extend({
    props: ["inputValue"],
    setup(props: IProps, { emit }) {
      const state: any = reactive({
        places: [],
        returnValues: [],
        displayValues: [],
      });

      const li = ref<HTMLLIElement[]>();

      (async () => {
        state.places = await locations();
      })();

      const locationDetails = inject("locationInfo");

      watch(
        () => props.inputValue,
        newValue => {
          if (li.value === undefined) return;
          for (let i = 0; i < li.value.length; i++) {
            li.value[i].innerHTML = "";
          }
          const locationSuggestion = state.places
            .filter((place: string) =>
              place.toLowerCase().startsWith(newValue.toLowerCase())
            )
            .sort((a: string, b: string) => (a > b ? 1 : -1))
            .slice(0, 5);

          state.returnValues = locationSuggestion;

          const filteredPlaces = locationSuggestion.map((location: string) => {
            return location
              .toLowerCase()
              ?.replaceAll(
                newValue.toLowerCase(),
                `<mark>${newValue.toLowerCase()}</mark>`
              );
          });

          filteredPlaces.forEach((place: string, i: number) => {
            if (props.inputValue && li.value)
              li.value[i] && (li.value[i].innerHTML = place);
          });
        },
        { immediate: true }
      );
      const fetchData = (payload: string) => {
        console.log(payload);
        emit("fetch", payload);
      };

      return {
        ...toRefs(state),
        fetchData,
        locationDetails,
        li,
      };
    },
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style-type: none;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    padding-right: 2rem;
    position: relative;
  }
  ul li {
    margin: 10px 0;
    max-width: max-content;
  }
  li.value:hover {
    color: rgba(57, 57, 255, 0.712);
    cursor: pointer;
  }
  ul .details {
    margin: 50px 0;
  }
  .details h1 {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.699);
  }
</style>
