<template>
  <main>
    <div class="wrapper">
      <div class="title">
       <img class="logo" src="@/assets/images/logo.png" alt="rainy gif" />
       <span> Weather App </span>
       </div>
      <img class="image" src="@/assets/images/rainy.gif" alt="rainy gif" />
      <section class="hero">
        <div class="weather">
          <h1>16&#176;</h1>
          <div class="info">
            <div>
              <h2>London</h2>
              <div class="time">06:09 - Monday, 9 Sep '19</div>
            </div>
            <div class="condition">
              <ion-icon style="font-size: 2rem" name="rainy-outline"></ion-icon>
              <br />Cloudy
            </div>
          </div>
        </div>
      </section>
      <section class="details">
        <form class="search-field">
          <div class="input-wrapper">
            <input maxlength="20" type="text" placeholder="Choose Location" />
          </div>
          <button class=""><ion-icon name="search-outline"></ion-icon></button>
        </form>
        <ul class="locations">
          <li>one</li>
          <li>one</li>
          <li>one</li>
          <li>one</li>
          <li>one</li>
        </ul>
        <aside>
          <div class="btn-group">
            <button>one</button>
            <button>one</button>
            <button>one</button>
            <button>one</button>
            <button>one</button>
          </div>
          <div class="weather-info">
            <h4>Weather Details</h4>
            <div class="info">
              <p><span>Cloudy</span><span>86%</span></p>
              <p><span>Humidity</span><span>86%</span></p>
              <p><span>Wind</span><span>8km/h</span></p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { reactive, computed, toRefs, ComputedRef } from "@vue/composition-api";

export default Vue.extend({
  props: {
    data: Object,
  },
  setup(props) {
    const state: Record<string, unknown> = reactive({
      value: 0,
      list: computed(() => state.value),
      property: computed(() => {
        console.log(props.data);
        return props.data;
      }),
    } as {
      value: number;
      list: ComputedRef;
      property: ComputedRef;
    });

    // (() => console.log(state.list, state.property))()

    return {
      ...toRefs(state),
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
@media (max-width: 760px) {
  main {
    height: 100%;
  }
  main div.wrapper {
    display: block;
  }
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

@media screen {
  
}
</style>

<style scoped>
/* DETAILS SECTION STYLES*/
section.details {
  opacity: 0.8;
  background: #181111;
  z-index: 2;
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
.details ul {
  list-style-type: none;
  margin: 30px 0;
}
.details .locations li {
  margin: 10px 0;
  font-size: 0.8em;
}

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
aside .btn-group button:active {
  background: #1d1dfa3f;
}
aside .btn-group button:nth-last-child(1) {
  border-right: 0;
}
.weather-info {
  margin: 40px 2rem 20px 0;
  color: rgb(216, 216, 216);
}
.weather-info h4 {
  font-weight: 300;
  margin-bottom: 40px;
}
.weather-info p {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  font-size: 0.8em;
}
</style>
