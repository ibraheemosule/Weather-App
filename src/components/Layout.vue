<template>
  <main>
    <div class="wrapper">
      <template v-if="fetching">
        <div class="overlay">
          <Loader />
        </div>
      </template>
      <template>
        <div class="title">
          <img class="logo" src="@/assets/images/logo.png" alt="rainy gif" />
          <span> Weather App </span>
        </div>
        <img class="image" :src="imgUrl(image)" alt="weather image" />
      </template>
      <section class="hero">
        <div class="weather" v-if="city">
          <h1>{{ Math.round(list.main.temp) }}&#176;</h1>

          <div class="info">
            <div>
              <h2>{{ city }}</h2>
              <div class="time">
                {{ getTime() }}
              </div>
            </div>
            <div v-if="list" class="condition">
              <ion-icon style="font-size: 2rem" name="rainy-outline"></ion-icon>
              <br />{{ list.weather[0].description }}
            </div>
          </div>
        </div>
        <div v-else class="error">
          <template v-if="!fetching && !location">
            Error! Location not found
          </template>
        </div>
      </section>
      <section class="details">
        <form @submit.prevent="fetchData(location)" class="search-field">
          <div class="input-wrapper">
            <input
              maxlength="30"
              type="text"
              placeholder="Type Location"
              :value="location"
              @input="evt => (location = evt.target.value)"
            />
          </div>
          <button><ion-icon name="search-outline"></ion-icon></button>
        </form>
        <div class="locations">
          <Suggestions @fetch="fetchData" :inputValue="location" />
        </div>
        <aside>
          <div class="btn-group">
            <button
              v-for="(day, i) in dayValues"
              :id="i"
              :class="[i == 0 ? 'btn-active' : '']"
              @click="activeButton"
              :key="day.day"
            >
              {{ day.day }}
            </button>
          </div>
          <div class="weather-info">
            <h4>Weather Details</h4>
            <div class="info" v-if="list">
              <p>
                <span>Cloudy</span><span>{{ list.clouds.all }}%</span>
              </p>
              <p>
                <span>Humidity</span><span>{{ list.main.humidity }}%</span>
              </p>
              <p>
                <span>Wind</span><span>{{ list.wind.speed }}km/h</span>
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
  /* eslint-disable */
  import Vue from "vue";
  import {
    reactive,
    computed,
    toRefs,
    watch,
    PropType,
  } from "@vue/composition-api";
  import { IWeatherList, IProps } from "../assets/types/types";

  export default Vue.extend({
    components: {
      Loader: () => import("./Loader.vue"),
      Suggestions: () => import("./Suggestions.vue"),
    },

    props: ["data", "city", "fetching", "timezone"],

    setup(props: IProps, { emit }) {
      const days = [
        {
          day: "Sun",
        },
        {
          day: "Mon",
        },
        {
          day: "Tue",
        },
        {
          day: "Wed",
        },
        {
          day: "Thu",
        },
        {
          day: "Fri",
        },
        {
          day: "Sat",
        },
      ];
      const state: any = reactive({
        value: 0,
        time: 0,
        day: 0,
        dayValues: [],
        location: "",
        cityTime: "",
        image: "unknown",
        list: computed((): IWeatherList => {
          return props.data && props?.data[state.value];
        }),
      });

      const getTime = () => {
        const date: Date = new Date();
        date.setMinutes(
          date.getMinutes() + date.getTimezoneOffset() + props.timezone / 60
        );

        let hours: number = date.getHours(),
          minutes: number = date.getMinutes(),
          day: number = date.getDate(),
          month: number = date.getMonth(),
          year: string = date.getFullYear().toString().slice(-2);

        return `${
          hours < 12
            ? hours.toString().length < 2
              ? "0" + hours
              : hours
            : (hours - 12).toString().length < 2
            ? "0" + (hours - 12)
            : hours - 12
        }:${minutes < 10 ? "0" + minutes : minutes} ${
          hours > 11 ? "PM" : "AM"
        } - ${day}/${month + 1}/${year}`;
      };

      watch(
        () => state.list?.weather[0].main,
        newValue => {
          switch (newValue) {
            case "Thunderstorm":
              state.image = newValue;
              break;
            case "Drizzle":
              state.image = newValue;
              break;
            case "Rain":
              state.image = newValue;
              break;
            case "Snow":
              state.image = newValue;
              break;
            case "Clear":
              state.image = newValue;
              break;

            case "Clouds":
              state.image = newValue;

              break;

            default:
              state.image = "unknown";
          }
        }
      );

      const imgUrl = (img: string): string =>
        require(`@/assets/images/${img}.gif`);

      const activeButton = (e: any): void => {
        const allButtons = document.querySelectorAll(".btn-group button");
        for (let button of allButtons) {
          button?.classList.remove("btn-active");
        }
        e.target.classList.add("btn-active");
        state.value = parseInt(e.target.id);
        dayCalc();
      };

      const dayCalc = (): void => {
        let date = new Date();
        date.setMinutes(
          date.getMinutes() + date.getTimezoneOffset() + props.timezone / 60
        );
        state.day = date.getDay();
        const arr = [];
        for (let i = state.day; i < 8; i++) {
          if (i > 6) {
            i = 0;
          }
          arr.push(days[i]);
          if (arr.length === 5) break;
        }
        state.dayValues = arr;
        state.time = `${date
          .toLocaleTimeString()
          .split(":")
          .slice(0, 2)
          .join(":")} ${date.getHours()} - ${date.getDate()} '${
          date.getMonth() + 1
        } '${date.getFullYear().toString().slice(-2)}`;
      };
      dayCalc();

      const fetchData = (payload: string) => {
        emit("fetch", payload);
        state.location = "";
      };

      const compositionUpdate = (event: InputEvent) => {
        state.location = event.data;
        console.log(event.data, "working hre");
      };

      return {
        ...toRefs(state),
        activeButton,
        fetchData,
        days,
        imgUrl,
        getTime,
        compositionUpdate,
      };
    },
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    height: 100vh;
    padding: 7% 5%;
    overflow-y: scroll;
    width: 100%;
    max-width: 1340px;
    margin: 0 auto;
  }
  main div.wrapper {
    display: flex;
    height: 100%;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 1px 1px 10px gray;
  }
  div.wrapper .overlay {
    z-index: 2;
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: black;
    color: white;
  }
  .overlay svg {
    width: 20%;
    height: 20%;
  }
  div.wrapper .title {
    position: absolute;
    font-size: 1.5em;
    color: rgb(216, 216, 216);
  }
  .title span {
    font-size: 2rem;
  }
  section.hero {
    flex-basis: 60%;
    flex-grow: 1;
    position: relative;
  }
  .hero .weather {
    position: absolute;
    top: 70%;
    left: 30%;
    transform: translateX(-30%);
    display: flex;
    color: white;
  }
  .weather h1 {
    font-size: 5em;
  }
  .weather .info {
    align-self: center;
    margin: 10px 0.5rem 0;
    display: flex;
  }

  .info h2 {
    font-size: 2em;
  }

  .hero .error {
    font-size: 1.5rem;
    font-style: italic;
    color: rgba(255, 0, 0, 0.61);
    text-align: center;
    line-height: 2.5rem;
    margin: 0 0.5rem 0 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .info .time {
    font-size: 0.6em;
    margin-top: 0.4rem;
  }
  .info .condition {
    margin: 0.6rem 0 0 2rem;
    display: inline-block;
    font-size: 0.6rem;
  }
  .wrapper .image {
    opacity: 0.4;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .wrapper .logo {
    margin: -2px 0 0 -2px;
    z-index: 1;
    width: 3rem;
    height: 3rem;
  }

  /* DETAILS SECTION STYLES*/
  section.details {
    opacity: 0.8;
    background: #181111;
    padding-left: 2rem;
    color: rgb(109, 108, 108);
  }
  .details .search-field {
    display: flex;
  }
  .search-field .input-wrapper {
    margin: 2.5rem 0rem 0 0;
    flex-basis: 70%;
  }
  .input-wrapper input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #383838;
    color: rgb(216, 216, 216);
    padding-bottom: 10px;
    min-width: 100%;
  }
  .input-wrapper input:focus {
    border: 0;
    border-bottom: 1px solid #383838;
    background: transparent;
    outline: none;
  }
  input::placeholder {
    opacity: 1;
    color: rgb(216, 216, 216);
    font-size: 0.8em;
  }

  .search-field button {
    flex-grow: 1;
    margin-left: 3rem;
    font-size: 1.5em;
    color: rgb(216, 216, 216);
    background: #1d1dfa67;
    border-left-color: #1d1dfa67;
    border-top-color: #1d1dfa67;
    cursor: pointer;
    transition: all 0.2s ease-in;
  }
  button:hover {
    background: #1d1dfa3f;
    border-left-color: #1d1dfa3f;
    border-top-color: #1d1dfa3f;
  }
  .details .locations {
    margin: 0 0 30px 0;
    font-size: 0.8em;
  }
  /* .details .locations div {
    margin: 10px 0;

  } */

  aside .btn-group {
    display: flex;
    list-style-type: none;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 0;
    margin-right: 2rem;
  }
  aside .btn-group button {
    padding: 1rem 2rem;
    flex-grow: 1;
    border: 0;
    border-right: 1px solid gray;
    background: transparent;
    color: rgb(216, 216, 216);
    cursor: pointer;
    transition: all 0.2s ease-in;
  }
  aside .btn-group button:hover {
    background: #1d1dfa3f;
  }
  .btn-active {
    background-color: #1d1dfa3f !important;
  }
  aside .btn-group button:nth-last-child(1) {
    border-right: 0;
  }
  .weather-info {
    padding: 40px 2rem 20px 0;
    color: rgb(216, 216, 216);
  }
  .weather-info h4 {
    font-weight: 300;
    margin-bottom: 40px;
  }
  .weather-info p {
    display: flex;
    justify-content: space-between;
    padding: 5px 0 5px;
    font-size: 0.8em;
  }
  /* MEDIA QUERIES*/
  @media (max-width: 910px) {
    aside .btn-group button {
      padding: 1rem 1.5rem;
    }
  }
  @media (max-width: 850px) {
    aside .btn-group button {
      padding: 0.5rem 1rem;
    }
  }
  @media (max-width: 760px) {
    main {
      height: 100%;
    }
    main div.wrapper {
      display: block;
    }
    section.hero {
      height: 50vh;
      margin-bottom: 50px;
    }
    .hero .error {
      margin: 0;
    }
    .wrapper .image {
      height: 100%;
      width: auto;
    }
    aside .btn-group button {
      padding: 1rem 2rem;
    }
  }
  @media (max-width: 560px) {
    aside .btn-group button {
      padding: 0.5rem 1rem;
    }
    .weather-info h4 {
      margin-bottom: 20px;
    }
    .hero .error {
      font-size: 1rem;
      padding: 0 1rem;
      font-weight: 600;
    }
  }
  @media (max-width: 400px) {
    .hero .weather {
      display: block;
      top: 40%;
      left: 40%;
    }
    .search-field button {
      margin-left: 1rem;
    }
    .weather h1 {
      margin-left: 1rem;
    }
    aside .btn-group button {
      padding: 0.5rem;
    }
  }
</style>
