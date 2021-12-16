<template>
  <ul>
    <template v-if="inputValue">
      <li @click="fetchData(returnValues[0])" class="value"></li>
      <li @click="fetchData(returnValues[1])" class="value"></li>
      <li @click="fetchData(returnValues[2])" class="value"></li>
      <li @click="fetchData(returnValues[3])" class="value"></li>
      <li @click="fetchData(returnValues[4])" class="value"></li>
    </template>
    <template v-if="!inputValue && locationDetails.country">
      <li class="details">
        <h1>Country: {{ locationDetails.country }}</h1>
        <h1>Population: {{ locationDetails.population }}</h1>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from "vue";
  import { locations } from "../assets/functions/functions";
  import { reactive, toRefs, watch, inject } from "@vue/composition-api";
  import { IProps } from "../assets/types/types";

  export default Vue.extend({
    props: ["inputValue"],
    setup(props: IProps, { emit }) {
      const state: any = reactive({
        places: [],
        returnValues: [],
        displayValues: [],
      });

      (async () => {
        state.places = await locations();
      })();

      const locationDetails = inject("locationInfo");

      watch(
        () => props.inputValue,
        newValue => {
          const wrapper = document.getElementsByClassName("value");
          for (let i = 0; i < wrapper.length; i++) {
            wrapper[i].innerHTML = "";
          }
          const locationSuggestion = state.places
            .filter((val: string) =>
              val.toLowerCase().startsWith(newValue.toLowerCase())
            )
            .sort((a: string, b: string) => (a > b ? 1 : -1))
            .slice(0, 5);
          state.returnValues = locationSuggestion;
          const filteredPlaces = locationSuggestion.map((val: string) => {
            return val
              .toLowerCase()
              ?.replaceAll(
                newValue.toLowerCase(),
                `<mark>${newValue.toLowerCase()}</mark>`
              );
          });

          state.displayValues = filteredPlaces.map((val: string) => {
            var parser = new DOMParser();
            let doc = parser.parseFromString(val, "text/html");
            return doc.body;
          });
          state.displayValues.forEach((val: Document, i: number) => {
            if (props.inputValue)
              document.getElementsByClassName("value")[i].appendChild(val);
          });
        }
      );
      const fetchData = (payload: string) => {
        emit("fetch", payload);
      };

      return {
        ...toRefs(state),
        fetchData,
        locationDetails,
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
