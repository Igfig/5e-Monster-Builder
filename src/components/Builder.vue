<template>
  <main class="builder">
    <tabs
      :options="{ useUrlFragment: false }"
      class="builder-tabs">
      <tab name="Stats">
        <Stats/>
      </tab>
      <tab name="Traits">{{ msg }} 2</tab>
      <tab name="Actions">{{ msg }} 3</tab>
      <tab name="Description">{{ msg }} 4</tab>
    </tabs>

    <figure class="results">
      <monster/>

      <!--TODO text-->
    </figure>

    <!--FIXME the relationship between this box and the focused control isn't entirely clear. Rearrange the page? Add a canvas in the background that draws a line from the info box to the control? (Or fake it with a colored div or something?) Move all the info to a popup?-->
    <!--TODO on wide screens this might want to be a sidebar instead.-->
    <info-display :info="currentInfo"/>
  </main>
</template>

<script>
import { mapState } from "vuex";
import { Tab, Tabs } from "vue-tabs-component";
import { CURRENT_INFO } from "../store/keys";
import Monster from "./Monster";
import Stats from "./Stats";
import InfoDisplay from "./InfoDisplay";

export default {
  name: "Builder",
  components: { InfoDisplay, Stats, Monster, Tabs, Tab },
  data() {
    return {
      msg: "Welcome to Your Vue.js PWA"
    };
  },
  computed: {
    ...mapState([CURRENT_INFO])
  }
};
</script>

<style lang="scss">
//TODO make properly responsive

main.builder {
  grid-template-columns: 1fr auto; // XXX probably should just change layout at some width
  grid-template-rows: 1fr auto;
}

.builder-tabs {
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: auto; // This is key for keeping the layout all on one page

  > .tabs-component-tabs {
    display: flex;
    position: relative;
    overflow-y: hidden;
    z-index: 10;
    line-height: 1;

    li {
      margin-right: 5px;
      list-style-type: none;
    }
    a {
      display: block;
      padding: 5px 10px;
      border: 1px solid black;
      color: inherit;
      text-decoration: none;
    }
    li.is-active a {
      border-bottom-color: white;
    }
  }

  > .tabs-component-panels {
    overflow-y: auto;
    margin-top: -1px;
    padding: 20px;
    border: 1px solid black;
  }
}

.results,
.info {
  padding: 20px;
  border: 1px solid black;
}
.results {
  grid-column: 2;
  grid-row: 1 / span 2;
  margin-top: calc(
    1em + 2 * (5px + 1px) - 1px
  ); // same height as tabs. FIXME get number from elsewhere
}
</style>
