<template>
  <main>
    <div class="wrapper">
      <section class="hero">
        <img class="image" src="@/assets/images/rainy.gif" alt="rainy gif" />
        <div class="weather">
          <h1>16&#176;</h1>
          <div class="info">
            <h2>London</h2>
            <div class="time">
              06:09 - Monday, 9 Sep '19 <span class="condition">Cloudy</span>
            </div>
          </div>
        </div>
      </section>
      <section class="details">working</section>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { reactive, computed, toRefs } from "@vue/composition-api";

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
}
main div.wrapper {
  display: flex;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 1px 1px 10px gray;
}
section.hero {
  flex-basis: 60%;
  position: relative;
}
.hero .weather {
  position: absolute;
  top: 70%;
  left: 30%;
  transform: translateX(-30%);
  display: flex;
  z-index: 2;
  color: white;
}
.weather h1 {
  font-size: 5em;
}
.weather .info {
  align-self: center;
  margin: 10px 0.5rem 0;
}

.info h2 {
  font-size: 2em;
}

.info .time {
  font-size: 0.6em;
}
.time .condition {
  margin: 0 0 0 2rem;

}
section img {
  opacity: 0.4;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}
section.details {
  flex-grow: 1;
  background: #b8b8b8;
}
</style>
