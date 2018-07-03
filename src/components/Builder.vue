<template>
  <main class="builder">
    <tabs :options="{ useUrlFragment: false }" class="builder-tabs">
      <tab name="Stats">
        <Stats/>
      </tab>
      <tab name="Traits">{{msg}} 2</tab>
      <tab name="Actions">{{msg}} 3</tab>
      <tab name="Description">{{msg}} 4</tab>
    </tabs>
    
    <figure class="results">
      <monster/>
    </figure>
  
    <aside class="info"><h3>Info</h3></aside>
  </main>
</template>

<script>
import { Tab, Tabs } from "vue-tabs-component";
import Monster from "./Monster";
import Stats from "./Stats";

export default {
  name: "builder",
  components: { Stats, Monster, Tabs, Tab },
  data() {
    return {
      msg: "Welcome to Your Vue.js PWA"
    };
  }
};
</script>

<style lang="scss">
$spacing: 30px;

.builder {
  display: grid;
  grid-template-columns: 1fr auto; // XXX maybe fixed instead of auto
  grid-template-rows: 1fr auto;
  grid-gap: $spacing;
}

.builder-tabs {
  display: grid;
  grid-template-rows: auto 1fr;

  > .tabs-component-tabs {
    display: flex;
    position: relative;
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
